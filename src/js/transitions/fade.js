import Highway from '../thirdparty/highway.min';
import { TweenMax, Sine } from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    TweenMax.fromTo('.global-mask', 0.4, { autoAlpha: 1 }, { ease: Sine.easeInOut, force3D: true, pointerEvents: 'none', autoAlpha: 0, onComplete: done });
  }

  out(view, done) {
    TweenMax.fromTo('.global-mask', 0.4, { autoAlpha: 0 }, { ease: Sine.easeInOut, force3D: true, pointerEvents: 'all', autoAlpha: 1,
      onComplete: () => {
        // We reset the scroll position
        window.scrollTo(0, 0);

        // Done
        done();
      } });
  }
}

export default Fade;
