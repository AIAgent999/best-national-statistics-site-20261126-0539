// Hand-drawn SVG charts. Every chart is built as an SVG string, inserted
// into the page, and then wired for interaction (crosshairs, hover
// readouts) by the functions here. No chart library, no canvas: the same
// markup the screenshots show is the markup a visitor can inspect.

const NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs = {}, parent) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

// A "nice" axis ceiling for a maximum value (1/2/2.5/5 × 10^n).
function niceCeil(v) {
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 2, 2.5, 5, 10]) if (v <= m * pow) return m * pow;
  return 10 * pow;
}

// ---------------------------------------------------------------- sparkline
// Tiny inline trend line used inside the indicator cards.
export function sparkline(values, { w = 96, h = 28, color = '#2f6db3' } = {}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * (w - 4) + 2,
    h - 3 - ((v - min) / span) * (h - 6),
  ]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const last = pts[pts.length - 1];
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">`
    + `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>`
    + `<circle cx="${last[0]}" cy="${last[1]}" r="2.6" fill="${color}"/></svg>`;
}

// ------------------------------------------------------------- line chart
// A line chart with labelled axes, a hover crosshair and a slider marker.
// points: [[x, y], ...] ascending in x. opts.formatY / formatX format the
// readout. Returns { setMarker(x) } so a slider can move the same marker
// the mouse moves; onReadout(text) is called whenever the readout changes.
export function lineChart(container, points, opts = {}) {
  const {
    color = '#16406e', area = true, yLabel = '', formatY = (v) => v,
    formatX = (v) => v, onReadout = null, height = 300,
  } = opts;
  const W = 720, H = height, L = 56, R = 14, T = 12, B = 30;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMax = niceCeil(Math.max(...ys) * 1.05);
  const yMin = opts.yMin !== undefined ? opts.yMin : Math.min(0, Math.min(...ys));
  const X = (x) => L + ((x - xMin) / (xMax - xMin)) * (W - L - R);
  const Y = (y) => T + (1 - (y - yMin) / (yMax - yMin)) * (H - T - B);

  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' }, container);
  // gridlines + y axis labels (5 steps)
  for (let i = 0; i <= 4; i++) {
    const v = yMin + ((yMax - yMin) * i) / 4;
    const y = Y(v);
    el('line', { x1: L, x2: W - R, y1: y, y2: y, class: i ? 'grid' : 'axis' }, svg);
    const t = el('text', { x: L - 8, y: y + 4, class: 'tick', 'text-anchor': 'end' }, svg);
    t.textContent = opts.axisY ? opts.axisY(v) : formatY(v);
  }
  // x axis labels: first, middle, last
  for (const x of [xMin, Math.round((xMin + xMax) / 2), xMax]) {
    const t = el('text', { x: X(x), y: H - 8, class: 'tick', 'text-anchor': 'middle' }, svg);
    t.textContent = formatX(x);
  }
  if (yLabel) {
    const t = el('text', { x: L, y: T + 2, class: 'axis-title' }, svg);
    t.textContent = yLabel;
  }
  const path = points.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ');
  if (area) {
    el('path', {
      d: path + `L${X(xMax).toFixed(1)} ${Y(yMin)} L${X(xMin).toFixed(1)} ${Y(yMin)} Z`,
      class: 'area', fill: color,
    }, svg);
  }
  el('path', { d: path, class: 'line', stroke: color }, svg);
  const marker = el('g', { class: 'marker' }, svg);
  el('line', { y1: T, y2: H - B, class: 'crosshair' }, marker);
  el('circle', { r: 5, class: 'marker-dot', fill: color }, marker);

  const crossLine = marker.querySelector('line');
  const dot = marker.querySelector('circle');
  function nearest(xVal) {
    let best = points[0];
    for (const p of points) if (Math.abs(p[0] - xVal) < Math.abs(best[0] - xVal)) best = p;
    return best;
  }
  function show(p) {
    crossLine.setAttribute('x1', X(p[0]));
    crossLine.setAttribute('x2', X(p[0]));
    dot.setAttribute('cx', X(p[0]));
    dot.setAttribute('cy', Y(p[1]));
    if (onReadout) onReadout(p);
  }
  show(points[points.length - 1]);
  svg.addEventListener('mousemove', (ev) => {
    const r = svg.getBoundingClientRect();
    const xVal = xMin + (((ev.clientX - r.left) / r.width) * W - L) / (W - L - R) * (xMax - xMin);
    show(nearest(xVal));
  });
  svg.addEventListener('mouseleave', () => show(points[points.length - 1]));
  return { setMarker: (xVal) => show(nearest(xVal)) };
}

