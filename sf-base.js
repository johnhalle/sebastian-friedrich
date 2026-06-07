/* ═══════════════════════════════════════════════════════════
   sf-base.js — Sebastian Friedrich Website
   Gemeinsames JS für alle Seiten
═══════════════════════════════════════════════════════════ */

/* ── ÜBERSETZUNGEN ──────────────────────────────────────── */
const I18N = {
  de: {
    'nav.werke':         'Werke',
    'nav.news':          'News',
    'nav.katalog':       'Katalog',
    'nav.vita':          'Vita',
    'nav.kontakt':       'Kontakt',
    'hero.maler':        'Maler',
    'home.neueste':      'Neueste Werke',
    'home.alleWerke':    'Alle Werke',
    'home.alleNews':     'Alle News',
    'home.aktuelles':    'Aktuelles',
    'home.katalog':      'Katalog',
    'newsletter.titel':  'Neue Werke und Ausstellungen',
    'newsletter.sub':    'Gelegentliche Post — kein Spam.',
    'newsletter.placeholder': 'E-Mail-Adresse',
    'newsletter.btn':    'Anmelden',
    'newsletter.dsgvo':  'Mit der Anmeldung stimmst du der Speicherung deiner E-Mail-Adresse zu.',
    'footer.impressum':  'Impressum',
    'footer.datenschutz':'Datenschutz',
    'detail.medium':     'Medium',
    'detail.masse':      'Maße',
    'detail.jahr':       'Jahr',
    'detail.gerahmt':    'Gerahmt',
    'detail.serie':      'Serie',
    'detail.ja':         'Ja',
    'detail.nein':       'Nein',
    'detail.anfrage':    'Anfrage stellen',
    'werke.titel':       'Werke',
    'werke.filter.alle': 'Alle Werke',
    'werke.filter.verfuegbar': 'Verfügbare Werke',
    'vita.titel':       'Vita',
    'vita.label':       'Biografie',
    'vita.geboren':     'Geboren',
    'vita.ort':         'Lebt und arbeitet in',
    'vita.ausbildung':  'Ausbildung',
    'vita.ausstellungen': 'Ausstellungen u. a.',
    'contact.titel':     'Kontakt',
    'contact.anfrage':   'Anfrage',
    'contact.intro':     'Für Anfragen, Kooperationen und Informationen zu verfügbaren Werken nutzen Sie bitte das Formular.',
    'contact.instagram': 'Instagram',
    'contact.name':      'Name',
    'contact.email':     'E-Mail',
    'contact.subject':   'Betreff',
    'contact.message':   'Nachricht',
    'contact.send':      'Nachricht senden',
    'contact.close':     'Schließen',
    'contact.status':    'Danke, Ihre Nachricht wurde gesendet.',
    'contact.required':  'Bitte füllen Sie die Pflichtfelder korrekt aus.',
    'contact.workSubject': 'Anfrage zu',
    'contact.workLabel': 'Werk',
    'contact.workMessage': 'Hallo Sebastian Friedrich,\n\nich interessiere mich für dieses Werk und bitte um weitere Informationen.',
    'contact.error':     'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
    'thanks.titel':     'Danke',
    'thanks.text':      'Ihre Nachricht wurde übermittelt.',
    'thanks.home':      'Zur Startseite',
    'katalog.titel':    'Katalog',
    'katalog.reader':   'Im Katalog blättern',
    'katalog.order':    'Katalog bestellen',
    'essay.kicker':     'Aufsatz',
    'reader.prev':      'Vorherige Seite',
    'reader.next':      'Nächste Seite',
  },
  en: {
    'nav.werke':         'Works',
    'nav.news':          'News',
    'nav.katalog':       'Catalogue',
    'nav.vita':          'Biography',
    'nav.kontakt':       'Contact',
    'hero.maler':        'Painter',
    'home.neueste':      'Latest Works',
    'home.alleWerke':    'All Works',
    'home.alleNews':     'All News',
    'home.aktuelles':    'Latest',
    'home.katalog':      'Catalogue',
    'newsletter.titel':  'New Works and Exhibitions',
    'newsletter.sub':    'Occasional updates — no spam.',
    'newsletter.placeholder': 'Email address',
    'newsletter.btn':    'Subscribe',
    'newsletter.dsgvo':  'By subscribing you consent to the storage of your email address.',
    'footer.impressum':  'Legal notice',
    'footer.datenschutz':'Privacy',
    'detail.medium':     'Medium',
    'detail.masse':      'Dimensions',
    'detail.jahr':       'Year',
    'detail.gerahmt':    'Framed',
    'detail.serie':      'Series',
    'detail.ja':         'Yes',
    'detail.nein':       'No',
    'detail.anfrage':    'Send enquiry',
    'werke.titel':       'Works',
    'werke.filter.alle': 'All Works',
    'werke.filter.verfuegbar': 'Available Works',
    'vita.titel':       'Biography',
    'vita.label':       'Biography',
    'vita.geboren':     'Born',
    'vita.ort':         'Lives and works in',
    'vita.ausbildung':  'Education',
    'vita.ausstellungen': 'Selected exhibitions',
    'contact.titel':     'Contact',
    'contact.anfrage':   'Enquiry',
    'contact.intro':     'For enquiries, collaborations and information about available works, please use the form.',
    'contact.instagram': 'Instagram',
    'contact.name':      'Name',
    'contact.email':     'Email',
    'contact.subject':   'Subject',
    'contact.message':   'Message',
    'contact.send':      'Send message',
    'contact.close':     'Close',
    'contact.status':    'Thank you, your message has been sent.',
    'contact.required':  'Please fill in the required fields correctly.',
    'contact.workSubject': 'Enquiry about',
    'contact.workLabel': 'Work',
    'contact.workMessage': 'Hello Sebastian Friedrich,\n\nI am interested in this work and would like to receive further information.',
    'contact.error':     'The message could not be sent. Please try again later.',
    'thanks.titel':     'Thank you',
    'thanks.text':      'Your message has been sent.',
    'thanks.home':      'Back to home',
    'katalog.titel':    'Catalogue',
    'katalog.reader':   'Browse catalogue',
    'katalog.order':    'Order catalogue',
    'essay.kicker':     'Essay',
    'reader.prev':      'Previous page',
    'reader.next':      'Next page',
  }
};

