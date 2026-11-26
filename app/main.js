// America by the Numbers — application entry point.
// A tiny hash router: each section is a view module that renders into
// <main id="app"> and returns a cleanup function (the home view's clock
// interval is the one live timer). Navigation is ordinary links, so the
// back button and deep links work with no server support.

import { renderEconomy } from './views/economy.js';
import { renderEducation } from './views/education.js';
import { renderHealth } from './views/health.js';
import { renderHome } from './views/home.js';
import { renderPopulation } from './views/population.js';
import { renderStates } from './views/states.js';

const ROUTES = {
  '/': ['home', renderHome],
  '/states': ['states', renderStates],
  '/population': ['population', renderPopulation],
  '/economy': ['economy', renderEconomy],
  '/health': ['health', renderHealth],
  '/education': ['education', renderEducation],
};

const app = document.getElementById('app');
let cleanup = null;

function route() {
  const path = location.hash.replace(/^#/, '') || '/';
  const [nav, render] = ROUTES[path] || ROUTES['/'];
  if (cleanup) cleanup();
  document.querySelectorAll('.mainnav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === nav);
  });
  cleanup = render(app) || null;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
