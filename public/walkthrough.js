// Fictional, browser-only scenario. No API calls, uploads, or persistent storage.
export function createWalkthrough() {
  const initial = () => ({ step: 0, unlocked: 0, report: null, match: null, approved: false, returned: false });
  let state = initial();
  const snapshot = () => ({ ...state, report: state.report ? { ...state.report } : null });
  return {
    getState: snapshot,
    reset() { state = initial(); return snapshot(); },
    goTo(step) {
      if (!Number.isInteger(step) || step < 0 || step > state.unlocked) return false;
      state.step = step;
      return true;
    },
    submitReport({ location, description }) {
      const details = String(description || '').trim();
      if (!['Library', 'Library entrance'].includes(location) || details.length < 10 || details.length > 240) return false;
      state = { ...initial(), step: 1, unlocked: 1, report: { title: 'Blue backpack', location, description: details } };
      return true;
    },
    selectMatch(match) {
      if (!state.report || !['backpack', 'wallet'].includes(match)) return false;
      // A new choice invalidates any claim or handover reached with the old one.
      if (state.match !== match) {
        state.approved = false;
        state.returned = false;
        state.unlocked = 1;
      }
      state.match = match;
      state.step = 1;
      return true;
    },
    reviewMatch() {
      if (!state.report || state.match !== 'backpack') return false;
      state.step = 2;
      state.unlocked = Math.max(state.unlocked, 2);
      return true;
    },
    approveClaim(evidenceConfirmed) {
      if (state.unlocked < 2 || state.match !== 'backpack' || evidenceConfirmed !== true) return false;
      state.approved = true;
      state.step = 3;
      state.unlocked = 3;
      return true;
    },
    confirmHandover() {
      if (!state.approved) return false;
      state.returned = true;
      return true;
    }
  };
}

