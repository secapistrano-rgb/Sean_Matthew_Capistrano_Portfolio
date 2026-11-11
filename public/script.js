const menuToggle = document.querySelector('.menu-toggle');
const desktopNav = document.querySelector('.desktop-nav');
const themeToggle = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be disabled. */ }
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

const setTheme = (theme) => {
  const isLight = theme === 'light';
  document.documentElement.classList.toggle('light-theme', isLight);
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeToggle.querySelector('.theme-icon').textContent = isLight ? '☀' : '☾';
};

setTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.classList.contains('light-theme') ? 'dark' : 'light';
  try { localStorage.setItem('portfolio-theme', nextTheme); } catch { /* Theme still works without storage. */ }
  setTheme(nextTheme);
});

const setMenu = (isOpen) => {
  menuToggle.classList.toggle('open', isOpen);
  desktopNav.classList.toggle('open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  document.querySelectorAll('main, .site-footer').forEach((element) => {
    element.inert = isOpen;
  });
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  if (isOpen) desktopNav.querySelector('a').focus();
};

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

desktopNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenu(false);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

const projectDetails = {
  'portfolio': {
    kicker: 'Personal project · Web development',
    title: 'Personal Portfolio Website',
    description: 'A personal website created to present my work, technical background, and contact information to potential employers and collaborators. The portfolio uses HTML, CSS, and vanilla JavaScript for the interface, with Node.js and Express serving the site and its local assets. The design brings together project case studies, technology badges, education, experience, and a downloadable PDF resume in a responsive layout.',
    period: 'November 2026 · Ongoing improvements',
    features: ['Responsive desktop and mobile layouts with a mobile navigation menu.', 'Light and dark themes with a saved preference.', 'Project dialogs covering features, contributions, timelines, and technology stacks.', 'A skippable welcome, scroll reveals, typing headlines, and a hanging ID card with cursor tracking.', 'Resume download, social profiles, and direct contact links.', 'Reduced-motion support and keyboard focus indicators.'],
    contributions: ['Built and refined the page layout, typography, and responsive CSS.', 'Implemented JavaScript interactions for themes, navigation, project dialogs, and animations.', 'Organized project information, resume details, and local technology icons.', 'Configured the Express server and published the website with source code on GitHub.'],
    outcome: 'Published as a live portfolio showcasing my projects and professional background, with a downloadable resume and direct ways to get in touch.',
    role: 'Web developer',
    stack: 'HTML · CSS · JavaScript · Node.js · Express.js · GitHub',
    image: '/assets/portfolio-preview.svg',
    alt: 'Illustrated preview of the portfolio website’s introduction and hanging developer ID card',
    links: [{ label: 'Live website', url: 'https://sean-matthew-capistrano.vercel.app' }, { label: 'Source code', url: 'https://github.com/secapistrano-rgb/Sean_Matthew_Capistrano_Portfolio' }]
  },
  'lost-found': {
    kicker: 'Capstone · Full-stack development',
    title: 'CSPC Lost & Found Management System',
    description: 'A web and mobile capstone developed for Camarines Sur Polytechnic Colleges to support lost-item reporting, tracking, and management. The system combines a student-facing mobile experience with a web management interface and AI-powered image recognition. A shared database and REST APIs connect these experiences so item information can move between the app and the management workflows.',
    period: 'March 2025 – January 2026',
    features: ['Lost and found item reporting, browsing, and tracking.', 'AI-powered image recognition supporting item matching.', 'A web dashboard for managing reports, claims, and item activity.', 'A connected mobile app for students in the CSPC community.'],
    contributions: ['Developed frontend, backend, and mobile functionality as a full-stack developer.', 'Designed and managed MySQL database structures for item records.', 'Integrated REST APIs connecting the web and mobile experiences.', 'Collaborated with teammates using Git and Agile-inspired development practices.'],
    outcome: 'Capstone project grade: 1.25. Qualified research presenter at the 9th Bicol ICT Research Colloquium at CSPC.',
    role: 'Full-stack developer',
    stack: 'React · React Native · Node.js · PHP · CodeIgniter 4 · MySQL · Firebase · REST APIs · Google Cloud · GitHub',
    image: '/assets/cspc-lost-found-dashboard.jpg',
    alt: 'CSPC Lost and Found web dashboard',
    links: [{ label: 'Source code', url: 'https://github.com/secapistrano-rgb/lost-and-found-web-cspc' }]
  },
  'job-operations': {
    kicker: 'Workflow · Web development',
    title: 'Job Operations Central Management System',
    description: 'A centralized web-based management system developed during my programmer internship to support task scheduling, job records, and workflow automation. The project focused on organizing operational information and making work processes easier to manage. My role combined feature development with testing and debugging, working alongside team members and supervisors throughout development.',
    period: 'February – June 2026',
    features: ['Task scheduling to organize operational work.', 'Centralized records for job-related information.', 'Workflow automation and process management.'],
    contributions: ['Assisted with frontend and backend development using HTML, CSS, JavaScript, PHP, and MySQL.', 'Tested application behavior and debugged issues to improve reliability.', 'Supported organized records and workflow improvements.', 'Collaborated with teammates and supervisors using Git for version control.'],
    outcome: 'Contributed to operational efficiency through organized records and process management during the internship project.',
    role: 'Programmer intern',
    stack: 'HTML · CSS · JavaScript · PHP · MySQL · Git',
    image: '/assets/job-operations.webp',
    alt: 'Job Operations Central Management System sign-in screen',
    links: [{ label: 'Source code', url: 'https://github.com/kebuquid/ictu_job_ops_v2' }]
  },
  'lost-found-dashboard': {
    kicker: 'Capstone · Web dashboard',
    title: 'Lost & Found Management Dashboard',
    description: 'An administrative dashboard for monitoring item reports, claims, matches, activity, and returned items across the CSPC Lost & Found system.',
    period: 'March 2025 – January 2026 · Part of the CSPC capstone',
    features: ['An overview of item reports and activity.', 'Monitoring of claims, matches, and returned items.', 'Web-based management of lost and found records.'],
    contributions: ['Contributed to the web management interface as part of full-stack development.', 'Worked on MySQL data structures and REST API integration for the capstone.', 'Collaborated on connected web and mobile workflows.'],
    outcome: 'The web management component of the CSPC capstone, which received a project grade of 1.25.',
    role: 'Full-stack developer',
    stack: 'PHP · CodeIgniter4 · MySQL · REST API · Google Cloud',
    image: '/assets/cspc-lost-found-dashboard.jpg',
    alt: 'CSPC Lost and Found web dashboard',
    links: [{ label: 'Source code', url: 'https://github.com/secapistrano-rgb/lost-and-found-web-cspc' }]
  },
  'lost-found-mobile': {
    kicker: 'Capstone · Mobile experience',
    title: 'Lost & Found Mobile Experience',
    description: 'The mobile component of the CSPC Lost & Found Management System, built with React Native for students to access lost and found information on their phones. The interface supports browsing reports, filtering item status, reviewing details, and reporting or tracking items. REST API integration connects these mobile workflows to the shared backend used by the web management system.',
    period: 'March 2025 – January 2026 · Part of the CSPC capstone',
    features: ['Mobile browsing of lost and found item reports.', 'Item-status filtering and detailed report views.', 'Item reporting and tracking from a student-facing interface.', 'REST API integration with the shared management backend.'],
    contributions: ['Developed React Native interfaces as part of the full-stack capstone team.', 'Connected mobile screens with backend data through REST APIs.', 'Worked on reporting, tracking, and item-management functionality across the system.', 'Collaborated on database integration and shared web and mobile workflows.'],
    outcome: 'The student-facing app within the CSPC capstone, which received a project grade of 1.25.',
    role: 'Full-stack developer',
    stack: 'React Native · JavaScript · Node.js · REST API · MySQL · Google Cloud · GitHub',
    image: '/assets/walkthrough/all/app/02-home.png?v=fed26bd7',
    alt: 'CSPC Lost and Found mobile item list',
    links: [{ label: 'Source code', url: 'https://github.com/secapistrano-rgb/lost-and-found-app-cspc' }]
  }
};

