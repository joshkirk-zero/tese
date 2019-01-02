<?php
use Prismic\Dom\RichText;

$document = $WPGLOBAL['document'];
?>
<!DOCTYPE html>
<html>
<head>
    <?php include __DIR__ . '/../includes/head.php'; ?>
</head>

<body>
<div id="container">
  <div class="global-els">
      <?php include __DIR__ . '/../includes/global-els.php'; ?>
  </div>
  <div data-router-wrapper>
    <div data-router-view="project" class="facebook-careers" data-smooth>
      <div class="project-wrapper">
        <section class="project-hero container" data-smooth-section>
          <div class="title-meta">
            <span class="idx">01</span>
              <?php include __DIR__ . '/../includes/svgs/title-facebook.php'; ?>
            <div class="meta">
              <span class="big-pipe"></span>
              <div>Project Type<span class="pipe">|</span><span><?= RichText::asText($document->data->project_type) ?></span></div>
              <div>Company<span class="pipe">|</span><span><?= RichText::asText($document->data->company) ?></span></div>
              <div>Year<span class="pipe">|</span><span><?= RichText::asText($document->data->year) ?></span></div>
              <div><a href="https://<?= RichText::asText($document->data->project_url) ?>" target="_blank"><?= RichText::asText($document->data->project_url) ?></a></div>
            </div>
          </div>
          <div class="measure-el"><span></span></div>
        </section>
        <section class="project-body" data-smooth-section>
          <div class="intro container scroll-enter" data-offset=".5" data-mobile-offset="1" data-entrance="project-intro">
            <div>
              <span class="eyebrow">About</span>
              <p><?= RichText::asText($document->data->project_summary) ?></p>
            </div>
          </div>
          <div class="screen-group">
            <div class="image-scroll">
              <img src="../images/projects/fb/work-fbc-1.jpg">
            </div>
            <div class="image-scroll">
              <img src="../images/projects/fb/work-fbc-2.jpg">
            </div>
            <div class="image-scroll">
              <img src="../images/projects/fb/work-fbc-6.jpg">
            </div>
          </div>

        </section>
        <section class="project-footer container scroll-enter" data-offset=".4" data-mobile-offset="1" data-entrance="project-footer" data-smooth-section>
          <a href="/microsoft-teams" class="large-svg-title" data-transition="nextProject">
            <span class="eyebrow">Next Project</span>
            <span class="idx">02</span>
              <?php include __DIR__ . '/../includes/svgs/title-microsoft.php'; ?>
          </a>
        </section>
      </div>
    </div>
  </div>
</div>

<script src="js/main-min.js"></script>

</body>
</html>
