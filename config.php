<?php

/****************************************************
 * This is the configuration file,
 * the only necessary change is the repository URL,
 * other changes are optional
 ****************************************************/

/*
 * Change this for the URL of your repository
 */
define('PRISMIC_URL', 'https://tese.cdn.prismic.io/api/v2');
define('PRISMIC_TOKEN', null);

/*
 * Your site metadata
 */
define('SITE_TITLE', 'Matese Fields');
define('SITE_DESCRIPTION', 'This is the PHP Quickstart project for Prismic');

/*
 * Set to true to display error details
 */
define('DISPLAY_ERROR_DETAILS', true);

/*
 * Protocols
 */
$protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off" || $_SERVER["SERVER_PORT"] == 443) ? "https://" : "http://";
define("PROTOCOL", $protocol);
define("HOST", $_SERVER["HTTP_HOST"]);
define("URI", $_SERVER["REQUEST_URI"]);