// Engineering summaries grounded in project materials, rather than invented personal anecdotes.
const buildStories = {
  'lost-found': {
    note: 'Based on the CSPC walkthrough and claim-management controller.',
    challenge: 'A visually similar item is a useful lead, but a match score alone cannot establish ownership. Approval also needs to stay distinct from the actual return.',
    solution: 'The web workflow separates item records, match review, and ownership claims. The claim controller keeps items active after approval, then marks the lost record claimed and the found record returned when the case is resolved.',
    lesson: 'Model the human decision and the physical handover as separate states. Automated suggestions help narrow a search; evidence and review determine the next action.'
  },
  'job-operations': {
    note: 'Based on the repository overview and documented internship contributions.',
    challenge: 'Job requests need a central record so the interface and backend refer to the same work instead of treating each screen as an isolated task.',
    solution: 'The project uses CodeIgniter 4 with MySQL to handle ICTU job-request tickets. Documented contributions include frontend and backend development, testing, debugging, organized records, and collaboration through Git.',
    lesson: 'For an operations tool, useful structure comes from clear records and predictable workflows. Check the interface and data handling together when changing a feature.'
  },
  'lost-found-mobile': {
    note: 'Based on the mobile reporting screen and its shared API flow.',
    challenge: 'A mobile report needs to turn photos, categories, locations, and identifying details into a consistent record for the backend.',
    solution: 'The reporting screen validates input, checks similar items, tracks loading states, and constructs a structured item payload. It passes image references in the array format expected by the backend before calling the item-creation service.',
    lesson: 'Keep the mobile-to-API contract explicit. Input validation and visible loading or error states matter just as much as the finished screen.'
  },
  'portfolio': {
    note: 'Based on this portfolio’s interaction and responsive-layout code.',
    challenge: 'Typing effects, scroll reveals, and a moving ID card need to coexist with readable text, small screens, and reduced-motion preferences.',
    solution: 'Intersection observers trigger reveals, each headline keeps its accessible name, and reduced-motion settings bypass the animation. Mouse-only ID tracking is separated from the falling-card wrapper, while the mobile caption sits below the photo.',
    lesson: 'Build motion as an enhancement to a readable page. Separate animation responsibilities so responsive fixes and accessibility preferences remain manageable.'
  }
};
buildStories['lost-found-dashboard'] = buildStories['lost-found'];
Object.entries(buildStories).forEach(([key, story]) => { projectDetails[key].buildStory = story; });
['lost-found', 'lost-found-dashboard', 'lost-found-mobile'].forEach((key) => { projectDetails[key].walkthrough = true; });

