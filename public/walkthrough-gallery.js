import { walkthroughCatalog } from './walkthrough-catalog.js?v=5';

const root = document.querySelector('#screen-tour');
if (root) {
  let project = 'web';
  const positions = { web: 0, app: 0 };
  const find = (selector) => root.querySelector(selector);
  const list = find('#tour-list');
  const select = find('#tour-select');
  const image = find('#tour-image');
  const previous = find('#tour-previous');
  const next = find('#tour-next');

  function render() {
    const screens = walkthroughCatalog[project];
    const index = positions[project];
    const screen = screens[index];
    root.dataset.project = project;
    root.querySelectorAll('[data-tour-project]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.tourProject === project));
    });
    list.querySelectorAll('button').forEach((button, step) => {
      if (step === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    select.value = String(index);
    previous.disabled = index === 0;
    next.disabled = index === screens.length - 1;
    find('#tour-position').textContent = `${project === 'web' ? 'Web' : 'App'} · ${index + 1} / ${screens.length}`;
    image.src = screen.image;
    image.alt = `${project === 'web' ? 'Web admin' : 'Mobile app browser'} preview: ${screen.title}. Fictional demo data.`;
    find('#tour-image-link').href = screen.image;
    find('#tour-image-link').setAttribute('aria-label', `Open ${screen.title} preview at full size`);
    find('#tour-title').textContent = screen.title;
    find('#tour-description').textContent = screen.description;
    find('#tour-note').textContent = project === 'web'
      ? 'Web previews use fictional data and a simulated admin session. Available actions depend on the signed-in role. Email, notifications, and activity logs are outside the supplied walkthrough.'
      : 'App previews render React Native screens through a browser adapter with fictional records and mocked services. They are not native Android or iOS screenshots; platform controls and layout may differ.';
  }

  function changeScreen(index) {
    if (!Number.isInteger(index) || index < 0 || index >= walkthroughCatalog[project].length) return;
    positions[project] = index;
    render();
  }

  function changeProject(value) {
    if (!Object.hasOwn(walkthroughCatalog, value)) return;
    project = value;
    const buttons = [];
    const options = [];
    walkthroughCatalog[project].forEach((screen, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${String(index + 1).padStart(2, '0')} / ${screen.title}`;
      button.addEventListener('click', () => changeScreen(index));
      buttons.push(button);
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${index + 1}. ${screen.title}`;
      options.push(option);
    });
    list.replaceChildren(...buttons);
    select.replaceChildren(...options);
    render();
  }

  previous.addEventListener('click', () => changeScreen(positions[project] - 1));
  next.addEventListener('click', () => changeScreen(positions[project] + 1));
  select.addEventListener('change', () => changeScreen(Number(select.value)));
  root.querySelectorAll('[data-tour-project]').forEach((button) => {
    button.addEventListener('click', () => changeProject(button.dataset.tourProject));
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-demo-view-link]');
    if (link) changeProject(link.dataset.demoViewLink);
  });
  changeProject(project);
}
