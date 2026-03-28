gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ── Cursor ────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button, .achievement-card, .fort-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2)');
  el.addEventListener('mouseleave', () => {});
});

/* ── Stars ─────────────────────────────────── */
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.classList.add('star');
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    top:${Math.random()*70}%;
    --d:${2 + Math.random()*4}s;
    animation-delay:${Math.random()*4}s;
  `;
  starsContainer.appendChild(s);
}

/* ── Hero entrance ─────────────────────────── */
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl
  .to('#hero-devanagari', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
  .to('#hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, '-=0.4')
  .to('#hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  .to('#hero-years', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
  .to('#scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');

/* ── Parallax marquee ──────────────────────── */
gsap.to('#marquee-text', {
  x: '-30%',
  ease: 'none',
  scrollTrigger: { trigger: '#marquee-text', scrub: 1, start: 'top bottom', end: 'bottom top' }
});
gsap.to('#marquee-text-2', {
  x: '15%',
  ease: 'none',
  scrollTrigger: { trigger: '#marquee-text-2', scrub: 1, start: 'top bottom', end: 'bottom top' }
});

/* ── Generic scroll animations ─────────────── */
document.querySelectorAll('[data-anim="fade-up"]').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      delay: i * 0.05
    }
  );
});
document.querySelectorAll('[data-anim="slide-left"]').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }
  );
});

/* ── Timeline ──────────────────────────────── */
document.querySelectorAll('[data-timeline]').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    }
  );
});

/* ── Cards ─────────────────────────────────── */
document.querySelectorAll('[data-card]').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.2)', delay: (i % 3) * 0.1,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    }
  );
});

/* ── Fort cards ────────────────────────────── */
document.querySelectorAll('[data-fort]').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, scale: 0.88 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    }
  );
});

/* ── Stats counter ─────────────────────────── */
document.querySelectorAll('[data-stat]').forEach((el, i) => {
  const counter = el.querySelector('.counter');
  const target = parseInt(counter.dataset.target);
  gsap.fromTo(el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: function() { counter.textContent = Math.round(this.targets()[0].val).toLocaleString(); }
          });
        }
      }
    }
  );
});

/* ── Sanskrit verse ────────────────────────── */
document.querySelectorAll('.sanskrit-verse').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    }
  );
});

/* ── Hero title glow pulse ─────────────────── */
gsap.to('#hero-title', {
  filter: 'drop-shadow(0 0 60px rgba(255,150,0,0.7))',
  duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
});

/* ── Responsive 2-col ──────────────────────── */
if (window.innerWidth < 700) {
  document.querySelectorAll('.responsive-2col').forEach(el => {
    el.style.gridTemplateColumns = '1fr';
    el.style.gap = '1.5rem';
  });
}