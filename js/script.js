// Hide the intro loader after the page has loaded.
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader")?.classList.add("hidden"), 700);
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Rotating role text
const typingElement = document.getElementById("typing");
const roles = ["Web Developer", "Frontend Developer", "BCA Graduate"];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  if (!typingElement) return;
  const role = roles[roleIndex];
  typingElement.textContent = role.substring(0, charIndex);

  if (!deleting && charIndex < role.length) {
    charIndex++;
    setTimeout(typeEffect, 95);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 45);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, deleting ? 1200 : 300);
  }
}
typeEffect();

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Animated purple particles
const canvas = document.getElementById("particles");
const ctx = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(65, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.7 + 0.4,
    speed: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.45 + 0.12
  }));
}

function animateParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const p of particles) {
    p.y -= p.speed;
    if (p.y < -3) {
      p.y = window.innerHeight + 3;
      p.x = Math.random() * window.innerWidth;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(192,132,252,${p.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animateParticles);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateParticles();

// Subtle cursor glow on mouse-based devices
const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}
