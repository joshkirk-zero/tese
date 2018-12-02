import Highway from '../thirdparty/highway.min';
import { TweenMax, Sine, TimelineMax } from 'gsap';
import { SplitText } from '../thirdparty/SplitText';


class NextProject extends Highway.Transition {
  in(view, done) {
    window.scrollTo(0, 0);
    done();
    const fadeEls = document.querySelector('.vert-left .meta, .socials, .cta-trigger .cta');
    const nextProjectHeroTL = new TimelineMax();
    const bigPipe = document.querySelector('.big-pipe');
    const splitEntranceEls = document.querySelectorAll('.meta > div');
    const entranceLines = new SplitText(splitEntranceEls, { type: 'lines' }).lines;
    const innerEntranceLines = new SplitText(entranceLines, { type: 'lines' }).lines;
    nextProjectHeroTL
      .staggerFromTo(innerEntranceLines, 0.79, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05)
      .fromTo(bigPipe, 0.6, { transformOrigin: '50% 0', scaleY: 0 }, { scaleY: 1, ease: Sine.easeInOut }, 0);

    TweenMax.to(fadeEls, 0.8, { autoAlpha: 1, ease: Sine.easeInOut });
  }

  out(view, done) {
    const eyebrow = document.querySelector('.next-footer .eyebrow');
    // Animation
    TweenMax.to(eyebrow, 0.35, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true,
      onComplete: () => {
        done();
      } });
  }
}

export default NextProject;
