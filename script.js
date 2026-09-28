let currentLang = localStorage.getItem('lang') || 'en';
const projectsData = [

 {
  "title_en":"Laboratory Management System (LIMS)","title_fr":"Système de Gestion de Laboratoire (LIMS)",
  "client":"CTAA, GIZ Tunisia","type_en":"LIMS · Full project","type_fr":"LIMS · Projet complet","scope":"full",
  "points_en":["Led end-to-end delivery: scoping, requirements, development, testing, deployment and support.","Owned technical coordination between project management, developers and client stakeholders.","Designed automated KPI reporting, daily laboratory statistics and alert notifications."],
  "points_fr":["Piloté la livraison de bout en bout : cadrage, recueil des besoins, développement, tests, déploiement et support.","Assuré la coordination technique entre la gestion de projet, les développeurs et les parties prenantes clientes.","Conçu des rapports KPI automatisés, des statistiques quotidiennes de laboratoire et des alertes."]
 },
 {
  "title_en":"International QMES deployments","title_fr":"Déploiements QMES internationaux",
  "client":"AVO Mexico, India, France, China","type_en":"QMES · Multi-country","type_fr":"QMES · Multi-pays","scope":"deployment",
  "points_en":["Managed deployments across 4+ countries in English, French, Spanish and Chinese.","Supported production go-live, follow-up and post-delivery issue resolution.","Coordinated ERP/MES integration and production-related requirements."],
  "points_fr":["Géré des déploiements dans plus de 4 pays, en anglais, français, espagnol et chinois.","Accompagné la mise en production, le suivi et la résolution des problèmes post-livraison.","Coordonné l'intégration ERP/MES et les besoins liés à la production."]
 },
 {
  "title_en":"Production and defect tracking system","title_fr":"Système de suivi de production et des défauts",
  "client":"AVO SAME Tunisia","type_en":"MES · Full project","type_fr":"MES · Projet complet","scope":"full",
  "points_en":["Built a weight-based micro-part counting mechanism with real-time verification and feedback loops.","Achieved a 75% reduction in scrap rates.","Integrated production data into defect-tracking and performance monitoring."],
  "points_fr":["Conçu un mécanisme de comptage de micro-pièces basé sur le poids, avec vérification en temps réel.","Obtenu une réduction de 75 % du taux de rebut.","Intégré les données de production au suivi des défauts et de la performance."]
 },
 {
  "title_en":"Quality control and production automation","title_fr":"Automatisation du contrôle qualité et de la production",
  "client":"STIAL, Délice Danone","type_en":"QMES · Full project","type_fr":"QMES · Projet complet","scope":"full",
  "points_en":["Led digitalisation of quality-control and production workflows in a dairy plant.","Automated quality-control processes and daily production closure.","Coordinated solution validation and audits with international auditors."],
  "points_fr":["Piloté la digitalisation des flux de contrôle qualité et de production d'un site laitier.","Automatisé les processus de contrôle qualité et la clôture de production quotidienne.","Coordonné la validation de la solution et les audits avec des auditeurs internationaux."]
 },
 {
  "title_en":"Laboratory Management System (LIMS)","title_fr":"Système de Gestion de Laboratoire (LIMS)",
  "client":"UNPA, L'Épi d'Or","type_en":"LIMS · Mini project","type_fr":"LIMS · Mini-projet","scope":"mini",
  "points_en":["Designed, developed and deployed the LIMS end to end.","Aligned the architecture with analytical workflows, ISO standards and quality goals."],
  "points_fr":["Conçu, développé et déployé le LIMS de bout en bout.","Aligné l'architecture avec les flux analytiques, les normes ISO et les objectifs qualité."]
 },
 {
  "title_en":"Pharmaceutical manufacturing digitalisation","title_fr":"Digitalisation de la production pharmaceutique",
  "client":"PHARMAGREB Tunisia","type_en":"Digitalisation · In progress","type_fr":"Digitalisation · En cours","scope":"progress",
  "points_en":["Leading scoping and requirements for a major Tunisian pharmaceutical manufacturer.","Mapping existing processes with stakeholders to set implementation priorities."],
  "points_fr":["Pilote le cadrage et le recueil des besoins pour un grand fabricant pharmaceutique tunisien.","Cartographie des processus existants avec les parties prenantes pour définir les priorités."]
 }

];

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
  if (!projectsData.length) {
    list.innerHTML = `<p class="muted">${t('projects.error')}</p>`;
    return;
  }
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
