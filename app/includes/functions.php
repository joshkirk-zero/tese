<?php
require_once dirname(dirname(__DIR__)) . "/vendor/autoload.php";

use Prismic\Api;
use Prismic\Predicates;

/**
 * Make sure Prismic cache exists
 */
if(!file_exists(FILE_CACHE . "prismic/")){
	mkdir(FILE_CACHE . "prismic/", 775);
	chmod(FILE_CACHE . "prismic/", 0775);
}

/**
 * Scan for Preview Cookie
 */
function getPreviewRef(){

    $cookieNames = [
        str_replace(['.',' '], '_', Api::PREVIEW_COOKIE),
        Api::PREVIEW_COOKIE,
    ];

    foreach($cookieNames as $cookieName){

        if(isset($_COOKIE[$cookieName])){
            return $_COOKIE[$cookieName];
        }
    }

    return null;
}

/**
 * Load Prismic Content By UID
 */
function getByUID($uid, $type = null){

	global $prismic;

	/* --- Get Preview Cookie --- */
	$previewRef = getPreviewRef();

	/* --- Make Sure Cache Exists --- */
	$cache = FILE_CACHE . "prismic/";

	if(!file_exists($cache)){
		mkdir($cache, 775);
		chmod($cache, 0775);
	}

	$filename = base64_encode($uid);

	/* --- Load through Preview --- */
	if($previewRef){

		$api = $prismic->get_api();
		$ref = $previewRef ? $previewRef : $api->master()->getRef();
		$options = array(
			"ref" => $ref
		);

		if($type){
			$document = $api->getByUID($type, $uid, $options);
		} else {

			if($uid !== "site_settings" && $uid !== "home"){
				$uid = "single_" . str_replace("-", "_", $uid);
			}

			$document = $api->getSingle($uid);
		}

		return $document;
	}

	/* --- Check for cached file --- */
	if(!file_exists($cache . $filename)){

		$api = $prismic->get_api();

		if($type){
			$document = $api->getByUID($type, $uid);
		} else {

			if($uid !== "site_settings" && $uid !== "home"){
				$uid = "single_" . str_replace("-", "_", $uid);
			}
			
			// food -- site.com/food/foot-post/
			// single_food  --  site.com/food/

			$document = $api->getSingle($uid);
		}

		if(ENABLE_CACHE === true && isset($document->uid)){
			/* --- Write cache file --- */
			file_put_contents($cache . $filename, json_encode($document));
			chmod($cache . $filename, 0664);
		}

	} else {
		$document = json_decode(file_get_contents($cache . $filename));
	}

	return $document;
}

/**
 * Load Prismic Content By Type
 */
function getByType($type, $sort = null){

	global $prismic;

	if(file_exists(FILE_CACHE . "documents.json")){
		$reference = json_decode(file_get_contents(FILE_CACHE . "documents.json"));
	}

	$document = array();

	if($sort === null){
		$sort = "date desc";
	}

	/* --- Loop through content --- */
	if(!isset($reference) || !isset($reference->{$type}) || count($reference->{$type}) <= 0){

		$api = $prismic->get_api();
		$response = $api->query(Predicates::at("document.type", $type), array("orderings" => "[my." . $type . "." . $sort . "]"));

		/* --- No Reference? No Problem --- */
		if(!isset($reference)){
			$prismicReference = new stdClass();
		} else {
			$prismicReference = $reference;
		}

		foreach($response->results as $content){

			$uid = $content->uid;
			$info = getByUID($uid, $type);

			if(!isset($prismicReference->{$content->type}) || !is_array($prismicReference->{$content->type})){
				$prismicReference->{$content->type} = array();
			}

			array_push($prismicReference->{$content->type}, base64_encode($content->uid));
			array_push($document, $info);
		}

		/* --- Check through pagination --- */
		$page = (int)$response->page;
		$total = (int)$response->total_pages;

		while($page < $total){

			++$page;

			$response = $api->query(Predicates::at("document.type", $type), array("page" => $page, "orderings" => "[my." . $type . "." . $sort . "]"));

			foreach($response->results as $content){

				$uid = $content->uid;
				$info = getByUID($uid, $type);

				array_push($prismicReference->{$content->type}, base64_encode($content->uid));
				array_push($document, $info);
			}
		}

		/* --- Write Reference --- */
		file_put_contents(FILE_CACHE . "documents.json", json_encode($prismicReference));
		chmod(FILE_CACHE . "documents.json", 0664);

	} else {

		foreach($reference->{$type} as $content){

			$uid = base64_decode($content);
			$info = getByUID($uid, $type);

			array_push($document, $info);
		}

		if($sort !== null){
			$sortArray = explode(" ", $sort);
			$sortKey = $sortArray[0];

			if(isset($sortArray[1])){
				$sortDir = strtolower($sortArray[1]);
			} else {
				$sortDir = "desc";
			}

			$sort = new sortPrismicObject($sortKey, $sortDir);
			$document = $sort->sort($document);
		}
	}

	return $document;
}

