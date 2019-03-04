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
 * General Page Type & Single Handler
 */
$app->get("/{page}/[{slug}/]", function($request, $response, $args) use ($app, $prismic){

	/* --- Check if Child --- */
	if(isset($args["slug"])){

		$doc = getByUID($args["slug"], $args["page"]);

		/* --- Check for 404 --- */
		if(!isset($doc) || $doc === null || $args["page"] == "work"){
			not_found_include($app);
		} else {
			/* --- Render --- */
			render($app, "type--" . $args["page"], array("document" => $doc, "namespace" => $args["page"]));
		}

	} else {
		
		$doc = getByUID($args["page"], "work");
		
		/* --- Check for page content, pass to single --- */
		if(!isset($doc) || $doc === null || $doc->type !== "work"){
			throw new Exception("Error Processing Request", 1);
		}

		/* --- Render --- */
		render($app, "page", array("document" => $doc, "namespace" => "work"));
	}
});
?>