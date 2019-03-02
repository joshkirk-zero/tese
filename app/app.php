<?php

/*
 * This is the main file of the application, including routing and controllers.
 *
 * $app is a Slim application instance, see the framework documentation for more details:
 * http://docs.slimframework.com/
 *
 * The order of the routes matter, as it will define the priority of routes. For that reason we
 * need to keep the more "generic" routes, such as the pages route, at the end of the file.
 *
 * If you decide to change the URLs, make sure to change PrismicLinkResolver in LinkResolver.php
 * as well to make sures links in your site are correctly generated.
 */

use Prismic\Api;
use Prismic\Predicates;

require_once "includes/http.php";

$apiEndpoint = $WPGLOBAL["app"]->getContainer()->get("settings")["prismic.url"];
$repoEndpoint = str_replace("/api", "", $apiEndpoint);
$url = $repoEndpoint . "/app/settings/onboarding/run";


/*
 * Include Functions
 */
require_once "includes/functions.php";

/*
 * Shopify
 */
if(defined("SHOPIFY_ACCESS_TOKEN") && SHOPIFY_ACCESS_TOKEN !== ""){
	require_once "includes/shopify.php";
}

/*
 * Pass the setup to routing
 */
require_once "includes/middleware.php";
require_once "includes/routing.php";
?>