function initializeWalkthrough(root) {
  const model = createWalkthrough();
  let view = 'web';
  const find = (selector) => root.querySelector(selector);
  const panels = [...root.querySelectorAll('[data-demo-panel]')];
  const stepButtons = [...root.querySelectorAll('[data-demo-step]')];
  const candidates = [...root.querySelectorAll('[data-demo-match]')];
  const reportForm = find('#demo-report-form');
  const claimForm = find('#demo-claim-form');
  const feedback = find('#demo-feedback');
  const screen = find('#demo-screen');
  const screens = [
    { image: 'items', title: 'Inside the project: Item Management', alt: 'Updated Item Management preview showing sample reports, filters, and item previews', width: 1600, height: 1250, version: 'df1e15f3' },
    { image: 'matches', width: 1440, height: 1100, version: 'ea1ed4a8', title: 'Inside the project: Match Management', alt: 'Match management preview comparing a fictional blue backpack pair with a demo score' },
    { image: 'claims', width: 1440, height: 1100, version: '7f47d47b', title: 'Inside the project: Claim Management', alt: 'Claim management preview showing a fictional student claim pending review' },
    { image: 'claims', width: 1440, height: 1100, version: '7f47d47b', title: 'Reference screen: Claim Management', alt: 'Original fictional claim-review preview; the browser demo separately illustrates handover' }
  ];
  const appScreens = [
    { image: 'app/report', version: 'e9e34535', title: 'In the app: Report an item', alt: 'Mobile reporting screen rendered in a browser with fictional item details' },
    { image: 'app/matches', version: 'd4b02c53', title: 'In the app: Potential matches', alt: 'Mobile matches screen showing fictional lost and found candidates' },
    { image: 'app/claim', version: 'c189de1c', title: 'In the app: Ownership evidence', alt: 'Mobile claim screen explaining proof of ownership for a fictional backpack' },
    { image: 'app/claims', version: 'da771d51', title: 'In the app: Track claim requests', alt: 'Mobile claims screen showing fictional request statuses; handover is simulated separately' }
  ];

  const announce = (message, error = false) => {
    feedback.textContent = message;
    feedback.classList.toggle('is-error', error);
  };

  const render = (focus = false) => {
    const state = model.getState();
    panels.forEach((panel, index) => { panel.hidden = index !== state.step; });
    stepButtons.forEach((button, index) => {
      button.disabled = index > state.unlocked;
      button.classList.toggle('is-complete', index < state.step || state.returned);
      if (index === state.step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    candidates.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.demoMatch === state.match)));
    find('#demo-review-match').disabled = state.match === null;
    root.dataset.view = view;
    root.querySelectorAll('[data-demo-view]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.demoView === view));
    });
    const current = (view === 'app' ? appScreens : screens)[state.step];
    const imagePath = `/assets/walkthrough/${current.image}.png${current.version ? `?v=${current.version}` : ''}`;
    if (screen.getAttribute('src') !== imagePath) screen.src = imagePath;
    screen.alt = current.alt;
    screen.width = current.width || (view === 'app' ? 645 : 1440);
    screen.height = current.height || (view === 'app' ? 1410 : 1050);
    find('#demo-full-image').href = imagePath;
    find('#demo-screen-label').textContent = current.title;
    find('#demo-screen-caption').textContent = view === 'app'
      ? 'Source-based browser preview · Demo data · Click to enlarge'
      : 'Admin interface preview · Fictional records · Click to enlarge';
    find('#demo-preview-note').textContent = view === 'app'
      ? 'Mobile previews render the React Native screens with mocked services. They are not Android or iOS screenshots; native layout and controls may differ. You can simulate the staff review using the controls beside each preview.'
      : 'Web admin views rendered with fictional records and a simulated admin session.';
    find('#demo-handover-note').textContent = view === 'app'
      ? 'The app preview shows claim tracking. Staff approval and physical collection are simulated here; the preview itself does not update.'
      : 'The screenshot is the original claim-review preview. The handover state is demonstrated by these controls.';
    find('#demo-status').textContent = state.returned ? 'Returned' : state.approved ? 'Awaiting pickup' : state.report ? 'Report active' : 'Ready to report';
    if (state.report) find('#demo-report-recap').textContent = `${state.report.title} · ${state.report.location}. ${state.report.description}`;
    find('#demo-lost-state').textContent = state.returned ? 'Claimed' : 'Active';
    find('#demo-found-state').textContent = state.returned ? 'Returned' : 'Awaiting pickup';
    find('#demo-claim-state').textContent = state.returned ? 'Resolved' : 'Approved';
    find('#demo-handover').disabled = state.returned;
    find('#demo-handover').textContent = state.returned ? 'Sample case completed' : 'Confirm sample handover';
    find('#demo-handover-copy').textContent = state.returned
      ? 'Sample handover confirmed. The lost report is now claimed, the found item is returned, and the claim is resolved. No real records were changed.'
      : 'The sample claim is approved. The item is still awaiting pickup; approval and physical return are separate steps.';
    if (focus) panels[state.step].querySelector('h3').focus({ preventScroll: true });
  };

  const setView = (next) => {
    if (!['web', 'app'].includes(next)) return;
    view = next;
    render();
    announce(`${view === 'app' ? 'Mobile app' : 'Web admin'} previews selected. Your sample case progress is preserved.`);
  };
  root.querySelectorAll('[data-demo-view]').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.demoView));
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-demo-view-link]');
    if (link) setView(link.dataset.demoViewLink);
  });

  reportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!model.submitReport({ location: find('#demo-location').value, description: find('#demo-description').value })) {
      announce('Choose a sample location and enter 10–240 characters of fictional identifying details.', true);
      return;
    }
    claimForm.reset();
    render(true);
    announce('Sample report DEMO-001 created. Compare the found items to continue.');
  });

  candidates.forEach((button) => button.addEventListener('click', () => {
    const before = model.getState().match;
    model.selectMatch(button.dataset.demoMatch);
    if (before !== button.dataset.demoMatch) claimForm.reset();
    render();
    announce('Candidate selected. Review the item type and location before continuing.');
  }));

  find('#demo-review-match').addEventListener('click', () => {
    if (!model.reviewMatch()) {
      announce('The wallet is a different item type. Select the blue backpack to follow this sample case.', true);
      return;
    }
    render(true);
    announce('The descriptions suggest a possible match. Check the identifying evidence before approving ownership.');
  });

  claimForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!model.approveClaim(find('#demo-evidence-confirmed').checked)) {
      announce('Compare the fictional identifying details and check the confirmation before approving.', true);
      return;
    }
    render(true);
    announce('Sample claim approved. The item is awaiting pickup until the handover is confirmed.');
  });

  find('#demo-handover').addEventListener('click', () => {
    if (!model.confirmHandover()) return;
    render();
    announce('Sample case completed: report claimed, found item returned, claim resolved. You can start over to try again.');
  });

  stepButtons.forEach((button) => button.addEventListener('click', () => {
    if (model.goTo(Number(button.dataset.demoStep))) { render(true); announce(''); }
  }));
  root.querySelectorAll('[data-demo-back]').forEach((button) => button.addEventListener('click', () => {
    model.goTo(Math.max(0, model.getState().step - 1));
    render(true);
    announce('');
  }));
  find('#demo-reset').addEventListener('click', () => {
    model.reset();
    reportForm.reset();
    claimForm.reset();
    render(true);
    announce('Walkthrough reset. Start again with a fictional blue-backpack report.');
  });
  root.querySelectorAll('[data-demo-submit]').forEach((button) => { button.disabled = false; });
  render();
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('#lost-found-demo');
  if (root) initializeWalkthrough(root);
}
