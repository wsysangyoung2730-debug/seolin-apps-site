// SEOLIN wordmark: a lightweight Canvas 2D interpretation of the user's vector reference.
// Decorative only. The HTML fallback remains if canvas is unavailable or motion is reduced.
(() => {
  const canvas = document.getElementById('wordmark-canvas');
  if (!canvas) return;
  const host = canvas.parentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const state = { width: 0, height: 0, x: -1, y: .55, targetX: -1, targetY: .55, start: 0, frame: 0, visible: true };
  let mask = document.createElement('canvas');
  let drawing = false;
  let settle = 0;
  function resize() {
    const r = host.getBoundingClientRect();
    state.width = Math.max(1, r.width); state.height = Math.max(1, r.height);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mask.width = canvas.width; mask.height = canvas.height;
    const m = mask.getContext('2d');
    m.setTransform(dpr, 0, 0, dpr, 0, 0);
    const size = r.width / 3.75;
    m.font = `850 ${size}px -apple-system, BlinkMacSystemFont, Arial, sans-serif`;
    m.textAlign = 'center'; m.textBaseline = 'middle';
    const gradient = m.createLinearGradient(0, 0, 0, r.height);
    gradient.addColorStop(0, '#ffffff'); gradient.addColorStop(.6, '#dce6ff'); gradient.addColorStop(1, '#5270b3');
    m.fillStyle = gradient;
    m.fillText('SEOLIN', r.width / 2, r.height * .49, r.width * .98);
    host.classList.toggle('canvas-ready', !reduced.matches);
    render();
  }
  function render() {
    const { width: w, height: h } = state;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(mask, 0, 0, w, h);
    // Small vector-grid marks and a moving selection triangle.
    ctx.save();
    ctx.strokeStyle = 'rgba(157,184,244,.14)'; ctx.lineWidth = .6;
    const pitch = w < 500 ? 28 : 42;
    for (let x = 0; x <= w; x += pitch) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y <= h; y += pitch) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    const px = state.x * w, py = state.y * h;
    const reach = Math.min(w * .22, 210);
    const points = [[px - reach * .55, py + reach * .18], [px + reach * .5, py - reach * .5], [px + reach * .7, py + reach * .55]];
    ctx.strokeStyle = 'rgba(161,192,255,.65)'; ctx.lineWidth = 1; ctx.setLineDash([3, 6]);
    ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle = '#1d2b70';
    points.forEach(([x, y]) => { ctx.fillRect(x - 4, y - 4, 8, 8); ctx.strokeRect(x - 4, y - 4, 8, 8); });
    // A subtle outline in the local selection area keeps the wordmark readable.
    ctx.beginPath(); ctx.arc(px, py, reach, 0, Math.PI * 2); ctx.clip();
    ctx.font = `850 ${w / 3.75}px -apple-system, BlinkMacSystemFont, Arial, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = .7;
    ctx.setLineDash([1, 3]); ctx.strokeText('SEOLIN', w / 2, h * .49, w * .98);
    ctx.restore();
  }
  function frame(now) {
    state.frame = 0;
    if (document.hidden || !state.visible || reduced.matches) { drawing = false; return; }
    if (!state.start) state.start = now;
    const elapsed = now - state.start;
    if (state.targetX < 0) { state.x = -.15 + Math.min(elapsed / 4500, 1) * 1.3; state.y = .55; }
    else { state.x += (state.targetX - state.x) * .12; state.y += (state.targetY - state.y) * .12; }
    render();
    const moving = state.targetX >= 0 && (Math.abs(state.x - state.targetX) + Math.abs(state.y - state.targetY) > .001);
    if ((state.targetX < 0 && elapsed < 4500) || moving || settle > 0) { settle = Math.max(0, settle - 1); state.frame = requestAnimationFrame(frame); }
    else drawing = false;
  }
  function start() { if (!drawing && !document.hidden && state.visible && !reduced.matches) { drawing = true; state.frame = requestAnimationFrame(frame); } }
  host.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reduced.matches) return;
    const r = host.getBoundingClientRect(); state.targetX = (event.clientX - r.left) / r.width; state.targetY = (event.clientY - r.top) / r.height; settle = 2; start();
  }, { passive: true });
  host.addEventListener('pointerleave', () => { state.targetX = .9; state.targetY = .65; start(); });
  new ResizeObserver(() => { resize(); start(); }).observe(host);
  new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; start(); }).observe(host);
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', () => { host.classList.toggle('canvas-ready', !reduced.matches); if (!reduced.matches) start(); });
  resize(); start();
})();
