<?php
use Prismic\Dom\RichText;

$document = $WPGLOBAL['document'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php include __DIR__ . '/../includes/head.php'; ?>
</head>

<body>
  <div class="global-els">
      <?php include __DIR__ . '/../includes/global-els.php';?>
  </div>
  <main class="locked" data-router-wrapper>
    <div data-router-view="404">
      <div class="container not-found">
        <div class="profile-wrapper">
          <?php include __DIR__ . '/../includes/svgs/title-404.php';?>
          <div class="profile">
            <h3 class="welcome"><?= RichText::asText($document->data->intro_line) ?></h3>
            <p class="bio"><?= RichText::asText($document->data->paragraph_text) ?></p>
            <div class="availability"><span class="beacon"></span><p>Available for freelance</p></div>
          </div>
        </div>
      </div>
    </div>
  </main>
<script src="../js/main-min.js"></script>
</body>

</html>
