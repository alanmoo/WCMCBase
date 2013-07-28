<?php

/*
Makes changes to core form elements
the originals can be found in /includes/form.inc
*/

// Removes the <div> wrapper inside the form and adds a class for the search widget
function wcmc_base_form($variables) {

  $element = $variables['element'];
  if (isset($element['#action'])) {
    $element['#attributes']['action'] = drupal_strip_dangerous_protocols($element['#action']);
  }
  element_set_attributes($element, array('method', 'id'));
  if (empty($element['#attributes']['accept-charset'])) {
    $element['#attributes']['accept-charset'] = "UTF-8";
  }

  // Add a class to form element for the search widget
  if ($element['#attributes']['id'] == "wcmc-search-widget" || $element['#attributes']['id'] == "wcmc-search-widget--2") {
    $element['#attributes']['class'] = array('global-search');
  }

  return '<form' . drupal_attributes($element['#attributes']) . ' role="form">' . $element['#children'] . '</form>';

}

function wcmc_base_form_element($variables) {
  // Check for our flag so these changes only apply to the search widget form elements
  if (empty($variables['element']['#wcmc_search_element'])) {
    return theme_form_element($variables);
  }
  else {
    $element = &$variables['element'];
    // This is also used in the installer, pre-database setup.
    $t = get_t();

    // This function is invoked as theme wrapper, but the rendered form element
    // may not necessarily have been processed by form_builder().
    $element += array(
      '#title_display' => 'before',
    );

    // Add element #id for #type 'item'.
    if (isset($element['#markup']) && !empty($element['#id'])) {
      $attributes['id'] = $element['#id'];
    }
    // Add element's #type and #name as class to aid with JS/CSS selectors.
    $attributes['class'] = array('form-item');
    if (!empty($element['#type'])) {
      $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
    }
    if (!empty($element['#name'])) {
      $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
    }
    // Add a class for disabled elements to facilitate cross-browser styling.
    if (!empty($element['#attributes']['disabled'])) {
      $attributes['class'][] = 'form-disabled';
    }

    // Remove Wrapping DIV
    $output = '';

    // If #title is not set, we don't display any label or required marker.
    if (!isset($element['#title'])) {
      $element['#title_display'] = 'none';
    }
    $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
    $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

    switch ($element['#title_display']) {
      case 'before':
      case 'invisible':
        $output .= ' ' . theme('form_element_label', $variables);
        $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
        break;

      case 'after':
        $output .= ' ' . $prefix . $element['#children'] . $suffix;
        $output .= ' ' . theme('form_element_label', $variables) . "\n";
        break;

      case 'none':
      case 'attribute':
        // Output no label and no required marker, only the children.
        $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
        break;
    }

    if (!empty($element['#description'])) {
      $output .= '<div class="description">' . $element['#description'] . "</div>\n";
    }

    // Remove Wrapping DIV
    //$output .= "</div>\n";

    return $output;
  }
}
