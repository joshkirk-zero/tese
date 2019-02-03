import * as Anim from './anims';
import quicklink from 'quicklink/dist/quicklink.mjs';
import { globalObject } from '../_functions';
import { TweenLite } from 'gsap/TweenLite';

export const onEnter = (to, location) => {
  
};

export const onEnterCompleted = (from, to, location) => {
  console.log(to.view.dataset.routerView);
  Anim.pageEntrance(to.view.dataset.routerView);
};

export const firstLoad = () => {
  const namespace = document.querySelector('[data-router-view]').dataset.routerView;
  globalObject.namespace = namespace;
  Anim.prepScrollPrompt(namespace);
  quicklink({ el: document.querySelector('.projects-wrapper') });
  TweenLite.delayedCall(0.2, () => {
    Anim.pageEntrance(namespace, true);
    Anim.openCloseProjectsMenu();
  });
  Anim.prepProfileDrawer();
};
