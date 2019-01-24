import * as Anim from './anims';
import Highway from '@dogstudio/highway';

// Renderer
class HomeRenderer extends Highway.Renderer {
  onEnter() {
    
  }

  onEnterCompleted() {
    Anim.scrollIntoProject();
  }

  onLeave() {

  }

  onLeaveCompleted() {

  }
}

export default HomeRenderer;
