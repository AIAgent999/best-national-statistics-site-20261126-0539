// Home view: the population clock, the eight headline indicators, the
// long population chart with its year slider, and doors into the sections.

import {
  CLOCK, INDICATORS, NET_ADD_EVERY_SEC, POPULATION_BASE, POPULATION_SERIES,
} from '../data/national.js';
import { lineChart, sparkline } from '../lib/charts.js';
import { fmtInt } from '../lib/format.js';

export function renderHome(root) {
  root.innerHTML = `
    <p class="kicker">The United States in official figures</p>
    <h1>A nation of 340 million, counted</h1>
    <p class="lede">The headline statistics of the United States, as published by its federal
    statistical agencies — population, the economy, health and education — with every figure
    sourced and every chart drawn from the published series.</p>

    <div class="clockband" aria-label="Population clock">
      <div>
        <div class="clock-label">U.S. population clock</div>
        <div class="clock-figure" id="pop-clock">${fmtInt(POPULATION_BASE)}</div>
        <div class="clock-sub">The Census Bureau's estimate, advanced from 1 January 2025 at the
        Bureau's published rates. This page's clock has been running since you opened it.</div>
        <div class="clock-rates">
          <span>One birth every <b>9 s</b></span>
          <span>One death every <b>11 s</b></span>
          <span>One net migrant every <b>27 s</b></span>
        </div>
      </div>
      <div class="clock-count">
        <div class="next-num" id="pop-next">${Math.ceil(NET_ADD_EVERY_SEC)}</div>
        <div class="next-label">seconds to the<br>next net addition</div>
      </div>
    </div>

    <section class="block">
      <div class="block-head"><h2>Key indicators</h2><span class="hint">Latest published figures, with the recent trend under each</span></div>
      <div class="cards">
        ${INDICATORS.map((c) => `
        <article class="card">
          <div class="card-label">${c.label}</div>
          <div class="card-value">${c.value}</div>
          <div class="card-sub">${c.sub}</div>
          <div class="card-foot">
            <span class="delta ${c.deltaDir}">${c.delta}</span>
            ${sparkline(c.spark)}
          </div>
          <div class="card-source">${c.source}</div>
        </article>`).join('')}
      </div>
    </section>

    <section class="block">
      <div class="block-head"><h2>Population since 1950</h2><span class="hint">Drag the year slider, or move across the chart</span></div>
      <div class="panel">
        <div class="readout" id="pop-readout" aria-live="polite"></div>
        <div id="pop-chart"></div>
        <div class="slider-row">
          <input type="range" id="pop-slider" min="1950" max="2024" step="1" value="2024" aria-label="Year">
          <output id="pop-year">2024</output>
        </div>
        <p class="source">Resident population, millions. Source: U.S. Census Bureau, decennial censuses and intercensal estimates.</p>
      </div>
    </section>

    <section class="block">
      <div class="block-head"><h2>Explore the atlas</h2></div>
      <div class="doors">
        <a class="door" href="#/states"><span class="door-stat">51</span><h3>States explorer</h3>
          <p>Every state and the District of Columbia on one map — population, income, output and unemployment, ranked.</p></a>
        <a class="door" href="#/population"><span class="door-stat">39.2 yrs</span><h3>Population</h3>
          <p>Age structure, births and deaths, and how the nation is composed.</p></a>
        <a class="door" href="#/economy"><span class="door-stat">$29.75T</span><h3>Economy</h3>
          <p>Output by industry, the federal debt, trade and the labour market.</p></a>
        <a class="door" href="#/health"><span class="door-stat">78.5 yrs</span><h3>Health</h3>
          <p>Life expectancy's long climb and pandemic fall, and what Americans die of.</p></a>
        <a class="door" href="#/education"><span class="door-stat">37.5%</span><h3>Education</h3>
          <p>Attainment, degrees by field, and the school system in figures.</p></a>
        <a class="door" href="#/states"><span class="door-stat">39.4M</span><h3>Largest state</h3>
          <p>California holds more people than the 21 smallest states combined. See the full ranking.</p></a>
      </div>
    </section>`;

  // --- the population clock -------------------------------------------------
  // Advance the 1 Jan 2025 estimate by the elapsed wall-clock time at the
  // Census Bureau's component rates, then keep ticking once a second.
  const clockEl = root.querySelector('#pop-clock');
  const nextEl = root.querySelector('#pop-next');
  const jan2025 = Date.UTC(2025, 0, 1);
  let shown = POPULATION_BASE + Math.floor((Date.now() - jan2025) / 1000 / NET_ADD_EVERY_SEC);
  let countdown = NET_ADD_EVERY_SEC - ((Date.now() / 1000) % NET_ADD_EVERY_SEC);
  clockEl.textContent = fmtInt(shown);
  const timer = setInterval(() => {
    countdown -= 1;
    if (countdown <= 0) {
      shown += 1;
      countdown += NET_ADD_EVERY_SEC;
      clockEl.textContent = fmtInt(shown);
    }
    nextEl.textContent = Math.ceil(countdown);
  }, 1000);

  // --- the long population chart ---------------------------------------------
  const readout = root.querySelector('#pop-readout');
  const chart = lineChart(root.querySelector('#pop-chart'), POPULATION_SERIES, {
    yLabel: 'Millions of residents',
    axisY: (v) => Math.round(v) + 'M',
    formatX: (v) => String(Math.round(v)),
    onReadout: (p) => {
      readout.innerHTML = `<span class="ro-year">${Math.round(p[0])}</span>${p[1].toFixed(1)} million residents`;
    },
  });
  const slider = root.querySelector('#pop-slider');
  const yearOut = root.querySelector('#pop-year');
  slider.addEventListener('input', () => {
    yearOut.textContent = slider.value;
    chart.setMarker(Number(slider.value));
  });

  return () => clearInterval(timer);
}
