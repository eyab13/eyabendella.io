// 1) AJAX: load projects from a JSON file
const list = document.getElementById('project-list');
fetch('data/projects.json')
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(projects => {
    list.innerHTML = '';
    projects.forEach(p => {
      const d = document.createElement('details');
      const s = document.createElement('summary');
      const t = document.createElement('span');
      t.textContent = p.title;
      const sub = document.createElement('small');
      sub.textContent = `${p.client} · ${p.type}`;
      t.appendChild(sub);
      s.appendChild(t);
      const ul = document.createElement('ul');
      p.points.forEach(x => { const li = document.createElement('li'); li.textContent = x; ul.appendChild(li); });
      d.append(s, ul);
      list.appendChild(d);
    });
  })
  .catch(() => { list.innerHTML = '<p class="muted">Projects could not be loaded. Open the site through a web server, not from a file.</p>'; });

// 2) AJAX: send the contact form without reloading the page.
// On GitHub Pages, set the form's action to your Formspree URL (PHP does not run there).
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { status.textContent = 'Please fill in your name, a valid email and a message.'; return; }
  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    status.textContent = 'Message sent. I will reply soon.';
  } catch {
    status.innerHTML = 'The message was not sent. Email me directly at <a href="mailto:eyabendanna@gmail.com">eyabendanna@gmail.com</a>.';
  }
});
