// Shared building blocks for the topic views: fact-tile grids and panels.

import { esc } from '../lib/format.js';

// A grid of fact tiles (value, plain-language label, source line).
export function factTiles(facts) {
  return `<div class="facts">${facts.map((f) => `
    <div class="fact">
      <div class="fact-value">${esc(f.value)}</div>
      <div class="fact-label">${esc(f.label)}</div>
      <div class="fact-source">${esc(f.source)}</div>
    </div>`).join('')}</div>`;
}

// A titled section with a hint line, matching the atlas's block style.
export function blockHead(title, hint = '') {
  return `<div class="block-head"><h2>${esc(title)}</h2>${hint ? `<span class="hint">${esc(hint)}</span>` : ''}</div>`;
}
