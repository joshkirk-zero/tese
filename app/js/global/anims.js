import { TimelineMax, Sine, TweenMax, Expo, Back } from 'gsap';
import { SplitText } from '../thirdparty/SplitText';
import { globalObject } from '../_functions';

// export const scrollPrompt = () => {
//   // const projectsTrigger = document.querySelector('.cta-trigger .trigger');
//   // const squares = projectsTrigger.querySelectorAll('span');
//   const mouseEnterTL = new TimelineMax({ paused: true });
//
//   mouseEnterTL
//     .staggerTo(squares, 0.2, { scale: 1.15, backgroundColor: '#E8B9AB', ease: Sine.easeInOut, force3D: true }, 0.055);
// };

export const pageEntrance = (namespace, firstLoad = false) => {
  switch (namespace) {
    case 'home':
      const homeEntranceTL = new TimelineMax({ paused: true });

      const splitBioByLines = document.querySelector('.bio');
      const splitBioLines = new SplitText(splitBioByLines, { type: 'lines' }).lines;
      const innerBioLines = new SplitText(splitBioLines, { type: 'lines' }).lines;

      const splitWelcomeByLines = document.querySelectorAll('.welcome');
      const splitWelcomeLines = new SplitText(splitWelcomeByLines, { type: 'lines' }).lines;
      const innerWelcomeLines = new SplitText(splitWelcomeLines, { type: 'lines' }).lines;

      const wipers = document.querySelectorAll('.you-can .wiper');
      const wiperBars = document.querySelectorAll('.you-can .wiper span');
      const lettersOne = document.querySelectorAll('.you-can .line-1 .svg-wrapper-inner path');
      const lettersTwo = document.querySelectorAll('.you-can .line-2 .svg-wrapper-inner path');

      const beacon = document.querySelector('.beacon');
      const fadeEls = document.querySelector('.global-els');

      homeEntranceTL
        .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
        .add('start')
        .add('startTwo', '+=.4');
      if (firstLoad) {
        homeEntranceTL
          .add('welcomeStart', '+=1.25')
          .add('bioStart', '+=1.95');
      } else {
        homeEntranceTL
          .add('welcomeStart', '+=.25')
          .add('bioStart', '+=.55');
      }
      homeEntranceTL
        .fromTo(wiperBars, 2.18, { x: 0, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true })
        .fromTo(wipers, 1.08, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'start')
        .staggerFromTo(lettersOne, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startTwo')
        .staggerFromTo(lettersTwo, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startTwo');
      if (firstLoad) {
        homeEntranceTL
          .staggerFromTo(innerWelcomeLines, 1.1, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(innerBioLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart')
      } else {
        homeEntranceTL
          .staggerFromTo(innerWelcomeLines, 0.76, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(innerBioLines, 0.76, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart');
      }
      homeEntranceTL
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
      const bigPipe = document.querySelector('[data-router-view]:last-child .big-pipe');
      const splitEntranceEls = document.querySelectorAll('[data-router-view]:last-child .meta > div, .title-meta .idx');
      const entranceLines = new SplitText(splitEntranceEls, { type: 'lines' }).lines;
      const innerEntranceLines = new SplitText(entranceLines, { type: 'lines' }).lines;
      const projectFadeEls = document.querySelector('.global-els');
      if (!globalObject.comingFromFooter) {
        const wordWipers = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .wiper');
        const wordWiperBars = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .wiper span');
        const projectLettersOne = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .svg-wrapper:first-child path');
        const projectLettersTwo = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .svg-wrapper:last-child path');

        projectEntranceTL
          .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
          .add('start', '+=1.2')
          .add('wordsStart', '+=0')
          .add('lettersIn', '+=.3')
          .fromTo(wordWiperBars, 2, { x: 0, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true })
          .fromTo(wordWipers, 1.1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'wordsStart')
          .staggerFromTo(projectLettersOne, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
          .staggerFromTo(projectLettersTwo, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
          .staggerFromTo(innerEntranceLines, 0.79, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'start')
          .fromTo(bigPipe, 0.6, { transformOrigin: '50% 0', scaleY: 0 }, { scaleY: 1, ease: Sine.easeInOut }, 'start')
          .fromTo(projectFadeEls, 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: Sine.easeInOut }, '-=.5');
        projectEntranceTL.play();
      }

      break;
    default:

      break;
  }
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
        const splitEyebrowByLines = projectIntroSection.querySelectorAll('.intro .eyebrow');
        const splitIntroByLines = projectIntroSection.querySelectorAll('.intro div > p');
        const splitIntroLines = new SplitText(splitIntroByLines, { type: 'lines' }).lines;
        const innerIntroLines = new SplitText(splitIntroLines, { type: 'lines' }).lines;
        const splitEyebrowLines = new SplitText(splitEyebrowByLines, { type: 'lines' }).lines;
        const innerEyebrowLine = new SplitText(splitEyebrowLines, { type: 'lines' }).lines;

        projectIntroTL
          .fromTo(innerEyebrowLine, 1, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true })
          .add('introIn', '-=.3')
          .staggerFromTo(innerIntroLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.06, 'introIn');

        thisPagesTLs.push(projectIntroTL);
        break;
      case 'project-footer':

        const projectFooterTL = new TimelineMax({ paused: true });
        const projectFooterSection = theseSections[i];
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
          .fromTo(wordWiperBars, 2, { x: 0, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true })
          .fromTo(wordWipers, 1.1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'wordsStart')
          .staggerFromTo(projectLettersOne, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
          .staggerFromTo(projectLettersTwo, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
          .add('eyebrowsIn', '-=1.6')
          .staggerFromTo(innerFooterEyebrowLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.06, 'eyebrowsIn');
        // document.querySelector('.project-footer').addEventListener('click', () => { projectFooterTL.progress(0).play(); });
        thisPagesTLs.push(projectFooterTL);
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

/**

 Global open/close project menu
 ------------------------------

 -------------------------------------------------- * */
export const openCloseProjectsMenu = () => {
  const trigger = document.querySelector('.cta-trigger .trigger');
  const projectsTriggerBackground = document.querySelector('.cta-trigger .trigger .background');
  const squares = trigger.querySelectorAll('span:nth-child(even)');
  const squareTl = squares[0];
  const squareTr = squares[1];
  const squareBr = squares[2];
  const squareBl = squares[3];
  const projectsContainer = document.querySelector('.projects-wrapper');
  const switchOverlay = document.querySelector('.switch-overlay');
  const openMenuTL = new TimelineMax({ paused: true });
  const squaresTL = new TimelineMax({ paused: true });
  const wordWipers = document.querySelectorAll('.projects-wrapper .large-svg-title .wiper');
  const wordWiperBars = document.querySelectorAll('.projects-wrapper .large-svg-title .wiper span');
  const numWipers = document.querySelectorAll('.projects-wrapper .projects .wiper');
  const numWiperBars = document.querySelectorAll('.projects-wrapper .projects .wiper span');
  const numbersOne = document.querySelectorAll('.projects-wrapper .projects a:first-child path');
  const numbersTwo = document.querySelectorAll('.projects-wrapper .projects a:nth-child(2) path');
  const numbersThree = document.querySelectorAll('.projects-wrapper .projects a:nth-child(3) path');
  const numbersFour = document.querySelectorAll('.projects-wrapper .projects a:nth-child(4) path');
  const lettersOne = document.querySelectorAll('.projects-wrapper .large-svg-title .svg-wrapper:first-child path');
  const lettersTwo = document.querySelectorAll('.projects-wrapper .large-svg-title .svg-wrapper:last-child path');

  const splitByLines = document.querySelectorAll('.projects-wrapper .text-wrapper > *');
  const splitLines = new SplitText(splitByLines, { type: 'lines' }).lines;
  const innerLines = new SplitText(splitLines, { type: 'lines' }).lines;

  const innerLinesOne = document.querySelectorAll('.projects-wrapper .projects a:first-child .text-wrapper div div');
  const innerLinesTwo = document.querySelectorAll('.projects-wrapper .projects a:nth-child(2) .text-wrapper div div');
  const innerLinesThree = document.querySelectorAll('.projects-wrapper .projects a:nth-child(3) .text-wrapper div div');
  const innerLinesFour = document.querySelectorAll('.projects-wrapper .projects a:nth-child(4) .text-wrapper div div');

  let count = 0;

  squaresTL
    .to(squareTl, 0.4, { transformOrigin: '100% 50%', scaleX: 0, ease: Sine.easeOut, force3D: true }, 0)
    .to(squareTr, 0.4, { transformOrigin: '50% 100%', scaleY: 0, ease: Sine.easeOut, force3D: true }, 0)
    .to(squareBr, 0.4, { transformOrigin: '50% 0', scaleY: 0, ease: Sine.easeOut, force3D: true }, 0)
    .to(squareBl, 0.4, { transformOrigin: '0 50%', scaleX: 0, ease: Sine.easeOut, force3D: true }, 0)
    .fromTo(projectsTriggerBackground, 0.35, { opacity: 0 }, { opacity: 1, ease: Sine.easeOut, force3D: true }, 0)
    .to(trigger, 0.55, { rotation: 225, ease: Sine.easeOut }, 0);

  openMenuTL
    .set(projectsContainer, { className: '+=open' })
    .fromTo(switchOverlay, 0.35, { autoAlpha: 0 }, { autoAlpha: 1, ease: Sine.easeInOut, force3D: true })
    .fromTo('.projects-wrapper', 0.001, { pointerEvents: 'none', autoAlpha: 0 }, { pointerEvents: 'all', autoAlpha: 1 })
    .add('wordsStart')
    .add('wordsStartTwo', '+=.13')
    .add('numsStart', '+=.05')
    .add('numsWipersCollapse', '+=.055')
    .add('numsStartTwo', '+=.23')
    // .add('numsCharsStart', '+=.2')
    .add('linesUpStart', '+=.2')
    .fromTo(wordWiperBars, 1.3, { x: 0, scaleX: 0 }, { x: 55, scaleX: 1, ease: Expo.easeOut, force3D: true })
    .fromTo(wordWipers, 1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'wordsStart')
    .staggerFromTo(lettersOne, 1.05, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.04, 'wordsStartTwo')
    .staggerFromTo(lettersTwo, 1.05, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.04, 'wordsStartTwo')
    .fromTo(numWiperBars, 1.3, { x: 0, scaleX: 0 }, { x: 60, scaleX: 1, ease: Expo.easeOut, force3D: true }, 'numsStart')
    .fromTo(numWipers, 1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'numsWipersCollapse')
    .staggerFromTo(numbersOne, 1, { x: 60 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.07, 'numsStartTwo')
    .staggerFromTo(numbersTwo, 1, { x: 60 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.07, 'numsStartTwo')
    .staggerFromTo(numbersThree, 1, { x: 60 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.07, 'numsStartTwo')
    .staggerFromTo(numbersFour, 1, { x: 60 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.07, 'numsStartTwo')
    .staggerFromTo(innerLinesOne, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'linesUpStart')
    .staggerFromTo(innerLinesTwo, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'linesUpStart')
    .staggerFromTo(innerLinesThree, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'linesUpStart')
    .staggerFromTo(innerLinesFour, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'linesUpStart');

  globalObject.openCloseMenu = openMenuTL;

  trigger.addEventListener('click', () => {
    if (count % 2 === 0) {
      openMenuTL.timeScale(1).play();
      squaresTL.timeScale(1).play();
    } else {
      openMenuTL.timeScale(1.2).reverse();
      squaresTL.timeScale(1.2).reverse();
    }
    count++;
  });

  document.addEventListener('keyup', (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && count % 2 !== 0) {
      openMenuTL.timeScale(1).reverse();
      squaresTL.timeScale(1).reverse();
      count++;
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
