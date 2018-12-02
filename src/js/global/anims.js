import { TimelineMax, Sine, TweenMax, Circ } from 'gsap';
import { SplitText } from '../thirdparty/SplitText';
import { globalObject } from "../_functions";

export const projectsTriggerHover = () => {
  const projectsTrigger = document.querySelector('.cta-trigger .trigger');
  const squares = projectsTrigger.querySelectorAll('span');
  const mouseEnterTL = new TimelineMax({ paused: true });
  mouseEnterTL
    .staggerTo(squares, 0.2, { scale: 1.15, backgroundColor: '#E8B9AB', ease: Sine.easeInOut, force3D: true }, 0.055);

  projectsTrigger.addEventListener('mouseenter', () => {
    mouseEnterTL.play();
  });

  projectsTrigger.addEventListener('mouseleave', () => {
    mouseEnterTL.reverse();
  });
};

export const scrollPrompt = () => {
  // const projectsTrigger = document.querySelector('.cta-trigger .trigger');
  // const squares = projectsTrigger.querySelectorAll('span');
  const mouseEnterTL = new TimelineMax({ paused: true });

  mouseEnterTL
    .staggerTo(squares, 0.2, { scale: 1.15, backgroundColor: '#E8B9AB', ease: Sine.easeInOut, force3D: true }, 0.055);
};


export const firstLoadEntrance = (namespace) => {

  switch (namespace) {
    case 'home':
      const homeEntranceTL = new TimelineMax({ paused: true });

      const splitBioByLines = document.querySelectorAll('.bio');
      const splitBioLines = new SplitText(splitBioByLines, { type: 'lines' }).lines;
      const innerBioLines = new SplitText(splitBioLines, { type: 'lines' }).lines;

      const splitWelcomeByLines = document.querySelectorAll('.welcome');
      const splitWelcomeLines = new SplitText(splitWelcomeByLines, { type: 'lines' }).lines;
      const innerWelcomeLines = new SplitText(splitWelcomeLines, { type: 'lines' }).lines;

      const splitSubnoteByLines = document.querySelectorAll('.subnote p');
      const splitSubnoteLines = new SplitText(splitSubnoteByLines, { type: 'lines' }).lines;
      const innerSubnoteLines = new SplitText(splitSubnoteLines, { type: 'lines' }).lines;

      const bigCharWrappers = document.querySelectorAll('.you-can > span');
      const bigCharsLn1 = bigCharWrappers[0].querySelectorAll('path');
      const bigCharsLn2 = bigCharWrappers[1].querySelectorAll('path');

      const beacon = document.querySelector('.beacon');
      const fadeEls = document.querySelector('.global-els');

      homeEntranceTL
        .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
        .add('ln1Start')
        .add('ln2Start', '+=.25')
        .staggerFromTo(bigCharsLn1, 0.42, { yPercent: -100 }, { yPercent: 0, ease: Circ.easeOut }, 0.09, 'ln1Start')
        .staggerFromTo(bigCharsLn2, 0.42, { yPercent: -100 }, { yPercent: 0, ease: Circ.easeOut }, 0.09, 'ln2Start')
        .staggerFromTo(bigCharsLn1, 1, { opacity: 0 }, { opacity: 1, ease: Circ.easeOut }, 0.09, 'ln1Start')
        .staggerFromTo(bigCharsLn2, 1, { opacity: 0 }, { opacity: 1, ease: Circ.easeOut }, 0.09, 'ln2Start')
        .add('welcomeStart', '-=.3')
        .add('bioStart')
        .staggerFromTo(innerWelcomeLines, 0.76, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'welcomeStart')
        .staggerFromTo(innerBioLines, 0.76, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart')
        .add('subnoteStart', '-=.64')
        .staggerFromTo(innerSubnoteLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'subnoteStart')
        .add('fadeAndScale', '-=.3')
        .fromTo(fadeEls, 1, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'fadeAndScale')
        .fromTo(beacon, 1, { scale: 0 }, { scale: 1.1, ease: Sine.easeIn }, 'fadeAndScale')
        .to(beacon, 0.5, { scale: 0.82, ease: Sine.easeOut })
        .to(beacon, 0.85, { scale: 1, ease: Sine.easeInOut });


      TweenMax.delayedCall(0.5, () => {
        homeEntranceTL.play();
      });
      break;

    case 'project':
      const projectEntranceTL = new TimelineMax({ paused: true });
      const bigPipe = document.querySelector('.big-pipe');
      const splitEntranceEls = document.querySelectorAll('.meta > div');
      const entranceLines = new SplitText(splitEntranceEls, { type: 'lines' }).lines;
      const innerEntranceLines = new SplitText(entranceLines, { type: 'lines' }).lines;

      const projectFadeEls = document.querySelector('.global-els');

      projectEntranceTL
        .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
        .add('start', '+=.5')
        .staggerFromTo(innerEntranceLines, 0.79, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'start')
        .fromTo(bigPipe, 0.6, { transformOrigin: '50% 0', scaleY: 0 }, { scaleY: 1, ease: Sine.easeInOut }, 'start')
        .fromTo(projectFadeEls, 1, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut });

      projectEntranceTL.play();
      break;
    default:

      break;
  }
};


