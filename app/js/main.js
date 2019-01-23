import Highway from '@dogstudio/highway';
import { globalObject, getViewport } from './_functions';
import { TweenMax } from 'gsap';
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

// Highway
export const Core = new Highway.Core({
  renderers: {
    home: HomeRenderer,
    project: ProjectRenderer
  },
  transitions: {
    default: Fade,
    contextual: {
      nextProject: NextProject
    }
  }
});

Core.on('NAVIGATE_IN', (to, location) => { // to, location
  Global.onEnter(to, location);
  globalObject.namespace = to.view.dataset.routerView;
});

Core.on('NAVIGATE_END', (from, to, location) => { // to, from, location
  Global.onEnterCompleted(from, to, location);
  globalObject.comingFromFooter = false;
  // Page View, fire GA here

});

Core.on('NAVIGATE_OUT', () => { // from, location
  
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