/**
 * Load Shopify Product By UID
 *	- Note: For some reason the fallback caching solution will
 *	  pull in an additional field; "admin_graphql_api_id".
 *	  This is minor and isn't used anywhere as we have the 
 *	  product ID's already stored and can build that url.
 */
function getProduct($uid){

	global $prismic;

	/* --- Make Sure Shopify Cache Exists --- */
	$shop = FILE_CACHE . "shopify/";

	if(!file_exists($shop)){
		mkdir($shop, 775);
		chmod($shop, 0775);
	}

	/* --- Make Sure Products Cache Exists --- */
	$cache = FILE_CACHE . "shopify/products/";

	if(!file_exists($cache)){
		mkdir($cache, 775);
		chmod($cache, 0775);
	}

	$filename = base64_encode($uid);

	/* --- Check for cached file --- */
	if(!file_exists($cache . $filename)){

		$data = null;
		$products = null;

		if(file_exists(FILE_CACHE . "shopify/products.json")){
			$products = json_decode(file_get_contents(FILE_CACHE . "shopify/products.json"));
		}

		$pid = null;

		/* --- Look up product ID num --- */
		if($products){
			foreach($products as $key => $product){

				if($product == $uid){
					$pid = (int)$key;
				}
			}
		}

		$shopify = ShopifyClient::NewClient();

		/* --- Get product data --- */
		if($pid){
			$data = arrayToObject($shopify->Product($pid)->get());
		} else {
			$params = array(
				"handle" => $uid,
				"limit" => 250,
				"published_status" => "published"
			);
			$data = $shopify->Product->get($params);

			// MIGHT NEED TO CONVERT TO LOOP FOR EXACT MATCH
			if($data && isset($data[0])){
				$data = arrayToObject($data[0]);
				$pid = $data->id;
			}
		}

		/* --- Make sure data was returned --- */
		if($data){
			$metafields = $shopify->Product($pid)->Metafield()->get();
			$data->metafields = $metafields;

			/* --- Get Variant Metafields & add to JSON --- */
			foreach($data->variants as $key => $variant){

				$vid = $variant->id;
				$metafields = $shopify->Product($pid)->Variant($vid)->Metafield()->get();
				$data->variants[$key]->metafields = $metafields;
			}
		}

		$document = $data;

		if(ENABLE_CACHE === true && $document && isset($document->id)){
			/* --- Write cache file --- */
			file_put_contents($cache . $filename, json_encode($document));
			chmod($cache . $filename, 0664);
		}

	} else {
		$document = json_decode(file_get_contents($cache . $filename));
	}

	return $document;
}

/**
 * Load Shopify Collection By UID
 *	- Note: For some reason the fallback caching solution will
 *	  pull in an additional field; "admin_graphql_api_id".
 *	  This is minor and isn't used anywhere as we have the 
 *	  collection ID's already stored and can build that url.
 */
