import { TweenMax, TimelineMax, Sine, Power0 } from 'gsap';
import { normalizeRange, globalObject } from '../_functions';
import { SplitText } from '../thirdparty/SplitText';

export const wheelSkewText = () => {
  const target = document.querySelector('.project-wrapper');
  const cornerTexts = document.querySelectorAll('.corner-text');
  const screenGroupStarts = document.querySelectorAll('.screen-group');
  const screenGroupStops = document.querySelectorAll('.screen-group .stop');

  let isFirefox = false;
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    document.body.classList.add('firefox');
    isFirefox = true;
  }

  const normalizeWheel = (event) => {
    let sY = 0;

    // Legacy
    if ('detail' in event) { sY = event.detail * 40; }
    if ('wheelDelta' in event) { sY = -event.wheelDelta; }
    if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY; }

    const thisVal = (sY / 1000).toFixed(2);
    const normalizeThis = thisVal > 1 ? 1 : (sY / 1000).toFixed(2);
    const normalizedVal = normalizeRange(normalizeThis, 0, 1, 0, 10).toFixed(2) * 8;
    const dur = normalizedVal > 50 ? 0.3 : 0.2;
    const s = (window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop) - globalObject.wh * 2;
    for (let i = 0; i < cornerTexts.length; i++) {
      const shift = s - (screenGroupStarts[i].offsetTop - 275) + globalObject.wh * 2;
      const lock = screenGroupStops[i].offsetTop;
      if (shift > 0 && shift <= lock) {
        TweenMax.set(cornerTexts[i], { left: 0, y: 275, x: 120, position: 'fixed', force3D: true });
        TweenMax.to(cornerTexts[i], dur, { scaleY: normalizedVal, force3D: true, ease: Sine.easeInOut });
        TweenMax.to(cornerTexts[i], 0.25, { opacity: 0.15, ease: Sine.easeOut });
      } else if (shift > lock) {
        TweenMax.set(cornerTexts[i], { y: lock, x: 0, left: -119, position: 'absolute', force3D: true });
        TweenMax.to(cornerTexts[i], 0.3, { scaleY: 1, force3D: true, ease: Sine.easeOut });
        TweenMax.to(cornerTexts[i], 0.25, { opacity: 1, ease: Sine.easeOut });
      } else {
        TweenMax.set(cornerTexts[i], { y: 0, x: 0, left: -119, position: 'absolute', force3D: true });
        TweenMax.to(cornerTexts[i], 0.65, { scaleY: 1, force3D: true, ease: Sine.easeOut });
        TweenMax.to(cornerTexts[i], 0.25, { opacity: 1, ease: Sine.easeOut });
      }
    }
  };

  /**
   * The best combination if you prefer spinX + spinY normalization.  It favors
   * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
   * 'wheel' event, making spin speed determination impossible.
   */
  if (isFirefox) {
    target.addEventListener('DOMMouseScroll', normalizeWheel, false);
  } else {
    target.addEventListener('wheel', normalizeWheel, false);
  }
};

let checkHeroOffset;
export const scrollAwayFromHero = () => {
  console.log('adding tick');
  const measureEl = document.querySelector('.project-hero .measure-el');
  const measureElHeight = measureEl.offsetHeight;
  const scrollAwayTL = new TimelineMax({ paused: true });

  const fadeEls = document.querySelectorAll('.cta-trigger .cta, .arrow, .title-meta');
  const staggerFadeEls = document.querySelectorAll('.vert-left .meta');
  const staggerFadeScaleEls = document.querySelectorAll('.socials');

  const scrollWords = document.querySelectorAll('.scroll-prompt p span:first-child');
  const scrollWordsWraps = new SplitText(scrollWords, { type: 'words' }).words;
  const scrollWordsChars = new SplitText(scrollWordsWraps, { type: 'chars' }).chars;

  scrollAwayTL
    .add('start')
    .add('charsStart', '+=.1')
    .staggerFromTo(scrollWordsChars, 1, { y: 0 }, { y: -35, ease: Sine.easeInOut, force3D: true }, 0.02)
    // .staggerFromTo(scrollWordsChars, 0.8, { rotationX: 0, skewX: 0, x: 0 }, { rotationX: -60, x: -2, skewX: -7, ease: Sine.easeInOut }, 0.017, 'start')
    .staggerFromTo(scrollWordsChars, 0.9, { opacity: 1 }, { opacity: 0, ease: Sine.easeInOut }, 0.017, 'start')
    .fromTo(scrollWords, 1, { rotationX: 0 }, { rotationX: 85, ease: Sine.easeInOut, force3D: true }, 'charsStart')
    .fromTo(staggerFadeScaleEls, 1.2, { autoAlpha: 1 }, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true }, -0.055, 'start')
    .fromTo(staggerFadeEls, 1.2, { autoAlpha: 1 }, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true }, 'start')
    .fromTo(fadeEls, 1.2, { autoAlpha: 1 }, { autoAlpha: 0, ease: Sine.easeInOut, force3D: true }, 'start');

  checkHeroOffset = () => {
    if (!globalObject.comingFromFooter) {
      let percentageThrough = (window.pageYOffset / measureElHeight).toFixed(3);
      if (percentageThrough <= 0) {
        percentageThrough = 0;
      } else if (percentageThrough >= 1) {
        percentageThrough = 1;
      }
      scrollAwayTL.progress(percentageThrough);
    }
  };
  TweenMax.ticker.addEventListener('tick', checkHeroOffset, false, false, 2);
};
export const removeScrollAwayFromHero = () => {
  console.log('removing tick');
  TweenMax.ticker.removeEventListener('tick', checkHeroOffset);
};
let checkImageOffsets;
export const overflowImages = () => {
  const scrollImageWrappers = document.querySelectorAll('.image-scroll');
  const scrollImages = document.querySelectorAll('.image-scroll img');
  const scrollDists = [];

  for (let i = 0; i < scrollImages.length; i++) {
    const scrollImgDist = scrollImages[i].offsetHeight - scrollImageWrappers[i].offsetHeight;
    scrollDists.push(scrollImgDist);
  }

  checkImageOffsets = () => {
    for (let i = 0; i < scrollImages.length; i++) {
      const thisHeight = scrollImageWrappers[i].offsetHeight - 700;
      const thisTop = scrollImageWrappers[i].getBoundingClientRect().top + 300;
      let percentThrough = ((((thisTop + thisHeight) / (globalObject.wh + thisHeight)) - 1) * -1).toFixed(2);
      if (percentThrough <= 0) {
        percentThrough = 0;
      } else if (percentThrough >= 1) {
        percentThrough = 1;
      }
      const yVal = scrollDists[i] * percentThrough;
      TweenMax.set(scrollImages[i], { y: -yVal, force3D: true });
    }
  };
  TweenMax.ticker.addEventListener('tick', checkImageOffsets, false, false, 3);
};

export const removeOverflowImages = () => {
  TweenMax.ticker.removeEventListener('tick', checkImageOffsets);
};
