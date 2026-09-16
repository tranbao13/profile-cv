/* Shared script for the home page and blog pages */

/* ---- Mobile menu ---- */
const menuBtn = document.querySelector('.menu-btn');
const navList = document.getElementById('nav-links');
if (menuBtn && navList) {
  const setMenu = open => {
    navList.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  navList.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

/* ---- Footer year + copy email ---- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const copyBtn = document.getElementById('copy-email');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyBtn.textContent = 'Copied';
    } catch { copyBtn.textContent = copyBtn.dataset.email; }
    setTimeout(() => copyBtn.textContent = 'Copy email', 2000);
  });
}

/* ---- Highlight current section in nav (home page only) ---- */
const hashLinks = [...document.querySelectorAll('.nav ul a[href^="#"]')];
if (hashLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      hashLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section, footer').forEach(s => observer.observe(s));
}

/* ---- Lightbox (career/academic photos) ---- */
(() => {
  const dlg = document.querySelector('.lightbox');
  if (!dlg) return;
  const big = dlg.querySelector('.lb-stage img');
  const cap = dlg.querySelector('.lb-caption');
  const prev = dlg.querySelector('.lb-prev');
  const next = dlg.querySelector('.lb-next');
  let group = [], i = 0;

  const show = n => {
    i = (n + group.length) % group.length;
    big.src = group[i].currentSrc || group[i].src;
    big.alt = group[i].alt;
    cap.textContent = group[i].alt + (group.length > 1 ? `  (${i + 1}/${group.length})` : '');
    prev.hidden = next.hidden = group.length < 2;
  };

  document.querySelectorAll('.tl-photos').forEach(set => {
    set.querySelectorAll('img').forEach(img => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      const open = () => {
        group = [...set.querySelectorAll('img')];
        show(group.indexOf(img));
        dlg.showModal();
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  });

  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  prev.addEventListener('click', () => show(i - 1));
  next.addEventListener('click', () => show(i + 1));
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close(); });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  dlg.addEventListener('close', () => { big.removeAttribute('src'); });
})();
