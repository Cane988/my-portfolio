// Mobile navigation toggle
const toggle = document.getElementById('mobile-nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active'); // animate hamburger
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
});

// Update copyright year
const y = new Date().getFullYear();
['year', 'year-2', 'year-3', 'year-4', 'year-5', 'year-6'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = y;
});

// Persistent background music with neon control button
(function () {
  if (window.bgMusicInitialized) return;
  window.bgMusicInitialized = true;

  let audio = document.getElementById('bg-music');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = 'assets/music.mp3';
    audio.loop = true;
    audio.volume = 0.1;
    document.body.appendChild(audio);
  }

  const savedMuted = localStorage.getItem('musicMuted') === 'true';
  audio.muted = savedMuted;

  const startMusic = () => {
    audio.play().catch(() => {});
  };
  document.addEventListener('click', startMusic, { once: true });
  window.addEventListener('load', startMusic);

  btn.addEventListener('click', async () => {
    if (audio.muted) {
      audio.muted = false;
      try {
        await audio.play();
      } catch (err) {
        console.log('Playback needs interaction:', err);
      }
    } else {
      audio.muted = true;
    }
    btn.textContent = audio.muted ? '🔇' : '🔊';
    localStorage.setItem('musicMuted', audio.muted);
  });
})();
