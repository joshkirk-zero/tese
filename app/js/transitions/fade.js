import Highway from '@dogstudio/highway';
import { TweenMax, Sine } from 'gsap';
import { globalObject } from '../_functions';

// Fade
class Fade extends Highway.Transition {
  in(from, to, done) {
    from.remove();
    window.scrollTo(0, 0);
    const projectFadeEls = document.querySelectorAll('.vert-left .meta, .scroll-prompt, .socials, .email-triggers .email');
    TweenMax.set('.global-mask', { pointerEvents: 'none', autoAlpha: 0, onComplete: () => { done(); } });
    TweenMax.to(projectFadeEls, 0.5, { opacity: 1, ease: Sine.easeInOut, force3D: true });
  }

  out(from, done) {
    const projectsBackdrop = document.querySelector('.switch-overlay');
    const projectsContainer = document.querySelector('.projects-wrapper');
    TweenMax.fromTo('.global-mask', 0.4, { autoAlpha: 0 }, { ease: Sine.easeInOut, force3D: true, pointerEvents: 'all', autoAlpha: 1,
      onComplete: () => {
        TweenMax.set([projectsContainer, projectsBackdrop], { opacity: 0 });
        globalObject.openCloseMenu.progress(0).reverse();
        globalObject.openCloseCount++;
        TweenMax.delayedCall(0.05, () => {
          done();
        });
      } });
  }
}

export default Fade;
