<?php

/**
 * Override or insert variables into the html templates.
 */

function wcmc_base_preprocess_html(&$variables, $hook) {
  // Add paths
  $variables['base_path'] = base_path();
  $variables['path_to_theme'] = drupal_get_path('theme', 'wcmc');

  drupal_add_js(drupal_get_path('theme', 'wcmc_base') . '/js/script-ck.js', array('scope' => 'footer'));

  // Typekit
  drupal_add_js('//use.typekit.net/icu8dxt.js', 'external');
  drupal_add_js('try{Typekit.load();}catch(e){}', 'inline', 'page_bottom');
}

/**
 * Implements hook_process_html().
 */

function wcmc_base_process_html(&$variables) {
  // Attributes for html and body elements.
  $variables['html_attributes_array'] = array(
    'lang' => $variables['language']->language,
    'dir' => $variables['language']->dir,
  );

  $variables['body_attributes_array'] = array();

  // Flatten them out.
  $variables['html_attributes'] = drupal_attributes($variables['html_attributes_array']);
  $variables['body_attributes'] = drupal_attributes($variables['body_attributes_array']);

}

/**
 * Implement hook_html_head_alter().
 */

function wcmc_base_html_head_alter(&$head) {
  // Simplify the meta tag for character encoding.
  if (isset($head['system_meta_content_type']['#attributes']['content'])) {
    $head['system_meta_content_type']['#attributes'] = array('charset' => str_replace('text/html; charset=', '', $head['system_meta_content_type']['#attributes']['content']));
  }
}

/**
  * Implements hook_process_html_tag
  * - From http://sonspring.com/journal/html5-in-drupal-7#_pruning
  */
function wcmc_base_process_html_tag(&$variables) {
    //Since we're HTML5...remove needless XHTML
    $tags = &$variables['element'];

    // Remove type="..." and CDATA prefix/suffix.
    unset($tags['#attributes']['type'], $tags['#value_prefix'], $tags['#value_suffix']);

    // Remove media="all" but leave others unaffected.
    if (isset($tags['#attributes']['media']) && $tags['#attributes']['media'] === 'all') {
      unset($tags['#attributes']['media']);
    }
}

/**
 * Override or insert variables into the page template.
 */

function wcmc_base_preprocess_page(&$variables, $hook) {

}

/**
 * Change default separator in the breadcrumb
 */

function wcmc_base_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';
    $output .= '<div class="breadcrumb">' . implode(' / ', $breadcrumb) . '</div>';
    return $output;
  }
}

/**
 * Include override functions
 */

$path_wcmc = drupal_get_path('theme', 'wcmc_base');
include_once './' . $path_wcmc . '/functions/menu.php';
include_once './' . $path_wcmc . '/functions/form.php';

