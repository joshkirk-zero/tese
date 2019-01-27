import { TweenLite, TimelineMax, Sine } from 'gsap';
import * as Func from '../_functions';


export const scrollIntoProject = () => {
  // const measureEl = document.querySelector('.measure-el');
  // const measureElHeight = measureEl.offsetHeight;
  // const scrollAwayTL = new TimelineMax({ paused: true });
  //
  // const fadeEls = document.querySelectorAll('.email-triggers .email, .arrow, .title-meta');
  // const staggerFadeEls = document.querySelectorAll('.vert-left .meta');
  // const staggerFadeScaleEls = document.querySelectorAll('.socials a');
  //
  // const scrollWords = document.querySelectorAll('.scroll-prompt p span:first-child');
  // const scrollWordsWraps = new SplitText(scrollWords, { type: 'words' }).words;
  // const scrollWordsChars = new SplitText(scrollWordsWraps, { type: 'chars' }).chars;
  //
  // scrollAwayTL
  //   .add('start')
  //   .add('charsStart', '+=.1')
  //   .staggerFromTo(scrollWordsChars, 1, { y: 0 }, { y: -29, ease: Sine.easeInOut, force3D: true }, 0.017)
  //   .staggerFromTo(scrollWordsChars, 0.8, { rotationX: 0, skewX: 0, x: 0 }, { rotationX: -60, x: -2, skewX: -7, ease: Sine.easeInOut, force3D: true }, 0.017, 'start')
  //   .staggerFromTo(scrollWordsChars, 0.9, { opacity: 1 }, { opacity: 0 }, 0.015, 'charsStart')
  //   .staggerFromTo(staggerFadeScaleEls, 1.2, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.98, ease: Sine.easeInOut, force3D: true }, -0.055, 'start')
  //   .fromTo(staggerFadeEls, 1.2, { autoAlpha: 1 }, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true }, 'start')
  //   .fromTo(fadeEls, 1.2, { autoAlpha: 1 }, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true }, 'start');

  // Func.normalizeWheelSpeed();
  // const checkOffset = () => {
  //   window.requestAnimationFrame(() => {
  //     let percentageThrough = (window.pageYOffset / measureElHeight).toFixed(3);
  //     if (percentageThrough <= 0) {
  //       percentageThrough = 0;
  //     } else if (percentageThrough >= 1) {
  //       percentageThrough = 1;
  //     }
  //     scrollAwayTL.progress(percentageThrough);
  //   });
  // };

  // window.addEventListener('scroll', checkOffset);
};