function getCollection($uid){

	global $prismic;

	/* --- Make Sure Shopify Cache Exists --- */
	$shop = FILE_CACHE . "shopify/";

	if(!file_exists($shop)){
		mkdir($shop, 775);
		chmod($shop, 0775);
	}

	/* --- Make Sure collections Cache Exists --- */
	$cache = FILE_CACHE . "shopify/collections/";

	if(!file_exists($cache)){
		mkdir($cache, 775);
		chmod($cache, 0775);
	}

	$filename = base64_encode($uid);

	/* --- Check for cached file --- */
	if(!file_exists($cache . $filename)){

		$data = null;
		$collections = null;

		if(file_exists(FILE_CACHE . "shopify/collections.json")){
			$collections = json_decode(file_get_contents(FILE_CACHE . "shopify/collections.json"));
		}

		$pid = null;

		/* --- Look up collection ID num --- */
		if($collections){
			foreach($collections as $key => $collection){

				if($collection == $uid){
					$pid = (int)$key;
				}
			}
		}

		$shopify = ShopifyClient::NewClient();

		/* --- Get collection data --- */
		if($pid){
			$data = arrayToObject($shopify->Collection($pid)->get());
		} else {
			$params = array(
				"handle" => $uid,
				"limit" => 250,
				"published_status" => "published"
			);
			$data = $shopify->Collection->get($params);

			// MIGHT NEED TO CONVERT TO LOOP FOR EXACT MATCH
			if($data && isset($data[0])){
				$data = arrayToObject($data[0]);
				$pid = $data->id;
			}
		}

		/* --- Make sure data was returned --- */
		if($data){
			$metafields = $shopify->Collection($pid)->Metafield()->get();
			$data->metafields = $metafields;
		}

		$document = $data;

		if(ENABLE_CACHE === true && $document && isset($document->id)){
			/* --- Write cache file --- */
			file_put_contents($cache . $filename, json_encode($document));
			chmod($cache . $filename, 0664);
		}

	} else {
		$document = json_decode(file_get_contents($cache . $filename));
	}

	return $document;
}

/**
 * Shopify Connection
 */
class ShopifyClient{

	static private $config = array(
		"ShopUrl" => SHOPIFY_DOMAIN,
	    "Password" => SHOPIFY_PASSWORD,
	    "ApiKey" => SHOPIFY_API_KEY
	);

	static public function NewClient(){
		PHPShopify\ShopifySDK::config(self::$config);
		return new PHPShopify\ShopifySDK;
	}
}

/**
 * Shopify Request Function
 */
function shopifyRequest($query){

	$site = "https://" . SHOPIFY_DOMAIN . "/api/graphql";
	$headers = array(
		"Accept: application/json",
		"Content-type: application/graphql",
		"X-Shopify-Storefront-Access-Token: " . SHOPIFY_ACCESS_TOKEN
	);

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $site);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	$result = curl_exec($ch);
	$info = curl_getinfo($ch);
	$data = json_decode($result);

	curl_close($ch);

	/*===============*
	echo "<pre>";
	print_r($data);
	echo "</pre><br>";
	/*===============*/

	return $data;
}

/**
 * Shopify Admin Request Function
 */
function shopifyAdminRequest($query){

	$site = "https://" . SHOPIFY_DOMAIN . "/admin/api/graphql";
	$headers = array(
		"Accept: application/json",
		"Content-type: application/graphql",
		"X-Shopify-Access-Token: " . SHOPIFY_PASSWORD
	);

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $site);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	$result = curl_exec($ch);
	$info = curl_getinfo($ch);
	$data = json_decode($result);

	curl_close($ch);

	/*===============*
	echo "<pre>";
	print_r($data);
	echo "</pre><br>";
	/*===============*/

	return $data;
}

/**
 * Shopify GraphQL string fix
 *  - Append and Prepend your object key with $char
 *	  so that we can strip the double quotes around
 *	  the key. Default replace is _ (underscore)
 */
function shopifyQueryFix($string, $char = "_"){

	$string = str_replace("\"$char", "", $string);
	$string = str_replace("$char\"", "", $string);

	return $string;
}

