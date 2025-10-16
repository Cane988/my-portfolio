(function () {
  if (window.bgMusicInitialized) return;
  window.bgMusicInitialized = true;

  let audio = document.getElementById('bg-music');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = 'assets/audio/background.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    document.body.appendChild(audio);
  }

  const btn = document.getElementById('music-toggle'); 
  const savedMuted = localStorage.getItem('musicMuted') === 'true';
  audio.muted = savedMuted;

  if (btn) btn.textContent = savedMuted ? '🔇' : '🔊';

  // Try autoplay
  audio.play().catch(() => {
    // If blocked, show a play button
    const musicBtn = document.createElement('button');
    musicBtn.textContent = '🎵 Play Music';
    musicBtn.classList.add('music-btn');
    document.body.appendChild(musicBtn);

    musicBtn.addEventListener('click', () => {
      audio.play();
      musicBtn.remove();
    });
  });

  if (btn) {
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
  }
})();