let LANG = localStorage.getItem('lang') || 'de';
let DATA = null;

function t(obj, field) {
  if (LANG === 'en' && obj[field + '_en']) return obj[field + '_en'];
  return obj[field] || obj[field + '_de'] || '';
}

function ui(key) {
  return (I18N[LANG] && I18N[LANG][key]) || (I18N['de'][key]) || key;
}

function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = ui(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = ui(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', ui(el.dataset.i18nAria));
  });
  const langBtn = document.getElementById('nav-lang-btn');
  const overlayBtn = document.getElementById('overlay-lang-btn');
  if (langBtn) langBtn.textContent = LANG === 'de' ? 'EN' : 'DE';
  if (overlayBtn) overlayBtn.textContent = LANG === 'de' ? 'EN' : 'DE';
}

function toggleLang() {
  LANG = LANG === 'de' ? 'en' : 'de';
  localStorage.setItem('lang', LANG);
  applyI18n();
  if (typeof onLangChange === 'function') onLangChange();
}

/* ── NAVIGATION ─────────────────────────────────────────── */
function openMenu() {
  const overlay = document.getElementById('nav-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  const overlay = document.getElementById('nav-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Mobile-Menue: Klick auf die freie Flaeche schliesst das Overlay.
// Klicks auf Navigationslinks oder Sprachbutton bleiben davon ausgenommen.
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('nav-overlay');
  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeMenu();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
});

