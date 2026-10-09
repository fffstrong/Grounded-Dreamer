const policyButtons = document.querySelectorAll('[data-policy]');
policyButtons.forEach(button => button.addEventListener('click', () => {
  const policy = button.dataset.policy;
  policyButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = panel.dataset.panel !== policy; });
}));

const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('.figure-link').forEach(link => link.addEventListener('click', event => {
  if (!dialog.showModal) return;
  event.preventDefault();
  const img = dialog.querySelector('img');
  img.src = link.href;
  img.alt = link.querySelector('img').alt;
  dialog.showModal();
}));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

document.querySelector('#copy-citation').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);
    status.textContent = 'Citation copied.';
  } catch {
    status.textContent = 'Please select and copy the citation below.';
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#bibtex'));
    selection.removeAllRanges(); selection.addRange(range);
  }
});
