import VirtualScroll from 'virtual-scroll';
import throttle from 'lodash.throttle';
// import config from '../config';
import { TweenMax, Expo, Linear, TimelineMax, Sine } from 'gsap';
import { globalObject } from '../_functions';
import { SplitText } from '../thirdparty/SplitText';

export default class SmoothProject {
  constructor(options = {}) {
    this.bindMethods();

    TweenMax.defaultEase = Linear.easeNone;

    this.el = document.querySelector('[data-smooth]:last-child');

    const {
      sections = this.el.querySelectorAll('[data-smooth-section]'),
      elems = this.el.querySelectorAll('.image-scroll'),
      scrollBasedElems = this.el.querySelectorAll('.scroll-enter'),
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
      elems: elems,
      scrollBasedElems: scrollBasedElems
    };

    this.sections = null;
    this.elems = null;
    this.scrollBasedElems = null;

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

    // project page specific animations
    this.scrollImageWrappers = document.querySelectorAll('.image-scroll');
    this.scrollImages = document.querySelectorAll('.image-scroll img');
    this.scrollDists = [];

    for (let i = 0; i < this.scrollImages.length; i++) {
      const scrollImgDist = this.scrollImages[i].offsetHeight - this.scrollImageWrappers[i].offsetHeight;
      this.scrollDists.push(scrollImgDist);
    }

    this.scrollAwayTL = new TimelineMax({ paused: true });
    this.measureEl = document.querySelector('.project-hero .measure-el');
    this.measureElHeight = this.measureEl.offsetHeight;

    const fadeEls = document.querySelectorAll('.email-triggers .email, .email-triggers .availability, .arrow, .title-meta');
    const largeTitle = document.querySelectorAll('.project-hero .large-svg-title, .project-hero .idx');
    const largeMeta = document.querySelector('.project-hero .meta');
    const staggerFadeEls = document.querySelectorAll('.vert-left .meta');
    const staggerFadeScaleEls = document.querySelectorAll('.socials');

    const scrollWords = document.querySelectorAll('.scroll-prompt p span:last-child');
    const scrollWordsWraps = new SplitText(scrollWords, { type: 'words' }).words;
    const scrollWordsChars = new SplitText(scrollWordsWraps, { type: 'chars' }).chars;

    this.scrollAwayTL
      .add('start')
      .add('charsStart', '+=.3')
      .staggerFromTo(scrollWordsChars, 0.9, { rotationX: 0, skewX: 0, scaleY: 1 }, { rotationX: 65, skewX: -10, scaleY: 0, ease: Sine.easeInOut, force3D: true }, 0.017, 0.01)
      .fromTo(scrollWordsChars, 0.8, { y: 0 }, { y: -35, ease: Sine.easeInOut, force3D: true }, 0)
      .staggerFromTo(scrollWordsChars, 1.2, { opacity: 1 }, { opacity: 0, ease: Sine.easeOut, force3D: true }, 'charsStart', 0.016)
      .staggerFromTo(scrollWordsWraps, 1, { z: 20 }, { z: 0, ease: Sine.easeOut }, -0.02, 'start')
      .fromTo(staggerFadeScaleEls, 1.2, { opacity: 1 }, { opacity: 0, ease: Sine.easeInOut, force3D: true }, -0.055, 'start')
      .fromTo(staggerFadeEls, 1.2, { opacity: 1 }, { opacity: 0, ease: Sine.easeInOut, force3D: true }, 'start')
      .fromTo(fadeEls, 1.2, { opacity: 1 }, { opacity: 0, ease: Sine.easeInOut, force3D: true }, 'start')
      .fromTo(largeTitle, 1.1, { y: 0 }, { y: -50, ease: Sine.easeInOut, force3D: true }, 'start');

    this.thisPagesTLs = [];

    this.offsetVal = 0;
    this.allAnimsIn = false;

    for (let i = 0; i < this.dom.scrollBasedElems.length; i++) {
      const entranceType = this.dom.scrollBasedElems[i].dataset.entrance;
      switch (entranceType) {
        case 'project-intro':
          const projectIntroTL = new TimelineMax({ paused: true });
          const projectIntroSection = this.dom.scrollBasedElems[i];
          const splitEyebrowByLines = projectIntroSection.querySelector('.eyebrow');
          const splitIntroByLines = projectIntroSection.querySelector('p');
          const splitIntroLines = new SplitText(splitIntroByLines, { type: 'lines' }).lines;
          const innerIntroLines = new SplitText(splitIntroLines, { type: 'lines' }).lines;
          const splitEyebrowLines = new SplitText(splitEyebrowByLines, { type: 'lines' }).lines;
          const innerEyebrowLine = new SplitText(splitEyebrowLines, { type: 'lines' }).lines;
  
          projectIntroTL
            .fromTo(innerEyebrowLine, 1, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true })
            .add('introIn', '-=.3')
            .staggerFromTo(innerIntroLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.06, 'introIn');
          
          this.thisPagesTLs.push(projectIntroTL);
          break;
        
        case 'project-footer':
          const projectFooterTL = new TimelineMax({ paused: true });
          const projectFooterSection = this.dom.scrollBasedElems[i];
          const splitFooterEyebrowsByLines = projectFooterSection.querySelectorAll('.eyebrow, .idx');
          const splitFooterEyebrowLines = new SplitText(splitFooterEyebrowsByLines, { type: 'lines' }).lines;
          const innerFooterEyebrowLines = new SplitText(splitFooterEyebrowLines, { type: 'lines' }).lines;
          const wordWipers = document.querySelectorAll('.project-footer .large-svg-title .wiper');
          const wordWiperBars = document.querySelectorAll('.project-footer .large-svg-title .wiper span');
          const projectLettersOne = document.querySelectorAll('.project-footer .large-svg-title .svg-wrapper:nth-last-child(2) path');
          const projectLettersTwo = document.querySelectorAll('.project-footer .large-svg-title .svg-wrapper:last-child path');
          projectFooterTL
            .add('wordsStart')
            .add('lettersIn', '+=.3')
            .fromTo(wordWiperBars, 2, { x: 0, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: false })
            .fromTo(wordWipers, 1.1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: false }, 'wordsStart')
            .staggerFromTo(projectLettersOne, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
            .staggerFromTo(projectLettersTwo, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
            .add('eyebrowsIn', '-=1.6')
            .staggerFromTo(innerFooterEyebrowLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.06, 'eyebrowsIn');
          // document.querySelector('.project-footer').addEventListener('click', () => { projectFooterTL.progress(0).play(); });
          this.thisPagesTLs.push(projectFooterTL);
          break;
  
        default:
  
          break;
      }
    }
    console.log(this.thisPagesTLs);
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
    this.scrollAwayFromHero();
    this.animateOverflowImages();
    this.checkScrollBasedLoadins();

    this.data.last = this.data.current;
  }

