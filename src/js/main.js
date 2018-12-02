import Highway from './thirdparty/highway.min';
import * as Func from './_functions';

// Renderers
import HomeRenderer from './home/init';
import ProjectRenderer from './project/init';

// Transitions
import Fade from './transitions/fade';
import NextProject from './transitions/nextProject';

import * as Global from './global/init';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.querySelector('.projects-wrapper');
  const trigger = document.querySelector('.cta-trigger .trigger');

  // Highway
  const H = new Highway.Core({
    renderers: {
      home: HomeRenderer,
      project: ProjectRenderer
    },
    transitions: {
      default: Fade,
      nextProject: NextProject
    }
  });

  H.on('NAVIGATE_IN', () => { // to, location
    Global.onEnter();
  });

  H.on('NAVIGATE_END', () => { // to, from, location
    Global.onEnterCompleted();

    // Page View, fire GA here
  });

  H.on('NAVIGATE_OUT', () => { // from, location
    if (projectsContainer.classList.contains('open')) {
      trigger.click();
    }
  });

  Global.firstLoad();
});


/**

 Recalc of global values, etc. after a throttled resize

 -------------------------------------------------- * */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    if (Func.globalObject.ww !== Func.getViewport().width) {
      // update the globalobject with current values first
      Func.globalObject.ww = Func.getViewport().width;
    }

    Func.globalObject.wh = Func.getViewport().height;
  }, 100);
});
