// Health view: life expectancy's long series (with the pandemic notch),
// the ten leading causes of death, and spending/coverage fact tiles.

import { CAUSES_OF_DEATH, HEALTH_FACTS, LIFE_SERIES } from '../data/topics.js';
import { hbars, lineChart } from '../lib/charts.js';
import { fmtInt } from '../lib/format.js';
import { blockHead, factTiles } from './shared.js';

export function renderHealth(root) {
  root.innerHTML = `
    <p class="kicker">Health</p>
    <h1>Living longer, interrupted</h1>
    <p class="lede">Life expectancy rose almost ten years in the second half of the twentieth
    century, stalled in the 2010s, fell sharply in the pandemic, and by 2023 had recovered
    most of the loss.</p>

    <section class="block">
      ${blockHead('Life expectancy at birth, 1950–2023', 'Years — move across the chart')}
      <div class="panel">
        <div class="readout" id="life-readout"></div>
        <div id="life-chart"></div>
        <p class="source">Source: CDC / National Center for Health Statistics. Life expectancy fell
        2.4 years between 2019 and 2021 — the largest two-year drop since the 1940s — driven by
        COVID-19, then rebounded to 78.5 years in 2023.</p>
      </div>
    </section>

    <section class="block">
      ${blockHead('Leading causes of death, 2023', 'Final counts of deaths, all ages')}
      <div class="panel"><div id="causes"></div>
      <p class="source">Source: CDC / NCHS, National Vital Statistics System, 2023 final data.
      Heart disease and cancer together account for four of every ten deaths.</p></div>
    </section>

    <section class="block">
      ${blockHead('Spending and coverage')}
      ${factTiles(HEALTH_FACTS)}
    </section>`;

  const readout = root.querySelector('#life-readout');
  lineChart(root.querySelector('#life-chart'), LIFE_SERIES, {
    color: '#5d8a5f', yMin: 60, yLabel: 'Years of life expectancy',
    axisY: (v) => Math.round(v) + ' yrs',
    formatX: (v) => String(Math.round(v)),
    onReadout: (p) => {
      readout.innerHTML = `<span class="ro-year">${Math.round(p[0])}</span>Life expectancy ${p[1].toFixed(1)} years`;
    },
  });

  hbars(root.querySelector('#causes'),
    CAUSES_OF_DEATH.map(([label, value]) => ({ label, value })),
    { color: '#546e7a', format: (v) => fmtInt(v) });
  return () => {};
}
