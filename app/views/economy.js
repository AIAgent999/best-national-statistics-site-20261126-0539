// Economy view: output by industry as an interactive donut, the long GDP
// series with a crosshair, the federal debt, and trade/budget fact tiles.

import { DEBT_SERIES, ECONOMY_FACTS, GDP_BY_INDUSTRY, GDP_SERIES } from '../data/topics.js';
import { donut, lineChart } from '../lib/charts.js';
import { blockHead, factTiles } from './shared.js';

export function renderEconomy(root) {
  root.innerHTML = `
    <p class="kicker">Economy</p>
    <h1>A $29.75 trillion economy</h1>
    <p class="lede">What the United States produces, which industries produce it, and the
    federal government's borrowing alongside it.</p>

    <section class="block">
      ${blockHead('Output by industry, 2024', 'Share of GDP by value added — move across the chart or the list')}
      <div class="panel">
        <div class="donut-layout">
          <div class="donut-wrap">
            <div id="donut"></div>
            <div class="donut-center"><div class="dc-value" id="dc-value">100%</div>
            <div class="dc-label" id="dc-label">All industries, GDP 2024</div></div>
          </div>
          <div class="donut-legend" id="donut-legend"></div>
        </div>
        <p class="source">Source: Bureau of Economic Analysis, GDP by industry, 2024. “All other industries”
        gathers agriculture, mining, utilities, education services and other services.</p>
      </div>
    </section>

    <section class="block">
      ${blockHead('Gross domestic product since 1980', 'Current dollars — move across the chart')}
      <div class="panel">
        <div class="readout" id="gdp-readout"></div>
        <div id="gdp-chart"></div>
        <p class="source">Source: Bureau of Economic Analysis. The 2020 dip is the pandemic recession —
        the sharpest, and shortest, on record.</p>
      </div>
    </section>

    <section class="block">
      ${blockHead('The federal debt', 'Gross federal debt at the end of each fiscal year')}
      <div class="panel">
        <div class="readout" id="debt-readout"></div>
        <div id="debt-chart"></div>
        <p class="source">Source: U.S. Department of the Treasury, fiscal year ends. Gross debt includes
        amounts the government owes itself, chiefly the Social Security trust funds.</p>
      </div>
    </section>

    <section class="block">
      ${blockHead('Trade, budgets and work')}
      ${factTiles(ECONOMY_FACTS)}
    </section>`;

  // Donut with a shared hover readout between slices and legend rows.
  const dcValue = root.querySelector('#dc-value');
  const dcLabel = root.querySelector('#dc-label');
  const legend = root.querySelector('#donut-legend');
  const showSlice = (s) => {
    dcValue.textContent = s.pct.toFixed(1) + '%';
    dcLabel.textContent = s.label;
    legend.querySelectorAll('.dl-row').forEach((r) => r.classList.toggle('hot', r.dataset.label === s.label));
  };
  const { slices } = donut(root.querySelector('#donut'),
    GDP_BY_INDUSTRY.map(([label, value]) => ({ label, value })),
    { onHover: showSlice });
  legend.innerHTML = slices.map((s) => `
    <div class="dl-row" data-label="${s.label}">
      <span class="swatch" style="background:${s.color}"></span>${s.label}
      <span class="dl-val">${s.pct.toFixed(1)}%</span>
    </div>`).join('');
  legend.querySelectorAll('.dl-row').forEach((row) => {
    const s = slices.find((x) => x.label === row.dataset.label);
    row.addEventListener('mouseenter', () => showSlice(s));
    row.addEventListener('click', () => showSlice(s));
  });

  const gdpReadout = root.querySelector('#gdp-readout');
  lineChart(root.querySelector('#gdp-chart'), GDP_SERIES, {
    yLabel: 'Trillions of dollars',
    axisY: (v) => '$' + Math.round(v) + 'T',
    formatX: (v) => String(Math.round(v)),
    onReadout: (p) => {
      gdpReadout.innerHTML = `<span class="ro-year">${Math.round(p[0])}</span>GDP $${p[1].toFixed(2)} trillion`;
    },
  });

  const debtReadout = root.querySelector('#debt-readout');
  lineChart(root.querySelector('#debt-chart'), DEBT_SERIES, {
    color: '#b03a34', yLabel: 'Trillions of dollars',
    axisY: (v) => '$' + Math.round(v) + 'T',
    formatX: (v) => String(Math.round(v)),
    onReadout: (p) => {
      debtReadout.innerHTML = `<span class="ro-year">FY${Math.round(p[0])}</span>Federal debt $${p[1].toFixed(2)} trillion`;
    },
  });
  return () => {};
}
