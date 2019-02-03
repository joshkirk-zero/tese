import Highway from '@dogstudio/highway';
import HomeSmooth from './smoothscroll_home';

// Renderer
let homeSmooth;
class HomeRenderer extends Highway.Renderer {
  onEnter() {
    
  }

  onEnterCompleted() {
    homeSmooth = new HomeSmooth({});
  }

  onLeave() {

  }

  onLeaveCompleted() {
    homeSmooth.destroy();
  }
}

export default HomeRenderer;
