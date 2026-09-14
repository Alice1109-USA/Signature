// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Keep the Blog tab visible across the shared desktop and mobile navigation.
const addBlogLinkAfterPricing = (pricingLink) => {
  if (!pricingLink || pricingLink.parentElement.querySelector(':scope > a[href="./blog.html"]')) return;
  const blogLink = document.createElement('a');
  blogLink.href = './blog.html';
  blogLink.textContent = 'BLOG';
  pricingLink.insertAdjacentElement('afterend', blogLink);
};
addBlogLinkAfterPricing(document.querySelector('.nav-links > a[href="./pricing.html"]'));
addBlogLinkAfterPricing(document.querySelector('.mobile-menu > a[href="./pricing.html"]'));

// Category text links open hub pages; adjacent native details disclose services.
const serviceDrops = [...document.querySelectorAll('details.nav-drop, details.mobile-service-drop')];
serviceDrops.forEach((drop) => {
  drop.addEventListener('toggle', () => {
    if (drop.open) serviceDrops.forEach((other) => {
      if (other !== drop) other.open = false;
    });
  });
});
document.addEventListener('click', (event) => {
  serviceDrops.forEach((drop) => {
    if (!drop.contains(event.target)) drop.open = false;
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  serviceDrops.forEach((drop) => {
    if (drop.open && drop.contains(document.activeElement)) drop.querySelector('summary').focus();
    drop.open = false;
  });
});

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
