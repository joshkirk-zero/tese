<?php
/**
 * Preview Handler
 */
$app->get("/preview/", function($request, $response) use ($app, $prismic){

	/* --- Grab Preview Token --- */
	$token = $request->getParam("token");
	$url = $prismic->get_api()->previewSession($token, $prismic->linkResolver, "/");

	/* --- Store Token In Cookie --- */
	setcookie(Prismic\PREVIEW_COOKIE, $token, time() + 1800, "/", null, false, false);

	return $response->withStatus(302)->withHeader("Location", $url);
});

/**
 * Home Route
 */
$app->get("/", function($request, $response, $args) use ($app, $prismic){

	try{
		/* --- Get Content --- */
		$doc = getByUID("home");

		/* --- Throw Exception --- */
		if(!$doc || $doc === null){
			throw new Exception("Home content type doesn't exist", 1);
		}

		/* --- Render Page --- */
	  	render($app, "home", array("document" => $doc, "namespace" => "home"));

	} catch(Exception $e){
		/* --- Return 404 --- */
		not_found_include($app);
	}
});

/**
 * Search Route -- RESERVED URL
 */
$app->get("/search/", function($request, $response, $args) use ($app, $prismic){

	try{
		/* --- Get Content --- */
		$doc = getByUID("search");

		/* --- Throw Exception --- */
		if(!$doc || $doc === null){
			// throw new Exception("Search content type doesn't exist", 1);
		}

		/* --- Render Page --- */
	  	render($app, "search", array("document" => $doc, "namespace" => "search", "title" => "Search"));

	} catch(Exception $e){
		/* --- Return 404 --- */
		not_found_include($app);
	}
});

/**
 * Account Route -- RESERVED URLS
 */
$app->map(["GET", "POST"], "/account/[{slug}/[{key}/]]", function($request, $response, $args) use ($app, $prismic){

	global $shopify;

	$slug = null;
	$key  = null;
	$doc  = getByUID("account");

	if(isset($args["slug"])){
		$slug  = $args["slug"];
	}

	if(isset($args["key"])){
		$key  = $args["key"];
	}

	switch($slug){

		case "login":
		case "reset":
		case "recover":
		case "register":
		case "activate":

			/* --- Check if user is logged in - move them to /account/ --- */
			if(isset($shopify->customer) && $shopify->customer != null){

				return $response->withHeader("Location", "/account/");

			} else {

				$error = "";

				/* --- Check for errors --- */
				if(isset($shopify->customerError)){
					$error = $shopify->customerError;
				}

				/* --- Render --- */
				render($app, "accounts/" . $slug, array("document" => $doc, "customerError" => $error, "namespace" => "account"));
			}

			break;

		case "addresses":
		case "orders":

			$orders = "";
			$error  = "";

			/* --- Check for orders --- */
			if(isset($key) && $key !== "" && $slug === "orders"){
				$orders = returnOrderObject($shopify->customer->orders->edges, $args["key"]);
			} else {
				$orders = $shopify->customer->orders->edges;
			}

			/* --- Check for errors --- */
			if(isset($shopify->customerError)){
				$error = $shopify->customerError;
			}

			/* --- Render --- */
			render($app, "accounts/" . $slug, array("document" => $doc, "customer" => $shopify->customer, "orders" => $orders, "customerError" => $error, "namespace" => "account"));

			break;

		default:

			/* --- Check if user is logged in --- */
			if(isset($shopify->customer) && $shopify->customer != null){

				$orders = "";
				$error  = "";

				/* --- Check for orders --- */
				if(isset($shopify->customer->orders->edges)){
					$orders = $shopify->customer->orders->edges;
				}

				/* --- Check for errors --- */
				if(isset($shopify->customerError)){
					$error = $shopify->customerError;
				}

				/* --- Render --- */
				render($app, "accounts/account", array("document" => $doc, "customer" => $shopify->customer, "orders" => $orders, "customerError" => $error, "namespace" => "account"));

			} else {

				return $response->withHeader("Location", "/account/login/");
			}

			break;
	}
});

/**
 * Products Router -- RESERVED URLS
 */
