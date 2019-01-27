import Highway from '@dogstudio/highway';
import { TweenLite, Sine } from 'gsap';
import { globalObject } from '../_functions';
import { prepScrollPrompt } from '../global/anims';

// Fade
class Fade extends Highway.Transition {
  in({ from, to, trigger, done }) {
    from.remove();
    window.scrollTo(0, 0);
    prepScrollPrompt(to.dataset.routerView);
    const projectFadeEls = document.querySelectorAll('.vert-left .meta, .scroll-prompt, .socials, .email-triggers .email');
    TweenLite.set('.global-mask', { pointerEvents: 'none', autoAlpha: 0, onComplete: () => { done(); } });
    TweenLite.to(projectFadeEls, 0.5, { opacity: 1, ease: Sine.easeInOut, force3D: true });
  }

  out({ from, trigger, done }) {
    const projectsBackdrop = document.querySelector('.switch-overlay');
    const projectsContainer = document.querySelector('.projects-wrapper');
    const projectsOpen = document.querySelector('.projects-wrapper.open');
    
    TweenLite.fromTo('.global-mask', 0.4, { autoAlpha: 0 }, { ease: Sine.easeInOut, force3D: true, pointerEvents: 'all', autoAlpha: 1,
      onComplete: () => {
        if (projectsOpen) {
          TweenLite.set([projectsContainer, projectsBackdrop], { opacity: 0 });
          TweenLite.to('.scroll-prompt', 0.8, { opacity: 1, ease: Sine.easeInOut, force3D: true });
          globalObject.openCloseMenu.progress(0).reverse();
          globalObject.openCloseCount++;
        }
        done();
      } });
  }
}

export default Fade;
