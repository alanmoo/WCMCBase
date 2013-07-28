<?php

/**
 * Add depth classes and custom markup to all list items in the Main Menu
 */

function wcmc_base_menu_link__menu_block__main_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  // Add a button class to the hrefs in our quirky level two menu, only on level one pages
  if ($element['#original_link']['depth'] == 2 && $element['#bid']['delta'] == 'second_level_nav') {
    $element['#localized_options']['attributes']['class'][] = 'wcmc-button';
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  // Clean up default classes
  $remove = array('leaf','collapsed','expanded','expandable', 'has-children');
  $element['#attributes']['class'] = array_diff($element['#attributes']['class'] , $remove);

  // Add a class to note depth
  $element['#attributes']['class'][] = 'level-' . $element['#original_link']['depth'];

  // Add spans before and after the link just for level one items.
  if ($element['#original_link']['depth'] == 1 && $element['#bid']['delta'] != 'primary_nav' && $element['#bid']['delta'] != 'footer_nav') {
    return '<li' . drupal_attributes($element['#attributes']) . '> ' . $output . '<span class="expand-menu">+</span>' . $sub_menu . "</li>\n";
  } else {
    return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
  }
}

/**
 * Add data attribute for Primary Navigation item count
 */

function wcmc_base_menu_tree__menu_block__primary_nav($variables) {
  //Count number of menu items
  $num_top_level_items = count(menu_tree_page_data('main-menu'));
  return '<ul class="menu" data-li-count="' . $num_top_level_items .'">' . $variables['tree'] . '</ul>';
}

/**
 * Add stretch element to 3rd Level Active Nav
 */

function wcmc_base_menu_tree__menu_block__active_third_level_nav($variables) {
  return '<ul class="menu">' . $variables['tree'] . '<li class="stretchy"></li></ul>';
}

/**
 * Add Selection element to Mobile Sub Nav
 */

function wcmc_base_menu_tree__menu_block__mobile_sub_nav($variables) {
  return '<ul class="menu"><li>Select a subpage</li>' . $variables['tree'] . '</ul>';
}

/**
 * Add stretch element to footer nav
 */

function wcmc_base_menu_tree__menu_block__footer_nav($variables) {
  return '<ul class="menu">' . $variables['tree'] . '<li class="stretchy"></li></ul>';
}