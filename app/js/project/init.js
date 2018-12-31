import * as Anim from './anims';
import Highway from '@dogstudio/highway';
import imagesLoaded from 'imagesloaded';
// import Smooth from './../global/smoothscroll.js';

// Renderer
class ProjectRenderer extends Highway.Renderer {
  onEnter() {

  }

  onEnterCompleted() {
    // Anim.wheelSkewText();
    imagesLoaded('[data-router-view]:last-child', { background: true }, () => {
      Anim.scrollAwayFromHero();
      Anim.overflowImages();
      // thisSmooth = new Smooth({});
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
