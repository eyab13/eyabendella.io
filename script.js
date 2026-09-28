let currentLang = localStorage.getItem('lang') || 'en';
let projectsData = [];

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang] && translations[lang][key];
    if (text !== undefined) {
      if (el.tagName === 'TITLE') { document.title = text; }
      else { el.textContent = text; }
    }
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  renderProjects(lang);
}

function t(key) { return (translations[currentLang] && translations[currentLang][key]) || key; }

function renderProjects(lang) {
  const list = document.getElementById('project-list');
  if (!projectsData.length) return;
  list.innerHTML = '';
  projectsData.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.tabIndex = 0;
    const title = document.createElement('h3');
    title.textContent = lang === 'fr' ? p.title_fr : p.title_en;
    const meta = document.createElement('p');
    meta.className = 'muted project-meta';
    meta.textContent = `${p.client} · ${lang === 'fr' ? p.type_fr : p.type_en}`;
    const ul = document.createElement('ul');
    (lang === 'fr' ? p.points_fr : p.points_en).forEach(x => {
      const li = document.createElement('li');
      li.textContent = x;
      ul.appendChild(li);
    });
    card.append(title, meta, ul);
    list.appendChild(card);
  });
}

fetch('projects.json')
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(projects => { projectsData = projects; renderProjects(currentLang); })
  .catch(() => {
    document.getElementById('project-list').innerHTML = `<p class="muted">${t('projects.error')}</p>`;
  });

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem('lang', currentLang);
    applyTranslations(currentLang);
  });
});

applyTranslations(currentLang);

// Ambient background theme: as each section scrolls to the middle of the
// viewport, shift the background/orb colors (see the CSS custom properties
// on html[data-theme]) to match that section's data-theme.
const themedSections = document.querySelectorAll('main > section[data-theme]');
if ('IntersectionObserver' in window && themedSections.length) {
  const themeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.documentElement.setAttribute('data-theme', entry.target.dataset.theme);
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  themedSections.forEach(section => themeObserver.observe(section));
}

// AJAX: send the contact form without reloading the page.
// On GitHub Pages, set the form's action to your Formspree URL (PHP does not run there).
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { status.textContent = t('form.invalid'); return; }
  status.textContent = t('form.sending');
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    status.textContent = t('form.sent');
  } catch {
    status.innerHTML = `${t('form.failed')} <a href="mailto:eyabendanna@gmail.com">eyabendanna@gmail.com</a>.`;
  }
});
