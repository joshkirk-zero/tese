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
      <?php include __DIR__ . '/../includes/global-els.php';?>
  </div>
  <div data-router-wrapper>
    <div data-router-view="home">
      <div class="container home">
        <div class="profile-wrapper">
          <?php include __DIR__ . '/../includes/svgs/you-can.php';?>
          <div class="profile">
            <h3 class="welcome">Welcome</h3>
            <p class="bio"><?= RichText::asText($document->data->bio) ?></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="../js/main-min.js"></script>
</body>

</html>
