<?php
require_once dirname(dirname(__DIR__)) . "/vendor/autoload.php";

use Elasticsearch\ClientBuilder;

/**
 * Shopify Connection
 */
class ElasticsearchClient{

	static private $hosts = array(
		"10.150.0.2:9200",
		"https://10.150.0.2:9200"
	);

	static public function Init(){
		return ClientBuilder::create()->setHosts(self::$hosts)->build();
	}
}

?>