document.documentElement.classList.add('has-motion');

const siteIntro = document.querySelector('.site-intro');
const dismissIntro = () => {
  siteIntro?.classList.add('is-complete');
  window.setTimeout(() => siteIntro?.remove(), 700);
};
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  siteIntro?.remove();
} else {
  siteIntro?.addEventListener('click', dismissIntro);
  window.setTimeout(dismissIntro, 1350);
}

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navTriggers = [...document.querySelectorAll('.nav-trigger')];

const closeMenu = () => {
  primaryNav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
};

const closeDropdowns = (except) => {
  navTriggers.forEach((trigger) => {
    if (trigger !== except) trigger.setAttribute('aria-expanded', 'false');
  });
};

menuToggle?.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  primaryNav.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
  if (opening) window.setTimeout(() => menuSectionButtons[0]?.focus(), 80);
  if (!opening) closeDropdowns();
});

const menuData = {
  about: { eyebrow: 'Company', title: 'About AISIN ASK', image: 'assets/aisin-ask-brand-lockup.jpg', alt: 'AISIN ASK brand', links: [['Who we are','#about'],['Global automotive experience','#about'],['Why choose AISIN ASK','#trust'],['News & Events','#news']] },
  products: { eyebrow: 'Aftermarket range', title: 'Product range', image: 'assets/hero-workshop-clutch-v3.png', alt: 'Technician inspecting a clutch assembly', links: [['Clutch','#products'],['Filters','#products'],['Coolants and fluids','#products'],['Suspension and belts','#products'],['Application lists','#support']] },
  trust: { eyebrow: 'Why AISIN ASK', title: 'Confidence in every category', image: 'assets/hero-filter-v3.png', alt: 'Technician inspecting an automotive filter', links: [['Global experience','#trust'],['Product focus','#trust'],['India focus','#trust'],['About AISIN ASK','#about']] },
  support: { eyebrow: 'Technical support', title: 'Downloads and information', image: 'assets/technical-downloads-v3.png', alt: 'Technical specialist reviewing automotive product information', links: [['Premium Coolants leaflet','#support'],['Brake & Clutch Fluid leaflet','#support'],['Clutch application list','#support'],['Filter application list','#support'],['Suspension application list','#support']] },
  news: { eyebrow: 'Latest information', title: 'News & Events', image: 'assets/support-workshop-v3.png', alt: 'Automotive technical support in a workshop', links: [['Company updates','#news'],['Product information','#news'],['Technical downloads','#support'],['Contact the team','#contact']] },
  partner: { eyebrow: 'Business', title: 'Distribution', image: 'assets/distribution-centre-v3.png', alt: 'Automotive parts distribution centre', links: [['Become a distributor','#partner'],['Bulk requirements','#partner'],['Product range','#products'],['Business enquiry','#contact']] },
  contact: { eyebrow: 'Get in touch', title: 'Contact AISIN ASK', image: 'assets/support-workshop-v3.png', alt: 'Automotive support team in a workshop', links: [['Product support','#contact'],['Technical enquiry','#contact'],['Distributor enquiry','#contact'],['Bulk enquiry','#contact']] }
};

const menuSectionButtons = [...document.querySelectorAll('[data-menu-section]')];
const menuDetail = document.querySelector('.menu-detail');
const renderMenuDetail = (key) => {
  const data = menuData[key];
  if (!data || !menuDetail) return;
  menuSectionButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.menuSection === key));
  menuDetail.innerHTML = `<div class="menu-detail-image"><img src="${data.image}" alt="${data.alt}"></div><div class="menu-detail-links"><p>${data.eyebrow}</p><h2>${data.title}</h2>${data.links.map(([label,href]) => `<a href="${href}">${label}<span>→</span></a>`).join('')}</div>`;
  menuDetail.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
};
menuSectionButtons.forEach((button) => {
  button.addEventListener('mouseenter', () => renderMenuDetail(button.dataset.menuSection));
  button.addEventListener('focus', () => renderMenuDetail(button.dataset.menuSection));
  button.addEventListener('click', () => {
    const key = button.dataset.menuSection;
    renderMenuDetail(key);
    const destination = menuData[key]?.links?.[0]?.[1];
    if (destination) window.location.hash = destination;
    closeMenu();
  });
});

navTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const opening = trigger.getAttribute('aria-expanded') !== 'true';
    closeDropdowns(trigger);
    trigger.setAttribute('aria-expanded', String(opening));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-item') && !event.target.closest('.menu-toggle')) closeDropdowns();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const activeTrigger = navTriggers.find((trigger) => trigger.getAttribute('aria-expanded') === 'true');
  closeDropdowns();
  activeTrigger?.focus();
  if (primaryNav?.classList.contains('open')) {
    primaryNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.focus();
  }
});

primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeDropdowns();
  primaryNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}));

const explorer = document.querySelector('[data-product-explorer]');
const tabs = [...(explorer?.querySelectorAll('[role="tab"]') || [])];
const previewImage = explorer?.querySelector('.product-image img');
const previewName = explorer?.querySelector('.product-copy h3');
const previewCopy = explorer?.querySelector('.product-copy > span');
const previewLabel = explorer?.querySelector('.product-copy > p');
const nextPreviewImage = explorer?.querySelector('.product-preview img');
const nextPreviewLabel = explorer?.querySelector('.product-preview span');

const activateTab = (tab) => {
  if (tab.classList.contains('is-active')) return;
  const reduceProductMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const productDisplay = explorer?.querySelector('.product-display');
  const updateContent = () => {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  previewImage.src = tab.dataset.image;
  previewImage.alt = tab.dataset.alt;
  previewName.textContent = tab.dataset.name;
  previewCopy.textContent = tab.dataset.copy;
  const activeIndex = tabs.indexOf(tab);
  const nextTab = tabs[(activeIndex + 1) % tabs.length];
  if (previewLabel) previewLabel.textContent = 'Product family';
  if (nextPreviewImage) nextPreviewImage.src = nextTab.dataset.image;
  if (nextPreviewLabel) nextPreviewLabel.textContent = `Next  ${nextTab.dataset.name}`;
  };
  if (reduceProductMotion || !productDisplay) {
    updateContent();
    return;
  }
  productDisplay.classList.add('is-switching');
  window.setTimeout(() => {
    updateContent();
    productDisplay.classList.remove('is-switching');
    productDisplay.classList.add('is-entering');
    window.setTimeout(() => productDisplay.classList.remove('is-entering'), 260);
  }, 170);
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    next.focus();
    activateTab(next);
  });
});

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please complete the required fields before preparing your enquiry.';
    return;
  }
  status.textContent = 'Preview only: connect the approved AISIN ASK enquiry recipient before launch.';
});

const slider = document.querySelector('[data-slider]');
if (slider) {
  const slides = [...slider.querySelectorAll('.slide')];
  const dots = [...slider.querySelectorAll('.slider-dots button')];
  const previous = slider.querySelector('[data-prev]');
  const next = slider.querySelector('[data-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (!reduceMotion) timer = window.setInterval(() => showSlide(current + 1), 6000);
  };

  previous?.addEventListener('click', () => { showSlide(current - 1); start(); });
  next?.addEventListener('click', () => { showSlide(current + 1); start(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); start(); }));
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  showSlide(0);
  start();
}

const trustTabs = [...document.querySelectorAll('[data-trust]')];
const trustCopy = document.querySelector('.trust-description');
const trustTitle = document.querySelector('#trust-title');
const trustImage = document.querySelector('.trust-photo img');
const trustData = [
  { title: 'Global experience,<br>local relevance', copy: 'AISIN Aftermarket India brings established automotive expertise closer to India’s replacement market.', image: 'assets/hero-workshop-clutch-v3.png', alt: 'Technician inspecting an automotive clutch assembly' },
  { title: 'Confidence built<br>into the range', copy: 'The supplied range covers clutch, filters, coolants, fluids, suspension and belts.', image: 'assets/technical-downloads-v3.png', alt: 'Technical specialist reviewing automotive products' },
  { title: 'Support shaped<br>around India', copy: 'Product information and enquiry routes are organised around India’s aftermarket needs.', image: 'assets/support-workshop-v3.png', alt: 'Automotive aftermarket support in India' }
];
let trustIndex = 0;
function selectTrust(index) {
  trustIndex = (index + trustTabs.length) % trustTabs.length;
  trustTabs.forEach((tab, i) => { tab.classList.toggle('is-active', i === trustIndex); tab.setAttribute('aria-selected', String(i === trustIndex)); });
  const item = trustData[trustIndex];
  if (trustTitle) trustTitle.innerHTML = item.title;
  if (trustCopy) trustCopy.textContent = item.copy;
  if (trustImage) { trustImage.src = item.image; trustImage.alt = item.alt; }
}
trustTabs.forEach((tab, i) => tab.addEventListener('click', () => selectTrust(i)));
document.querySelector('[data-trust-prev]')?.addEventListener('click', () => selectTrust(trustIndex - 1));
document.querySelector('[data-trust-next]')?.addEventListener('click', () => selectTrust(trustIndex + 1));
selectTrust(0);

