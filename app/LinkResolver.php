<?php

use Prismic\LinkResolver;

/**
 * The link resolver is the code building URLs for pages corresponding to
 * a Prismic document.
 *
 * If you want to change the URLs of your site, you need to update this class
 * as well as the routes in app.php.
 */
class PrismicLinkResolver extends LinkResolver{

  	public function resolve($link){

  		if(property_exists($link, "isBroken") && $link->isBroken === true){
            return "/404/";
        }

	    if($link->type !== "page" && $link->type !== "home") {
	      	return "/" . $link->type . "/" . $link->uid . "/";
	    }

	    if($link->type == "page"){
	    	return "/" . $link->uid . "/";
	    }
    
	    // Default case returns the homepage
	    return "/";
  	}
}
