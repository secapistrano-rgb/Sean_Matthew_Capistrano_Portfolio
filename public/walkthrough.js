import { walkthroughCatalog } from './walkthrough-catalog.js?v=6';

// Appendix F guide sequence, simulated in memory with fictional records.
export function createWalkthrough() {
  const initial = () => ({ step: 0, unlocked: 0, student: false, staff: false, report: null, match: null, claim: null, approved: false, returned: false });
  let state = initial();
  const snapshot = () => ({ ...state, report: state.report ? { ...state.report } : null, claim: state.claim ? { ...state.claim } : null });
  const move = (step) => { state.step = step; state.unlocked = Math.max(state.unlocked, step); return true; };
  return {
    getState: snapshot,
    reset() { state = initial(); return snapshot(); },
    goTo(step) {
      if (!Number.isInteger(step) || step < 0 || step > state.unlocked) return false;
      state.step = step;
      return true;
    },
    signInStudent() { state.student = true; return move(1); },
    openReport() { return state.student ? move(2) : false; },
    submitReport({ location, description, date, photo }) {
      const details = String(description || '').trim();
      const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date || '') && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
      if (!state.student || !['camera', 'gallery'].includes(photo) || location !== 'Library' || details.length < 10 || details.length > 240 || !validDate) return false;
      state = { ...initial(), student: true, step: 3, unlocked: 3, report: { title: 'Blue backpack', location, description: details, date, photo } };
      return true;
    },
    selectMatch(match) {
      if (!state.report || !['backpack', 'wallet'].includes(match)) return false;
      if (state.match !== match) {
        state.claim = null; state.staff = false; state.approved = false; state.returned = false; state.unlocked = 3;
      }
      state.match = match;
      state.step = 3;
      return true;
    },
    reviewMatch() { return state.report && state.match === 'backpack' ? move(4) : false; },
    submitClaim({ proof, photo }) {
      const details = String(proof || '').trim();
      if (state.unlocked < 4 || state.match !== 'backpack' || details.length < 10 || details.length > 240) return false;
      state.claim = { proof: details, photo: photo === true };
      state.staff = false; state.approved = false; state.returned = false; state.unlocked = 5;
      return move(5);
    },
    signInStaff() { if (!state.claim) return false; state.staff = true; return move(6); },
    reviewReport() { return state.staff && state.claim ? move(7) : false; },
    approveClaim(confirmed) {
      if (!state.staff || !state.claim || state.unlocked < 7 || state.approved || confirmed !== true) return false;
      state.approved = true;
      return move(8);
    },
    confirmHandover() { if (!state.approved) return false; state.returned = true; return true; }
  };
}

