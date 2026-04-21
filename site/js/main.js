/* =============================================
   ARIEL RIL — main.js  v2
   Prompt typewriter, scroll, nav effects
============================================= */

// ─── Init hero typewriter ───
(function () {
  const el = document.getElementById('prompt-output');
  if (!el) return;

  const phrases = [
    'whoami',
    'cat /etc/role',
    './pentest --target=all --mode=ethical',
    'ls tools/',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  const TYPING_SPEED  = 70;
  const DELETE_SPEED  = 35;
  const PAUSE_END     = 1600;
  const PAUSE_START   = 300;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (paused) return;

    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);

      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(function () {
          deleting = true;
          paused = false;
          requestAnimationFrame(loop);
        }, PAUSE_END);
        return;
      }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);

      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        paused = true;
        setTimeout(function () {
          paused = false;
          requestAnimationFrame(loop);
        }, PAUSE_START);
        return;
      }
    }

    requestAnimationFrame(loop);
  }

  let lastTime = 0;

  function loop(ts) {
    if (!ts) { requestAnimationFrame(loop); return; }
    const speed = deleting ? DELETE_SPEED : TYPING_SPEED;
    if (ts - lastTime >= speed) {
      lastTime = ts;
      tick();
    } else {
      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
})();

function initPromptSequence() {
  const el = document.getElementById('prompt-output');
  if (!el) return;

  const pw = new PromptWriter(el);

  pw
    .gap(500)
    .cmd('$ ', 'whoami')
    .out('ariel ril  <span style="color:var(--text-muted)">// security engineer · OSCP</span>', 'info')
    .gap(350)
    .cmd('$ ', 'cat /etc/role')
    .out('Application Security Engineer @ <span style="color:var(--amber)">ING</span> · Netherlands', 'info')
    .gap(350)
    .cmd('$ ', './pentest --target=all --mode=ethical')
    .out('<span style="color:var(--green)">[+]</span> scope    web · kubernetes · cloud · binaries', 'info')
    .out('<span style="color:var(--green)">[+]</span> status   <span style="color:var(--amber)">ACTIVE</span>', 'info')
    .gap(300)
    .cmd('$ ', 'ls tools/')
    .out('<span style="color:var(--cyan)">kaet/</span>  <span style="color:var(--cyan)">kal/</span>', 'ok')
    .gap(280)
    .run();
}

// ─── Scroll fade-in ───
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ─── Active nav link highlight ───
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    }),
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach(s => observer.observe(s));
}

// ─── Mobile nav toggle ───
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ─── Subtle glitch on brand name ───
function initGlitch() {
  const brand = document.querySelector('.nav-brand .brand-name');
  if (!brand) return;

  setInterval(() => {
    if (Math.random() < 0.03) {
      brand.style.textShadow = '1px 0 var(--red), -1px 0 var(--cyan)';
      brand.style.transform  = `skewX(${(Math.random() - 0.5) * 4}deg)`;
      setTimeout(() => {
        brand.style.textShadow = '';
        brand.style.transform  = '';
      }, 70);
    }
  }, 600);
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  // initPromptSequence();
  initScrollAnimations();
  initNavHighlight();
  initMobileNav();
  initGlitch();
});