const projectModal = document.querySelector('#project-modal');
const modalImage = document.querySelector('#modal-image');
const modalKicker = document.querySelector('#modal-kicker');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalRole = document.querySelector('#modal-role');
const modalStack = document.querySelector('#modal-stack');
const modalPeriod = document.querySelector('#modal-period');
const modalFeatures = document.querySelector('#modal-features');
const modalContributions = document.querySelector('#modal-contributions');
const modalOutcome = document.querySelector('#modal-outcome');
const modalProjectLinks = document.querySelector('#modal-project-links');
const modalStory = document.querySelector('#modal-story');
const modalStoryNote = document.querySelector('#modal-story-note');

const renderBuildStory = (story) => {
  modalStoryNote.textContent = story.note;
  modalStory.replaceChildren(...[['Challenge', story.challenge], ['Solution', story.solution], ['Lesson', story.lesson]].map(([label, description]) => {
    const block = document.createElement('div');
    const term = document.createElement('dt');
    term.textContent = label;
    const detail = document.createElement('dd');
    detail.textContent = description;
    block.append(term, detail);
    return block;
  }));
};

const projectTechIcons = new Map([
  ['React', 'react'], ['React Native', 'react'], ['Node.js', 'nodejs'],
  ['PHP', 'php'], ['CodeIgniter 4', 'codeigniter'], ['CodeIgniter4', 'codeigniter'],
  ['MySQL', 'mysql'], ['Firebase', 'firebase'], ['REST APIs', 'api'], ['REST API', 'api'],
  ['Google Cloud', 'googlecloud'], ['Git', 'git'], ['GitHub', 'github'], ['HTML', 'html'],
  ['CSS', 'css'], ['JavaScript', 'javascript'], ['Express.js', 'express']
]);

