import * as Anim from './anims';
import 'intersection-observer';
import quicklink from "quicklink/dist/quicklink.mjs";
import { globalObject } from '../_functions';
import { TweenMax } from 'gsap';

export const onEnter = (to, location) => {
  
};

export const onEnterCompleted = (from, to, location) => {
  Anim.pageEntrance(to.view.dataset.routerView);
};

export const firstLoad = () => {
  const namespace = document.querySelector('[data-router-view]').dataset.routerView;
  globalObject.namespace = namespace;
  Anim.prepScrollPrompt(namespace);
  switch (namespace) {
    case 'home':
      quicklink({ el: document.querySelector('.projects-wrapper') });
      break;
    case 'project':
      const viewEl = document.querySelector('[data-router-view]');
      if (viewEl.classList.contains('facebook-careers')) {
        quicklink({urls:['/', '/microsoft-teams/', '/honorable-mentions/']});
      } else if (viewEl.classList.contains('microsoft-teams')) {
        quicklink({urls:['/', '/facebook-careers/', '/honorable-mentions/']});
      } else if (viewEl.classList.contains('honorable-mentions')) {
        quicklink({urls:['/', '/microsoft-teams/', '/facebook-careers/']});
      }
      break;
    default:

      break;
      
  }
  TweenMax.delayedCall(0.2, () => {
    Anim.pageEntrance(namespace, true);
    Anim.openCloseProjectsMenu();
  });
  Anim.prepProfileDrawer();
};