// Nav-Verhalten: hero-Seiten starten unsichtbar, andere Seiten immer sichtbar
function initNav(hasHero) {
  const nav = document.querySelector('nav');
  if (!hasHero) {
    nav.classList.add('always-visible');
    return;
  }
  nav.classList.remove('scrolled');
  function updateNav() {
    const hero = document.getElementById('hero');
    const navHeight = nav.offsetHeight || 48;
    const threshold = hero ? Math.max(0, hero.offsetHeight - navHeight) : window.innerHeight * 0.9;
    nav.classList.toggle('scrolled', window.scrollY >= threshold);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
}

/* ── FOOTER ─────────────────────────────────────────────── */
function renderFooter(data) {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const insta = data?.meta?.kontakt?.instagram;
  if (insta) {
    const el = document.getElementById('footer-instagram');
    if (el) el.href = insta.startsWith('http') ? insta : 'https://instagram.com/' + insta;
  }
}

/* ── LIGHTBOX ───────────────────────────────────────────── */
let LB_CONTEXT = [];
let LB_INDEX   = 0;

function openDetail(id, context) {
  if (!DATA) return;
  LB_CONTEXT = context || DATA.werke.map(w => w.id);
  LB_INDEX   = LB_CONTEXT.indexOf(id);
  if (LB_INDEX < 0) LB_INDEX = 0;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ detail: id }, '', `?werk=${id}`);
}

function alignInfoPanel() {
  const img  = document.getElementById('lb-img');
  const info = document.querySelector('.lightbox-info');
  if (!img || !info) return;
  if (window.innerWidth <= 768) {
    info.style.paddingTop = '';
    info.style.paddingBottom = '';
    return;
  }
  const imgRect  = img.getBoundingClientRect();
  const wrapRect = img.closest('.lightbox-img-wrap').getBoundingClientRect();
  const topSpace = Math.max(72, imgRect.top - wrapRect.top);
  info.style.paddingTop    = topSpace + 'px';
  info.style.paddingBottom = (wrapRect.bottom - imgRect.bottom) + 'px';
}

function renderLightbox() {
  const id = LB_CONTEXT[LB_INDEX];
  const w  = DATA.werke.find(x => x.id === id);
  if (!w) return;
  const medium = LANG === 'en' ? (w.medium_en || w.medium) : w.medium;
  const img = document.getElementById('lb-img');
  img.onload = alignInfoPanel;
  img.src = w.bild;
  img.alt = `${w.titel}, ${w.jahr}`;
  document.getElementById('lb-titel').textContent = w.titel;
  const lbCounter = document.getElementById('lb-counter');
  if (LB_CONTEXT.length > 1) {
    lbCounter.innerHTML = `
      <button type="button" class="lightbox-counter-nav" data-lb-counter-prev aria-label="Vorheriges Werk" ${LB_INDEX === 0 ? 'disabled' : ''}>‹</button>
      <span>${LB_INDEX + 1} / ${LB_CONTEXT.length}</span>
      <button type="button" class="lightbox-counter-nav" data-lb-counter-next aria-label="Nächstes Werk" ${LB_INDEX === LB_CONTEXT.length - 1 ? 'disabled' : ''}>›</button>
    `;
    const prevCounter = lbCounter.querySelector('[data-lb-counter-prev]');
    const nextCounter = lbCounter.querySelector('[data-lb-counter-next]');
    if (prevCounter) prevCounter.onclick = () => { if (LB_INDEX > 0) { LB_INDEX--; renderLightbox(); } };
    if (nextCounter) nextCounter.onclick = () => { if (LB_INDEX < LB_CONTEXT.length - 1) { LB_INDEX++; renderLightbox(); } };
  } else {
    lbCounter.textContent = `${LB_INDEX + 1} / ${LB_CONTEXT.length}`;
  }
  document.getElementById('lb-meta').innerHTML = [
    { label: ui('detail.jahr'),   val: w.jahr },
    { label: ui('detail.medium'), val: medium },
    { label: ui('detail.masse'),  val: w.masse },
    ...(w.serie ? [{ label: ui('detail.serie'), val: w.serie }] : [])
  ].filter(m => m.val).map(m => `<li><span class="lightbox-meta-label">${m.label}</span><span>${m.val}</span></li>`).join('');
  document.getElementById('lb-action').innerHTML = w.verfuegbar
    ? `<button type="button" class="btn" data-contact-work="${w.id}">${ui('detail.anfrage')}</button>` : '';
  document.getElementById('lb-prev').classList.toggle('hidden', LB_INDEX === 0);
  document.getElementById('lb-next').classList.toggle('hidden', LB_INDEX === LB_CONTEXT.length - 1);
  history.replaceState({ detail: id }, '', `?werk=${id}`);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  history.pushState({}, '', location.pathname);
}

