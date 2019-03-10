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
 * Webhook Secret
 *  - Generate a 32-bit string for this
 *	- go here: https://randomkeygen.com/
 *  - scroll down to "CodeIgniter Encryption Keys", select one
 *  - make sure to add secret to the webhook on prismic
 */
define("PRISMIC_WEBHOOK_SECRET", "z43WHM9w7wRaV3LwaPDxKhF0Djb0llvI");

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
 * Path Settings
 */
define("ENABLE_CACHE", false);
define("FILE_CACHE", __DIR__ . "/build/cache/");

/*
 * Protocols
 */
$protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off" || $_SERVER["SERVER_PORT"] == 443) ? "https://" : "http://";
define("PROTOCOL", $protocol);
define("HOST", $_SERVER["HTTP_HOST"]);
define("URI", $_SERVER["REQUEST_URI"]);

/*
 * Site Salt
 *  - Generate a 32-bit string for this
 *	- go here: https://randomkeygen.com/
 *  - scroll down to "CodeIgniter Encryption Keys", select one
 */
define("SALT", "u4WKCFRmqwR0MmviOs0VslA2K9R2k3nk");

/*
 * Shopify
 */
// define("SHOPIFY_DOMAIN", "nobody-studios-sandbox.myshopify.com");
// define("SHOPIFY_API_KEY", "c75dd9cbd9dfb45c8a79b07655bcf176");
// define("SHOPIFY_PASSWORD", "8ee916c7c0e8f37fbbbb42581f091f2b");
// define("SHOPIFY_ACCESS_TOKEN", "3e88c09cbbc6a0ccbb05e15661bbce99");
// define("SHOPIFY_WEBHOOK_SECRET", "8b630619a7507f825c6115ba5750680527b961c9f961392ad6190ddef4cdeb3e");
