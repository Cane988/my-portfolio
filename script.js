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

// ===============================
// Persistent background music
// ===============================
(function () {
  if (window.bgMusicInitialized) return;
  window.bgMusicInitialized = true;

  // Get or create audio element
  let audio = document.getElementById('bg-music');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = 'assets/audio/background.mp3';
    audio.loop = true;
    audio.volume = 0.1;
    document.body.appendChild(audio);
  }

  // Get the toggle button
  const btn = document.getElementById('music-toggle');

  // Restore mute state from localStorage
  const savedMuted = localStorage.getItem('musicMuted') === 'true';
  audio.muted = savedMuted;
  if (btn) btn.textContent = savedMuted ? '🔇' : '🔊';

  // Start music only after user interaction (browser autoplay policy)
  const startMusic = () => {
    audio.play().catch(() => {
      console.log("Music autoplay blocked until user interaction");
    });
  };
  document.addEventListener('click', startMusic, { once: true });

  // Button toggle: mute/unmute
  if (btn) {
    btn.addEventListener('click', async () => {
      if (audio.muted) {
        audio.muted = false;
        try {
          await audio.play();
        } catch (err) {
          console.log('Playback requires interaction:', err);
        }
      } else {
        audio.muted = true;
      }
      btn.textContent = audio.muted ? '🔇' : '🔊';
      localStorage.setItem('musicMuted', audio.muted);
    });
  }
})();
