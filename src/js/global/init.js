import * as Anim from './anims';

export const onEnter = () => {

};

export const onEnterCompleted = () => {
  Anim.prepScrollBasedLoadins();
};

export const firstLoad = () => {
  const namespace = document.querySelector('[data-router-view]').dataset.routerView;
  Anim.projectsTriggerHover();
  Anim.firstLoadEntrance(namespace);
  Anim.openCloseProjectsMenu();
  Anim.prepScrollBasedLoadins();
};