/**
 * Shopify Return Image Size
 */
function shopifyReturnImage($url, $size = "1000x"){

	$ext = parse_url($url);
	$array = explode(".", $ext["path"]);

	$url = $ext["scheme"] . "://" . $ext["host"] . $array[0] . "_" . $size . "." . $array[1];

	return $url;
}

/**
 * Fix arrays
 *  - Very important as the request doesn't seem to match the storage object
 */
function arrayToObject($array){

	$keep = false;

    if(!is_array($array)){
        return $array;
    }

    if(isset($array[0])){
    	$keep = true;
    }

    if(is_array($array) && count($array) > 0 && $keep === false){

    	$object = new stdClass();

        foreach($array as $name => $value){
            $object->$name = arrayToObject($value);
        }

        return $object;

    } else {

    	$object = array();

    	foreach($array as $name => $value){
            $object[$name] = arrayToObject($value);
        }

       	return $object;
    }
}

/**
 * String Encription
 */
function encryptHash(string $string, string $key): string{

	if(mb_strlen($key, "8bit") !== SODIUM_CRYPTO_SECRETBOX_KEYBYTES){
		throw new RangeException("Key is not the correct size (must be 32-bit string)");
	}

	$nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
	$cipher = base64_encode($nonce . sodium_crypto_secretbox($string, $nonce, $key));

	sodium_memzero($string);
	sodium_memzero($key);

	return $cipher;
}

function decryptHash(string $encrypted, string $key): string{

	$decoded = base64_decode($encrypted);
	$nonce = mb_substr($decoded, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, "8bit");
	$ciphertext = mb_substr($decoded, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, null, "8bit");

	$plain = sodium_crypto_secretbox_open($ciphertext, $nonce, $key);

	if(!is_string($plain)){
		throw new Exception("Invalid MAC");
	}

	sodium_memzero($ciphertext);
	sodium_memzero($key);

	return $plain;
}


function truncateString($string, $length = 300){

	$string = htmlentities($string, null, "utf-8");
	$string = preg_replace("/\s+|&nbsp;/", " ", $string);
	$string = preg_replace("/\s+?(\S+)?$/", "", substr($string, 0, $length));
	$string = html_entity_decode($string);

	return $string;
}

/**
 * Return select option countries
 *	- Remove countries that are outside Shipping zone
 *	- Prioritize the country list: Default US
 */
