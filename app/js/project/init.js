import * as Anim from './anims';
import Highway from '@dogstudio/highway';
import imagesLoaded from 'imagesloaded';
import ProjectSmooth from './smoothscroll_project';

// Renderer
let thisSmooth;
class ProjectRenderer extends Highway.Renderer {
  onEnter() {
    
  }

  onEnterCompleted() {
    imagesLoaded('[data-router-view]:last-child', { background: true }, () => {
      thisSmooth = new ProjectSmooth({});
    });
  }

  onLeave() {
    
  }

  onLeaveCompleted() {
    thisSmooth.destroy();
  }
}

export default ProjectRenderer;
