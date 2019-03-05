import * as Anim from './anims';
import 'intersection-observer';
import quicklink from "quicklink/dist/quicklink.mjs";
import { globalObject } from '../_functions';
import { TweenMax } from 'gsap';

export const onEnter = (to, location) => {
  if (globalObject.isMobileSafari) {
    TweenMax.set('.project-hero, .project-footer', { height: globalObject.wh });
  }
};

export const onEnterCompleted = (from, to, location) => {
  Anim.pageEntrance(to.view.dataset.routerView);
  if (typeof gtag !== 'undefined') {
    // eslint-disable-next-line
    gtag('config', 'UA-98434002-2', {
      page_path: location.pathname,
      page_title: to.page.title,
      page_location: location.href
    });
}
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
      if (globalObject.isMobileSafari) {
        TweenMax.set('.project-hero, .project-footer', { height: globalObject.wh });
      }
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
  TweenMax.delayedCall(0.3, () => {
    Anim.pageEntrance(namespace, true);
    Anim.openCloseProjectsMenu();
    Anim.prepProfileDrawer();
  });
};
