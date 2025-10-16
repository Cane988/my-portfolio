// ===============================
// Mobile navigation toggle
// ===============================
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

// ===============================
// Update copyright year
// ===============================
const y = new Date().getFullYear();
['year', 'year-2', 'year-3', 'year-4', 'year-5', 'year-6'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = y;
});

// Persistent background music with neon control button
(function () {
  if (window.bgMusicInitialized) return;
  window.bgMusicInitialized = true;

  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');

  if (!audio || !btn) return;

  audio.volume = 0.1;

  // Restore mute state
  const savedMuted = localStorage.getItem('musicMuted') === 'true';
  audio.muted = savedMuted;
  btn.textContent = savedMuted ? '🔇' : '🔊';

  // Start music on first user click
  const startMusic = () => {
    if (!audio.muted) {
      audio.play().catch(err => {
        console.log("Autoplay blocked, waiting for user interaction:", err);
      });
    }
  };
  document.addEventListener('click', startMusic, { once: true });

  // Toggle mute/unmute
  btn.addEventListener('click', async () => {
    if (audio.muted) {
      audio.muted = false;
      try {
        await audio.play();
      } catch (err) {
        console.log("Playback error:", err);
      }
    } else {
      audio.muted = true;
    }
    btn.textContent = audio.muted ? '🔇' : '🔊';
    localStorage.setItem('musicMuted', audio.muted);
  });
})();


