import Highway from '@dogstudio/highway';
import { globalObject } from '../_functions';

// Renderer
let homeSmooth;
class HomeRenderer extends Highway.Renderer {
  onEnter() {
    
  }

  onEnterCompleted() {

  }

  onLeave() {

  }

  onLeaveCompleted() {
    if (!globalObject.isMobile) {
      homeSmooth.destroy();
    }
  }
}

export default HomeRenderer;
