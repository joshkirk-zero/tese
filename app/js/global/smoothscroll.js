import VirtualScroll from 'virtual-scroll';
import throttle from 'lodash.throttle';
import imagesLoaded from 'imagesloaded';
// import config from '../config';
import {TweenMax, Expo, Linear} from 'gsap';

export default class Smooth {
  constructor(options = {}) {
    this.bindMethods();

    TweenMax.defaultEase = Linear.easeNone;

    this.el = options.el || config.body;

    const {
      sections = this.el.querySelectorAll('[data-smooth-section]'),
      elems = this.el.querySelectorAll('[data-from]'),
      threshold = !config.isDevice ? 200 : 20,
      ease = 0.125,
      preload = true,
      mouseMultiplier = 0.5,
      touchMultiplier = 2.5,
      firefoxMultiplier = 60,
      preventTouch = true,
      passive = true
    } = options;

    this.dom = {
      el: this.el,
      sections: sections,
      elems: elems
    };

    this.sections = null;
    this.elems = null;

    this.raf = null;

    this.state = {
      resizing: false
    };

    this.data = {
      threshold: threshold,
      ease: ease,
      current: 0,
      last: 0,
      target: 0,
      bounding: 0,
      height: 0,
      max: 0
    };

    this.vs = new VirtualScroll({
      el: this.el,
      mouseMultiplier: mouseMultiplier,
      touchMultiplier: touchMultiplier,
      firefoxMultiplier: firefoxMultiplier,
      preventTouch: preventTouch,
      passive: passive
    });

    this.init();
  }

  bindMethods() {
    ['run', 'event', 'resize']
      .forEach(fn => this[fn] = this[fn].bind(this));
  }

  init() {
    this.on();
  }

  on() {
    this.dom.el.classList.add('is-virtual-scroll');
    this.setStyles();
    this.getCache();
    this.getBounding();
    this.addListeners();
    this.vs.on(this.event);
    this.preload();
    this.requestAnimationFrame();
  }

  setStyles() {
    this.dom.el.style.position = 'fixed';
    this.dom.el.style.top = 0;
    this.dom.el.style.left = 0;
    this.dom.el.style.width = '100%';
  }

  event(e) {
    this.data.target += Math.round(e.deltaY * -1);
    this.clamp();
  }

  clamp() {
    this.data.target = Math.round(Math.min(Math.max(this.data.target, 0), this.data.max));
  }

  run() {
    if (this.state.resizing) return;
    this.data.current += (this.data.target - this.data.current) * this.data.ease;

    this.requestAnimationFrame();
    this.transformSections();
    this.animateElems();

    this.data.last = this.data.current;
  }

  transformSections() {
    if (!this.sections) return;

    const current = this.data.current;
    const translate = this.data.current.toFixed(2);

    this.sections.forEach((data, index) => {
      const translate3d = `translate3d(0, ${-translate}px, 0)`;
      const { isVisible } = this.isVisible(data);

      if (isVisible || this.state.resizing) this.dom.sections[index].style.transform = translate3d;
    })
  }

  animateElems() {
    if (!this.elems) return;

    this.elems.forEach((data, index) => {
      const { isVisible, start, end } = this.isVisible(data, 0.01);

      if (isVisible) {
        this.intersectRatio(data, start, end);
        data.tl.progress(data.progress.current);
      }
    })
  }

  intersectRatio(data, top, bottom) {
    const start = top - this.data.height;
    const end = (this.data.height + bottom + data.height) * data.duration;

    data.progress.current = Math.abs(start / end);
    data.progress.current = Math.max(0, Math.min(1, data.progress.current));
  }

  isVisible(bounds, offset) {
    const current = this.data.current;
    const threshold = !offset ? this.data.threshold : offset;
    const start = bounds.top - current;
    const end = bounds.bottom - current;
    const isVisible = start < (threshold + this.data.height) && end > -threshold;

    return {
      isVisible,
      start,
      end
    };
  }

  requestAnimationFrame() {
    this.raf = requestAnimationFrame(this.run);
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.raf);
  }

  getCache() {
    this.getSections();
    this.getElems();
  }

  getSections() {
    if (!this.dom.sections) return;
    this.sections = [];

    this.dom.sections.forEach((el) => {
      el.style.transform = '';
      const bounds = el.getBoundingClientRect();

      this.sections.push({
        top: bounds.top,
        bottom: bounds.bottom
      });
    });
  }

  getElems() {
    if (!this.dom.elems) return;

    this.elems = [];

    this.dom.elems.forEach(el => {
      //if (!el.dataset.animateMobile && config.isPhone) return

      const bounds = el.getBoundingClientRect();
      const tl = new TimelineLite({ paused: true });
      const from = JSON.parse(el.dataset.from);
      const to = JSON.parse(el.dataset.to);

      tl.fromTo(el, 1, from, to);

      this.elems.push({
        el: el,
        tl: tl,
        top: bounds.top > this.data.height ? bounds.top : this.data.height,
        bottom: bounds.bottom,
        height: bounds.height,
        duration: el.dataset.duration ? el.dataset.duration : 1,
        progress: {
          current: 0
        }
      });
    });

    this.photoTl();
  }

  photoTl() {
    //if (config.isPhone) return

    const el = document.querySelector('[data-photos]');
    const tl = new TimelineLite({ paused: true });
    const trigger = el.querySelector('[data-trigger]');
    const bounds = trigger ? trigger.getBoundingClientRect() : el.getBoundingClientRect();

    tl
      .to('[data-photo="1"]', 1, { yPercent: -110, rotation: -3, ease: Expo.easeOut }, 0)
      .to('[data-photo="2"]', 1, { xPercent: -150, yPercent: -25, rotation: -5, ease: Expo.easeOut }, 0)
      .to('[data-photo="3"]', 1, { xPercent: 150, rotation: 5, ease: Expo.easeOut }, 0)
      .to('[data-photo="4"]', 1, { xPercent: -60, yPercent: 115, rotation: 2, ease: Expo.easeOut }, 0)
      .to('[data-photo="5"]', 1, { xPercent: 50, yPercent: 125, rotation: -5, ease: Expo.easeOut }, 0);

    this.elems.push({
      el: el,
      tl: tl,
      top: bounds.top > this.data.height ? bounds.top : this.data.height,
      bottom: bounds.bottom,
      height: bounds.height,
      duration: el.dataset.duration ? el.dataset.duration : 1,
      progress: {
        current: 0
      }
    });
  }

  getBounding() {
    const bounding = this.dom.el.getBoundingClientRect();

    this.data.height = window.innerHeight;
    this.data.bounding = bounding;
    this.data.max = bounding.height - this.data.height;
  }

  preload() {
    imagesLoaded(this.dom.el, (instance) => {
      this.resize();
    });
  }

  resize() {
    this.state.resizing = true;
    this.getCache();
    this.transformSections();
    this.getBounding();
    this.state.resizing = false;
  }

  off() {
    this.state.rafCancelled = true;
    this.vs.off(this.event);
    this.cancelAnimationFrame();
    this.dom.el.classList.remove('is-virtual-scroll');
    this.removeListeners();
  }

  addListeners() {
    window.addEventListener('resize', throttle(this.resize, 100));
  }

  removeListeners() {
    window.removeEventListener('resize', throttle(this.resize, 100));
  }

  scrollTo(offset) {
    this.data.target = offset - (this.data.height * 0.1);
    this.clamp();
  }

  destroy() {
    this.off();
    this.vs.destroy();
    this.dom = null;
    this.data = null;
    this.sections = null;
    this.elems = null;
    this.raf = null;
  }
}
