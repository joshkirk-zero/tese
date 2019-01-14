import * as Anim from './anims';
import Highway from '@dogstudio/highway';
import { prepScrollPrompt } from '../global/anims';
// Renderer
class HomeRenderer extends Highway.Renderer {
  onEnter() {
    prepScrollPrompt('home');
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
