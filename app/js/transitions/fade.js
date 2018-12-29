import Highway from '@dogstudio/highway';
import { TweenMax, Sine } from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in(from, to, done) {
    from.remove();
    TweenMax.fromTo('.global-mask', 0.001, { autoAlpha: 1 }, { force3D: true, pointerEvents: 'none', autoAlpha: 0, onComplete: () => { done(); } });
  }

  out(from, done) {
    TweenMax.fromTo('.global-mask', 0.4, { autoAlpha: 0 }, { ease: Sine.easeInOut, force3D: true, pointerEvents: 'all', autoAlpha: 1,
      onComplete: () => {
        TweenMax.delayedCall(0.05, () => {
          // We reset the scroll position
          window.scrollTo(0, 0);

          // Done
          done();
        });
      } });
  }
}

export default Fade;