function returnCountryOptions(string $selected = null): string{
	$countries = array(
		"US" => "United States",
		"AF" => "Afghanistan",
		"AX" => "Åland Islands",
		"AL" => "Albania",
		"DZ" => "Algeria",
		"AS" => "American Samoa",
		"AD" => "Andorra",
		"AO" => "Angola",
		"AI" => "Anguilla",
		"AQ" => "Antarctica",
		"AG" => "Antigua and Barbuda",
		"AR" => "Argentina",
		"AM" => "Armenia",
		"AW" => "Aruba",
		"AU" => "Australia",
		"AT" => "Austria",
		"AZ" => "Azerbaijan",
		"BS" => "Bahamas",
		"BH" => "Bahrain",
		"BD" => "Bangladesh",
		"BB" => "Barbados",
		"BY" => "Belarus",
		"BE" => "Belgium",
		"BZ" => "Belize",
		"BJ" => "Benin",
		"BM" => "Bermuda",
		"BT" => "Bhutan",
		"BO" => "Bolivia",
		"BA" => "Bosnia and Herzegovina",
		"BW" => "Botswana",
		"BV" => "Bouvet Island",
		"BR" => "Brazil",
		"IO" => "British Indian Ocean Territory",
		"BN" => "Brunei Darussalam",
		"BG" => "Bulgaria",
		"BF" => "Burkina Faso",
		"BI" => "Burundi",
		"KH" => "Cambodia",
		"CM" => "Cameroon",
		"CA" => "Canada",
		"CV" => "Cape Verde",
		"KY" => "Cayman Islands",
		"CF" => "Central African Republic",
		"TD" => "Chad",
		"CL" => "Chile",
		"CN" => "China",
		"CX" => "Christmas Island",
		"CC" => "Cocos (Keeling) Islands",
		"CO" => "Colombia",
		"KM" => "Comoros",
		"CG" => "Congo",
		"CD" => "Congo, The Democratic Republic of The",
		"CK" => "Cook Islands",
		"CR" => "Costa Rica",
		"CI" => "Cote D'ivoire",
		"HR" => "Croatia",
		"CU" => "Cuba",
		"CY" => "Cyprus",
		"CZ" => "Czech Republic",
		"DK" => "Denmark",
		"DJ" => "Djibouti",
		"DM" => "Dominica",
		"DO" => "Dominican Republic",
		"EC" => "Ecuador",
		"EG" => "Egypt",
		"SV" => "El Salvador",
		"GQ" => "Equatorial Guinea",
		"ER" => "Eritrea",
		"EE" => "Estonia",
		"ET" => "Ethiopia",
		"FK" => "Falkland Islands (Malvinas)",
		"FO" => "Faroe Islands",
		"FJ" => "Fiji",
		"FI" => "Finland",
		"FR" => "France",
		"GF" => "French Guiana",
		"PF" => "French Polynesia",
		"TF" => "French Southern Territories",
		"GA" => "Gabon",
		"GM" => "Gambia",
		"GE" => "Georgia",
		"DE" => "Germany",
		"GH" => "Ghana",
		"GI" => "Gibraltar",
		"GR" => "Greece",
		"GL" => "Greenland",
		"GD" => "Grenada",
		"GP" => "Guadeloupe",
		"GU" => "Guam",
		"GT" => "Guatemala",
		"GG" => "Guernsey",
		"GN" => "Guinea",
		"GW" => "Guinea-bissau",
		"GY" => "Guyana",
		"HT" => "Haiti",
		"HM" => "Heard Island and Mcdonald Islands",
		"VA" => "Holy See (Vatican City State)",
		"HN" => "Honduras",
		"HK" => "Hong Kong",
		"HU" => "Hungary",
		"IS" => "Iceland",
		"IN" => "India",
		"ID" => "Indonesia",
		"IR" => "Iran, Islamic Republic of",
		"IQ" => "Iraq",
		"IE" => "Ireland",
		"IM" => "Isle of Man",
		"IL" => "Israel",
		"IT" => "Italy",
		"JM" => "Jamaica",
		"JP" => "Japan",
		"JE" => "Jersey",
		"JO" => "Jordan",
		"KZ" => "Kazakhstan",
		"KE" => "Kenya",
		"KI" => "Kiribati",
		"KP" => "Korea, Democratic People's Republic of",
		"KR" => "Korea, Republic of",
		"KW" => "Kuwait",
		"KG" => "Kyrgyzstan",
		"LA" => "Lao People's Democratic Republic",
		"LV" => "Latvia",
		"LB" => "Lebanon",
		"LS" => "Lesotho",
		"LR" => "Liberia",
		"LY" => "Libyan Arab Jamahiriya",
		"LI" => "Liechtenstein",
		"LT" => "Lithuania",
		"LU" => "Luxembourg",
		"MO" => "Macao",
		"MK" => "Macedonia, The Former Yugoslav Republic of",
		"MG" => "Madagascar",
		"MW" => "Malawi",
		"MY" => "Malaysia",
		"MV" => "Maldives",
		"ML" => "Mali",
		"MT" => "Malta",
		"MH" => "Marshall Islands",
		"MQ" => "Martinique",
		"MR" => "Mauritania",
		"MU" => "Mauritius",
		"YT" => "Mayotte",
		"MX" => "Mexico",
		"FM" => "Micronesia, Federated States of",
		"MD" => "Moldova, Republic of",
		"MC" => "Monaco",
		"MN" => "Mongolia",
		"ME" => "Montenegro",
		"MS" => "Montserrat",
		"MA" => "Morocco",
		"MZ" => "Mozambique",
		"MM" => "Myanmar",
		"NA" => "Namibia",
		"NR" => "Nauru",
		"NP" => "Nepal",
		"NL" => "Netherlands",
		"AN" => "Netherlands Antilles",
		"NC" => "New Caledonia",
		"NZ" => "New Zealand",
		"NI" => "Nicaragua",
		"NE" => "Niger",
		"NG" => "Nigeria",
		"NU" => "Niue",
		"NF" => "Norfolk Island",
		"MP" => "Northern Mariana Islands",
		"NO" => "Norway",
		"OM" => "Oman",
		"PK" => "Pakistan",
		"PW" => "Palau",
		"PS" => "Palestinian Territory, Occupied",
		"PA" => "Panama",
		"PG" => "Papua New Guinea",
		"PY" => "Paraguay",
		"PE" => "Peru",
		"PH" => "Philippines",
		"PN" => "Pitcairn",
		"PL" => "Poland",
		"PT" => "Portugal",
		"PR" => "Puerto Rico",
		"QA" => "Qatar",
		"RE" => "Reunion",
		"RO" => "Romania",
		"RU" => "Russian Federation",
		"RW" => "Rwanda",
		"SH" => "Saint Helena",
		"KN" => "Saint Kitts and Nevis",
		"LC" => "Saint Lucia",
		"PM" => "Saint Pierre and Miquelon",
		"VC" => "Saint Vincent and The Grenadines",
		"WS" => "Samoa",
		"SM" => "San Marino",
		"ST" => "Sao Tome and Principe",
		"SA" => "Saudi Arabia",
		"SN" => "Senegal",
		"RS" => "Serbia",
		"SC" => "Seychelles",
		"SL" => "Sierra Leone",
		"SG" => "Singapore",
		"SK" => "Slovakia",
		"SI" => "Slovenia",
		"SB" => "Solomon Islands",
		"SO" => "Somalia",
		"ZA" => "South Africa",
		"GS" => "South Georgia and The South Sandwich Islands",
		"ES" => "Spain",
		"LK" => "Sri Lanka",
		"SD" => "Sudan",
		"SR" => "Suriname",
		"SJ" => "Svalbard and Jan Mayen",
		"SZ" => "Swaziland",
		"SE" => "Sweden",
		"CH" => "Switzerland",
		"SY" => "Syrian Arab Republic",
		"TW" => "Taiwan, Province of China",
		"TJ" => "Tajikistan",
		"TZ" => "Tanzania, United Republic of",
		"TH" => "Thailand",
		"TL" => "Timor-leste",
		"TG" => "Togo",
		"TK" => "Tokelau",
		"TO" => "Tonga",
		"TT" => "Trinidad and Tobago",
		"TN" => "Tunisia",
		"TR" => "Turkey",
		"TM" => "Turkmenistan",
		"TC" => "Turks and Caicos Islands",
		"TV" => "Tuvalu",
		"UG" => "Uganda",
		"UA" => "Ukraine",
		"AE" => "United Arab Emirates",
		"GB" => "United Kingdom",
		"UM" => "United States Minor Outlying Islands",
		"UY" => "Uruguay",
		"UZ" => "Uzbekistan",
		"VU" => "Vanuatu",
		"VE" => "Venezuela",
		"VN" => "Viet Nam",
		"VG" => "Virgin Islands, British",
		"VI" => "Virgin Islands, U.S.",
		"WF" => "Wallis and Futuna",
		"EH" => "Western Sahara",
		"YE" => "Yemen",
		"ZM" => "Zambia",
		"ZW" => "Zimbabwe"
	);

	$html = "";

	foreach($countries as $key => $value){
		if($selected && $selected == $key || $selected && $selected == $value){
			$html .= "<option value=\"$key\" title=\"" . htmlspecialchars($value) . "\" selected=\"selected\">" . htmlspecialchars($value) . "</option>";
		} else {
			$html .= "<option value=\"$key\" title=\"" . htmlspecialchars($value) . "\">" . htmlspecialchars($value) . "</option>";	
		}
	}

	return $html;
}


?>