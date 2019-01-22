import * as Anim from './anims';
import quicklink from 'quicklink/dist/quicklink.mjs';
import { globalObject } from '../_functions';

export const onEnter = (to, location) => {

};

export const onEnterCompleted = (from, to, location) => {
  Anim.pageEntrance(to.view.attributes[0].value);
};

export const firstLoad = () => {
  const namespace = document.querySelector('[data-router-view]').dataset.routerView;
  globalObject.namespace = namespace;
  quicklink({ el: document.querySelector('.projects-wrapper') });
  Anim.pageEntrance(namespace, true);
  Anim.openCloseProjectsMenu();
  Anim.prepProfileDrawer();
};
