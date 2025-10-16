document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("neon-bg");
  const colors = ["#0ff", "#f0f", "#0f0", "#00ffc3", "#00b3ff"];

  // Create neon lines
  for (let i = 0; i < 20; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    const color = colors[Math.floor(Math.random() * colors.length)];
    line.style.background = color;
    line.style.color = color;
    line.style.width = `${100 + Math.random() * 400}px`;
    line.style.top = `${Math.random() * 100}%`;
    line.style.left = `${Math.random() * 100}%`;
    line.style.animationDuration = `${5 + Math.random() * 6}s`;
    line.style.animationDelay = `${Math.random() * 5}s`;
    bg.appendChild(line);
  }

  // Particle system
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let w, h;
  const particles = [];
  const numParticles = 50;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 20;
      ctx.shadowColor = p.color;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > w) p.speedX *= -1;
      if (p.y < 0 || p.y > h) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});

function openPortfolio() {
  document.body.style.transition = "opacity 1s ease";
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
}
