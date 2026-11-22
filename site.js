document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('site-navigation');
  if (toggle && menu) {
    const close = () => {menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation');};
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', e => {if (e.key === 'Escape') close();});
  }
  const form = document.getElementById('consultation-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const name = String(d.get('name') || '').trim();
    const email = String(d.get('email') || '').trim();
    const profession = String(d.get('profession') || 'Not sure yet').trim();
    const timezone = String(d.get('timezone') || '').trim();
    const goal = String(d.get('goal') || '').trim();
    const body = ['Hello Malie,', '', 'I would like to request a free 20-minute English coaching consultation.', '',
      'Name: ' + name, 'Email: ' + email, 'Programme of interest: ' + profession, 'Country / time zone: ' + timezone,
      'My English goal: ' + goal, '', 'Thank you.'].join('\r\n');
    const subject = 'Consultation request — ' + name;
    const emailLink = 'mailto:hello@malie.me?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const status = document.getElementById('form-status');
    if (status) status.textContent = 'Your email application should open. Please review and send the prepared message to complete your enquiry.';
    window.location.href = emailLink;
  });
});