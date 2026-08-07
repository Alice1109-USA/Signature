// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  const closeBtn = document.createElement('button');
  closeBtn.className = 'mobile-close';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  menu.insertBefore(closeBtn, menu.firstChild);

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.style.visibility = '';
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.style.visibility = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
  });

  closeBtn.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
}

// Contact form (Web3Forms)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const status = document.getElementById('form-status');
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        status.textContent = "Message sent! We'll be in touch shortly.";
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = 'Something went wrong. Please call us at 206-384-3379.';
      status.className = 'form-status error';
    }
    btn.disabled = false;
    btn.textContent = originalLabel;
  });
}