export const openCloseProjectsMenu = () => {
  const trigger = document.querySelector('.cta-trigger .trigger');
  const projectsContainer = document.querySelector('.projects-wrapper');
  const switchOverlay = document.querySelector('.switch-overlay');
  const switchTL = new TimelineMax({ paused: true });

  let switching = false;

  const isSwitching = () => {
    if (switching) {
      switching = false;
    } else {
      switching = false;
    }
  };

  switchTL
    .set(projectsContainer, { className: '+=open' })
    .fromTo(switchOverlay, 0.4, { autoAlpha: 0 }, { autoAlpha: 1, ease: Sine.easeInOut, force3D: true })
    .fromTo(projectsContainer, 0.4, { autoAlpha: 0 }, { autoAlpha: 1, ease: Sine.easeInOut, force3D: true });

  trigger.addEventListener('click', () => {
    if (switching) {
      return;
    }
    isSwitching();
    if (switchTL.progress() === 0) {
      switchTL.timeScale(1).play();
    } else {
      switchTL.timeScale(1.2).reverse();
    }
  });

  // let playingTimeout = false;
  // const handleWheel = (event) => {
  //   const e = window.event || event;
  //   if (!playingTimeout) {
  //     playingTimeout = true;
  //     const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  //
  //     if (delta < 0) { // scrolling down
  //       trigger.click();
  //     } else { // scrolling up
  //       trigger.click();
  //     }
  //     setTimeout(() => {
  //       playingTimeout = false;
  //     }, 1);
  //   }
  //   e.preventDefault();
  // };
  //
  //
  // // IE9+, Chrome, Safari, Opera
  // target.addEventListener('mousewheel', handleWheel, false);
  // // Firefox
  // target.addEventListener('DOMMouseScroll', handleWheel, false);
};


/**

 Scroll based loadin animations
 ------------------------------

 - Getting ready to add lil animations as sections
 come into view.

 -------------------------------------------------- * */
export const prepScrollBasedLoadins = () => {
  if (!document.querySelector('.scroll-enter')) {
    return;
  }

  const thisPagesTLs = [];

  let theseSections = document.querySelectorAll('.scroll-enter:not(.already-played)');
  let offsetVal = 0;

  for (let i = 0; i < theseSections.length; i++) {
    const entranceType = theseSections[i].dataset.entrance;
    switch (entranceType) {
      case 'project-intro':
        const projectIntroTL = new TimelineMax({ paused: true });
        const projectIntroSection = theseSections[i];
        const splitIntroByLines = projectIntroSection.querySelectorAll('.intro > div > *');
        const splitIntroLines = new SplitText(splitIntroByLines, { type: 'lines' }).lines;
        const innerIntroLines = new SplitText(splitIntroLines, { type: 'lines' }).lines;

        projectIntroTL
          .staggerFromTo(innerIntroLines, 0.76, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.054, 'bioStart');

        thisPagesTLs.push(projectIntroTL);
        break;

      default:

        break;
    }
  }

  const offsets = [];

  for (let i = 0; i < theseSections.length; i++) {
    const thisOffset = globalObject.ww < 768 ? theseSections[i].dataset.mobileOffset : theseSections[i].dataset.offset;
    offsets.push(parseFloat(thisOffset));
  }

  const checkOffsets = () => {
    for (let i = 0; i < theseSections.length; i++) {
      const viewportOffset = theseSections[i].getBoundingClientRect().top;

      if (viewportOffset < (globalObject.wh * offsets[i + offsetVal])) {
        theseSections[i].classList.add('already-played');
        thisPagesTLs[i + offsetVal].play();

        // they're scrolled down the page, so we need to play
        // all previous timelines
        if (i <= offsetVal) {
          for (let j = 0; j <= offsetVal; j++) {
            thisPagesTLs[j].play();
          }
        }

        theseSections = document.querySelectorAll('.scroll-enter:not(.already-played)');
        offsetVal++;
        if (theseSections.length === 0) {
          window.removeEventListener('scroll', checkOffsets);
        }
      }
    }
  };
  checkOffsets();
  window.addEventListener('scroll', checkOffsets);
};
