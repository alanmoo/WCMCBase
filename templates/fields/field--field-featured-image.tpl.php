<?php if (!$label_hidden) : ?>
  <h2 class="field-label"<?php print $title_attributes; ?>><?php print $label ?>:&nbsp;</h2>
<?php endif; ?>
<?php foreach ($items as $delta => $item): ?>
  <figure class="hero-image">
    <?php print render($item); ?>
    <?php if ($item['#item']['title']): ?>
      <figcaption><?php print $item['#item']['title']; ?></figcaption>
    <?php endif; ?>
  </figure>

<?php endforeach; ?>