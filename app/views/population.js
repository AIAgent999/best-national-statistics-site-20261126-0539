// Population view: the age pyramid, births against deaths, and the
// composition of the nation in fact tiles.

import { AGE_PYRAMID, BIRTHS_DEATHS, POPULATION_FACTS } from '../data/national.js';
import { groupedBars, pyramid } from '../lib/charts.js';
import { blockHead, factTiles } from './shared.js';

export function renderPopulation(root) {
  root.innerHTML = `
    <p class="kicker">Population</p>
    <h1>Who Americans are</h1>
    <p class="lede">Three hundred and forty million people: how old they are, how many are born
    and die each year, and what the balance between the two means for growth.</p>

    <section class="block">
      ${blockHead('Age structure, 2024', 'Share of the population in each five-year band, by sex')}
      <div class="panel"><div id="pyramid"></div>
      <p class="source">Percent of total population. Source: U.S. Census Bureau population estimates, 2024.
      The wide bands now aged 55–74 are the baby boom; the pinch at ages 20–34 is the smaller
      generation born in the 1990s and 2000s.</p></div>
    </section>

    <section class="block">
      ${blockHead('Births and deaths', 'Millions per year — the two lines nearly touched in 2020–21')}
      <div class="panel"><div id="birthsdeaths"></div>
      <div class="legend"><span><span class="swatch" style="background:#16406e"></span>Births</span>
      <span><span class="swatch" style="background:#c0564f"></span>Deaths</span></div>
      <p class="source">Source: CDC / National Center for Health Statistics, final data to 2023, provisional 2024.
      Natural increase — births minus deaths — was about 550,000 in 2024; most of the year's
      2.8 million growth came from net international migration.</p></div>
    </section>

    <section class="block">
      ${blockHead('The nation in brief')}
      ${factTiles(POPULATION_FACTS)}
    </section>`;

  pyramid(root.querySelector('#pyramid'), AGE_PYRAMID, { maxPct: 4 });
  groupedBars(root.querySelector('#birthsdeaths'), BIRTHS_DEATHS, {
    formatY: (v) => v.toFixed(1) + 'M',
  });
  return () => {};
}
