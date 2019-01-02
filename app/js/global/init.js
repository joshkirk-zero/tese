import * as Anim from './anims';
// import quicklink from "quicklink/dist/quicklink.mjs";

export const onEnter = (to, location) => {

};

export const onEnterCompleted = (from, to, location) => {
  Anim.pageEntrance(to.view.attributes[0].value);
  Anim.prepScrollBasedLoadins();
};

export const firstLoad = () => {
  const namespace = document.querySelector('[data-router-view]').dataset.routerView;
  // quicklink({ el: document.querySelector('.projects-wrapper') });
  Anim.pageEntrance(namespace, true);
  Anim.openCloseProjectsMenu();
  Anim.prepScrollBasedLoadins();
};
