<?php
// default image
$fb_img = "/images/facebook-share.png";
$tw_img = "/images/twitter-share.png";
$title = "Matese Fields";
$description = "A mashup of my creative endeavors."
// grab Featured Image from page 
?>
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $description; ?>" />
<!-- Facebook Meta -->
<meta property="og:description" content="<?php echo $description; ?>" /> 
<meta property="og:image" content="<?php echo PROTOCOL . HOST . $fb_img; ?>" />
<meta property="og:site_name" content="" />
<meta property="og:title" content="<?php echo $title; ?>" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo PROTOCOL . HOST . URI; ?>" />
<meta property="fb:app_id" content="" />
<!-- Twitter Meta -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="" />
<meta name="twitter:description" content="<?php echo $description; ?>" />
<meta name="twitter:image" content="<?php echo PROTOCOL . HOST . $tw_img; ?>" />
<meta name="twitter:site" content="<?php echo PROTOCOL . HOST . URI; ?>" />
<meta name="twitter:title" content="<?php echo $title; ?>" />
<!-- Icons -->
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="<?php echo PROTOCOL . HOST; ?>/images/favicons/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="<?php echo PROTOCOL . HOST; ?>/images/favicons/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="<?php echo PROTOCOL . HOST; ?>/images/favicons/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="<?php echo PROTOCOL . HOST; ?>/images/favicons/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="<?php echo PROTOCOL . HOST; ?>/images/favicons/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="<?php echo PROTOCOL . HOST; ?>/images/favicons/mstile-310x310.png" />