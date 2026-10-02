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

// Older editorial pages use a compact header. Complete it with the same
// gift-card action and mobile navigation available on the main site pages.
const navCta = document.querySelector('.nav-cta');
if (navCta && !navCta.querySelector('a[href="./gift-cards.html"]')) {
  const giftLink = document.createElement('a');
  giftLink.href = './gift-cards.html';
  giftLink.className = 'gift-link';
  giftLink.textContent = 'Gift Cards';
  navCta.insertBefore(giftLink, navCta.firstChild);
}

const primaryNav = document.querySelector('.nav');
if (primaryNav && !document.getElementById('nav-toggle')) {
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'nav-toggle';
  mobileToggle.id = 'nav-toggle';
  mobileToggle.setAttribute('aria-label', 'Open menu');
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.innerHTML = '<span></span><span></span><span></span>';
  primaryNav.appendChild(mobileToggle);
}

if (primaryNav && !document.getElementById('mobile-menu')) {
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobile-menu';
  mobileMenu.setAttribute('role', 'dialog');
  mobileMenu.setAttribute('aria-label', 'Navigation');
  mobileMenu.innerHTML = `
    <a href="./index.html">HOME</a>
    <a href="./massage-redmond.html">MASSAGE</a>
    <a href="./facials-redmond.html">FACIALS</a>
    <a href="./head-spa-redmond.html">HEAD SPA</a>
    <a href="./pricing.html">PRICING</a>
    <a href="./blog.html">BLOG</a>
    <a href="./gift-cards.html">GIFT CARDS</a>
    <div class="mobile-ctas">
      <a href="https://book.squareup.com/appointments/ruv6lje3z2m25r/location/LBCJ5N7KEN97H/services" class="btn" target="_blank" rel="noopener">Book Appointment</a>
    </div>`;
  primaryNav.insertAdjacentElement('afterend', mobileMenu);
}

// Keep Gift Cards with the primary links on mobile, immediately after Blog.
// Most full-page headers render it as a secondary CTA, while editorial pages
// already render it in the primary list; normalize both header variants here.
const mobileNav = document.getElementById('mobile-menu');
if (mobileNav) {
  const mobileBlogLink = mobileNav.querySelector(':scope > a[href="./blog.html"]');
  const mobileGiftLink = mobileNav.querySelector('a[href="./gift-cards.html"]');
  if (mobileBlogLink && mobileGiftLink) {
    mobileGiftLink.classList.remove('btn-outline');
    mobileBlogLink.insertAdjacentElement('afterend', mobileGiftLink);
  }
}

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
