<?php
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

/**
 * Force trailing slashes on URLs
 *  - Need to define consistently for the router to work properly
 */
$app->add(function(Request $request, Response $response, callable $next){

    $uri = $request->getUri();
    $path = $uri->getPath();

    if($path != "/" && substr($path, -1) != "/"){
        
        $uri = $uri->withPath($path . "/");
        
        if($request->getMethod() == "GET") {
            return $response->withRedirect((string)$uri, 301);
        } else {
            return $next($request->withUri($uri), $response);
        }
    }

    return $next($request, $response);
});
?>