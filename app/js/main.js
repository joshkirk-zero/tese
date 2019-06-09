import Highway from '@dogstudio/highway';
import { globalObject, getViewport } from './_functions';

// Renderers
import HomeRenderer from './home/init';
import ProjectRenderer from './project/init';

// Transitions
import Fade from './transitions/fade';
import NextProject from './transitions/nextProject';

import * as Global from './global/init';
// import {globalObject} from "./_functions";

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
console.log('%c link underline by aristide benoist: https://aristidebenoist.com/', 'font-weight: bold; font-size: 12px; color: #1f271b;');
console.log('%c smooth scroll math and strategy practiced on this site was developed with jesper landberg: http://twotwentytwo.se/', 'font-weight: bold; font-size: 12px; color: #1f271b;');
// Highway
export const Core = new Highway.Core({
  renderers: {
    home: HomeRenderer,
    project: ProjectRenderer
  },
  transitions: {
    default: Fade,
    contextual: {
      nextProject: NextProject,
      homeScrollTo: Fade
    }
  }
});

Core.on('NAVIGATE_IN', ({ to, trigger, location }) => { // to, trigger, location
  Global.onEnter(to, location.href);
  globalObject.namespace = to.view.dataset.routerView;
});

Core.on('NAVIGATE_END', ({ to, from, trigger, location }) => { // to, from, trigger, location
  Global.onEnterCompleted(from, to, location);
  globalObject.comingFromFooter = false;
  document.body.classList.remove('transitioning');

});

Core.on('NAVIGATE_OUT', ({ from, trigger, location }) => { // from, trigger, location
  document.body.classList.add('transitioning');
  globalObject.mainEl.classList.add('locked');
});

document.addEventListener('DOMContentLoaded', () => {
  Global.firstLoad();
});


/**

 Recalc of global values, etc. after a throttled resize

 -------------------------------------------------- * */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    if (globalObject.ww !== getViewport().width) {
      // update the globalobject with current values first
      globalObject.ww = getViewport().width;
    }

    globalObject.wh = getViewport().height;
  }, 100);
});
