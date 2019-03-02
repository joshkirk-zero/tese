<?php
/**
 * Shopify init
 */
global $shopify;

$shopify = new stdClass();

/**
 * Make sure cache folders exists
 *  - Make sure at least cache folder is www-data user/group
 */
if(!file_exists(FILE_CACHE . "customers/")){
	mkdir(FILE_CACHE . "customers/", 775);
	chmod(FILE_CACHE . "customers/", 0775);
}

if(!file_exists(FILE_CACHE . "shopify/")){
	mkdir(FILE_CACHE . "shopify/", 775);
	chmod(FILE_CACHE . "shopify/", 0775);
}

/**
 * Logout
 */
if(isset($_GET["logout"]) && $_GET["logout"] == true){
	
	if(isset($_COOKIE["cat"])){
		// Kill Cached Customer
		if(file_exists(FILE_CACHE . "customers/" . md5($_COOKIE["cat"] . SALT))){
			// Delete file
			unlink(FILE_CACHE . "customers/" . md5($_COOKIE["cat"] . SALT));
		}
		// Kill cookie
		unset($_COOKIE["cat"]);
    	setcookie("cat", null, time() - 3600, "/");
	}
}

/**
 * Get / Store product information
 */
if(file_exists(FILE_CACHE . "shopify/products/")){
	$shopify->products = getAllData(FILE_CACHE . "shopify/products/");
}

/**
 * Get / Store collection information
 */
if(file_exists(FILE_CACHE . "shopify/collections/")){
	$shopify->collections = getAllData(FILE_CACHE . "shopify/collections/");
}

/**
 * Get customer information
 *  - Check cookies for customerAccessToken
 *  - If token exists grab customer information
 *  - otherwise customer will need to log in again
 */
$shopify->customerToken = getCustomerAccessToken($shopify);
$shopify->customer = getCustomer($shopify, FILE_CACHE . "customers/", $shopify->customerToken);

/*===============*
echo "<pre>";
print_r($shopify);
echo "</pre><br>";
/*===============*/

/**
 * Get Customer
 */
function getCustomerAccessToken($shopify){

	$accessToken = null;

	// Check for customerAccessToken Cookie
	if(isset($_COOKIE["cat"]) && $_COOKIE["cat"] !== ""){
		$accessToken = $_COOKIE["cat"];
	} else {
		if(isset($_POST["type"]) && $_POST["type"] == "login"){

			date_default_timezone_set("UTC");

			$customer = $_POST["customer"];

			$email = json_encode($customer["email"]);
			$password = json_encode($customer["password"]);

			$query = "mutation{ customerAccessTokenCreate(input: { email: $email, password: $password }){ customerAccessToken{ accessToken expiresAt } customerUserErrors{ field message } } }";

			$accessToken = shopifyRequest($query);

			if(!empty($accessToken->data->customerAccessTokenCreate->customerUserErrors)){
				$shopify->customerError = $accessToken->data->customerAccessTokenCreate->customerUserErrors[0]->message;
				$accessToken = null;
			} else {
				$accessToken = $accessToken->data->customerAccessTokenCreate->customerAccessToken->accessToken;

				// Shopify sets tokens for 42 days, we're going to set them for 30 days.
				setcookie("cat", $accessToken, time() + (86400 * 30), "/");
			}

		} elseif(isset($_POST["type"]) && isset($_POST["token"]) && $_POST["type"] == "activate"){

			date_default_timezone_set("UTC");

			$customer = $_POST["customer"];

			$id = base64_encode("gid://shopify/Customer/" . $_POST["id"]);
			$token = $_POST["token"];
			$password = json_encode($customer["password"]);

			$query = "mutation{ customerActivate(id: \"$id\", input: { activationToken: \"$token\", password: $password }){ customerAccessToken{ accessToken expiresAt } customerUserErrors{ field message } } }";

			$accessToken = shopifyRequest($query);

			if(!empty($accessToken->data->customerActivate->customerUserErrors)){
				$shopify->customerError = $accessToken->data->customerActivate->customerUserErrors[0]->message;
				$accessToken = null;
			} else {
				$accessToken = $accessToken->data->customerActivate->customerAccessToken->accessToken;

				// Shopify sets tokens for 42 days, we're going to set them for 30 days.
				setcookie("cat", $accessToken, time() + (86400 * 30), "/");
			}
		}
	}

	return $accessToken;
}

function getCustomer($shopify, $cache, $token, $flush = false){

	// Mask the Token a little bit
	$filename = md5($token . SALT);

	// Check for Cached file
	if(file_exists($cache . $filename) && $flush === false){
		// Return raw customer data, decrypted
		return json_decode(decryptHash(file_get_contents($cache . $filename), SALT));
	}

	// Refresh Customer if Flush is set
	if($token && $token != null){
		$query = "{ customer(customerAccessToken: \"$token\"){ acceptsMarketing createdAt updatedAt displayName email firstName id lastIncompleteCheckout{ id } lastName phone addresses(first: 250){ edges{ cursor node{ address1 address2 city company country countryCodeV2 firstName lastName formatted formattedArea id latitude longitude name phone province provinceCode zip } } } defaultAddress{ address1 address2 city company country countryCodeV2 firstName lastName formatted formattedArea id latitude longitude name phone province provinceCode zip } orders(first: 250){ edges{ cursor node{ currencyCode customerLocale customerUrl email id name orderNumber phone processedAt statusUrl subtotalPrice totalPrice totalRefunded totalShippingPrice totalTax shippingAddress{ address1 address2 city company country countryCodeV2 firstName lastName formatted formattedArea id latitude longitude name phone province provinceCode zip } shippingDiscountAllocations{ allocatedAmount{ amount currencyCode } discountApplication{ allocationMethod targetSelection targetType value } } lineItems(first: 250){ edges{ cursor node{ quantity title variant{ availableForSale compareAtPrice image{ altText src } price id sku title selectedOptions{ name value } } customAttributes{ key value } discountAllocations{ allocatedAmount{ amount currencyCode } discountApplication{ allocationMethod targetSelection targetType value } } } } } discountApplications(first: 250){ edges{ cursor node{ allocationMethod targetSelection targetType value } } } } } } } }";

		$customer = shopifyRequest($query);

		// Store encrypted Customer data
		file_put_contents($cache . $filename, encryptHash(json_encode($customer->data->customer), SALT));
		chmod($cache . $filename, 0664);

		return $customer->data->customer;
	} else {

		return false;
	}
}

function getAllData($cache){

	$arr = array();
	$dir = new FilesystemIterator($cache);

	foreach($dir as $fileinfo){
		$contents = json_decode(file_get_contents($fileinfo->getPath() . "/" . $fileinfo->getFilename()));
		array_push($arr, $contents);
	}

	return $arr;
}

function returnOrderObject($orders, $orderId){

	/*===============*
	echo "<pre>";
	print_r($orders);
	echo "</pre><br>";
	/*===============*/

	$object = null;

	foreach($orders as $key => $obj){
		if(strpos($obj->node->customerUrl, $orderId) !== false){
			$object = $obj->node;
		}
	}

	return $object;
}


?>