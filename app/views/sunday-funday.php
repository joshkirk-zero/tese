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
        <div data-router-view="project" class="sunday-funday">
            <div class="project-wrapper">
                <section class="project-hero container">
                    <div class="title-meta">
                        <span class="idx">03</span>
                        <?php include __DIR__ . '/../includes/svgs/title-sunday.php'; ?>
                        <div class="meta">
                            <span class="big-pipe"></span>
                            <div>Project Type<span class="pipe">|</span><span><?= RichText::asText($document->data->project_type) ?></span></div>
                            <div>Company<span class="pipe">|</span><span><?= RichText::asText($document->data->company) ?></span></div>
                            <div>Year<span class="pipe">|</span><span><?= RichText::asText($document->data->year) ?></span></div>
                            <?php if ($document->data->project_url): ?><div><a href="<?= RichText::asText($document->data->project_url) ?>" target="_blank"><?= RichText::asText($document->data->project_url) ?></a></div><?php endif; ?>
                        </div>
                    </div>
                    <div class="measure-el"><span></span></div>
                </section>
                <section class="project-body">
                    <div class="intro container scroll-enter" data-offset=".7" data-mobile-offset="1" data-entrance="project-intro">
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
                <section class="project-footer container scroll-enter" data-offset=".4" data-mobile-offset="1" data-entrance="project-footer">
                    <a href="<?php echo $SITE_URL; ?>/honorable-mentions" class="large-svg-title" data-transition="nextProject">
                        <span class="eyebrow">Next Project</span>
                        <span class="idx">04</span>
                        <?php include __DIR__ . '/../includes/svgs/title-honorable.php'; ?>
                    </a>
                </section>
            </div>
        </div>
    </div>
</div>

<script src="js/main-min.js"></script>

</body>
</html>
