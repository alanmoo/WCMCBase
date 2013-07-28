<?php
/**
 * @file
 * Template for the 3 column panel layout with hero image.
 *
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['left']: Content in the left column.
 *   - $content['middle']: Content in the middle column.
 *   - $content['right']: Content in the right column.
 */
?>
<div class="panel-hero-3col" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <div class="hero-image">
    <?php print $content['hero']; ?>
  </div>
  <div id="main-content" class="main-content" role="main">
    <div id="related-content-sidebar">
      <?php print $content['related_content_sidebar']; ?>
    </div>
    <?php print $content['main_content']; ?>
    <div id="related-content-inline">
    </div>
  </div>
  <div class="information-column">
    <div id="information-sidebar">
      <?php print $content['information_sidebar']; ?>
    </div>
</div>
</div>
