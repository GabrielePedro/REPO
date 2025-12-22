// contact-button.js - sets --cb-bar-width and keeps height synced
(function () {
  function updateButton(btn) {
    const link = btn.querySelector('.cb-link');
    if (!link) return;
    const label = link.querySelector('.cb-label');
    const icon = link.querySelector('.cb-icon');
    const gap = parseFloat(getComputedStyle(link).gap || 10);
    const labelRect = label ? label.getBoundingClientRect() : { width: 0 };
    const iconRect = icon ? icon.getBoundingClientRect() : { width: 0 };
    const paddingLeft = parseFloat(getComputedStyle(link).paddingLeft || 8);
    const total = Math.round(labelRect.width + iconRect.width + gap + paddingLeft);
    btn.style.setProperty('--cb-bar-width', total + 'px');
    // If this button is inside a case-left, set its width to match the case-lead container
    const caseLeft = btn.closest('.case-left');
    if (caseLeft) {
      const lead = caseLeft.querySelector('.case-lead');
      const leadWidth = lead ? (lead.clientWidth || lead.getBoundingClientRect().width) : null;
      if (leadWidth) btn.style.width = Math.round(leadWidth) + 'px';
      else btn.style.width = '';
    } else {
      btn.style.width = '';
    }
    // ensure height variable is available for the CSS
    const h = getComputedStyle(btn).getPropertyValue('--cb-height') || '64px';
    btn.style.setProperty('--cb-height', h.trim());
  }

  function init() {
    const buttons = document.querySelectorAll('.contact-button');
    if (!buttons.length) return;
    buttons.forEach(btn => {
      // initial update
      updateButton(btn);
      // observe size changes
      const ro = new ResizeObserver(() => updateButton(btn));
      ro.observe(btn);
      // also observe window resize
      window.addEventListener('resize', () => updateButton(btn));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