// ------------------------------------------------------------ grouped bars
// Two series side by side per category (births vs deaths).
export function groupedBars(container, rows, { colorA = '#16406e', colorB = '#c0564f', formatY = (v) => v, height = 280 } = {}) {
  const W = 720, H = height, L = 48, R = 10, T = 12, B = 28;
  const max = niceCeil(Math.max(...rows.flatMap((r) => [r[1], r[2]])) * 1.05);
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' }, container);
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4, y = T + (1 - i / 4) * (H - T - B);
    el('line', { x1: L, x2: W - R, y1: y, y2: y, class: i ? 'grid' : 'axis' }, svg);
    const t = el('text', { x: L - 8, y: y + 4, class: 'tick', 'text-anchor': 'end' }, svg);
    t.textContent = formatY(v);
  }
  const slot = (W - L - R) / rows.length;
  const bw = slot * 0.34;
  rows.forEach((r, i) => {
    const cx = L + slot * i + slot / 2;
    const hA = (r[1] / max) * (H - T - B);
    const hB = (r[2] / max) * (H - T - B);
    el('rect', { x: cx - bw - 1, y: H - B - hA, width: bw, height: hA, fill: colorA, class: 'bar' }, svg)
      .appendChild(Object.assign(document.createElementNS(NS, 'title'), { textContent: `${r[0]} births: ${formatY(r[1])}` }));
    el('rect', { x: cx + 1, y: H - B - hB, width: bw, height: hB, fill: colorB, class: 'bar' }, svg)
      .appendChild(Object.assign(document.createElementNS(NS, 'title'), { textContent: `${r[0]} deaths: ${formatY(r[2])}` }));
    if (i % 2 === 0 || rows.length <= 8) {
      const t = el('text', { x: cx, y: H - 8, class: 'tick', 'text-anchor': 'middle' }, svg);
      t.textContent = r[0];
    }
  });
  return svg;
}

// ---------------------------------------------------------- horizontal bars
// Labelled horizontal bars with the value at the end of each bar. Clicking
// or hovering a row calls onHover(item) — used for linked readouts.
export function hbars(container, items, { color = '#16406e', format = (v) => v, onHover = null } = {}) {
  const max = Math.max(...items.map((d) => d.value));
  const wrap = document.createElement('div');
  wrap.className = 'hbars';
  items.forEach((d) => {
    const row = document.createElement('div');
    row.className = 'hbar-row';
    row.innerHTML = `<span class="hbar-label">${d.label}</span>`
      + `<span class="hbar-track"><span class="hbar-fill" style="width:${(d.value / max) * 100}%;background:${d.color || color}"></span></span>`
      + `<span class="hbar-value">${format(d.value)}</span>`;
    if (onHover) {
      row.addEventListener('mouseenter', () => onHover(d));
      row.addEventListener('click', () => onHover(d));
    }
    wrap.appendChild(row);
  });
  container.appendChild(wrap);
  return wrap;
}

// ---------------------------------------------------------------- pyramid
// Population pyramid: male bars to the left, female to the right, one row
// per age band (youngest at the bottom).
export function pyramid(container, rows, { maxPct = 4 } = {}) {
  const W = 720, rowH = 21, H = rows.length * rowH + 30, mid = W / 2, half = W / 2 - 90;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' }, container);
  [...rows].reverse().forEach((r, i) => {
    const y = 6 + i * rowH;
    const mw = (r[1] / maxPct) * half;
    const fw = (r[2] / maxPct) * half;
    el('rect', { x: mid - mw, y, width: mw, height: rowH - 5, fill: '#16406e', class: 'bar' }, svg);
    el('rect', { x: mid, y, width: fw, height: rowH - 5, fill: '#c0564f', class: 'bar' }, svg);
    const t = el('text', { x: mid, y: y + rowH - 9, class: 'tick', 'text-anchor': 'middle' }, svg);
    t.textContent = r[0];
  });
  const bm = el('text', { x: mid - half / 2, y: H - 4, class: 'tick', 'text-anchor': 'middle' }, svg);
  bm.textContent = 'Male — % of population';
  const bf = el('text', { x: mid + half / 2, y: H - 4, class: 'tick', 'text-anchor': 'middle' }, svg);
  bf.textContent = 'Female — % of population';
  return svg;
}

// ------------------------------------------------------------------ donut
// A donut chart whose slices and legend entries share one hover readout:
// hovering either highlights the slice and reports it via onHover(slice).
export function donut(container, slices, { size = 300, onHover = null } = {}) {
  const total = slices.reduce((s, d) => s + d.value, 0);
  const R = size / 2, r0 = R * 0.58, cx = R, cy = R;
  const palette = ['#16406e', '#2f6db3', '#5b8cc0', '#c0564f', '#d99a4e', '#5d8a5f',
    '#7a6ba5', '#4f7d8a', '#a5673f', '#8a8f5c', '#546e7a', '#b08968'];
  const svg = el('svg', { viewBox: `0 0 ${size} ${size}`, class: 'chart donut-svg', role: 'img' }, container);
  let a0 = -Math.PI / 2;
  const paths = slices.map((d, i) => {
    const a1 = a0 + (d.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const p = (a, r) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    const path = el('path', {
      d: `M${p(a0, R)} A${R} ${R} 0 ${large} 1 ${p(a1, R)} L${p(a1, r0)} A${r0} ${r0} 0 ${large} 0 ${p(a0, r0)} Z`,
      fill: d.color || palette[i % palette.length], class: 'slice',
    }, svg);
    const slice = { ...d, color: d.color || palette[i % palette.length], pct: (d.value / total) * 100 };
    if (onHover) {
      path.addEventListener('mouseenter', () => onHover(slice));
      path.addEventListener('click', () => onHover(slice));
    }
    a0 = a1;
    return slice;
  });
  return { slices: paths, total };
}
