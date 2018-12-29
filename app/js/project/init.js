import * as Anim from './anims';
import Highway from '@dogstudio/highway';
import imagesLoaded from 'imagesloaded';

// Renderer
class ProjectRenderer extends Highway.Renderer {
  onEnter() {

  }

  onEnterCompleted() {
    // Anim.wheelSkewText();
    imagesLoaded('[data-router-view]:last-child', { background: true }, () => {
      Anim.scrollAwayFromHero();
      Anim.overflowImages();
      console.log('view images loaded');
    });
  }

  onLeave() {

  }

  onLeaveCompleted() {
    Anim.removeOverflowImages();
    Anim.removeScrollAwayFromHero();
  }
}

export default ProjectRenderer;