$app->get("/products/[{slug}/]", function($request, $response, $args) use ($app, $prismic){

	global $shopify;

	/* --- Shopify isn't turned on --- */
	if(!defined("SHOPIFY_ACCESS_TOKEN")){
		not_found_include($app);
		return;
	}

	/* --- Get products prismic page --- */
	$doc = getByUID("products");

	/* --- Return single product page, or parent --- */
	if(isset($args["slug"])){
		$type = "type";
		$object = getProduct($args["slug"]);

		if(!$object){
			not_found_include($app);
			return;
		}

		$title = ucwords($object->title);
		$desc = truncateString(strip_tags($object->body_html), 300);

	} else {
		$type = "single";
		$object = $shopify->products;
	}

	/* --- Check if product exists --- */
	if(isset($args["slug"]) && !$object){
		not_found_include($app);
	} else {
		/* --- Render --- */
		render($app, $type . "--products", array("document" => $doc, "product" => $object, "namespace" => "products", "title" => $title, "description" => $desc));
	}
});

/**
 * Collections Router -- RESERVED URLS
 */
$app->get("/collections/[{slug}/]", function($request, $response, $args) use ($app, $prismic){

	global $shopify;

	/* --- Shopify isn't turned on --- */
	if(!defined("SHOPIFY_ACCESS_TOKEN")){
		not_found_include($app);
		return;
	}

	/* --- Get products prismic page --- */
	$doc = getByUID("collections");

	/* --- Return single product page, or parent --- */
	if(isset($args["slug"])){
		$type = "type";
		$object = getCollection($args["slug"]);

		if(!$object){
			not_found_include($app);
			return;
		}

		$title = ucwords($object->title);
		$desc = truncateString(strip_tags($object->body_html), 300);
		
	} else {
		$type = "single";
		$object = $shopify->collections;
	}

	/* --- Check if product exists --- */
	if(isset($args["slug"]) && !$object){
		not_found_include($app);
	} else {
		/* --- Render --- */
		render($app, $type . "--collections", array("document" => $doc, "collection" => $object, "namespace" => "collections", "title" => $title, "description" => $desc));
	}
});

/**
 * Cart -- RESERVED URL
 */
$app->get("/cart/", function($request, $response, $args) use ($app, $prismic){

	/* --- Shopify isn't turned on --- */
	if(!defined("SHOPIFY_ACCESS_TOKEN")){
		not_found_include($app);
		return;
	}

	/* --- Get Content --- */
	$doc = getByUID("cart");
	$crt = [];

	if(!isset($doc) || $doc == null || $args["page"] == "page"){
		$doc = "";
	}

	if(isset($_COOKIE["crt"])){

		try{
			$crt = json_decode($_COOKIE["crt"]);
		} catch(Exception $e){
			$crt = "Cart Error";
		}
	}

	/* --- Render Page --- */
  	render($app, "cart", array("document" => $doc, "cart" => $crt, "namespace" => "cart"));
});

/**
 * General Page Type & Single Handler
 */
$app->get("/{page}/[{slug}/]", function($request, $response, $args) use ($app, $prismic){

	/* --- Check if Child --- */
	if(isset($args["slug"])){

		$doc = getByUID($args["slug"], $args["page"]);

		/* --- Check for 404 --- */
		if(!isset($doc) || $doc === null || $args["page"] == "page"){
			not_found_include($app);
		} else {
			/* --- Render --- */
			render($app, "type--" . $args["page"], array("document" => $doc, "namespace" => $args["page"]));
		}

	} else {

		try{

			$doc = getByUID($args["page"], "page");

			/* --- Check for page content, pass to single --- */
			if(!isset($doc) || $doc === null || $doc->type !== "page"){
				throw new Exception("Error Processing Request", 1);
			}

			/* --- Render --- */
			render($app, "page--" . $args["page"], array("document" => $doc, "namespace" => "page", "type" => "page"));

		} catch(Exception $e){

			$doc = getByUID($args["page"]);

			/* --- Check for 404 --- */
			if(!isset($doc) || $doc === null || $doc->uid !== $args["page"] || $doc->uid == "home"){
				not_found_include($app);
			} else {
				/* --- Render --- */
				render($app, "single--" . $args["page"], array("document" => $doc, "namespace" => $args["page"], "type" => "single"));
			}
		}
	}
});
?>