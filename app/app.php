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

require_once 'includes/http.php';

/*
 *  --[ INSERT YOUR ROUTES HERE ]--
 */

//// Previews
//$app->get('/preview', function ($request, $response) use ($app, $prismic) {
//    $token = $request->getParam('token');
//    $url = $prismic->get_api()->previewSession($token, $prismic->linkResolver, '/');
//    return $response->withStatus(302)->withHeader('Location', $url);
//});

$app->get('/', function ($request, $response, $args) use ($app, $prismic) {
    // Query the API
    $api = $prismic->get_api();
    $document = $api->getByUID('home', 'home');

    // Render the page
    render($app, 'home', array('document' => $document));
});

$app->get('/facebook-careers', function ($request, $response, $args) use ($app, $prismic) {
    // Query the API
    $api = $prismic->get_api();
    $document = $api->getByUID('work', 'facebook-careers');

    // Render the page
    render($app, 'facebook-careers', array('document' => $document));
});
$app->get('/microsoft-teams', function ($request, $response, $args) use ($app, $prismic) {
    // Query the API
    $api = $prismic->get_api();
    $document = $api->getByUID('work', 'microsoft-teams');

    // Render the page
    render($app, 'microsoft-teams', array('document' => $document));
});
$app->get('/sunday-funday', function ($request, $response, $args) use ($app, $prismic) {
    // Query the API
    $api = $prismic->get_api();
    $document = $api->getByUID('work', 'sunday-funday');

    // Render the page
    render($app, 'sunday-funday', array('document' => $document));
});
$app->get('/honorable-mentions', function ($request, $response, $args) use ($app, $prismic) {
    // Query the API
    $api = $prismic->get_api();
    $document = $api->getByUID('work', 'honorable-mentions');

    // Render the page
    render($app, 'honorable-mentions', array('document' => $document));
});

// 404 Page (Keep at the bottom of the routes)
$app->get('/{id}', function ($request, $response, $args) use ($app, $prismic) {
    $api = $prismic->get_api();
    $document = $api->getByUID('notfound', 'notfound');
    render($app, '404', array('document' => $document));
});
