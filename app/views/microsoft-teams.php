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
  <div class="global-els">
      <?php include __DIR__ . '/../includes/global-els.php'; ?>
  </div>
  <div data-router-wrapper>
    <div data-router-view="project" class="microsoft-teams" data-smooth>
        <section class="project-hero container" data-smooth-section>
          <div class="title-meta">
            <span class="idx">02</span>
            <?php include __DIR__ . '/../includes/svgs/title-microsoft.php'; ?>
            <div class="meta">
              <span class="big-pipe"></span>
              <div>Project Type<span class="pipe">|</span><span><?= RichText::asText($document->data->project_type) ?></span></div>
              <div>Company<span class="pipe">|</span><span><?= RichText::asText($document->data->company) ?></span></div>
              <div>Year<span class="pipe">|</span><span><?= RichText::asText($document->data->year) ?></span></div>
              <?php if ($document->data->project_url): ?><div><a href="https://<?= RichText::asText($document->data->project_url) ?>" target="_blank"><?= RichText::asText($document->data->project_url) ?></a></div><?php endif; ?>
            </div>
          </div>
          <div class="measure-el"><span></span></div>
        </section>
        <section class="project-body" data-smooth-section>
          <div class="intro container scroll-enter" data-offset=".75" data-mobile-offset="1" data-entrance="project-intro">
            <div>
              <span class="eyebrow">About</span>
              <p><?= RichText::asText($document->data->project_summary) ?></p>
            </div>
          </div>
          <div class="project-images">
            <div class="image-scroll desktop-left">
              <img src="../images/projects/ms/work-ms-1.jpg">
            </div>
            <div class="image-scroll desktop-right" style="margin-top: 21vw">
              <img src="../images/projects/ms/work-ms-2.jpg">
            </div>
            <div class="image-wrap desktop-left" style="margin-top: -3vw; padding-left: 7vw">
              <img src="../images/projects/ms/work-ms-3.jpg">
            </div>
            <div class="image-scroll desktop-right" style="margin-top: 14vw;">
              <img src="../images/projects/ms/work-ms-4.jpg">
            </div>
            <div class="image-wrap desktop-left" style="margin-top: 7vw; padding-left: 9vw;">
              <img src="../images/projects/ms/work-ms-5.jpg">
            </div>
            <div class="image-scroll desktop-right" style="margin-top: 35vw;">
              <img src="../images/projects/ms/work-ms-6.jpg">
            </div>
            <div class="image-wrap desktop-left" style="margin-top: -19vw;">
              <img src="../images/projects/ms/work-ms-7.jpg">
            </div>
            <div class="image-wrap desktop-right" style="margin-top: 17vw;">
              <img src="../images/projects/ms/work-ms-8.jpg">
            </div>
            <div class="image-wrap desktop-left" style="margin-top: -14vw; padding-left: 5vw;">
              <img src="../images/projects/ms/work-ms-9.jpg">
            </div>
            <div class="image-scroll desktop-right" style="margin-top: 23vw;">
              <img src="../images/projects/ms/work-ms-10.jpg">
            </div>
            <div class="image-scroll desktop-left" style="margin-top: -25vw;">
              <img src="../images/projects/ms/work-ms-11.jpg">
            </div>
          </div>
        </section>
        <section class="project-footer container scroll-enter" data-offset=".4" data-mobile-offset="1" data-entrance="project-footer" data-smooth-section>
          <a href="/sunday-funday" class="large-svg-title" data-transition="nextProject">
            <span class="eyebrow">Next Project</span>
            <span class="idx">03</span>
              <?php include __DIR__ . '/../includes/svgs/title-sunday.php'; ?>
          </a>
        </section>
    </div>
  </div>

<script src="js/main-min.js"></script>

</body>
</html>
