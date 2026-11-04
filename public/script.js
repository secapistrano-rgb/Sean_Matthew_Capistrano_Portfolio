const menuToggle = document.querySelector('.menu-toggle');
const desktopNav = document.querySelector('.desktop-nav');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
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
  localStorage.setItem('portfolio-theme', nextTheme);
  setTheme(nextTheme);
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('open');
  desktopNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

desktopNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    desktopNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

const projectDetails = {
  'lost-found': {
    kicker: 'Capstone · Full-stack development',
    title: 'CSPC Lost & Found Management System',
    description: 'A cross-platform system that helps CSPC students report, discover, and recover lost items. The project combines a mobile experience with a web management flow and AI-powered image recognition.',
    role: 'Full-stack developer',
    stack: 'PHP · CodeIgniter4 · React Native · Google Cloud · MySQL',
    image: '/assets/cspc-lost-found-dashboard.jpg',
    alt: 'CSPC Lost and Found web dashboard'
  },
  'job-operations': {
    kicker: 'Workflow · Web development',
    title: 'Job Operations Central Management System',
    description: 'A centralized operations tool for scheduling tasks, organizing records, routing work, and keeping teams aligned through clear workflow status updates.',
    role: 'Programmer intern',
    stack: 'PHP · CodeIgniter4 · Google Cloud · MySQL · Git',
    image: '/assets/job-operations.webp',
    alt: 'Job Operations Central Management System sign-in screen'
  },
  'lost-found-dashboard': {
    kicker: 'Capstone · Web dashboard',
    title: 'Lost & Found Management Dashboard',
    description: 'An administrative dashboard for monitoring item reports, claims, matches, activity, and returned items across the CSPC Lost & Found system.',
    role: 'Full-stack developer',
    stack: 'PHP · CodeIgniter4 · MySQL · REST API · Google Cloud',
    image: '/assets/cspc-lost-found-dashboard.jpg',
    alt: 'CSPC Lost and Found web dashboard'
  },
  'lost-found-mobile': {
    kicker: 'Capstone · Mobile experience',
    title: 'Lost & Found Mobile Experience',
    description: 'A focused mobile interface for browsing lost and found reports, filtering item status, and quickly reviewing item details across the CSPC community.',
    role: 'Full-stack developer',
    stack: 'React Native · JavaScript · REST API · MySQL · Google Cloud',
    image: '/assets/cspc-lost-found-mobile.jpg',
    alt: 'CSPC Lost and Found mobile item list'
  }
};

const projectModal = document.querySelector('#project-modal');
const modalImage = document.querySelector('#modal-image');
const modalKicker = document.querySelector('#modal-kicker');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalRole = document.querySelector('#modal-role');
const modalStack = document.querySelector('#modal-stack');

const openProjectModal = (projectKey) => {
  const project = projectDetails[projectKey];
  if (!project) return;
  modalImage.src = project.image;
  modalImage.alt = project.alt;
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  modalStack.textContent = project.stack;
  projectModal.showModal();
};

document.querySelectorAll('[data-project]').forEach((projectLink) => {
  projectLink.addEventListener('click', (event) => {
    event.preventDefault();
    openProjectModal(projectLink.dataset.project);
  });
});

document.querySelector('.modal-close').addEventListener('click', () => projectModal.close());
projectModal.addEventListener('click', (event) => {
  if (event.target === projectModal) projectModal.close();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
