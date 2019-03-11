import { TimelineMax, Sine, TweenMax, Expo, Power0 } from 'gsap';
import { SplitText } from '../thirdparty/SplitText';
import { globalObject } from '../_functions';

export const prepScrollPrompt = (namespace) => {
  const promptArrow = document.querySelector('.scroll-prompt .arrow');
  const promptText = document.querySelectorAll('.scroll-prompt p div div');
  if (namespace === 'home') {
    TweenMax.set([promptArrow, promptText], { autoAlpha: 0 })
  } else if (namespace === 'project') {
    const letters = document.querySelectorAll('.scroll-prompt p div');
    TweenMax.set([letters, promptArrow], { clearProps: 'transform, opacity, visibility' });
    TweenMax.set(letters, { display: 'none' });
    TweenMax.fromTo([letters, promptArrow], 0.5, { display: 'inline-block', opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }); 
  }
};

export const prepProfileDrawer = () => {
  const profileTrigger = document.querySelector('.profile-trigger');
  const profileTray = document.querySelector('.los-detalles');
  const shiftTheseGlobals = document.querySelectorAll('.vert-left, .email-triggers, .scroll-prompt');
  const closeMask = document.querySelector('.close-mask');
  const closeTrigger = document.querySelector('.los-detalles .close');
  const logo = document.querySelector('.logo');

  const openCloseProfile = new TimelineMax({ paused: true });
  const splitProfileBioByLines = document.querySelector('.secondary-bio');
  const splitProfileBioLines = new SplitText(splitProfileBioByLines, { type: 'lines' }).lines;
  const innerProfileBioLines = new SplitText(splitProfileBioLines, { type: 'lines' }).lines;
  const splitLabelsByLines = document.querySelectorAll('.los-detalles .label');
  const splitLabelLines = new SplitText(splitLabelsByLines, { type: 'lines' }).lines;
  const innerLabelLines = new SplitText(splitLabelLines, { type: 'lines' }).lines;
  const splitCopyByLines = document.querySelectorAll('.credits p, .credits a .clip, .experience a .clip');
  const splitCopyUnderlines = document.querySelectorAll('.credits .lines, .experience .lines');
  const splitCopyLines = new SplitText(splitCopyByLines, { type: 'lines' }).lines;
  const innerCopyLines = new SplitText(splitCopyLines, { type: 'lines' }).lines;
  
  const splitStaggerCopyByLines = document.querySelectorAll('.experience p');
  const splitStaggerCopyLines = new SplitText(splitStaggerCopyByLines, { type: 'lines' }).lines;
  const innerCopyStaggerLines = new SplitText(splitStaggerCopyLines, { type: 'lines' }).lines;

  const splitCloseCopyByLines = document.querySelectorAll('.los-detalles .close .clip');
  const splitCloseCopyLines = new SplitText(splitCloseCopyByLines, { type: 'lines' }).lines;
  const innerCloseCopyLines = new SplitText(splitCloseCopyLines, { type: 'lines' }).lines;
  const closeUnderline = document.querySelector('.los-detalles .close .lines');

  const projectsMenu = document.querySelector('.projects-wrapper');

  const shiftOpacity = globalObject.ww > 767 ? 0.2 : 0.08;
  const globalsShiftOpacity = globalObject.ww > 767 ? 0.3 : 0.15;

  const playTimescale = globalObject.isMobile ? 0.8 : 1;
  if (globalObject.isMobile) {
    openCloseProfile
      .staggerFromTo(innerProfileBioLines, 0.8, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.043)
      .fromTo(innerLabelLines, 1.05, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.1)
      .fromTo(innerCopyLines, 1, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.363)
      .fromTo(splitCopyUnderlines, 0.52, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut, force3D: true }, '-=.39')
      .staggerFromTo(innerCopyStaggerLines, 0.98, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.025, 0.25)
      .staggerFromTo(innerCloseCopyLines, 0.95, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.025, 0.55)
      .fromTo(closeUnderline, 0.52, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut, force3D: true }, '-=.3');
  } else {
    openCloseProfile
      .staggerFromTo(innerProfileBioLines, 0.9, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045)
      .fromTo(innerLabelLines, 1.05, { yPercent: 87 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0)
      .fromTo(innerCopyLines, 0.95, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.165)
      .fromTo(splitCopyUnderlines, 0.52, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut, force3D: true }, '-=.39')
      .staggerFromTo(innerCopyStaggerLines, 0.95, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.025, 0.15)
      .staggerFromTo(innerCloseCopyLines, 0.95, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.025)
      .fromTo(closeUnderline, 0.52, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut, force3D: true }, '-=.3');
  }

  profileTrigger.addEventListener('click', () => {
    profileTray.scrollTop = 0;
    openCloseProfile.timeScale(playTimescale).play();
    if (projectsMenu.classList.contains('open')) {
      TweenMax.to(projectsMenu, 1, { opacity: shiftOpacity, y: -60, ease: Expo.easeOut, force3D: true });  
    } else {
      TweenMax.to('.shift', 1, { opacity: shiftOpacity, y: -60, ease: Expo.easeOut, force3D: true });
    }
    TweenMax.set(closeMask, { display: 'block' });
    TweenMax.to(shiftTheseGlobals, 1.1, { opacity: globalsShiftOpacity, y: -21, ease: Expo.easeOut, force3D: true });
    TweenMax.to(logo, 1.1, { y: 4, ease: Expo.easeOut, force3D: true });
    TweenMax.to(profileTray, 1.1, { yPercent: -100, ease: Expo.easeOut, force3D: true });
  });
  const closeFunc = () => {
    TweenMax.delayedCall(0.25, () => { openCloseProfile.progress(0).reverse(); });
    if (projectsMenu.classList.contains('open')) {
      TweenMax.to(projectsMenu, 1, { opacity: 1, y: 0, ease: Expo.easeOut, force3D: true });  
    } else {
      TweenMax.to('.shift', 1, { opacity: 1, y: 0, ease: Expo.easeOut, force3D: true });
    }
    TweenMax.set(closeMask, { display: 'none' });
    TweenMax.to(shiftTheseGlobals, 1.1, { opacity: 1, y: 0, ease: Expo.easeOut, force3D: true });
    TweenMax.to(logo, 1.1, { y: 0, ease: Expo.easeOut, force3D: true });
    TweenMax.to(profileTray, 1, { yPercent: 0, ease: Expo.easeOut, force3D: true });
  };
  closeMask.addEventListener('click', closeFunc);
  closeTrigger.addEventListener('click', closeFunc);
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      if (openCloseProfile.progress() > 0) {
        closeFunc();
      }
    }
  });
};

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

      const youCan = document.querySelector('.you-can');
      const wipers = document.querySelectorAll('.you-can .wiper');
      const wiperBars = document.querySelectorAll('.you-can .wiper span');
      const lettersOne = document.querySelectorAll('.you-can .line-1 .svg-wrapper-inner path');
      const lettersTwo = document.querySelectorAll('.you-can .line-2 .svg-wrapper-inner path');

      const beacon = document.querySelector('.beacon');
      const availability = document.querySelector('.availability');
      const globalEls = document.querySelectorAll('.vert-left, .email-triggers');
      const beaconTL = new TimelineMax({ repeat: -1, repeatDelay: 1, paused: true });

      beaconTL
        .fromTo(beacon, 0.8, { immediateRender: false, scale: 1 }, { scale: 1.2, ease: Power0.easeNone })
        .to(beacon, 1.2, { immediateRender: false, scale: 1, ease: Sine.easeOut });
      
      const beaconPlay = () => {
        TweenMax.fromTo(beacon, 1.1, { scale: 0 }, { scale: 1, ease: Expo.easeInOut, onComplete: () => {
          TweenMax.delayedCall(0.5, () => {
            beaconTL.play();
          })
        } });
      };

      homeEntranceTL
        .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
        .add('start')
        .add('returnVert', '+=.85')
        .add('startTwo', '+=.4');
      if (firstLoad) {
        homeEntranceTL
          .add('welcomeStart', '+=0.65')
          .add('bioStart', '+=1.35');
      } else {
        homeEntranceTL
          .add('welcomeStart')
          .add('bioStart', '+=.3');
      }
      homeEntranceTL
        .fromTo(wiperBars, 2.1, { x: -15, scaleX: 0 }, { x: 130, scaleX: 1, ease: Expo.easeOut, force3D: true }, 'start')
        .fromTo(wipers, 1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'start')
        .staggerFromTo(lettersOne, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startTwo')
        .staggerFromTo(lettersTwo, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startTwo');
      if (firstLoad) {
        homeEntranceTL
          .fromTo(globalEls, 1.3, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'bioStart')
          .staggerFromTo(innerWelcomeLines, 1.1, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(innerBioLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart');
      } else {
        homeEntranceTL
          .fromTo(youCan, 2.1, { x: 20 }, { x: 0, ease: Expo.easeOut, force3D: true }, 'start')
          .staggerFromTo(innerWelcomeLines, 0.76, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(innerBioLines, 0.76, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart');
      }
      homeEntranceTL
        .add('fadeAndScale', '-=.3')
        .fromTo(availability, 1, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'fadeAndScale')
        .fromTo('.availability p', 1.9, { x: -16 }, { x: 0, ease: Expo.easeInOut }, '+=0')
        .add(beaconPlay, '-=1.3');


      TweenMax.delayedCall(0.7, () => {
        homeEntranceTL.play();
      });
      break;

    case 'project':
      if (!globalObject.comingFromFooter) {
        const projectEntranceTL = new TimelineMax({ paused: true });
        const bigPipe = document.querySelector('[data-router-view]:last-child .big-pipe');
        const splitEntranceEls = document.querySelectorAll('[data-router-view]:last-child .meta > div, .title-meta .idx');
        const entranceLines = new SplitText(splitEntranceEls, { type: 'lines' }).lines;
        const innerEntranceLines = new SplitText(entranceLines, { type: 'lines' }).lines;
        const wordWipers = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .wiper');
        const wordWiperBars = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .wiper span');
        const projectLettersOne = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .svg-wrapper:first-child path');
        const projectLettersTwo = document.querySelectorAll('[data-router-view]:last-child .project-hero .large-svg-title .svg-wrapper:last-child path');
        const globalEls = document.querySelectorAll('.vert-left, .email-triggers, .scroll-prompt');
        projectEntranceTL
          .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
          .add('scaleDownStart')
          .add('lettersIn', '+=.3')
          .add('startProjectMeta', '+=.78')
          .add('startPipe', '+=1')
          .fromTo(wordWiperBars, 2, { x: -8, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true })
          .fromTo(wordWipers, 1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'scaleDownStart')
          .staggerFromTo(projectLettersOne, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
          .staggerFromTo(projectLettersTwo, 1.15, { x: 55 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'lettersIn')
          .staggerFromTo(innerEntranceLines, 0.75, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.04, 'startProjectMeta')
          .fromTo(bigPipe, 0.57, { transformOrigin: '50% 0', scaleY: 0 }, { scaleY: 1, ease: Sine.easeInOut }, 'startPipe');
        if (firstLoad) {
          projectEntranceTL.fromTo(globalEls, 1.3, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'startPipe')
        }
        
        TweenMax.delayedCall(0.2, () => {
          projectEntranceTL.play();
        });
      }
      break;
    
    case '404':
      const notFoundEntranceTL = new TimelineMax({ paused: true });

      const splitNotFoundByLines = document.querySelector('.bio');
      const splitNotFoundLines = new SplitText(splitNotFoundByLines, { type: 'lines' }).lines;
      const notFoundParaLines = new SplitText(splitNotFoundLines, { type: 'lines' }).lines;

      const notFoundWelcomeByLines = document.querySelectorAll('.welcome');
      const notFoundWelcomeLines = new SplitText(notFoundWelcomeByLines, { type: 'lines' }).lines;
      const innerNotFoundParaLines = new SplitText(notFoundWelcomeLines, { type: 'lines' }).lines;

      const notFoundWipers = document.querySelectorAll('.you-can .wiper');
      const notFoundWiperBars = document.querySelectorAll('.you-can .wiper span');
      const notFoundLettersOne = document.querySelectorAll('.you-can .line-1 .svg-wrapper-inner path');
      const notFoundLettersTwo = document.querySelectorAll('.you-can .line-2 .svg-wrapper-inner path');

      const notFoundBeacon = document.querySelector('.beacon');
      const notFoundFadeEls = document.querySelector('.global-els');

      notFoundEntranceTL
        .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
        .add('start')
        .add('startTwo', '+=.4');
      if (firstLoad) {
        notFoundEntranceTL
          .add('welcomeStart', '+=1.25')
          .add('bioStart', '+=1.95');
      } else {
        notFoundEntranceTL
          .add('welcomeStart', '+=.25')
          .add('bioStart', '+=.55');
      }
      notFoundEntranceTL
        .fromTo(notFoundWiperBars, 2.18, { x: 0, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true })
        .fromTo(notFoundWipers, 1.08, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'start')
        .staggerFromTo(notFoundLettersOne, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startTwo')
        .staggerFromTo(notFoundLettersTwo, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startTwo');
      if (firstLoad) {
        notFoundEntranceTL
          .staggerFromTo(innerNotFoundParaLines, 1.1, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(notFoundParaLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart')
      } else {
        notFoundEntranceTL
          .staggerFromTo(innerNotFoundParaLines, 0.76, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(notFoundParaLines, 0.76, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart');
      }
      notFoundEntranceTL
        .add('fadeAndScale', '-=.3')
        .fromTo(notFoundFadeEls, 1, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'fadeAndScale')
        .fromTo(notFoundBeacon, 1, { scale: 0 }, { scale: 1.1, ease: Sine.easeIn }, 'fadeAndScale')
        .to(notFoundBeacon, 0.5, { scale: 0.82, ease: Sine.easeOut })
        .to(notFoundBeacon, 0.85, { scale: 1, ease: Sine.easeInOut });


      TweenMax.delayedCall(0.5, () => {
        notFoundEntranceTL.play();
      });
      break;
    
    default:

      break;
  }
};


/**

 Global open/close project menu
 ------------------------------

 -------------------------------------------------- * */
export const openCloseProjectsMenu = () => {
  const projectsTrigger = document.querySelector('.email-triggers .projects-trigger');
  const projectsContainer = document.querySelector('.projects-wrapper');
  const projectsContainerWrapper = document.querySelector('.vert-holder');
  const switchOverlay = document.querySelector('.switch-overlay');
  const openMenuTL = new TimelineMax({ paused: true });
  const wordWipers = projectsContainer.querySelectorAll('.large-svg-title .wiper');
  const wordWiperBars = projectsContainer.querySelectorAll('.large-svg-title .wiper span');
  const numWipers = projectsContainer.querySelectorAll('.projects .wiper');
  const numWiperBars = projectsContainer.querySelectorAll('.projects .wiper span');
  const numbersOne = projectsContainer.querySelectorAll('.project-link:first-child path');
  const numbersTwo = projectsContainer.querySelectorAll('.project-link:nth-child(2) path');
  const numbersThree = projectsContainer.querySelectorAll('.project-link:nth-child(3) path');
  const numbersFour = projectsContainer.querySelectorAll('.project-link:nth-child(4) path');
  const lettersOne = projectsContainer.querySelectorAll('.large-svg-title .svg-wrapper:first-child path');
  const lettersTwo = projectsContainer.querySelectorAll('.large-svg-title .svg-wrapper:last-child path');
  const closeTrigger = document.querySelector('.vert-holder > .close');
  const closeBars = closeTrigger.querySelectorAll('span');

  const splitByLines = document.querySelectorAll('.projects-wrapper .text-wrapper > *');
  const splitLines = new SplitText(splitByLines, { type: 'lines' }).lines;
  const innerLines = new SplitText(splitLines, { type: 'lines' }).lines;

  const innerLinesOne = document.querySelectorAll('.projects-wrapper .project-link:first-child .text-wrapper div div');
  const innerLinesTwo = document.querySelectorAll('.projects-wrapper .project-link:nth-child(2) .text-wrapper div div');
  const innerLinesThree = document.querySelectorAll('.projects-wrapper .project-link:nth-child(3) .text-wrapper div div');
  const innerLinesFour = document.querySelectorAll('.projects-wrapper .project-link:nth-child(4) .text-wrapper div div');

  const fadeEls = document.querySelectorAll('.vert-left .meta, .scroll-prompt, .socials, .email-triggers .email');
  const scrollPrompt = document.querySelector('.scroll-prompt');

  openMenuTL
    .set('.global-els', { pointerEvents: 'all' })
    .set(projectsContainer, { className: '+=open' })
    .fromTo(switchOverlay, 0.35, { autoAlpha: 0 }, { autoAlpha: 1, ease: Sine.easeInOut, force3D: true })
    .fromTo(projectsContainer, 0.001, { pointerEvents: 'none', autoAlpha: 0 }, { pointerEvents: 'all', autoAlpha: 1 })
    .add('wordsStart')
    .add('lettersIn', '+=.25')
    .add('numsStart', '+=.05')
    .add('numsWipersCollapse', '+=.055')
    .add('numsStartTwo', '+=.26')
    // .add('numsCharsStart', '+=.2')
    .add('linesUpStart', '+=.35')
    .fromTo(wordWiperBars, 2.05, { x: -15, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true })
    .fromTo(wordWipers, 0.95, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'wordsStart')
    .staggerFromTo(lettersOne, 1.12, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.03, 'lettersIn')
    .staggerFromTo(lettersTwo, 1.12, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.03, 'lettersIn')
    .fromTo(numWiperBars, 1.6, { x: -5, scaleX: 0 }, { x: 60, scaleX: 1, ease: Expo.easeOut, force3D: true }, 'numsStart')
    .fromTo(numWipers, 0.9, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'numsWipersCollapse')
    .staggerFromTo(numbersOne, 1.2, { x: 70 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.06, 'numsStartTwo')
    .staggerFromTo(numbersTwo, 1.2, { x: 70 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.06, 'numsStartTwo')
    .staggerFromTo(numbersThree, 1.2, { x: 70 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.06, 'numsStartTwo')
    .staggerFromTo(numbersFour, 1.2, { x: 70 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.06, 'numsStartTwo')
    // .fromTo(innerCopyLines, 0.95, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.165)
    .staggerFromTo(innerLinesOne, 0.8, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.016, 'linesUpStart')
    .staggerFromTo(innerLinesTwo, 0.8, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.016, 'linesUpStart')
    .staggerFromTo(innerLinesThree, 0.8, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.016, 'linesUpStart')
    .staggerFromTo(innerLinesFour, 0.8, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.016, 'linesUpStart')
    .staggerFromTo(closeBars, 0.6, { scaleX: 0 }, { scaleX: 1, ease: Expo.easeInOut }, 0.08, 'linesUpStart');

  globalObject.openCloseMenu = openMenuTL;
  let currentOpacity;
  projectsTrigger.addEventListener('click', () => {
    if (globalObject.openCloseCount % 2 === 0) {
      currentOpacity = window.getComputedStyle(document.querySelector('.vert-left .meta')).getPropertyValue('opacity');
      projectsContainer.scrollTop = 0;
      openMenuTL.timeScale(1).play();
      TweenMax.to(fadeEls, 0.5, { opacity: 1, ease: Sine.easeInOut, force3D: true, onComplete: () => { TweenMax.set(fadeEls, { clearProps: 'opacity' }); } });
      TweenMax.to(scrollPrompt, 0.5, { opacity: 0, ease: Sine.easeInOut, force3D: true });
    } else {
      openMenuTL.timeScale(1.3).reverse();
      TweenMax.to(fadeEls, 0.5, { opacity: currentOpacity, ease: Sine.easeInOut, force3D: true });
      TweenMax.to(scrollPrompt, 0.8, { opacity: 1, ease: Sine.easeInOut, force3D: true });
    }
    globalObject.openCloseCount++;
  });

  closeTrigger.addEventListener('click', () => {
    openMenuTL.timeScale(1.3).reverse();
    TweenMax.to(fadeEls, 0.5, { opacity: currentOpacity, ease: Sine.easeInOut, force3D: true });
    TweenMax.to(scrollPrompt, 0.8, { opacity: 1, ease: Sine.easeInOut, force3D: true });
    globalObject.openCloseCount++;
  });

  document.addEventListener('keyup', (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && globalObject.openCloseCount % 2 !== 0) {
      openMenuTL.timeScale(1.3).reverse();
      globalObject.openCloseCount++;
    }
  });
};
