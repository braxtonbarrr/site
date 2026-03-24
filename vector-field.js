const canvas = document.getElementById('vector-field');
const ctx = canvas.getContext('2d');
let t = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function angle(x, y, t) {
  return Math.sin(x * 0.018 + t * 0.7) * Math.cos(y * 0.022 - t * 0.5) * Math.PI
       + Math.cos(x * 0.012 - y * 0.015 + t * 0.4) * 0.8;
}

function draw() {
  const W = canvas.width;
  const H = canvas.height;
  const STEP = 18;

  ctx.clearRect(0, 0, W, H);

  const cols = Math.ceil(W / STEP) + 2;
  const rows = Math.ceil(H / STEP) + 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * STEP;
      const y = j * STEP;
      const a = angle(x, y, t);
      const len = STEP * 0.42;
      const ex = x + Math.cos(a) * len;
      const ey = y + Math.sin(a) * len;
      const dist = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2);
      const maxDist = Math.sqrt((W / 2) ** 2 + (H / 2) ** 2);
      const alpha = 0.12 + 0.28 * (1 - dist / maxDist);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ex, ey, 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
      ctx.fill();
    }
  }

  t += 0.012;
  requestAnimationFrame(draw);
}

draw();
