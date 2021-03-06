<?php
use Prismic\Dom\RichText;

$document = $WPGLOBAL['document'];
// print_r(json_encode($document, JSON_PRETTY_PRINT));

?>
<div data-router-view="project" class="<?php echo $document->uid; ?>" data-smooth>
    <section class="project-hero container" data-smooth-section>
        <div class="shift">
            <div class="title-meta">
                <span class="idx">0<?php echo $document->data->project_index; ?></span>
                <?php include __DIR__ . '/../includes/svgs/title-'.$document->uid.'.php'; ?>
                <div class="meta">
                    <span class="big-pipe"></span>
                    <div>Project Type<span class="pipe">|</span><span><?= RichText::asText($document->data->project_type) ?></span></div>
                    <div>Company<span class="pipe">|</span><span><?= RichText::asText($document->data->company) ?></span></div>
                    <div>Year<span class="pipe">|</span><span><?= RichText::asText($document->data->year) ?></span></div>
                    <?php if ($document->data->project_url):?><div><a href="https://<?= RichText::asText($document->data->project_url) ?>" target="_blank"><?= RichText::asText($document->data->project_url) ?></a></div><?php endif; ?>
                </div>
            </div>
        </div>
        <div class="measure-el"><span></span></div>
    </section>

    <section class="project-body" data-smooth-section>
        <div class="intro shift container scroll-enter" data-offset=".88" data-mobile-offset="1.3" data-entrance="project-intro">
            <div>
                <span class="eyebrow">About</span>
                <p><?= RichText::asText($document->data->project_summary) ?></p>
            </div>
        </div>
        <div class="project-images shift">
            <?php 
            $projectImages = $document->data->image_chooser;
            for ($i = 0; $i < count($projectImages); ++$i) { 
                if ($projectImages[$i]->slice_type === "overflow_image") { ?>
                    <div class="image-scroll <?php echo $projectImages[$i]->primary->positioning; ?>">
                        <img src="<?php echo $projectImages[$i]->primary->image->url; ?>">
                    </div>
                <?php } else { ?>
                    <div class="image-wrap <?php echo $projectImages[$i]->primary->positioning; ?>">
                        <img src="<?php echo $projectImages[$i]->primary->image->url; ?>">
                    </div>
                <?php }
            }
            ?>
            
        </div>

    </section>
    <?php 
        global $prismic;
        $nextProject = $prismic->get_api()->getByID($document->data->next_project->id);
    ?>
    <section class="project-footer container scroll-enter" data-offset=".4" data-mobile-offset=".4" data-entrance="project-footer" data-smooth-section>
        <span class="shift">
            <a href="/<?php echo $nextProject->uid; ?>/" data-transition="nextProject">

                <span class="eyebrow">Next Project</span>
                
                <span class="idx">0<?php echo $nextProject->data->project_index; ?></span>
                <?php include __DIR__ . '/../includes/svgs/title-'.$nextProject->uid.'.php'; ?>
            </a>
        </span>
    </section>
    <style>     
        <?php 
        for ($i = 0; $i < count($projectImages); ++$i) {
            if ($projectImages[$i]->primary->positioning === "desktop_left" || $projectImages[$i]->primary->positioning === "medium_left" || $projectImages[$i]->primary->positioning === "mobile_left") { ?>
                .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                    margin-top: <?php echo $projectImages[$i]->primary->top_push_pull_desktop; ?>vw;
                    padding-left: <?php echo $projectImages[$i]->primary->side_push_pull_desktop; ?>vw;
                }
            <?php } elseif ($projectImages[$i]->primary->positioning === "desktop_right" || $projectImages[$i]->primary->positioning === "medium_right" || $projectImages[$i]->primary->positioning === "mobile_right") { ?>
                .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                    margin-top: <?php echo $projectImages[$i]->primary->top_push_pull_desktop; ?>vw;
                    padding-right: <?php echo $projectImages[$i]->primary->side_push_pull_desktop; ?>vw;
                }
            <?php }
        }
        ?>
                    
        @media (max-width: 1024px) {
            <?php 
            for ($i = 0; $i < count($projectImages); ++$i) {
                if ($projectImages[$i]->primary->positioning === "desktop_left" || $projectImages[$i]->primary->positioning === "medium_left" || $projectImages[$i]->primary->positioning === "mobile_left") { ?>
                    .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                        margin-top: <?php echo $projectImages[$i]->primary->top_push_pull_medium; ?>vw;
                        padding-left: <?php echo $projectImages[$i]->primary->side_push_pull_medium; ?>vw;
                    }
                <?php } elseif ($projectImages[$i]->primary->positioning === "desktop_right" || $projectImages[$i]->primary->positioning === "medium_right" || $projectImages[$i]->primary->positioning === "mobile_right") { ?>
                    .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                        margin-top: <?php echo $projectImages[$i]->primary->top_push_pull_medium; ?>vw;
                        padding-right: <?php echo $projectImages[$i]->primary->side_push_pull_medium; ?>vw;
                    }
                <?php }
            }
            ?>
        }
        @media (max-width: 959px) {
            <?php 
            for ($i = 0; $i < count($projectImages); ++$i) {
                if ($projectImages[$i]->primary->positioning === "desktop_left" || $projectImages[$i]->primary->positioning === "medium_left" || $projectImages[$i]->primary->positioning === "mobile_left") { ?>
                    .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                        margin-top: <?php echo $projectImages[$i]->primary->top_push_pull_mobile; ?>vw;
                        padding-left: <?php echo $projectImages[$i]->primary->side_push_pull_mobile; ?>vw;
                    }
                <?php } elseif ($projectImages[$i]->primary->positioning === "desktop_right" || $projectImages[$i]->primary->positioning === "medium_right" || $projectImages[$i]->primary->positioning === "mobile_right") { ?>
                    .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                        margin-top: <?php echo $projectImages[$i]->primary->top_push_pull_mobile; ?>vw;
                        padding-right: <?php echo $projectImages[$i]->primary->side_push_pull_mobile; ?>vw;
                    }
                <?php }
            }
            ?>
        }
        @media (max-width: 767px) {
            <?php 
            for ($i = 0; $i < count($projectImages); ++$i) { ?>
                .project-images > div:nth-child(<?php echo $i + 1; ?>) { 
                    margin-top: 0vw;
                    padding-left: 0vw;
                    margin-top: 0vw;
                    padding-right: 0vw;
                }
            <?php } ?>
        }
    </style>
</div>