  transformSections() {
    if (!this.sections) return;
    
    const translate = this.data.current.toFixed(2);

    this.sections.forEach((data, index) => {
      const translate3d = `translate3d(0, ${-translate}px, 0)`;
      const { isVisible } = this.isVisible(data);

      if (isVisible || this.state.resizing) this.dom.sections[index].style.transform = translate3d;
    });
  }

  scrollAwayFromHero() {
    let percentageThrough = (this.data.current / this.measureElHeight).toFixed(3);
    if (percentageThrough <= 0) {
      percentageThrough = 0;
    } else if (percentageThrough >= 1) {
      percentageThrough = 1;
    }
    this.scrollAwayTL.progress(percentageThrough);
  }

  animateOverflowImages() {
    if (!this.elems) return;
    this.elems.forEach((data, index) => {
      const { isVisible, start, end } = this.isVisible(data, 0.01)
      
      if (isVisible) {
        this.intersectRatio(data, start, end)
        const yVal = this.scrollDists[index] * data.progress.current;
        this.scrollImages[index].style.transform = `translate3d(0, ${-yVal}px, 0)`;
      }
    })
  }
  
  checkScrollBasedLoadins() {
    if (this.thisPagesTLs.length !== this.offsetVal) {
      this.scrollBasedElems.forEach((data, index) => {
        if (data.played) { return }
        const { isVisible, start, end } = this.isVisible(data, -data.offset)
        if (isVisible) {
          this.thisPagesTLs[index].play();
          this.offsetVal++;
          data.played = true;
        }
      })
    }
  }

  intersectRatio(data, top, bottom) {
    const start = top - this.data.height;
    const end = this.data.height + bottom + data.height;

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
    this.getOverflowElems();
    this.getScrollBasedSections();
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

  getOverflowElems() {
    if (!this.dom.elems) return
    this.elems = []
    this.dom.elems.forEach(el => {
      const bounds = el.getBoundingClientRect()
      this.elems.push({
        el: el,
        top: bounds.top > this.data.height ? bounds.top + 300 : this.data.height + 300,
        bottom: bounds.bottom,
        height: (bounds.bottom - bounds.top) - 700,
        progress: {
          current: 0
        }
      })
    })
  }
  
  getScrollBasedSections() {
    if (!this.dom.scrollBasedElems) return
    this.scrollBasedElems = []
    this.dom.scrollBasedElems.forEach(el => {
      const bounds = el.getBoundingClientRect()
      this.scrollBasedElems.push({
        el: el,
        played: false,
        top: bounds.top > this.data.height ? bounds.top : this.data.height,
        bottom: bounds.bottom,
        height: (bounds.bottom - bounds.top),
        offset: globalObject.ww < 768 ? el.dataset.mobileOffset : el.dataset.offset
      })
    })
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
    this.elems = null;
    this.scrollBasedElems = null;
    this.raf = null;
  }
}
