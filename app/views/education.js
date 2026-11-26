// Education view: attainment of adults, degrees by field, and the school
// system in fact tiles.

import { ATTAINMENT, DEGREES_BY_FIELD, EDUCATION_FACTS } from '../data/topics.js';
import { hbars } from '../lib/charts.js';
import { blockHead, factTiles } from './shared.js';

export function renderEducation(root) {
  root.innerHTML = `
    <p class="kicker">Education</p>
    <h1>A more educated nation</h1>
    <p class="lede">Nearly four in ten American adults now hold a bachelor's degree or higher —
    a share that has roughly doubled since 1990 — and colleges confer about two million
    bachelor's degrees a year.</p>

    <section class="block">
      ${blockHead('Educational attainment, adults 25 and over', 'Highest level completed, percent')}
      <div class="panel"><div id="attainment"></div>
      <p class="source">Source: U.S. Census Bureau, Current Population Survey, 2023. Bachelor's and
      graduate degrees together are the published 37.5% with at least a bachelor's degree.</p></div>
    </section>

    <section class="block">
      ${blockHead("Bachelor's degrees by field, 2021–22", 'Thousands of degrees conferred')}
      <div class="panel"><div id="degrees"></div>
      <p class="source">Source: National Center for Education Statistics, 2021–22. Business alone
      accounts for nearly one degree in five; health professions are second and still growing.</p></div>
    </section>

    <section class="block">
      ${blockHead('The school system')}
      ${factTiles(EDUCATION_FACTS)}
    </section>`;

  hbars(root.querySelector('#attainment'),
    ATTAINMENT.map(([label, value]) => ({ label, value })),
    { color: '#16406e', format: (v) => v.toFixed(1) + '%' });
  hbars(root.querySelector('#degrees'),
    DEGREES_BY_FIELD.map(([label, value]) => ({ label, value })),
    { color: '#2f6db3', format: (v) => v + 'k' });
  return () => {};
}
