<?php
use Prismic\Dom\RichText;

$nav = getByUID("global-content", "global_content");
// print_r($nav);
// print_r(json_encode($document, JSON_PRETTY_PRINT));
?>
<div class="switch-overlay"></div>
<div class="vert-holder">
    <div class="close"><span></span><span></span></div>
    <div class="projects-wrapper container">
        <div class="large-svg-title">
            <?php include __DIR__ . '/../includes/svgs/recent-projects.php'; ?>
        </div>
        <div class="projects">
            <a href="/facebook-careers/" class="project-link">
                <div class="svg-wrapper">
                    <span class="wiper"><span></span></span>
                    <span class="svg-wrapper-inner">
                        <?php include __DIR__ . '/../includes/svgs/01.php'; ?>
                    </span>
                </div>
                <div class="text-wrapper">
                    <h3 class="title">Facebook<br> Careers</h3>
                    <p>2018 | UI Design</p>
                </div>
            </a>
            <a href="/microsoft-teams/" class="project-link">
                <div class="svg-wrapper">
                    <span class="wiper"><span></span></span>
                    <span class="svg-wrapper-inner">
                        <?php include __DIR__ . '/../includes/svgs/02.php'; ?>
                    </span>
                </div>
                <div class="text-wrapper">
                    <h3 class="title">Microsoft<br> Teams</h3>
                    <p>2017 | UI Design</p>
                </div>
            </a>
            <a href="/odyssey-beacon-tour/" class="project-link">
                <div class="svg-wrapper">
                    <span class="wiper"><span></span></span>
                    <span class="svg-wrapper-inner">
                        <?php include __DIR__ . '/../includes/svgs/03.php'; ?>
                    </span>
                </div>
                <div class="text-wrapper">
                    <h3 class="title">Odyssey<br> Beacon Tour</h3>
                    <p>Coming Soon</p>
                </div>
            </a>
            <a href="/honorable-mentions/" class="project-link">
                <div class="svg-wrapper">
                    <span class="wiper"><span></span></span>
                    <span class="svg-wrapper-inner">
                        <?php include __DIR__ . '/../includes/svgs/04.php'; ?>
                    </span>
                </div>
                <div class="text-wrapper">
                    <h3 class="title">Honorable<br> Mentions</h3>
                    <p>Miscellaneous<br> Design</p>
                </div>
            </a>
        </div>
    </div>
