import * as Anim from './anims';
import Highway from '@dogstudio/highway';
import imagesLoaded from 'imagesloaded';
import Smooth from '../global/smoothscroll';

// Renderer
let thisSmooth;
class ProjectRenderer extends Highway.Renderer {

  onEnter() {

  }

  onEnterCompleted() {
    // Anim.wheelSkewText();
    imagesLoaded('[data-router-view]:last-child', { background: true }, () => {
      thisSmooth = new Smooth({});
    });
  }

  onLeave() {

  }

  onLeaveCompleted() {
    thisSmooth.destroy();
  }
}

export default ProjectRenderer;
