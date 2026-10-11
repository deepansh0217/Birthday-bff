/* ======================
   BIRTHDAY WEBSITE JS
====================== */

// ---------- Floating Hearts ----------
function createHearts() {
  const container = document.getElementById('hearts');
  const hearts = ['💖', '💕', '💗', '💓', '💞', '💘', '✨', '🌸'];

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (14 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.opacity = 0.4 + Math.random() * 0.4;
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 14000);
  }, 450);
}

// ---------- Simple Particle Background (CSS-like) ----------
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  document.getElementById('particles-js').appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(255,107,157,0.4)' : 'rgba(199,125,255,0.35)'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ---------- Splash Screen ----------
const splash = document.getElementById('splash');
const enterBtn = document.getElementById('enterBtn');
const app = document.getElementById('app');

enterBtn.addEventListener('click', () => {
  // Confetti burst on enter
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.7 },
    colors: ['#ff6b9d', '#c77dff', '#ffb6c1', '#ffd700', '#ffffff']
  });

  splash.classList.add('hide');
  setTimeout(() => {
    app.classList.add('show');
    createHearts();
    createParticles();
  }, 400);
});

// ---------- Page Navigation ----------
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
const ctaButtons = document.querySelectorAll('[data-page]');

function goToPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    // Scroll to top of page
    target.scrollTop = 0;
  }

  const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (activeNav) activeNav.classList.add('active');
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;
    goToPage(page);

    // Small haptic-like feedback with confetti sparkle
    if (Math.random() > 0.6) {
      confetti({
        particleCount: 18,
        spread: 40,
        origin: { y: 0.9 },
        colors: ['#ff6b9d', '#c77dff'],
        scalar: 0.7
      });
    }
  });
});

ctaButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    if (page) goToPage(page);
  });
});

// ---------- Fun Interactions ----------
// Blow candle
const blowBtn = document.getElementById('blowBtn');
const candle = document.querySelector('.candle');

blowBtn.addEventListener('click', () => {
  candle.classList.add('blown');
  blowBtn.textContent = 'Wish Made ✨';
  blowBtn.disabled = true;

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6b9d', '#c77dff', '#ffd700']
  });

  setTimeout(() => {
    candle.classList.remove('blown');
    blowBtn.textContent = 'Blow 💨';
    blowBtn.disabled = false;
  }, 4000);
});

// Song button (placeholder audio)
const songBtn = document.getElementById('songBtn');
const audio = document.getElementById('bdayAudio');
let isPlaying = false;

songBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play().catch(() => {});
    songBtn.textContent = '⏸ Pause';
    isPlaying = true;
  } else {
    audio.pause();
    songBtn.textContent = '▶ Play Song';
    isPlaying = false;
  }
});

// Hug counter
const hugBtn = document.getElementById('hugBtn');
const hugCount = document.getElementById('hugCount');
let hugs = 0;

hugBtn.addEventListener('click', () => {
  hugs++;
  hugCount.textContent = hugs;

  // Heart explosion
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.7 },
    shapes: ['circle'],
    colors: ['#ff6b9d', '#ffb6c1', '#c77dff'],
    scalar: 1.1
  });

  // Animate button
  hugBtn.style.transform = 'scale(0.9)';
  setTimeout(() => hugBtn.style.transform = '', 150);

  if (hugs === 10) {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  }
});

// Final celebrate button
const confettiBtn = document.getElementById('confettiBtn');
confettiBtn.addEventListener('click', () => {
  const duration = 3500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff6b9d', '#c77dff', '#ffb6c1', '#ffd700']
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff6b9d', '#c77dff', '#ffb6c1', '#ffd700']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});

// ---------- Date Badge ----------
const dateBadge = document.getElementById('dateBadge');
const today = new Date();
const options = { month: 'short', day: 'numeric' };
dateBadge.textContent = `🎂 ${today.toLocaleDateString('en-US', options)}`;

// ---------- Prevent pull-to-refresh on mobile (optional polish) ----------
document.body.addEventListener('touchmove', (e) => {
  if (e.target.closest('.page') === null) {
    // allow only inside pages
  }
}, { passive: true });

console.log('%c💕 Happy Birthday Bestie Website Ready!', 'color:#ff6b9d;font-size:16px;font-weight:bold;');
