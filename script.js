// 🔊 Click sound
const clickSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3");

// Tabs switching
const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const converter1 = document.getElementById("converter1");
const converter2 = document.getElementById("converter2");

tab1.onclick = () => {
  clickSound.play();
  tab1.classList.add("active");
  tab2.classList.remove("active");
  converter1.classList.remove("hidden");
  converter2.classList.add("hidden");
};
tab2.onclick = () => {
  clickSound.play();
  tab2.classList.add("active");
  tab1.classList.remove("active");
  converter2.classList.remove("hidden");
  converter1.classList.add("hidden");
};

// Letter → Number
document.getElementById("convertBtn").onclick = () => {
  clickSound.currentTime = 0;
  clickSound.play();
  const text = document.getElementById("inputText").value.toUpperCase();
  let result = "";
  for (let ch of text) {
    if (ch >= "A" && ch <= "Z") result += (ch.charCodeAt(0) - 64) + " ";
    else if (ch === " ") result += "/ ";
    else result += ch + " ";
  }
  document.getElementById("outputText").textContent = result.trim();
};

// Copy Numbers
document.getElementById("copyBtn").onclick = () => {
  const text = document.getElementById("outputText").textContent;
  if (!text) return;
  clickSound.currentTime = 0;
  clickSound.play();
  navigator.clipboard.writeText(text);
};

// Number → Letter
document.getElementById("reverseBtn").onclick = () => {
  clickSound.currentTime = 0;
  clickSound.play();
  const input = document.getElementById("inputNumbers").value.trim();
  const parts = input.split(/\s+/);
  let result = "";
  for (let p of parts) {
    if (p === "/") result += " ";
    else if (!isNaN(p) && p > 0 && p <= 26) result += String.fromCharCode(parseInt(p) + 64);
    else result += p;
  }
  document.getElementById("outputLetters").textContent = result;
};

// ---------------- PARTICLES ----------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function initParticles(theme) {
  let color = "rgba(255,255,255,0.6)";
  let outline = "rgba(255,255,255,0)";

  if (theme === "theme-light") {
    color = "rgba(255,255,255,0.8)";
    outline = "rgba(0,0,0,0.6)";
  }

  particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    color: color,
    outline: outline
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.outline !== "rgba(0,0,0,0)") {
      ctx.strokeStyle = p.outline;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}

// Initialize particles with current theme
initParticles(document.body.classList[0]);
animateParticles();

// 🌗 Theme Switching
const themeBtn = document.getElementById("themeSwitch");
themeBtn.onclick = () => {
  const current = document.body.classList[0];
  let nextTheme;
  if(current === "theme-dark"){
    nextTheme = "theme-light";
    themeBtn.textContent = "🌙";
  } else if(current === "theme-light"){
    nextTheme = "theme-original";
    themeBtn.textContent = "☀️";
  } else {
    nextTheme = "theme-dark";
    themeBtn.textContent = "🌞";
  }
  document.body.classList.replace(current, nextTheme);
  initParticles(nextTheme); // update particles color for new theme
};