<?php
/**
 * Views dir
 */
function views_dir(){

    return __DIR__ . "/../views";
}

/**
 * Template render
 */
function render($app, $path, $data = array()){

    global $WPGLOBAL;

    /* --- Load data into page variable --- */
    foreach($data as $key => $value){
        $WPGLOBAL[$key] = $value;
    }

    $file_path = views_dir() . "/" . $path . ".php";

    /* --- Header --- */
    require_once(views_dir() . "/header.php");

    /* --- Get Template --- */
    if(file_exists($file_path)){
        require($file_path);
    } else {
        not_found($app);
    }

    /* --- Footer --- */
    require_once(views_dir() . "/footer.php");
}

/**
 * 404 inside template render
 */
function not_found($app){

    $file_path = views_dir() . "/404.php";

    /* --- Get Template --- */
    if(file_exists($file_path)){ // Avoid an infinite loop
        require($file_path);
    } else {
        echo "<h1>404 Not found</h1>";
    }
}

/**
 * 404 outside of template render
 */
function not_found_include($app){

    global $WPGLOBAL;

    $file_path = views_dir() . "/404.php";

    $WPGLOBAL["namespace"] = "not-found";

    /* --- Header --- */
    require_once(views_dir() . "/header.php");

    /* --- Get Template --- */
    if(file_exists($file_path)){ // Avoid an infinite loop
        require($file_path);
    } else {
        echo "<h1>404 Not found</h1>";
    }

    /* --- Footer --- */
    require_once(views_dir() . "/footer.php");
}
?>