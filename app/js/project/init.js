import * as Anim from './anims';
import Highway from '@dogstudio/highway';

// Renderer
class ProjectRenderer extends Highway.Renderer {
  onEnter() {

  }

  onEnterCompleted() {
    Anim.wheelSkewText();
    Anim.scrollAwayFromHero();
    Anim.overflowImages();
  }

  onLeave() {

  }

  onLeaveCompleted() {

  }
}

export default ProjectRenderer;
