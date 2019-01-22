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
const projectsContainer = document.querySelector('.projects-wrapper');
const trigger = document.querySelector('.projects-trigger');

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
  if (projectsContainer.classList.contains('open')) {
    trigger.click();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const projectLinks = projectsContainer.querySelectorAll('a:not(.coming-soon)');
  const projectsBackdrop = document.querySelector('.switch-overlay');
  
  for (let i = 0; i < projectLinks.length; i++) {
    projectLinks[i].addEventListener('click', () => {
      TweenMax.delayedCall(0.4, () => {
        TweenMax.set([projectsContainer, projectsBackdrop], { opacity: 0 });
        globalObject.openCloseMenu.progress(0);
      });
    });
  }

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