</div>
<div class="global-mask"></div>
<div class="vert-left">
    <a href="/" class="logo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 9.3 62.4" style="enable-background:new 0 0 9.3 62.4;" xml:space="preserve">
            <g>
                <path class="pink-fill" d="M9.3,4.5H7v55.7H2.4V4.5H0V0h9.3V4.5z"/>
                <polygon class="pink-fill" points="7,60.1 2.4,60.1 4.6,62.4 	"/>
            </g>
        </svg>
    </a><div class="meta">
        <p><?php echo date("Y"); ?></p> <span class="pipe">|</span>  <p>Digital Designer</p> <span class="pipe">|</span> <p>Chicago, IL</p>
    </div>
    <div class="socials">
        <a href="https://www.instagram.com/tesecreates/" target="_blank">
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="brown-fill" d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zm-502-220q-7 0-76.5-.5t-105.5 0-96.5 3-103 10-71.5 18.5q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103 18.5 71.5q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103-18.5-71.5q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z"/></svg>
        </a>
        <a href="https://dribbble.com/mfields136" target="_blank">
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="brown-fill" d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"/></svg>
        </a>
        <a href="" target="_blank">
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="brown-fill" d="M1152 1500q-42-241-140-498h-2l-2 1q-16 6-43 16.5t-101 49-137 82-131 114.5-103 148l-15-11q184 150 418 150 132 0 256-52zm-185-607q-21-49-53-111-311 93-673 93-1 7-1 21 0 124 44 236.5t124 201.5q50-89 123.5-166.5t142.5-124.5 130.5-81 99.5-48l37-13q4-1 13-3.5t13-4.5zm-107-212q-120-213-244-378-138 65-234 186t-128 272q302 0 606-80zm684 319q-210-60-409-29 87 239 128 469 111-75 185-189.5t96-250.5zm-805-741q-1 0-2 1 1-1 2-1zm590 145q-185-164-433-164-76 0-155 19 131 170 246 382 69-26 130-60.5t96.5-61.5 65.5-57 37.5-40.5zm223 485q-3-232-149-410l-1 1q-9 12-19 24.5t-43.5 44.5-71 60.5-100 65-131.5 64.5q25 53 44 95 2 5 6.5 17t7.5 17q36-5 74.5-7t73.5-2 69 1.5 64 4 56.5 5.5 48 6.5 36.5 6 25 4.5zm112 7q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
        </a>
        <a href="https://open.spotify.com/user/1210143071?si=JeSeAGpQSS2Btq_8TQTBvw" target="_blank">
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="brown-fill" d="M1255 1210q0-32-30-51-193-115-447-115-133 0-287 34-42 9-42 52 0 20 13.5 34.5t35.5 14.5q5 0 37-8 132-27 243-27 226 0 397 103 19 11 33 11 19 0 33-13.5t14-34.5zm96-215q0-40-35-61-237-141-548-141-153 0-303 42-48 13-48 64 0 25 17.5 42.5t42.5 17.5q7 0 37-8 122-33 251-33 279 0 488 124 24 13 38 13 25 0 42.5-17.5t17.5-42.5zm108-248q0-47-40-70-126-73-293-110.5t-343-37.5q-204 0-364 47-23 7-38.5 25.5t-15.5 48.5q0 31 20.5 52t51.5 21q11 0 40-8 133-37 307-37 159 0 309.5 34t253.5 95q21 12 40 12 29 0 50.5-20.5t21.5-51.5zm205 149q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
        </a>
    </div>
</div>

<div class="email-triggers">
    <div class="email">
        <span class="label">Email<span class="pipe">|</span></span><a href="mailto:mf@matesefields.com" class="copy-email">mf@matesefields.com<span class="lines"><span></span><span></span></span></a>
    </div>
    <div class="triggers">
        <span class="label">Links<span class="pipe">|</span></span>
        <p class="projects-trigger">Projects<span class="lines"><span></span><span></span></span></p>
        <p class="profile-trigger">Profile<span class="lines"><span></span><span></span></span></p>
    </div>
</div>
<div class="close-mask"></div>
<div class="los-detalles">
    <p class="close">
        <span class="clip">Close</span>
        <span class="lines">
            <span></span>
            <span></span>
        </span>
    </p>
    <p class="secondary-bio"><?= RichText::asText($nav->data->profile_copy) ?></p>
    <div class="wrapper">
        <div class="credits">
            <div>
                <span class="label">Development</span>
                <a href="https://twitter.com/joshgkirk" target="_blank">
                    <span class="clip">Josh Kirk</span><span class="lines"><span></span><span></span></span>
                </a>
            </div>
            <div>
                <span class="label">Typefaces</span>
                <a href="https://thedesignersfoundry.com/grandmaster" target="_blank"><span class="clip">Grandmaster x Lucas Decroix</span><span class="lines"><span></span><span></span></span></a>
                <a href="https://www.grillitype.com/typeface/gt-america" target="_blank"><span class="clip">GT America x Grilli Type</span><span class="lines"><span></span><span></span></span></a>
            </div>
            <div>
                <span class="label">Currently Listening to</span>
                <p><?= RichText::asText($nav->data->currently_listening_to) ?></p>
            </div>
        </div>
        <div class="experience">
            <div>
                <span class="label">Education</span>
                <p>Capital University, CO 2015<br> B.A in Marketing & Music</p>
            </div>
            <div>
                <span class="label">Experience</span>
                <p>Perficient Digital Labs<br> Freelance (collaborated with Dynamit, ZoCo Design, Franklin County)</p>
            </div>
            <a href="#" target="_blank"><span class="clip">View Resume</span><span class="lines"><span></span><span></span></span></a>
        </div>
    </div>

</div>