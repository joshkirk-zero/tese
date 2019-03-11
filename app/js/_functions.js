/*eslint-disable */
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
 let mobileCheck = false;
 let mobileSafariCheck = false;
 let firefoxCheck = false;
 const ua = navigator.userAgent;
 const browser = navigator.userAgent.toLowerCase();
 if (browser.indexOf('firefox') > -1) {
  firefoxCheck = true;
}
if (!(ua.indexOf('CriOS') > -1 || ua.indexOf('Chrome') > -1)) {
  if (ua.indexOf('iPad') > -1 || ua.indexOf('iPhone') > -1) {
    mobileSafariCheck = true;
  }
}
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobileCheck = true;})(navigator.userAgent||navigator.vendor);
export const globalObject = {
  ww: getViewport().width, // window width
  wh: getViewport().height, // window height
  menuModels: [],
  modelsLoaded: false,
  header: '',
  comingFromFooter: false,
  openCloseMenu: '',
  mainEl: document.querySelector('main'),
  namespace: '',
  isMobile: mobileCheck,
  isMobileSafari: mobileSafariCheck,
  openCloseCount: 0
};
if (globalObject.isMobile) {
  document.body.classList.add('touch');
}
if (globalObject.isMobileSafari) {
  document.body.classList.add('mobile-safari');
}
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
