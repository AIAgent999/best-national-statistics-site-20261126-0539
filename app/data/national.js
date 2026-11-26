// National data for America by the Numbers.
// Every figure is a published official statistic; each series names its
// source and the year it describes. Values are stored raw (in the units the
// publishing agency uses) and formatted at render time.

// The Census Bureau's population clock: the resident population estimate for
// 1 January 2025 and the component rates the Bureau publishes for it — one
// birth every 9 seconds, one death every 11 seconds, one net international
// migrant every 27 seconds. Net effect: one net addition every ~25 seconds.
export const POPULATION_BASE = 340110988; // Census Bureau, 1 Jan 2025
export const POPULATION_BASE_LABEL = '340,110,988';
export const CLOCK = { birthEverySec: 9, deathEverySec: 11, migrantEverySec: 27 };
// Seconds per net addition: 1 / (1/9 - 1/11 + 1/27) ≈ 24.97.
export const NET_ADD_EVERY_SEC = 1 / (1 / 9 - 1 / 11 + 1 / 27);

// The eight headline indicators on the home page. `spark` is the recent
// history drawn under each value (oldest first); `delta` is the latest
// year-over-year change, written as it is reported.
export const INDICATORS = [
  {
    id: 'population', label: 'Population', value: '340.1 million',
    sub: 'resident population estimate', spark: [331.5, 332.0, 333.3, 336.0, 340.1],
    delta: '+1.0% in 2024', deltaDir: 'up', source: 'U.S. Census Bureau, 2024',
  },
  {
    id: 'gdp', label: 'Gross domestic product', value: '$29.75 trillion',
    sub: 'current-dollar GDP', spark: [21.4, 23.7, 26.0, 27.7, 29.7],
    delta: '+2.8% real growth, 2024', deltaDir: 'up', source: 'Bureau of Economic Analysis, 2024',
  },
  {
    id: 'gdp-per-capita', label: 'GDP per capita', value: '$87,600',
    sub: 'current-dollar, per resident', spark: [64.5, 71.3, 78.0, 82.7, 87.6],
    delta: '+6.0% nominal, 2024', deltaDir: 'up', source: 'Bureau of Economic Analysis, 2024',
  },
  {
    id: 'income', label: 'Median household income', value: '$77,719',
    sub: 'per year, all households', spark: [77.2, 76.3, 74.6, 77.7],
    delta: '+4.0% real, 2023', deltaDir: 'up', source: 'U.S. Census Bureau, 2023',
  },
  {
    id: 'unemployment', label: 'Unemployment rate', value: '4.0%',
    sub: 'share of the labour force', spark: [8.1, 5.4, 3.6, 3.6, 4.0],
    delta: '+0.4 pts vs 2023', deltaDir: 'up', source: 'Bureau of Labor Statistics, 2024 avg',
  },
  {
    id: 'inflation', label: 'Inflation (CPI)', value: '+2.9%',
    sub: 'consumer prices, year over year', spark: [1.2, 4.7, 8.0, 4.1, 2.9],
    delta: '−1.2 pts vs 2023', deltaDir: 'down', source: 'Bureau of Labor Statistics, 2024',
  },
  {
    id: 'life', label: 'Life expectancy', value: '78.5 years',
    sub: 'at birth, both sexes', spark: [78.8, 76.8, 76.4, 77.5, 78.5],
    delta: '+1.0 yr vs 2022', deltaDir: 'up', source: 'CDC / NCHS, 2023',
  },
  {
    id: 'debt', label: 'Federal debt', value: '$35.5 trillion',
    sub: 'gross federal debt, end of fiscal year', spark: [26.9, 28.4, 30.9, 33.2, 35.5],
    delta: '+6.9% in FY2024', deltaDir: 'up', source: 'U.S. Treasury, FY2024',
  },
];

// Resident population, millions, Census Bureau estimates and censuses.
export const POPULATION_SERIES = [
  [1950, 152.3], [1955, 165.9], [1960, 180.7], [1965, 194.3], [1970, 205.1],
  [1975, 216.0], [1980, 227.7], [1985, 238.5], [1990, 249.6], [1995, 266.3],
  [2000, 282.2], [2005, 295.8], [2010, 309.3], [2015, 320.7], [2019, 328.3],
  [2020, 331.5], [2021, 332.0], [2022, 333.3], [2023, 336.0], [2024, 340.1],
];

// Births and deaths, millions per year (NCHS). The two lines nearly met in
// 2020–2021, when deaths rose sharply and births fell.
export const BIRTHS_DEATHS = [
  [1980, 3.61, 1.99], [1985, 3.76, 2.09], [1990, 4.16, 2.15], [1995, 3.90, 2.31],
  [2000, 4.06, 2.40], [2005, 4.14, 2.45], [2010, 4.00, 2.47], [2015, 3.98, 2.71],
  [2019, 3.75, 2.85], [2020, 3.61, 3.38], [2021, 3.66, 3.46], [2022, 3.67, 3.28],
  [2023, 3.60, 3.09], [2024, 3.62, 3.07],
];

// Age structure: percent of the population in each five-year band, by sex
// (Census Bureau estimates, 2024). Male and female shares each sum to ~50.
export const AGE_PYRAMID = [
  // [band, male %, female %]
  ['0–4', 3.0, 2.9], ['5–9', 3.1, 3.0], ['10–14', 3.2, 3.1], ['15–19', 3.3, 3.1],
  ['20–24', 3.5, 3.3], ['25–29', 3.6, 3.4], ['30–34', 3.6, 3.5], ['35–39', 3.4, 3.3],
  ['40–44', 3.2, 3.1], ['45–49', 3.0, 2.9], ['50–54', 3.0, 3.0], ['55–59', 3.0, 3.0],
  ['60–64', 3.0, 3.1], ['65–69', 2.7, 2.9], ['70–74', 2.3, 2.6], ['75–79', 1.8, 2.1],
  ['80–84', 1.1, 1.5], ['85+', 0.8, 1.4],
];

export const POPULATION_FACTS = [
  { value: '39.2 years', label: 'Median age of the population', source: 'Census Bureau, 2024' },
  { value: '14.3%', label: 'Foreign-born share of residents', source: 'Census Bureau ACS, 2023' },
  { value: '80%', label: 'Live in urban areas', source: 'Census Bureau, 2020 Census' },
  { value: '131 million', label: 'Households, averaging 2.5 people', source: 'Census Bureau, 2024' },
  { value: '94 / sq mi', label: 'Population density of land area', source: 'Census Bureau, 2020 Census' },
  { value: '+2.8 million', label: 'Net population gain during 2024', source: 'Census Bureau, 2024' },
];
