// Smoothly scroll from hero CTA to realization section.
document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll-based background progression (dark -> warm).
const setScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(3));
};

window.addEventListener('scroll', setScrollProgress);
window.addEventListener('resize', setScrollProgress);
setScrollProgress();

// Reveal sections as they enter viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

// Generate subtle floating particles for cinematic ambience.
const particlesRoot = document.querySelector('.particles');
for (let i = 0; i < 36; i += 1) {
  const dot = document.createElement('span');
  dot.className = 'particle';
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.bottom = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${8 + Math.random() * 12}s`;
  dot.style.animationDelay = `${-Math.random() * 20}s`;
  dot.style.opacity = `${0.25 + Math.random() * 0.65}`;
  particlesRoot?.appendChild(dot);
}

// Final reveal interaction with floating hearts.
const revealButton = document.getElementById('reveal-love');
const hiddenMessage = document.getElementById('hidden-message');
const heartsZone = document.getElementById('hearts-zone');

const spawnHeart = () => {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = '❤';
  heart.style.left = `${Math.random() * 92 + 4}%`;
  heart.style.animationDuration = `${3 + Math.random() * 1.8}s`;
  heartsZone?.appendChild(heart);

  setTimeout(() => heart.remove(), 4200);
};

revealButton?.addEventListener('click', () => {
  hiddenMessage?.classList.add('visible');
  for (let i = 0; i < 12; i += 1) {
    setTimeout(spawnHeart, i * 180);
  }
});

// Optional instrumental music control.
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('bg-music');

musicToggle?.addEventListener('click', async () => {
  if (!backgroundMusic) return;

  // If no music source is provided yet, keep behavior graceful.
  const hasSource = backgroundMusic.querySelector('source')?.getAttribute('src');
  if (!hasSource) {
    musicToggle.textContent = '🎵 Source add karein';
    return;
  }

  if (backgroundMusic.paused) {
    backgroundMusic.muted = false;
    await backgroundMusic.play();
    musicToggle.setAttribute('aria-pressed', 'true');
    musicToggle.textContent = '🎵 Music Off';
  } else {
    backgroundMusic.pause();
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.textContent = '🎵 Music On';
  }
});
