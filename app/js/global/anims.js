import { TimelineMax, Sine, TweenMax, Expo } from 'gsap';
import { SplitText } from '../thirdparty/SplitText';
import { globalObject } from '../_functions';

export const prepScrollPrompt = (context) => {
  //   0: home  1: project
  const prompts = document.querySelectorAll('.scroll-prompt p span');
  const homeLetters = prompts[0].querySelectorAll('div div');
  const projectLetters = prompts[1].querySelectorAll('div div');
  const promptArrow = document.querySelector('.scroll-prompt .arrow');
  
  switch (context) {
    case 'home':
      TweenMax.set([homeLetters, projectLetters, promptArrow], { clearProps: 'transform, opacity, visibility' });
      TweenMax.set(prompts, { display: 'none' });
      TweenMax.set(prompts[0], { display: 'block' });
      break;
    case 'project':
      TweenMax.set([homeLetters, projectLetters, promptArrow], { clearProps: 'transform, opacity, visibility' });
      TweenMax.set(prompts, { display: 'none' });
      TweenMax.set(prompts[1], { display: 'block' });
      break;
    default:

      break;
  }
};

export const prepProfileDrawer = () => {
  const profileTrigger = document.querySelector('.profile-trigger');
  const profileTray = document.querySelector('.los-detalles');
  const shiftThese = document.querySelectorAll('[data-router-wrapper]');
  const shiftTheseGlobals = document.querySelectorAll('.vert-left, .email-triggers, .scroll-prompt');
  const closeMask = document.querySelector('.close-mask');
  const logo = document.querySelector('.logo');

  const openCloseProfile = new TimelineMax({paused: true});
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

  openCloseProfile
    .staggerFromTo(innerProfileBioLines, 0.9, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045)
    .fromTo(innerLabelLines, 1.05, { yPercent: 87 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0)
    .fromTo(innerCopyLines, 0.95, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.165)
    .fromTo(splitCopyUnderlines, 0.52, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut, force3D: true }, '-=.39')
    .staggerFromTo(innerCopyStaggerLines, 0.95, { yPercent: 92 }, { yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.025, 0.15);

  profileTrigger.addEventListener('click', () => {
    openCloseProfile.timeScale(1).play();
    TweenMax.set(closeMask, { display: 'block' });
    TweenMax.to(shiftThese, 1, { scale: 1, opacity: 0.2, y: -60, ease: Expo.easeOut, force3D: true });
    TweenMax.to(shiftTheseGlobals, 1.1, { opacity: 0.3, y: -21, ease: Expo.easeOut, force3D: true });
    TweenMax.to(logo, 1.1, { y: 4, ease: Expo.easeOut, force3D: true });
    TweenMax.to(profileTray, 1.1, { yPercent: -100, ease: Expo.easeOut, force3D: true });
  });
  
  closeMask.addEventListener('click', () => {
    TweenMax.delayedCall(0.25, () => { openCloseProfile.progress(0).reverse(); });
    TweenMax.set(closeMask, { display: 'none' });
    TweenMax.to(shiftThese, 1, { scale: 1, opacity: 1, y: 0, ease: Expo.easeOut, force3D: true });
    TweenMax.to(shiftTheseGlobals, 1.1, { opacity: 1, y: 0, ease: Expo.easeOut, force3D: true });
    TweenMax.to(logo, 1.1, { y: 0, ease: Expo.easeOut, force3D: true });
    TweenMax.to(profileTray, 1, { yPercent: 0, ease: Expo.easeOut, force3D: true });
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

      const vertLeft = document.querySelector('.vert-left');
      const youCan = document.querySelector('.you-can');
      const wipers = document.querySelectorAll('.you-can .wiper');
      const wiperBars = document.querySelectorAll('.you-can .wiper span');
      const lettersOne = document.querySelectorAll('.you-can .line-1 .svg-wrapper-inner path');
      const lettersTwo = document.querySelectorAll('.you-can .line-2 .svg-wrapper-inner path');

      const beacon = document.querySelector('.beacon');
      const availability = document.querySelector('.availability');
      const globalEls = document.querySelectorAll('.vert-left, .email-triggers, .scroll-prompt');
      const beaconTL = new TimelineMax({ repeat: -1, paused: true });

      beaconTL
        .fromTo(beacon, 1, { immediateRender: false, scale: 1 }, { scale: 0.7, ease: Sine.easeOut })
        .to(beacon, 1.85, { scale: 1.1, ease: Sine.easeInOut });
      
      const beaconPlay = () => {
        TweenMax.fromTo(beacon, 1.1, { scale: 0 }, { scale: 1, ease: Expo.easeInOut, onComplete: () => {
          beaconTL.play();
        } });
      };

      homeEntranceTL
        .to('.global-mask', 0.001, { pointerEvents: 'none', autoAlpha: 0 })
        .add('start')
        .add('returnVert', '+=.85')
        .add('startTwo', '+=.6')
        .add('startThree', '+=1');
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
        .fromTo(wiperBars, 2.1, { x: 0, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: true }, 'startTwo')
        .fromTo(wipers, 1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: true }, 'startTwo')
        .staggerFromTo(lettersOne, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startThree')
        .staggerFromTo(lettersTwo, 1.15, { x: 50 }, { x: 0, ease: Expo.easeOut, force3D: true }, 0.035, 'startThree');
      if (firstLoad) {
        homeEntranceTL
          .fromTo(globalEls, 1.3, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'bioStart')
          .staggerFromTo(innerWelcomeLines, 1.1, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(innerBioLines, 0.78, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart');
      } else {
        homeEntranceTL
          .fromTo(youCan, 2.1, { x: 20 }, { x: 0, ease: Expo.easeOut, force3D: true }, 'startTwo')
          .fromTo(vertLeft, 0.35, { x: 0, opacity: 1, scale: 1 }, { x: -25, opacity: 0.3, scale: 1, ease: Sine.easeOut, force3D: true }, 'start')
          .to(vertLeft, 0.5, { x: 0, opacity: 1, scale: 1, ease: Sine.easeOut, force3D: true }, 'returnVert')
          .staggerFromTo(innerWelcomeLines, 0.76, { skewY: 0, yPercent: 101 }, { skewY: 0, yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'welcomeStart')
          .staggerFromTo(innerBioLines, 0.76, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.045, 'bioStart');
      }
      homeEntranceTL
        .add('fadeAndScale', '-=.3')
        .fromTo(availability, 1, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'fadeAndScale')
        .fromTo('.availability p', 1.55, { x: 0 }, { x: 17, ease: Expo.easeInOut }, '+=0')
        .add(beaconPlay, '-=1.25');


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
          projectEntranceTL.fromTo(globalEls, 1.3, { opacity: 0 }, { opacity: 1, ease: Sine.easeInOut }, 'startPipe'); 
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
          .add('introIn', '-=.8')
          .staggerFromTo(innerIntroLines, 0.75, { yPercent: 101 }, { yPercent: 0, ease: Sine.easeInOut, force3D: true }, 0.05, 'introIn');

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
          .add('lettersIn', '+=.32')
          .fromTo(wordWiperBars, 2, { x: -5, scaleX: 0 }, { x: 90, scaleX: 1, ease: Expo.easeOut, force3D: false })
          .fromTo(wordWipers, 1, { scaleX: 1 }, { scaleX: 0, ease: Expo.easeInOut, force3D: false }, 'wordsStart')
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
  const projectsTrigger = document.querySelector('.email-triggers .projects-trigger');
  const projectsContainer = document.querySelector('.projects-wrapper');
  const switchOverlay = document.querySelector('.switch-overlay');
  const openMenuTL = new TimelineMax({ paused: true });
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
  let currentOpacity;
  projectsTrigger.addEventListener('click', () => {
    if (globalObject.openCloseCount % 2 === 0) {
      currentOpacity = window.getComputedStyle(document.querySelector('.vert-left .meta')).getPropertyValue('opacity');
      openMenuTL.timeScale(1).play();
      TweenMax.to(fadeEls, 0.5, { opacity: 1, ease: Sine.easeInOut, force3D: true, onComplete: () => { TweenMax.set(fadeEls, { clearProps: 'opacity' }) } });
      TweenMax.to(scrollPrompt, 0.5, { opacity: 0, ease: Sine.easeInOut, force3D: true });
    } else {
      openMenuTL.timeScale(1.2).reverse();
      TweenMax.to(fadeEls, 0.8, { opacity: currentOpacity, ease: Sine.easeInOut, force3D: true });
      TweenMax.to(scrollPrompt, 0.8, { opacity: 1, ease: Sine.easeInOut, force3D: true });
    }
    globalObject.openCloseCount++;
  });

  document.addEventListener('keyup', (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && globalObject.openCloseCount % 2 !== 0) {
      openMenuTL.timeScale(1).reverse();
      globalObject.openCloseCount++;
    }
  });
};