const renderProjectStack = (stack) => {
  modalStack.replaceChildren(...stack.split(' · ').map((name) => {
    const badge = document.createElement('li');
    badge.className = 'project-tech-badge';
    const icon = projectTechIcons.get(name);
    if (icon) {
      const image = document.createElement('img');
      image.src = `/assets/tech/${icon}.svg`;
      image.alt = '';
      if (icon === 'github' || icon === 'express') image.className = 'tech-logo-monochrome';
      image.width = 18;
      image.height = 18;
      badge.append(image);
    }
    badge.append(document.createTextNode(name));
    return badge;
  }));
};

const renderProjectList = (container, items) => {
  container.replaceChildren(...items.map((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));
};

const openProjectModal = (projectKey) => {
  const project = projectDetails[projectKey];
  if (!project) return;
  modalImage.src = project.image;
  modalImage.alt = project.alt;
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  renderProjectStack(project.stack);
  modalPeriod.textContent = project.period;
  renderProjectList(modalFeatures, project.features);
  renderProjectList(modalContributions, project.contributions);
  modalOutcome.textContent = project.outcome;
  renderBuildStory(project.buildStory);
  modalProjectLinks.replaceChildren(...(project.links || []).map(({ label, url }) => {
    const link = document.createElement('a');
    link.className = 'project-details-link';
    link.textContent = label;
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }));
  if (project.walkthrough) {
    const walkthroughLink = document.createElement('a');
    walkthroughLink.className = 'project-details-link';
    walkthroughLink.textContent = 'Try the walkthrough';
    walkthroughLink.href = '#walkthrough';
    walkthroughLink.dataset.demoViewLink = project === projectDetails['lost-found-mobile'] ? 'app' : 'web';
    walkthroughLink.addEventListener('click', () => projectModal.close());
    modalProjectLinks.append(walkthroughLink);
  }
  modalProjectLinks.hidden = !project.links?.length && !project.walkthrough;
  projectModal.showModal();
  projectModal.scrollTop = 0;
};

document.querySelectorAll('[data-project]').forEach((projectLink) => {
  projectLink.addEventListener('click', (event) => {
    event.preventDefault();
    openProjectModal(projectLink.dataset.project);
  });
});

document.querySelector('.modal-close').addEventListener('click', () => projectModal.close());
projectModal.addEventListener('click', (event) => {
  const bounds = projectModal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === projectModal && outside) projectModal.close();
});

const navigationLinks = document.querySelectorAll('.desktop-nav a');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const active = entries.find((entry) => entry.isIntersecting);
    if (!active) return;
    navigationLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${active.target.id || 'top'}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('.hero, main section[id]').forEach((section) => sectionObserver.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.hero-intro, .section-note, .about-content > p, .project-description, .service-row p, .competency p, .timeline-place, .timeline-points li, .contact-side > p').forEach((paragraph) => {
  paragraph.classList.add('text-copy');
  const siblings = [...paragraph.parentElement.children].filter((element) => element.matches('p, li'));
  paragraph.style.setProperty('--text-delay', `${Math.min(siblings.indexOf(paragraph), 4) * 60 + 100}ms`);
});

// Replay each reveal when it re-enters from either edge of the viewport.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = [...document.querySelectorAll('.reveal')];
let revealObserver;

