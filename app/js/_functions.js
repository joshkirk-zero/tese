import { TweenMax } from 'gsap';


/**

 Return viewport width or height
 -------------------------------

 -

 -------------------------------------------------- * */
export function getViewport() {
  let el = window;
  let a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    el = document.documentElement || document.body;
  }
  return { width: el[`${a}Width`], height: el[`${a}Height`] };
}


/**

 Global Object
 -------------

 Stores several variables across a users
 web session, and can be updated on the fly
 to always provide current values when called.

 -------------------------------------------------- * */
export const globalObject = {
  ww: getViewport().width, // window width
  wh: getViewport().height, // window height
  menuModels: [],
  modelsLoaded: false,
  header: '',
  readyToSwitch: false,
  comingFromFooter: false,
  openCloseMenu: '',
  isMobile: (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)

};

/**

 Fix mobile chrome resize issue
 ------------------------------

 - This is a headache, because chrome resizes
 the window when you scroll down, causing anything
 set with VH to get messed up.

 -------------------------------------------------- * */
export const chromeViewportUnits = () => {
  const setTheseEls = document.querySelectorAll('.chrome-vh');
  for (let i = 0; i < setTheseEls.length; i++) {
    TweenMax.set(setTheseEls[i], { height: '' });
    TweenMax.set(setTheseEls[i], { delay: 0.05, height: globalObject.wh });
  }
};


/**

 Mousewheel normalizer
 ------------------------------

 - This is a headache, because chrome resizes
 the window when you scroll down, causing anything
 set with VH to get messed up.

 -------------------------------------------------- * */
export const getWheelDir = (target) => {
  const mouseWheelHandler = (e) => {
    // cross-browser wheel delta
    const wheelEvent = window.event || e; // old IE support
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -wheelEvent.detail)));
    return false;
  };

  target.addEventListener('mousewheel', mouseWheelHandler, false);
  target.addEventListener('DOMMouseScroll', mouseWheelHandler, false);
};

export const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

/**

 Mousewheel normalizer
 ------------------------------

 - This is a headache, because chrome resizes
 the window when you scroll down, causing anything
 set with VH to get messed up.

 -------------------------------------------------- * */
// export const normalizeWheelSpeed = (target) => {
//   const PAGE_HEIGHT = globalObject.wh;
//
//   let isFirefox = false;
//   if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
//     isFirefox = true;
//   }
//   let prevsX = 0;
//   let prevsY = 0;
//   let prevpX = 0;
//   let prevpY = 0;
//   const normalizeWheel = (event) => {
//     let sX = 0;
//     let sY = 0;
//     let pX = 0;
//     let pY = 0;
//
//     // Legacy
//     if ('detail' in event) { sY = event.detail; }
//     if ('wheelDelta' in event) { sY = -event.wheelDelta; }
//     if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY; }
//     if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX; }
//
//     if ('deltaY' in event) { pY = event.deltaY; }
//     if ('deltaX' in event) { pX = event.deltaX; }
//
//     if ((pX || pY) && event.deltaMode) {
//       if (event.deltaMode === 1) {
//         pX *= LINE_HEIGHT;
//         pY *= LINE_HEIGHT;
//       } else {
//         pX *= PAGE_HEIGHT;
//         pY *= PAGE_HEIGHT;
//       }
//     }
//
//     // Fall-back if spin cannot be determined
//     if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
//     if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }
//
//     // lerp(, this.vars.current, this.vars.ease);
//     console.log(sY);
//
//     return {
//       spinX: sX,
//       spinY: sY,
//       pixelX: pX,
//       pixelY: pY
//     };
//   };
//
//   /**
//    * The best combination if you prefer spinX + spinY normalization.  It favors
//    * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
//    * 'wheel' event, making spin speed determination impossible.
//    */
//   if (isFirefox) {
//     document.getElementById('container').addEventListener('DOMMouseScroll', normalizeWheel, false);
//   } else {
//     document.getElementById('container').addEventListener('wheel', normalizeWheel, false);
//   }
// };


/**

 Normalize Range
 ---------------

 - Normalization gives us a value within a
 range relative to another value in a different range

 - For example on mousemove over the mega nav items,
 we take the mouse percentage through the word as
 a 0.00 - 1.00 value, then normalize that relative
 to the min and max we want our 3d models to rotate.

 - https://www.youtube.com/watch?v=hJqRcExiBk0

 -------------------------------------------------- * */
export const normalizeRange = (value, originalMin, originalMax, newMin, newMax) => {
  const originalRange = originalMax - originalMin;
  const newRange = newMax - newMin;
  return (((value - originalMin) * newRange) / originalRange) + newMin;
};


/**

 Match height
 ------------

 - Loop over els, updating max with the tallest

 - Set all el heights to match the tallest

 -------------------------------------------------- * */
export const matchHeights = (els) => {
  let max = 0;

  for (let i = 0; i < els.length; i++) {
    if (els[i].offsetHeight > max) {
      max = els[i].offsetHeight;
    }
  }

  for (let i = 0; i < els.length; i++) {
    if (els[i].offsetHeight < max) {
      TweenMax.set(els[i], { height: `${max}px` });
    }
  }
};


/**

 Add multiple listeners
 ----------------------

 -

 -------------------------------------------------- * */
export const addMultipleListeners = (el, s, fn) => {
  const evts = s.split(' ');
  for (let i = 0, iLen = evts.length; i < iLen; i++) {
    el.addEventListener(evts[i], fn, false);
  }
};
export const removeMultipleListeners = (el, s, fn) => {
  const evts = s.split(' ');
  for (let i = 0, iLen = evts.length; i < iLen; i++) {
    el.removeEventListener(evts[i], fn, false);
  }
};


/**

 scrollTo helper
 ---------------

 - Global polyfill for this instantiated in firstLoad()

 -------------------------------------------------- * */
export const scrollTo = (yPos) => {
  window.scroll({ top: yPos, left: 0, behavior: 'smooth' });
};
