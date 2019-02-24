import Highway from '@dogstudio/highway';
import HomeSmooth from './smoothscroll_home';
import { globalObject } from '../_functions';

// Renderer
let homeSmooth;
class HomeRenderer extends Highway.Renderer {
  onEnter() {
    
  }

  onEnterCompleted() {
    if (!globalObject.isMobile) {
      homeSmooth = new HomeSmooth({});
    }
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