function initLightbox() {
  document.getElementById('lb-close').onclick = closeLightbox;
  document.getElementById('lb-prev').onclick = () => {
    if (LB_INDEX > 0) { LB_INDEX--; renderLightbox(); }
  };
  document.getElementById('lb-next').onclick = () => {
    if (LB_INDEX < LB_CONTEXT.length - 1) { LB_INDEX++; renderLightbox(); }
  };
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (document.getElementById('contact-modal')?.classList.contains('open')) return;
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'ArrowLeft'  && LB_INDEX > 0) { LB_INDEX--; renderLightbox(); }
    if (e.key === 'ArrowRight' && LB_INDEX < LB_CONTEXT.length - 1) { LB_INDEX++; renderLightbox(); }
    if (e.key === 'Escape') closeLightbox();
  });
  window.addEventListener('popstate', e => { if (!e.state?.detail) closeLightbox(); });
  window.addEventListener('resize', () => {
    if (document.getElementById('lightbox').classList.contains('open')) alignInfoPanel();
  }, { passive: true });
  // Touch-Swipe für Mobile
  let startX = 0;
  const lb = document.getElementById('lightbox');
  lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0 && LB_INDEX < LB_CONTEXT.length - 1) { LB_INDEX++; renderLightbox(); }
    if (dx > 0 && LB_INDEX > 0) { LB_INDEX--; renderLightbox(); }
  }, { passive: true });
}


/* ── KONTAKT / ANFRAGE-FORMULAR ─────────────────────────── */
const CONTACT_FORM_NAME = 'kontakt';

function contactFormMarkup(prefix) {
  return `
    <form class="contact-form" id="${prefix}-form" name="${CONTACT_FORM_NAME}" method="POST" action="/danke.html" data-netlify="true" novalidate>
      <input type="hidden" name="form-name" value="${CONTACT_FORM_NAME}">
      <input type="hidden" name="work_id" value="">
      <input type="hidden" name="work_title" value="">
      <input type="hidden" name="work_year" value="">
      <input type="hidden" name="page" value="">
      <div class="contact-form-grid">
        <label class="contact-field">
          <span class="contact-label" data-i18n="contact.name">Name</span>
          <input class="contact-input" type="text" name="name" autocomplete="name" required>
        </label>
        <label class="contact-field">
          <span class="contact-label" data-i18n="contact.email">E-Mail</span>
          <input class="contact-input" type="email" name="email" autocomplete="email" required>
        </label>
        <label class="contact-field contact-field-full">
          <span class="contact-label" data-i18n="contact.subject">Betreff</span>
          <input class="contact-input" type="text" name="subject" required>
        </label>
        <label class="contact-field contact-field-full contact-field-message">
          <span class="contact-label" data-i18n="contact.message">Nachricht</span>
          <textarea class="contact-textarea" name="message" required></textarea>
        </label>
      </div>
      <div class="contact-form-actions">
        <button class="btn" type="submit" data-i18n="contact.send">Nachricht senden</button>
        <span class="contact-status" data-contact-status aria-live="polite"></span>
      </div>
    </form>
  `;
}

function getWerkById(workId) {
  if (!workId || !DATA?.werke) return null;
  return DATA.werke.find(w => w.id === workId) || null;
}

function buildWerkSubject(w) {
  if (!w) return '';
  return `${ui('contact.workSubject')} "${w.titel}"${w.jahr ? ' (' + w.jahr + ')' : ''}`;
}

function buildWerkMessage(w) {
  if (!w) return '';
  const medium = LANG === 'en' ? (w.medium_en || w.medium) : w.medium;
  const details = [
    `${w.titel}${w.jahr ? ', ' + w.jahr : ''}`,
    medium,
    w.masse
  ].filter(Boolean).join('\n');
  return `${ui('contact.workMessage')}\n\n${ui('contact.workLabel')}:\n${details}\n\n`;
}

function setHiddenValue(form, name, value) {
  const field = form?.elements?.[name];
  if (field) field.value = value || '';
}

