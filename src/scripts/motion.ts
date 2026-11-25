/**
 * Animations ToJC — script unique, servi en fichier externe (CSP : script-src 'self').
 * Amélioration progressive : sans JavaScript, tout le contenu reste visible.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ---------- En-tête : ombre au défilement ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Apparitions au défilement ---------- */
const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal], [data-line]')];

// Décalage en cascade pour les enfants d'un groupe [data-stagger]
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  const step = Number(group.dataset.stagger) || 90;
  [...group.querySelectorAll<HTMLElement>(':scope > [data-reveal], :scope > [data-line]')].forEach((el, i) =>
    el.style.setProperty('--delay', `${(i * step) / 1000}s`),
  );
});

if (!reduce && 'IntersectionObserver' in window && targets.length) {
  // Ce qui est déjà à l'écran n'est pas masqué (pas de clignotement)
  const vh = window.innerHeight;
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-in');
  });
  root.classList.add('motion');

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.classList.add('is-in');
          io.unobserve(el);
          // Une fois apparu, on retire le décalage pour que le survol reste instantané
          const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
          window.setTimeout(() => el.style.removeProperty('--delay'), delay * 1000 + 900);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el));
}

/* ---------- Compteurs (ex. « 98 % ») ---------- */
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const runCounter = (el: HTMLElement) => {
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  const duration = 1600;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = `${Math.round(end * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if (!reduce && 'IntersectionObserver' in window) {
  const cio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          runCounter(e.target as HTMLElement);
          cio.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => {
    el.textContent = `0${el.dataset.suffix ?? ''}`;
    cio.observe(el);
  });
}

/* ---------- Carrousel d'accueil : pause + accès direct à une image ---------- */
const slider = document.querySelector<HTMLElement>('[data-slider]');
if (slider) {
  const step = Number(slider.dataset.duration) || 6;
  const slides = [...slider.querySelectorAll<HTMLElement>('.slide')];
  const cycle = step * slides.length;
  const pauseBtn = slider.querySelector<HTMLButtonElement>('[data-slider-pause]');

  pauseBtn?.addEventListener('click', () => {
    const paused = slider.classList.toggle('is-paused');
    pauseBtn.setAttribute('aria-pressed', String(paused));
    pauseBtn.setAttribute('aria-label', paused ? 'Relancer le carrousel' : 'Mettre le carrousel en pause');
  });

  // Recale toutes les animations pour que l'image « index » démarre maintenant
  const goTo = (index: number) => {
    slides.forEach((slide, k) => {
      // −1,2 s : l'image choisie démarre déjà entièrement visible (même en pause au survol)
      const delay = `${k * step - index * step - cycle - 1.2}s`;
      const dotFill = slider.querySelector<HTMLElement>(`.dot.s${k} span`);
      for (const el of [slide, slide.querySelector('img'), dotFill]) {
        if (!el) continue;
        const e = el as HTMLElement;
        e.style.animationName = 'none';
        void e.offsetWidth; // force le redémarrage de l'animation
        e.style.animationName = '';
        e.style.animationDelay = delay;
      }
      slide.setAttribute('aria-hidden', k === index ? 'false' : 'true');
    });
  };
  slider.querySelectorAll<HTMLButtonElement>('[data-slide-to]').forEach((btn) =>
    btn.addEventListener('click', () => goTo(Number(btn.dataset.slideTo))),
  );
}

/* ---------- Sommaire : section active (page Expertises) ---------- */
const toc = document.querySelector<HTMLElement>('[data-toc]');
if (toc && 'IntersectionObserver' in window) {
  const links = [...toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const indicator = toc.querySelector<HTMLElement>('[data-toc-indicator]');
  const setActive = (id: string) => {
    links.forEach((a) => {
      const on = a.hash === `#${id}`;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
      if (on && indicator) {
        indicator.style.transform = `translateY(${a.offsetTop}px)`;
        indicator.style.height = `${a.offsetHeight}px`;
      }
    });
  };
  const sio = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: '-35% 0px -60% 0px' },
  );
  links.forEach((a) => {
    const section = document.getElementById(a.hash.slice(1));
    if (section) sio.observe(section);
  });
  setActive(links[0]?.hash.slice(1) ?? '');
}
