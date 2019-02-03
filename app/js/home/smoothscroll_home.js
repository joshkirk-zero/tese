import VirtualScroll from 'virtual-scroll';
import throttle from 'lodash.throttle';
import { TweenLite, Expo, Linear, TimelineMax, Sine } from 'gsap';
import { globalObject } from '../_functions';
import { SplitText } from '../thirdparty/SplitText';
import { Core } from '../main';

export default class HomeSmooth {
  constructor(options = {}) {
    this.bindMethods();

    TweenLite.defaultEase = Linear.easeNone;

    this.el = document.querySelector('[data-smooth]:last-child');

    const {
      sections = this.el.querySelectorAll('[data-smooth-section]'),
      threshold = !globalObject.isMobile ? 200 : 20,
      ease = 0.15,
      preload = true,
      mouseMultiplier = 0.3,
      touchMultiplier = 2.5,
      firefoxMultiplier = 15,
      preventTouch = true,
      passive = true
    } = options;

    this.dom = {
      el: this.el,
      sections: sections,
    };

    this.sections = null;

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

    // home page specific animations
    this.scrollAwayTL = new TimelineMax({ paused: true });
    this.measureEl = document.querySelector('.home-view .measure-el');
    this.measureElHeight = this.measureEl.offsetHeight;

    const scrollWords = document.querySelectorAll('.scroll-prompt p span:first-child');
    const scrollWordsWraps = new SplitText(scrollWords, { type: 'words' }).words;
    const scrollWordsChars = new SplitText(scrollWordsWraps, { type: 'chars' }).chars;

    this.scrollAwayTL
      .add('start')
      .add('charsStart', '+=.3')
      .staggerFromTo(scrollWordsChars, 0.8, { rotationX: 0, skewX: 0, scaleY: 1 }, { rotationX: 65, skewX: -10, scaleY: 0, ease: Sine.easeInOut, force3D: true }, 0.017)
      .fromTo(scrollWordsChars, 0.8, { y: 0 }, { y: -35, ease: Sine.easeInOut, force3D: true }, 0)
      .staggerFromTo(scrollWordsChars, 1.2, { opacity: 1 }, { opacity: 0, ease: Sine.easeOut, force3D: true }, 'charsStart', 0.016)
      .staggerFromTo(scrollWordsWraps, 1, { z: 20 }, { z: 0, ease: Sine.easeOut }, 0.02, 'start', () => { Core.redirect('http://joshs-imac.local:5757/facebook-careers'); });
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
    // this.preload();
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
    });
  }

  animateElems() {
    let percentageThrough = ((this.measureEl.getBoundingClientRect().top / this.measureElHeight) - 1).toFixed(3) * -1;
    console.log(percentageThrough);
    if (percentageThrough <= 0) {
      percentageThrough = 0;
    } else if (percentageThrough >= 1) {
      percentageThrough = 1;
    }
    this.scrollAwayTL.progress(percentageThrough);
  }

  intersectRatio(data, top, bottom) {
    const start = top - this.data.height;
    const end = (this.data.height + bottom + data.height) * data.duration;

    data.progress.current = Math.abs(start / end);
    data.progress.current = Math.max(0, Math.min(1, data.progress.current));
  }

  isVisible(bounds, offset) {
    const threshold = !offset ? this.data.threshold : offset;
    const start = bounds.top - this.data.current;
    const end = bounds.bottom - this.data.current;
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

  getBounding() {
    const bounding = this.dom.el.getBoundingClientRect();

    this.data.height = window.innerHeight;
    this.data.bounding = bounding;
    this.data.max = bounding.height - this.data.height;
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
    this.raf = null;
  }
}
