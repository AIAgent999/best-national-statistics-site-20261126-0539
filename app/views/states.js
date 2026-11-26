// States explorer: a tile-grid cartogram of the 50 states and DC, coloured
// by any of four metrics, with a live search, a sortable ranking table and
// a detail panel. Colouring, sorting and selection are all one state
// object; every control re-renders the parts it changes.

import { METRICS, STATES, STATE_SOURCES } from '../data/states.js';
import { esc, fmtInt } from '../lib/format.js';

const RAMP_LOW = [219, 231, 244];   // #dbe7f4
const RAMP_HIGH = [22, 64, 110];    // #16406e

function ramp(t) {
  const c = RAMP_LOW.map((lo, i) => Math.round(lo + (RAMP_HIGH[i] - lo) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function renderStates(root) {
  const state = { metric: 'pop', query: '', sortKey: 'pop', sortDir: -1, selected: 'CA' };

  root.innerHTML = `
    <p class="kicker">States explorer</p>
    <h1>Fifty states, four measures</h1>
    <p class="lede">Each square is one state, laid out roughly where it belongs on the map and
    coloured by the measure you choose. Pick a state — on the map or in the table — to see all
    four of its figures and where it ranks.</p>

    <section class="block">
      <div class="controls" role="group" aria-label="Measure">
        <div class="seg" id="metric-seg">
          ${Object.entries(METRICS).map(([k, m]) => `<button data-metric="${k}" class="${k === state.metric ? 'active' : ''}">${m.short}</button>`).join('')}
        </div>
        <input class="searchbox" id="state-search" type="search" placeholder="Search states…" aria-label="Search states">
      </div>
      <div class="states-layout">
        <div>
          <div class="tilemap" id="tilemap"></div>
          <div class="maplegend"><span id="legend-min"></span><span class="ramp"></span><span id="legend-max"></span>
          <span id="legend-metric"></span></div>
        </div>
        <aside class="detail" id="state-detail" aria-live="polite"></aside>
      </div>
      <table class="data" id="state-table">
        <caption>All states ranked — select a column heading to sort</caption>
        <thead><tr>
          <th><button data-sort="name">State</button></th>
          <th><button data-sort="pop">Population</button></th>
          <th><button data-sort="gdpPc">GDP / capita</button></th>
          <th><button data-sort="income">Median income</button></th>
          <th><button data-sort="unemp">Unemployment</button></th>
        </tr></thead>
        <tbody></tbody>
      </table>
      <p class="source" id="state-source"></p>
    </section>`;

  const tilemap = root.querySelector('#tilemap');
  const tbody = root.querySelector('#state-table tbody');
  const detail = root.querySelector('#state-detail');

  // Tile elements are created once; colouring and dimming update them.
  const tiles = new Map();
  for (const s of STATES) {
    const b = document.createElement('button');
    b.className = 'tile';
    b.textContent = s.abbr;
    b.title = s.name;
    b.style.gridColumn = s.col + 1;
    b.style.gridRow = s.row + 1;
    b.addEventListener('click', () => { state.selected = s.abbr; paint(); });
    tilemap.appendChild(b);
    tiles.set(s.abbr, b);
  }

  function scaleFn() {
    const m = METRICS[state.metric];
    const vals = STATES.map((s) => s[state.metric]);
    if (m.scale === 'log') {
      const lo = Math.log(Math.min(...vals)), hi = Math.log(Math.max(...vals));
      return (v) => (Math.log(v) - lo) / (hi - lo);
    }
    const lo = Math.min(...vals), hi = Math.max(...vals);
    return (v) => (v - lo) / (hi - lo);
  }

  function rankOf(abbr, key) {
    const sorted = [...STATES].sort((a, b) => b[key] - a[key]);
    return sorted.findIndex((s) => s.abbr === abbr) + 1;
  }

  function paint() {
    const m = METRICS[state.metric];
    const scale = scaleFn();
    const q = state.query.trim().toLowerCase();
    for (const s of STATES) {
      const t = scale(s[state.metric]);
      const b = tiles.get(s.abbr);
      b.style.background = ramp(m.invert ? 1 - t : t);
      b.style.color = (m.invert ? 1 - t : t) > 0.55 ? '#fff' : '#0d2a49';
      b.classList.toggle('dim', !!q && !s.name.toLowerCase().includes(q));
      b.classList.toggle('selected', s.abbr === state.selected);
    }
    const vals = STATES.map((s) => s[state.metric]);
    root.querySelector('#legend-min').textContent = m.axis(Math.min(...vals));
    root.querySelector('#legend-max').textContent = m.axis(Math.max(...vals));
    root.querySelector('#legend-metric').textContent = m.label;
    root.querySelector('#state-source').textContent =
      `Colouring: ${m.label} — ${STATE_SOURCES[state.metric]}. Table: population ${STATE_SOURCES.pop}; GDP per capita ${STATE_SOURCES.gdpPc}; income ${STATE_SOURCES.income}; unemployment ${STATE_SOURCES.unemp}.`;

    // Table: sorted by the active key, filtered by the search text.
    const rows = [...STATES].sort((a, b) => {
      const k = state.sortKey;
      const d = typeof a[k] === 'string' ? a[k].localeCompare(b[k]) : a[k] - b[k];
      return d * state.sortDir;
    });
    tbody.innerHTML = rows.map((s) => `
      <tr data-abbr="${s.abbr}" class="${s.abbr === state.selected ? 'selected' : ''} ${q && !s.name.toLowerCase().includes(q) ? 'dim' : ''}">
        <td>${esc(s.name)}</td><td>${fmtInt(s.pop)}</td><td>$${fmtInt(s.gdpPc)}</td>
        <td>$${fmtInt(s.income)}</td><td>${s.unemp.toFixed(1)}%</td>
      </tr>`).join('');
    tbody.querySelectorAll('tr').forEach((tr) => {
      tr.addEventListener('click', () => { state.selected = tr.dataset.abbr; paint(); });
    });
    root.querySelectorAll('#state-table th button').forEach((btn) => {
      const base = btn.dataset.sort === 'name' ? 'State' : METRICS[btn.dataset.sort].short;
      btn.innerHTML = esc(base) + (state.sortKey === btn.dataset.sort
        ? ` <span class="arrow">${state.sortDir === -1 ? '▼' : '▲'}</span>` : '');
    });

    // Detail panel for the selected state.
    const s = STATES.find((x) => x.abbr === state.selected);
    detail.innerHTML = `
      <h3>${esc(s.name)}</h3>
      <div class="detail-sub">${esc(s.abbr)} — selected state</div>
      <dl>
        <dt>Population</dt><dd>${fmtInt(s.pop)}<span class="rank">#${rankOf(s.abbr, 'pop')} of 51</span></dd>
        <dt>GDP per capita</dt><dd>$${fmtInt(s.gdpPc)}<span class="rank">#${rankOf(s.abbr, 'gdpPc')} of 51</span></dd>
        <dt>Median household income</dt><dd>$${fmtInt(s.income)}<span class="rank">#${rankOf(s.abbr, 'income')} of 51</span></dd>
        <dt>Unemployment</dt><dd>${s.unemp.toFixed(1)}%<span class="rank">#${rankOf(s.abbr, 'unemp')} of 51</span></dd>
      </dl>
      <p class="source">Ranks run highest first. The District of Columbia is counted as a state equivalent.</p>`;
  }

  root.querySelector('#metric-seg').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-metric]');
    if (!btn) return;
    state.metric = btn.dataset.metric;
    root.querySelectorAll('#metric-seg button').forEach((b) => b.classList.toggle('active', b === btn));
    paint();
  });
  root.querySelector('#state-search').addEventListener('input', (ev) => {
    state.query = ev.target.value;
    paint();
  });
  root.querySelector('#state-table thead').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-sort]');
    if (!btn) return;
    const k = btn.dataset.sort;
    if (state.sortKey === k) state.sortDir *= -1;
    else { state.sortKey = k; state.sortDir = k === 'name' ? 1 : -1; }
    paint();
  });

  paint();
  return () => {};
}