function prefillContactForm(form, workId, custom = {}) {
  if (!form) return;
  const w = typeof workId === 'object' ? workId : getWerkById(workId);
  const subject = form.elements.subject;
  const message = form.elements.message;
  setHiddenValue(form, 'page', location.pathname + location.search);
  if (w) {
    if (subject) subject.value = buildWerkSubject(w);
    if (message && !message.value.trim()) message.value = buildWerkMessage(w);
    setHiddenValue(form, 'work_id', w.id);
    setHiddenValue(form, 'work_title', w.titel);
    setHiddenValue(form, 'work_year', w.jahr);
  } else {
    setHiddenValue(form, 'work_id', '');
    setHiddenValue(form, 'work_title', '');
    setHiddenValue(form, 'work_year', '');
  }
  if (custom.subject && subject) subject.value = custom.subject;
  if (custom.message && message) message.value = custom.message;
}

function encodeNetlifyForm(form) {
  const data = new FormData(form);
  data.set('form-name', CONTACT_FORM_NAME);
  data.set('page', location.pathname + location.search);
  return new URLSearchParams(data).toString();
}

async function handleContactSubmit(form) {
  const status = form.querySelector('[data-contact-status]');
  const button = form.querySelector('button[type="submit"]');
  const name = form.elements.name?.value.trim() || '';
  const email = form.elements.email?.value.trim() || '';
  const subject = form.elements.subject?.value.trim() || '';
  const message = form.elements.message?.value.trim() || '';

  if (!name || !email || !subject || !message || !email.includes('@')) {
    if (status) status.textContent = ui('contact.required');
    return;
  }

  try {
    if (button) button.disabled = true;
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeNetlifyForm(form)
    });
    if (!response.ok) throw new Error('Form submission failed');
    if (status) status.textContent = ui('contact.status');
    form.reset();
  } catch (error) {
    console.error(error);
    if (status) status.textContent = ui('contact.error');
  } finally {
    if (button) button.disabled = false;
  }
}

function bindContactForm(form) {
  if (!form || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';
  form.addEventListener('submit', e => {
    e.preventDefault();
    handleContactSubmit(form);
  });
}

function ensureContactModal() {
  if (document.getElementById('contact-modal')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="contact-modal" id="contact-modal" aria-hidden="true">
      <div class="contact-modal-backdrop" data-contact-close></div>
      <section class="contact-modal-card" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button class="contact-modal-close" type="button" data-contact-close aria-label="Schließen">×</button>
        <p class="section-label" data-i18n="contact.titel">Kontakt</p>
        <h2 class="contact-modal-title" id="contact-modal-title" data-i18n="contact.anfrage">Anfrage</h2>
        ${contactFormMarkup('contact-modal')}
      </section>
    </div>
  `);
  bindContactForm(document.getElementById('contact-modal-form'));
  applyI18n();
}

function openContactForm(workId, custom = {}) {
  ensureContactModal();
  const modal = document.getElementById('contact-modal');
  const form = document.getElementById('contact-modal-form');
  if (!modal || !form) return;
  form.reset();
  const status = form.querySelector('[data-contact-status]');
  if (status) status.textContent = '';
  prefillContactForm(form, workId, custom);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const firstField = form.querySelector('input[name="name"], textarea, button');
  setTimeout(() => firstField?.focus(), 0);
}

function closeContactForm() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.getElementById('lightbox')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function initContactInteractions() {
  ensureContactModal();
  document.addEventListener('click', e => {
    const customTrigger = e.target.closest('[data-contact-subject], [data-contact-message]');
    if (customTrigger) {
      e.preventDefault();
      openContactForm(null, {
        subject: customTrigger.dataset.contactSubject || '',
        message: customTrigger.dataset.contactMessage || ''
      });
      return;
    }
    const trigger = e.target.closest('[data-contact-work]');
    if (trigger) {
      e.preventDefault();
      openContactForm(trigger.dataset.contactWork);
      return;
    }
    if (e.target.closest('[data-contact-close]')) {
      e.preventDefault();
      closeContactForm();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('contact-modal')?.classList.contains('open')) {
      closeContactForm();
    }
  });
}

function initContactPageForm(formId, workId) {
  const form = document.getElementById(formId);
  if (!form) return;
  bindContactForm(form);
  prefillContactForm(form, workId);
}
