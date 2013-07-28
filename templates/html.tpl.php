<!DOCTYPE html>

<!--[if IE 7]>    <html class="lt-ie9 lt-ie8 no-js" <?php print $html_attributes; ?>> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9 ie8 no-js" <?php print $html_attributes; ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php print $html_attributes; ?>> <!--<![endif]-->

  <head>
    <?php print $head; ?>
    <title><?php print $head_title; ?></title>
    <!-- http://t.co/dKP3o1e -->
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php print $styles; ?>
    <?php print $scripts; ?>
  </head>
  <body class="<?php print $classes; ?>" <?php print $attributes; ?>>
    <?php print $page_top; ?>
    <?php print $page; ?>
    <?php print $page_bottom; ?>
  </body>
</html>