function initializeWalkthrough(root) {
  const model = createWalkthrough();
  const find = (selector) => root.querySelector(selector);
  const panels = [...root.querySelectorAll('[data-demo-panel]')];
  const stepButtons = [...root.querySelectorAll('[data-demo-step]')];
  const candidates = [...root.querySelectorAll('[data-demo-match]')];
  const reportForm = find('#demo-report-form');
  const requestForm = find('#demo-request-form');
  const claimForm = find('#demo-claim-form');
  let selectedPhoto = null;
  const screens = [
    ['app', '01-login.png', 'Student sign-in', 'User guide · Student authentication · p. 212–213'],
    ['app', '02-home.png', 'Student dashboard', 'User guide · Student dashboard · p. 213'],
    ['app', '03-report.png', 'Report a lost item', 'User guide · Lost and found reports · p. 214–216'],
    ['app', '05-matches.png', 'Review the suggested match', 'User guide · Match and claim request · p. 216–217'],
    ['app', '06-claim.png', 'Submit ownership evidence', 'User guide · Proof of ownership and collection · p. 217'],
    ['web', '01-login.png', 'Staff authentication', 'User guide · Administrator authentication · p. 223–224'],
    ['web', '03-items.png', 'Item Management', 'User guide · Administrator dashboard and Item Management · p. 224–226'],
    ['web', '05-claims.png', 'Claim Management', 'User guide · Claim Management · p. 226–227'],
    ['web', '05-claims.png', 'Confirm collection', 'Collection follows claim approval; completion states follow the project controller.']
  ];
  const announce = (message, error = false) => {
    const feedback = find('#demo-feedback');
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
    const [view, filename, title, reference] = screens[state.step];
    const asset = walkthroughCatalog[view].find((entry) => entry.file === filename);
    root.dataset.view = view;
    const image = find('#demo-screen');
    if (image.getAttribute('src') !== asset.image) image.src = asset.image;
    image.alt = `${view === 'app' ? 'CSPC app browser' : 'CSPC web admin'} preview: ${title}. Fictional records.`;
    image.width = view === 'app' ? 645 : filename === '03-items.png' ? 1600 : 1440;
    image.height = view === 'app' ? 1410 : filename === '03-items.png' ? 1250 : 1100;
    find('#demo-full-image').href = asset.image;
    find('#demo-screen-label').textContent = `CSPC ${view === 'app' ? 'App' : 'Web'}: ${title}`;
    find('#demo-screen-caption').textContent = `${reference} · Select image to enlarge`;
    const claimPreview = state.step === 7 || state.step === 8;
    find('#demo-claim-preview').hidden = !claimPreview;
    find('#demo-full-image').hidden = claimPreview;
    find('#demo-preview-proof').textContent = state.claim?.proof || '';
    find('#demo-preview-claim-status').textContent = state.returned ? 'Resolved · Backpack returned' : state.approved ? 'Approved · Backpack awaiting pickup' : 'Pending Review · Blue backpack';
    find('#demo-preview-claim-status').dataset.state = state.returned ? 'resolved' : state.approved ? 'approved' : 'pending';
    find('#demo-preview-collection').textContent = state.returned ? 'Collected at the SSC Office · Handover confirmed' : state.approved ? 'Approved for pickup at the SSC Office' : 'Not approved for collection yet';
    if (claimPreview) {
      find('#demo-screen-label').textContent = 'CSPC Web: Blue backpack claim';
      find('#demo-screen-caption').textContent = 'CASE DEMO-001 · Status updates with staff approval and collection.';
    }
    find('#demo-preview-note').textContent = view === 'app'
      ? 'Student role · CSPC App. The app preview is rendered in a browser with mocked services; device layout and controls may differ.'
      : 'Staff role · CSPC Web management. Reference screens use fictional records and a simulated admin session.';
    find('#demo-status').textContent = state.returned ? 'Returned' : state.approved ? 'Awaiting pickup' : state.claim ? 'Claim pending review' : state.report ? 'Report active' : state.student ? 'Student signed in' : 'Start with sign-in';
    if (state.report) find('#demo-report-recap').textContent = `${state.report.title} · ${state.report.location} · ${state.report.date}. ${state.report.description}`;
    find('#demo-submitted-proof').textContent = state.claim?.proof || '';
    find('#demo-submitted-photo').textContent = state.claim?.photo ? 'Fictional supporting photo attached' : 'No supporting photo attached';
    const approveButton = claimForm.querySelector('button[type="submit"]');
    approveButton.disabled = state.approved;
    approveButton.textContent = state.returned ? 'Backpack already returned' : state.approved ? 'Backpack claim already approved' : 'Approve backpack claim';
    find('#demo-evidence-confirmed').disabled = state.approved;
    find('#demo-lost-state').textContent = state.returned ? 'Claimed' : 'Active';
    find('#demo-found-state').textContent = state.returned ? 'Returned' : 'Awaiting pickup';
    find('#demo-claim-state').textContent = state.returned ? 'Resolved' : 'Approved';
    find('#demo-handover').disabled = state.returned;
    find('#demo-handover').textContent = state.returned ? 'Sample case completed' : 'Confirm sample handover';
    find('#demo-handover-copy').textContent = state.returned
      ? 'Collection confirmed: the lost report is claimed, the found item is returned, and the claim is resolved.'
      : 'The student follows the collection instructions after approval. As staff, verify collection at the Supreme Student Council Office and record the handover.';
    if (focus) panels[state.step].querySelector('h3').focus({ preventScroll: true });
  };
  function advance(action, message) { if (action()) { render(true); announce(message); } }
  find('#demo-student-signin').addEventListener('click', () => advance(() => model.signInStudent(), 'Sample campus account selected. Browse the app dashboard.'));
  find('#demo-open-report').addEventListener('click', () => advance(() => model.openReport(), 'Lost Item selected. Add a sample photo and review the report details.'));
  const filterItems = (filter) => {
    root.querySelectorAll('[data-demo-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.demoFilter === filter)));
    root.querySelectorAll('[data-demo-item-type]').forEach((item) => { item.hidden = filter !== 'all' && item.dataset.demoItemType !== filter; });
  };
  root.querySelectorAll('[data-demo-filter]').forEach((button) => button.addEventListener('click', () => {
    filterItems(button.dataset.demoFilter);
    announce(`${button.textContent} sample items displayed.`);
  }));
  root.querySelectorAll('[data-demo-photo]').forEach((button) => button.addEventListener('click', () => {
    selectedPhoto = button.dataset.demoPhoto;
    find('#demo-photo-status').textContent = `Sample blue-backpack image selected using ${selectedPhoto === 'camera' ? 'Take Photo' : 'Pick Image'}.`;
    announce('Sample photo added. Review the suggested description.');
  }));
  find('#demo-detect-location').addEventListener('click', () => {
    find('#demo-location').value = 'Library';
    announce('Sample geotag detected: CSPC Library. No device location was requested.');
  });
  reportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!model.submitReport({ location: find('#demo-location').value, description: find('#demo-description').value, date: find('#demo-date').value, photo: selectedPhoto })) {
      announce('Select a sample photo, detect the sample location, enter a valid date, and provide 10–240 characters of identifying details.', true); return;
    }
    requestForm.reset(); claimForm.reset();
    render(true); announce('Sample report submitted. Stay in the app to review the suggested matches.');
  });
  candidates.forEach((button) => button.addEventListener('click', () => {
    const before = model.getState().match;
    model.selectMatch(button.dataset.demoMatch);
    if (before !== button.dataset.demoMatch) { requestForm.reset(); claimForm.reset(); }
    render(); announce('Candidate selected. Compare the item, score, and explanation.');
  }));
  find('#demo-review-match').addEventListener('click', () => {
    if (!model.reviewMatch()) { announce('The wallet does not fit this report. Select the blue backpack to request a claim.', true); return; }
    render(true); announce('Request to Claim opened. Provide identifying evidence in the app.');
  });
  requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!model.submitClaim({ proof: find('#demo-proof').value, photo: find('#demo-proof-photo').checked })) { announce('Enter 10–240 characters of fictional ownership evidence.', true); return; }
    claimForm.reset(); render(true); announce('Claim request submitted and pending. Switch to the administrator’s website to review it.');
  });
  find('#demo-directions').addEventListener('click', () => { find('#demo-directions-note').hidden = false; announce('Collection destination: Supreme Student Council Office, CSPC.'); });
  find('#demo-admin-signin').addEventListener('click', () => advance(() => model.signInStaff(), 'Sample staff session opened. Review the item record in Item Management.'));
  find('#demo-manage-report').addEventListener('click', () => advance(() => model.reviewReport(), 'Claim Management opened. Verify the student’s submitted evidence.'));
  claimForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!model.approveClaim(find('#demo-evidence-confirmed').checked)) { announce('Verify the submitted ownership evidence before approving this sample claim.', true); return; }
    render(true); announce('Sample claim approved. The student can follow the collection instructions; the item is awaiting pickup.');
  });
  find('#demo-handover').addEventListener('click', () => {
    if (!model.confirmHandover()) return;
    render(); announce('Sample case completed: lost report claimed, found item returned, claim resolved.');
  });
  stepButtons.forEach((button) => button.addEventListener('click', () => { if (model.goTo(Number(button.dataset.demoStep))) { render(true); announce(''); } }));
  root.querySelectorAll('[data-demo-back]').forEach((button) => button.addEventListener('click', () => { model.goTo(Math.max(0, model.getState().step - 1)); render(true); announce(''); }));
  find('#demo-reset').addEventListener('click', () => {
    model.reset(); reportForm.reset(); requestForm.reset(); claimForm.reset(); selectedPhoto = null; filterItems('all');
    find('#demo-photo-status').textContent = 'Select a sample photo to continue.';
    find('#demo-directions-note').hidden = true;
    render(true); announce('Reset. Begin with student sign-in, following the User’s Guide.');
  });
  root.querySelectorAll('[data-demo-submit]').forEach((button) => { button.disabled = false; });
  render();
}
if (typeof document !== 'undefined') {
  const root = document.querySelector('#lost-found-demo');
  if (root) initializeWalkthrough(root);
}
