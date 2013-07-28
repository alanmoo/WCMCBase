<div id="page">

  <header role="banner">
    <div class="wrap">
      <div class="wcmc-branding">
        <a class="wcmc-emblem">Weill Cornell Medical College</a>
        <div class="wcmc-etc">
          <nav class="wcmc-links">
            <a href="http://weill.cornell.edu" class="wcmc-primary-nav-item" target="_blank">WCMC Home</a>
            <a href="http://weill.cornell.edu/education"class="wcmc-primary-nav-item" target="_blank">Medical Education</a>
            <div class="float-block">
              <a href="http://weill.cornell.edu/research" class="wcmc-primary-nav-item" target="_blank">Research</a>
              <a href="http://weillcornell.org" class="wcmc-primary-nav-item" target="_blank">Patient Care</a>
            </div>
          </nav>
          <div class="wcmc-links-expander"></div>
          <div class="global-functions-container">
            <?php if ($site_connect == 1) { ?>
            <a class="weill-cornell-connect" href="http://weillcornell.org/connect" target="_blank">Weill Cornell Connect</a>
            <?php } ?>
            <?php print $wcmc_search_widget; ?>
          </div>
        </div>
      </div>
      <div class="site-branding">
        <h1><a class="go-home" href="/"><!--<span class="dept-of">Department of<br></span>--><?php print $site_name; ?></a></h1>
        <div class="menu-button ss-rows"></div>
      </div>
    </div>
  </header>

  <nav id="top-nav" role="navigation">
    <?php print $wcmc_search_mobile_widget; ?>
    <?php if (isset($primary_nav)) { print $primary_nav; } ?>
    <?php if (isset($drawer_nav)) { print $drawer_nav; } ?>
    <?php if (isset($active_second_level_nav)) { print $active_second_level_nav; } ?>
    <?php if (isset($active_third_level_nav)) { print $active_third_level_nav; } ?>
  </nav><!-- /#navigation -->

  <div class="body-wrap">
    <?php print $messages; ?>


    <div id="main">
      <?php print $breadcrumb; ?>
      <h1 class="title"><?php print $title; ?></h1>
      <div id="tabs"><?php print render($tabs); ?></div>
      <?php if (isset($mobile_sub_nav)) { ?>
        <nav id="body-nav" role="navigation">
          <?php print $mobile_sub_nav; ?>
        </nav>
      <?php } ?>
      <?php print render($page['content']); ?>
      <?php if (isset($second_level_nav) && $level == 1) { ?>
        <nav id="second-level-nav" role="navigation">
          <?php print $second_level_nav; ?>
        </nav>
      <?php } ?>
    </div><!--/#main-->
  </div>

  <footer role="contentinfo">
    <div class="footer-site">
      <nav class="footer-primary-nav">
        <?php if (isset($footer_nav)) { print $footer_nav; } ?>
      </nav>
      <div class="department">
        <div class="site-name"><!-- Department of<wbr> --> <?php print $site_name; ?></div>
        <div class="location"><?php print $site_affiliation; ?><br><?php print $site_street_address; ?> New York, NY <?php print $site_zip; ?>
        </div>
      </div>
      <div class="contact">
        <div class="phone">Phone: <?php print $site_phone; ?> | Fax: <?php print $site_fax; ?></div>
        <div class="email">Email: <a href="mailto:<?php print $site_mail; ?>"><?php print $site_mail; ?></a></div>
      </div>

    </div>
    <div class="footer-wcmc">
      <div class="wcmc-logo">Weill Cornell Medical College</div>
      <div class="disclaimer">
       Unless otherwise noted, © Weill Cornell Medical College. <a href="http://weill.cornell.edu/legal/">Legal information</a>
      </div>
      <?php print render($page['footer']); ?>
    </div>
  </footer>
</div>