const configureMotion = () => {
  revealObserver?.disconnect();
  document.documentElement.classList.remove('motion-enabled');
  revealElements.forEach((element) => {
    element.classList.remove('is-pending', 'is-visible');
  });
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      if (!entry.isIntersecting) {
        const above = entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0);
        element.style.setProperty('--reveal-offset', above ? '-26px' : '26px');
      }
      element.classList.toggle('is-visible', entry.isIntersecting);
      element.classList.toggle('is-pending', !entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  revealElements.forEach((element) => {
    const siblings = [...element.parentElement.children].filter((sibling) => sibling.classList.contains('reveal'));
    element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 2) * 65}ms`);
    const bounds = element.getBoundingClientRect();
    const visible = bounds.bottom > 0 && bounds.top < window.innerHeight - 24;
    element.style.setProperty('--reveal-offset', bounds.bottom <= 0 ? '-26px' : '26px');
    element.classList.toggle('is-visible', visible);
    element.classList.toggle('is-pending', !visible);
    revealObserver.observe(element);
  });
  document.documentElement.classList.add('motion-enabled');
};

configureMotion();
motionPreference.addEventListener('change', configureMotion);

// Give each headline its own typing state, preserving layout and accessible text.
const typingHeadlines = new Map();
document.querySelectorAll('main h1, main h2, main h3:not(.stack-label)').forEach((heading) => {
  const label = [...heading.childNodes].map((node) => node.nodeName === 'BR' ? ' ' : node.textContent).join('');
  heading.setAttribute('aria-label', label);
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const characters = [];
  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    (node.textContent.match(/\s+|\S+/gu) || []).forEach((part) => {
      if (/^\s+$/u.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }
      const word = document.createElement('span');
      word.className = 'typing-word';
      word.setAttribute('aria-hidden', 'true');
      [...part].forEach((character) => {
        const letter = document.createElement('span');
        letter.className = 'typing-char';
        letter.textContent = character;
        characters.push(letter);
        word.append(letter);
      });
      fragment.append(word);
    });
    node.replaceWith(fragment);
  });
  typingHeadlines.set(heading, { characters, timer: undefined, visible: false });
});

let typingObserver;
const stopTyping = (heading, state) => {
  window.clearTimeout(state.timer);
  heading.classList.remove('is-typing');
  state.characters.forEach((letter) => letter.classList.remove('is-current'));
};

const startTyping = (heading, state) => {
  stopTyping(heading, state);
  state.characters.forEach((letter) => letter.classList.remove('is-typed'));
  heading.classList.add('is-typing');
  let index = 0;
  const characterDelay = Math.min(25, 800 / Math.max(1, state.characters.length));
  const typeNextCharacter = () => {
    if (index > 0) state.characters[index - 1].classList.remove('is-current');
    if (index === state.characters.length) {
      stopTyping(heading, state);
      return;
    }
    state.characters[index].classList.add('is-typed', 'is-current');
    index += 1;
    state.timer = window.setTimeout(typeNextCharacter, index === state.characters.length ? 600 : characterDelay);
  };
  state.timer = window.setTimeout(typeNextCharacter, 100);
};

const configureTyping = () => {
  typingObserver?.disconnect();
  typingHeadlines.forEach((state, heading) => {
    stopTyping(heading, state);
    state.visible = false;
  });
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  typingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const state = typingHeadlines.get(entry.target);
      if (entry.isIntersecting === state.visible) return;
      state.visible = entry.isIntersecting;
      if (state.visible) startTyping(entry.target, state);
      else stopTyping(entry.target, state);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  typingHeadlines.forEach((state, heading) => {
    const bounds = heading.getBoundingClientRect();
    state.visible = bounds.bottom > 0 && bounds.top < window.innerHeight - 24;
    if (state.visible) startTyping(heading, state);
    typingObserver.observe(heading);
  });
};

configureTyping();
motionPreference.addEventListener('change', configureTyping);

const siteHeader = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');
let scrollFramePending = false;

const updateScrollUI = () => {
  scrollFramePending = false;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
  document.documentElement.style.setProperty('--scroll-progress', String(progress));
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
  const showBackToTop = window.scrollY > window.innerHeight * .75;
  backToTop.hidden = !showBackToTop;
};

const queueScrollUI = () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  window.requestAnimationFrame(updateScrollUI);
};

window.addEventListener('scroll', queueScrollUI, { passive: true });
window.addEventListener('resize', queueScrollUI);
window.addEventListener('load', queueScrollUI);
if ('ResizeObserver' in window) new ResizeObserver(queueScrollUI).observe(document.body);
updateScrollUI();

backToTop.addEventListener('click', () => {
  document.querySelector('.wordmark').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: motionPreference.matches ? 'auto' : 'smooth' });
});

// Follow the mouse across the introduction without moving the scroll-reveal wrapper.
const heroSection = document.querySelector('.hero');
const portraitCard = document.querySelector('.id-card');
const mousePreference = window.matchMedia('(hover: hover) and (pointer: fine)');
let portraitAnimationFrame = null;
let portraitPointer = { x: 0, y: 0 };

const resetPortrait = () => {
  if (portraitAnimationFrame !== null) window.cancelAnimationFrame(portraitAnimationFrame);
  portraitAnimationFrame = null;
  if (!portraitCard.classList.contains('is-tracking')) return;
  portraitCard.classList.remove('is-tracking');
  ['--portrait-rotate-x', '--portrait-rotate-y', '--portrait-x', '--portrait-y', '--portrait-light-x', '--portrait-light-y'].forEach((property) => portraitCard.style.removeProperty(property));
};

heroSection.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse' || motionPreference.matches || !mousePreference.matches) return;
  portraitPointer = { x: event.clientX, y: event.clientY };
  if (portraitAnimationFrame !== null) return;
  portraitAnimationFrame = window.requestAnimationFrame(() => {
    portraitAnimationFrame = null;
    const bounds = heroSection.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(-1, Math.min(1, (portraitPointer.x - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (portraitPointer.y - bounds.top) / bounds.height * 2 - 1));
    portraitCard.classList.add('is-tracking');
    portraitCard.style.setProperty('--portrait-rotate-x', `${-y * 7}deg`);
    portraitCard.style.setProperty('--portrait-rotate-y', `${x * 9}deg`);
    portraitCard.style.setProperty('--portrait-x', `${x * 6}px`);
    portraitCard.style.setProperty('--portrait-y', `${y * 5}px`);
    portraitCard.style.setProperty('--portrait-light-x', `${(x + 1) * 50}%`);
    portraitCard.style.setProperty('--portrait-light-y', `${(y + 1) * 50}%`);
  });
}, { passive: true });

heroSection.addEventListener('pointerleave', resetPortrait);
heroSection.addEventListener('pointercancel', resetPortrait);
window.addEventListener('blur', resetPortrait);
window.addEventListener('scroll', resetPortrait, { passive: true });
mousePreference.addEventListener('change', resetPortrait);
motionPreference.addEventListener('change', resetPortrait);

// A short, skippable welcome before the introduction; deep links stay direct.
const welcomeScreen = document.querySelector('.welcome-screen');
if (!motionPreference.matches && (!window.location.hash || window.location.hash === '#top') && typeof welcomeScreen.showModal === 'function') {
  let welcomeClosing = false;
  let welcomeTimer;
  typingObserver?.disconnect();
  typingHeadlines.forEach((state, heading) => stopTyping(heading, state));
  document.documentElement.classList.add('welcome-active');
  welcomeScreen.showModal();

  const closeWelcome = () => {
    window.clearTimeout(welcomeTimer);
    welcomeScreen.close();
    document.documentElement.classList.remove('welcome-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('#top').focus({ preventScroll: true });
    configureMotion();
    configureTyping();
    motionPreference.removeEventListener('change', onWelcomeMotionChange);
  };

  const finishWelcome = () => {
    if (welcomeClosing) return;
    welcomeClosing = true;
    window.clearTimeout(welcomeTimer);
    if (motionPreference.matches) closeWelcome();
    else {
      welcomeScreen.classList.add('is-leaving');
      welcomeTimer = window.setTimeout(closeWelcome, 450);
    }
  };

  const onWelcomeMotionChange = () => {
    if (motionPreference.matches) {
      welcomeClosing = true;
      closeWelcome();
    }
  };

  welcomeScreen.querySelector('.welcome-skip').addEventListener('click', finishWelcome);
  welcomeScreen.addEventListener('cancel', (event) => {
    event.preventDefault();
    finishWelcome();
  });
  motionPreference.addEventListener('change', onWelcomeMotionChange);
  welcomeTimer = window.setTimeout(finishWelcome, 2100);
}
