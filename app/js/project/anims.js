import { TweenMax, TimelineMax, Sine, Power0 } from 'gsap';
import { normalizeRange, globalObject } from '../_functions';
import { SplitText } from '../thirdparty/SplitText';

export const wheelSkewText = () => {
  const target = document.querySelector('.project-wrapper');
  const cornerTexts = document.querySelectorAll('.corner-text');
  const screenGroupStarts = document.querySelectorAll('.project-images');
  const screenGroupStops = document.querySelectorAll('.project-images .stop');

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
