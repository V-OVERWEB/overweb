const SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzアイウエオカキクケコサシスセソタチツテトナニヌネノ";
const syms = SYMBOLS.split('');

const canvas = document.getElementById('MatrixRain');
const ctx = canvas.getContext('2d');

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const FONT_SIZE = isMobile ? 13 : 15;
const H_TARGET = isMobile ? 300 : 420;

let W, H, cols, drops, lengths, speeds, offsets;
let lastTime = 0;
const FPS = isMobile ? 20 : 30;
const FRAME_MS = 1000 / FPS;

function init() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  canvas.style.height = H + 'px';

  cols = Math.floor(W / FONT_SIZE);

  drops   = new Float32Array(cols);
  lengths = new Uint8Array(cols);
  speeds  = new Float32Array(cols);
  offsets = new Uint16Array(cols);

  ctx.font = FONT_SIZE + 'px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  for (let i = 0; i < cols; i++) {
    drops[i]   = -(Math.random() * 40);
    lengths[i] = 8 + Math.floor(Math.random() * 14);
    speeds[i]  = (isMobile ? 0.4 : 0.7) + Math.random() * (isMobile ? 0.8 : 1.2);
    offsets[i] = Math.floor(Math.random() * syms.length);
  }
}

function draw(ts) {
  requestAnimationFrame(draw);

  const dt = ts - lastTime;
  if (dt < FRAME_MS) return;
  lastTime = ts - (dt % FRAME_MS);

  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, W, H);

  ctx.font = FONT_SIZE + 'px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  for (let i = 0; i < cols; i++) {
    const x = i * FONT_SIZE;
    const headRow = Math.floor(drops[i]);
    const len = lengths[i];

    for (let j = 0; j < len; j++) {
      const row = headRow - j;
      const y = row * FONT_SIZE;
      if (y < -FONT_SIZE || y > H) continue;

      const ch = syms[(offsets[i] + headRow - j) % syms.length];

      if (j === 0) {
        ctx.fillStyle = '#ffffff';
      } else {
        const ratio = j / len;
        const g = Math.floor(255 * (1 - ratio) * 0.9 + 20);
        ctx.fillStyle = `rgb(0,${g},0)`;
      }

      ctx.fillText(ch, x, y);
    }

    drops[i] += speeds[i] * (dt / FRAME_MS) * 0.5;

    if (Math.floor(drops[i]) * FONT_SIZE > H + len * FONT_SIZE) {
      drops[i]   = -(2 + Math.random() * 20);
      lengths[i] = 8 + Math.floor(Math.random() * 14);
      speeds[i]  = (isMobile ? 0.4 : 0.7) + Math.random() * (isMobile ? 0.8 : 1.2);
      offsets[i] = Math.floor(Math.random() * syms.length);
    }
  }
}

document.addEventListener('visibilitychange', () => { if (!document.hidden) lastTime = 0; });

init();
requestAnimationFrame(draw);