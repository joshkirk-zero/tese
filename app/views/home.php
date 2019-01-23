<?php
use Prismic\Dom\RichText;

$document = $WPGLOBAL['document'];
?>
<div data-router-wrapper>
  <div data-router-view="home">
    <div class="container home">
      <div class="profile-wrapper">
        <?php include __DIR__ . '/../includes/svgs/you-can.php';?>
        <div class="profile">
          <h3 class="welcome">Welcome</h3>
          <p class="bio"><?= RichText::asText($document->data->bio) ?></p>
          <div class="availability"><span class="beacon"></span><p>Available for freelance</p></div>
        </div>
      </div>
    </div>
  </div>
</div>
