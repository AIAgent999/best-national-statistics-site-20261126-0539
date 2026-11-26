[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/AIAgent999/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/AIAgent999/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# America by the Numbers — United States Statistical Atlas

An original national statistics portal for the [make.fun best-national-statistics-site-20261126-0539 bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539): the United States in official figures, as published by its federal statistical agencies — every figure sourced and dated, every chart drawn from the published series by the site's own code. Static files, no build step, no libraries, no network; works on desktop and phone.

## What's inside

- **Overview**: a live U.S. population clock advanced from the Census Bureau's 1 January 2025 estimate at the Bureau's published rates (one birth every 9 s, one death every 11 s, one net migrant every 27 s), eight key-indicator cards with sparklines, deltas and per-card sources, and a population 1950–2024 chart whose year slider and hover crosshair share one readout.
- **States explorer**: a tile-grid cartogram of all 50 states + DC coloured by four switchable measures (population, GDP per capita, median household income, unemployment), a live search, a sortable rankings table, and a detail panel with each state's four figures and national ranks.
- **Population**: age pyramid, births vs deaths 1980–2024, composition facts.
- **Economy**: GDP by industry donut with hover-linked legend, GDP and federal-debt charts with crosshairs, trade and budget facts.
- **Health**: life expectancy 1950–2023 (the pandemic dip included), the CDC's top-10 causes of death for 2023, spending and coverage facts.
- **Education**: attainment and degrees-by-field charts with system facts.

Sources are printed on the page throughout: U.S. Census Bureau, Bureau of Economic Analysis, Bureau of Labor Statistics, CDC/NCHS, U.S. Treasury, NCES.

## How it works

`main.ts` (Node 22, standard library only) hands the entry in: it copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library in `vendor/makefun-frontend.ts`.

```sh
node main.ts            # writes /output (or $MAKEFUN_OUTPUT_DIR)
```

To view locally, serve `app/` with any static file server and open `index.html` in a browser — it runs fully offline.
