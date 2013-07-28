<?php

/**
 * implementation of hook_panels_layouts
 */
// Plugin definition
$plugin = array(
  'title' => t('WCMC Hero Three Column'),
  'category' => t('WCMC'),
  'icon' => 'wcmc_hero_threecol.png',
  'theme' => 'wcmc_hero_threecol',
  'theme arguments' => array('id', 'content'),
  'css' => 'wcmc_hero_threecol.css',
  'regions' => array(
    'hero' => t('Main Image'),
    'main_content' => t('Main Content'),
    'related_content_sidebar' => t('Related Content Sidebar'),
    'information_sidebar' => t('Information Sidebar'),
  ),
);

// Preprocess this layout.
function wcmc_base_preprocess_wcmc_hero_threecol(&$vars) {
  drupal_add_js($vars['layout']['path'] . '/wcmc_hero_threecol.js', 'file');
}

