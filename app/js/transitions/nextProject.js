import Highway from '@dogstudio/highway';
import { TweenMax, Sine, TimelineMax } from 'gsap';
import { SplitText } from '../thirdparty/SplitText';
import {globalObject} from "../_functions";


class NextProject extends Highway.Transition {
  in(from, to, done) {
    window.scrollTo(0, 0);
    TweenMax.set(to.querySelectorAll('.project-hero .wiper'), { display: 'none' });
    from.remove();
    const nextProjectHeroTL = new TimelineMax();
    const bigPipe = document.querySelector('.big-pipe');
    const splitEntranceEls = document.querySelectorAll('.meta > div');
    const entranceLines = new SplitText(splitEntranceEls, { type: 'lines' }).lines;
    const innerEntranceLines = new SplitText(entranceLines, { type: 'lines' }).lines;
    const projectFadeEls = document.querySelectorAll('.vert-left .meta, .scroll-prompt, .socials, .cta-trigger .cta, .cta-trigger .availability');
    TweenMax.set(projectFadeEls, { clearProps: 'all' });
    nextProjectHeroTL
      .staggerFromTo(innerEntranceLines, 0.79, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'start')
      .fromTo(bigPipe, 0.6, { transformOrigin: '50% 0', scaleY: 0 }, { scaleY: 1, ease: Sine.easeInOut }, 0)
      .fromTo(projectFadeEls, 1, { autoAlpha: 0 }, { autoAlpha: 1, scale: 1, ease: Sine.easeInOut, onComplete: () => { done(); TweenMax.set(projectFadeEls, { clearProps: 'all' }); } }, '-=.45');

    // TweenMax.to(fadeEls, 0.8, { autoAlpha: 1, ease: Sine.easeInOut });
  }

  out(from, done) {
    const eyebrow = document.querySelector('.project-footer .eyebrow');
    // const projectFadeEls = document.querySelectorAll('.vert-left .meta, .socials, .cta-trigger .cta');
    // TweenMax.set(projectFadeEls, { clearProps: 'all' });
    globalObject.comingFromFooter = true;
    // Animation
    TweenMax.to(eyebrow, 0.35, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true,
      onComplete: () => {
        done();
      } });
  }
}

export default NextProject;