const newsRail = document.querySelector('[data-news-rail]');
const scrollNews = (direction) => {
  if (!newsRail) return;
  const card = newsRail.querySelector('article');
  const distance = card ? card.getBoundingClientRect().width + 24 : newsRail.clientWidth * .75;
  newsRail.scrollBy({ left: direction * distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
};
document.querySelector('[data-news-prev]')?.addEventListener('click', () => scrollNews(-1));
document.querySelector('[data-news-next]')?.addEventListener('click', () => scrollNews(1));

const resourceImages = [
  ['assets/download-coolant-v4.png', 'Technician checking automotive coolant condition'],
  ['assets/download-fluid-v4.png', 'Technician testing automotive brake fluid'],
  ['assets/download-clutch-v4.png', 'Specialist reviewing a clutch application catalogue']
];
document.querySelectorAll('.resource-list a').forEach((card, index) => {
  if (!resourceImages[index]) return;
  const image = card.querySelector('img');
  if (!image) return;
  image.src = resourceImages[index][0];
  image.alt = resourceImages[index][1];
});

const statValues = [...document.querySelectorAll('[data-count]')];
if (statValues.length) {
  const animateStat = (element) => {
    const target = Number(element.dataset.count);
    const duration = 900;
    const started = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - started) / duration, 1);
      element.textContent = String(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    statValues.forEach((element) => { element.textContent = element.dataset.count; });
  } else {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateStat(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.55 });
    statValues.forEach((element) => statObserver.observe(element));
  }
}

/* Precision motion layer: one-shot entrances, no scroll polling. */
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealGroups = [
  '.section-head', '.product-browser', '.launch-strip', '.trust-panel', '.trust-photo',
  '.about-copy', '.about-stats', '.resource-feature', '.resource-list', '.audience-intro',
  '.audience-cards', '.news-heading', '.news-editorial', '.business-image', '.business-copy',
  '.contact-aside', '.contact-form', '.footer-lead', '.footer-main'
];
const revealItems = revealGroups.flatMap((selector) => [...document.querySelectorAll(selector)]);
revealItems.forEach((element, index) => {
  element.dataset.reveal = '';
  element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
});

if (motionReduced) {
  revealItems.forEach((element) => element.classList.add('is-visible'));
  document.documentElement.classList.add('hero-ready');
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((element) => revealObserver.observe(element));
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('hero-ready')));
}

/* Editorial range photography: deliberately documentary, not catalogue CGI. */
const rangeStoryImages = [
  ['assets/news-range-inspection-v4.png', 'Technician inspecting an automotive air filter under a workshop lamp'],
  ['assets/news-range-update-v4.png', 'Automotive specialists reviewing clutch, belt and filter components'],
  ['assets/news-technical-docs-v4.png', 'Technical documentation specialist cataloguing aftermarket components'],
  ['assets/news-coolant-service-v4.png', 'Technician checking an engine cooling system in a workshop']
];

document.querySelectorAll('.news-editorial article').forEach((card, index) => {
  const image = card.querySelector('img');
  const story = rangeStoryImages[index];
  if (!image || !story) return;
  image.src = story[0];
  image.alt = story[1];
  image.width = 1536;
  image.height = 1024;
});
