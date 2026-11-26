// Topic data: economy, health and education series and fact tiles.
// Sources are named beside each block; figures are the published values for
// the years shown.

// ---- Economy -------------------------------------------------------------

// Current-dollar GDP, trillions of dollars (BEA).
export const GDP_SERIES = [
  [1980, 2.86], [1985, 4.34], [1990, 5.96], [1995, 7.64], [2000, 10.25],
  [2005, 13.04], [2010, 15.05], [2015, 18.30], [2019, 21.52], [2020, 21.35],
  [2021, 23.68], [2022, 26.01], [2023, 27.72], [2024, 29.75],
];

// GDP by industry, share of value added, percent (BEA, 2024). The named
// industries are the published shares; "All other industries" is the
// remainder, so the slices sum to exactly 100.
export const GDP_BY_INDUSTRY = [
  ['Finance, insurance & real estate', 20.4],
  ['Professional & business services', 13.1],
  ['Government', 11.3],
  ['Manufacturing', 9.9],
  ['Health care & social assistance', 8.5],
  ['Retail trade', 6.4],
  ['Information', 5.7],
  ['Wholesale trade', 5.6],
  ['Construction', 4.3],
  ['Arts, entertainment & food services', 4.2],
  ['Transportation & warehousing', 3.4],
  ['All other industries', 7.2],
];

// Gross federal debt at the end of each fiscal year, trillions (Treasury).
export const DEBT_SERIES = [
  [1980, 0.91], [1985, 1.82], [1990, 3.23], [1995, 4.97], [2000, 5.67],
  [2005, 7.93], [2010, 13.56], [2015, 18.15], [2019, 22.72], [2020, 26.95],
  [2021, 28.43], [2022, 30.93], [2023, 33.17], [2024, 35.46],
];

export const ECONOMY_FACTS = [
  { value: '$918 billion', label: 'Trade deficit in goods & services, 2024 — exports $3.19T, imports $4.11T', source: 'BEA / Census Bureau, 2024' },
  { value: '$1.8 trillion', label: 'Federal budget deficit, fiscal year 2024', source: 'U.S. Treasury, FY2024' },
  { value: '168 million', label: 'People in the civilian labour force', source: 'Bureau of Labor Statistics, 2024' },
  { value: '$7.25 / hour', label: 'Federal minimum wage, unchanged since 2009', source: 'U.S. Dept. of Labor' },
  { value: '2.8%', label: 'Real GDP growth during 2024', source: 'Bureau of Economic Analysis, 2024' },
  { value: '62.6%', label: 'Labour-force participation rate', source: 'Bureau of Labor Statistics, 2024 avg' },
];

// ---- Health --------------------------------------------------------------

// Life expectancy at birth, years (NCHS). The fall in 2020–2021 is the
// pandemic; 2023 recovered to 78.5.
export const LIFE_SERIES = [
  [1950, 68.2], [1955, 69.6], [1960, 69.7], [1965, 70.2], [1970, 70.8],
  [1975, 72.6], [1980, 73.7], [1985, 74.7], [1990, 75.4], [1995, 75.8],
  [2000, 76.8], [2005, 77.6], [2010, 78.7], [2015, 78.8], [2019, 78.8],
  [2020, 76.8], [2021, 76.4], [2022, 77.5], [2023, 78.5],
];

// The ten leading causes of death, final counts (CDC / NCHS, 2023).
export const CAUSES_OF_DEATH = [
  ['Heart disease', 680909],
  ['Cancer', 613331],
  ['Unintentional injuries', 222698],
  ['Stroke', 162639],
  ['Chronic lower respiratory diseases', 145320],
  ["Alzheimer's disease", 114034],
  ['Diabetes', 95190],
  ['Kidney disease', 55358],
  ['Chronic liver disease & cirrhosis', 52222],
  ['COVID-19', 49928],
];

export const HEALTH_FACTS = [
  { value: '$4.9 trillion', label: 'National health spending — 17.6% of GDP', source: 'CMS, 2023' },
  { value: '8.0%', label: 'Of the population had no health insurance', source: 'Census Bureau, 2023' },
  { value: '40.3%', label: 'Adult obesity prevalence, 2021–2023', source: 'CDC / NHANES' },
  { value: '5.6 per 1,000', label: 'Infant mortality rate, deaths per 1,000 live births', source: 'CDC / NCHS, 2023' },
  { value: '11.6%', label: 'Adults who smoke cigarettes', source: 'CDC, 2023' },
  { value: '78.5 years', label: 'Life expectancy at birth, up from 76.4 in 2021', source: 'CDC / NCHS, 2023' },
];

// ---- Education -----------------------------------------------------------

// Educational attainment of adults 25 and over, percent (CPS, 2023).
// Bachelor's and graduate degrees together are the published 37.5% with a
// bachelor's degree or higher.
export const ATTAINMENT = [
  ['Less than high school', 9.9],
  ['High school diploma', 27.5],
  ['Some college, no degree', 14.5],
  ["Associate's degree", 10.6],
  ["Bachelor's degree", 23.5],
  ['Graduate or professional degree', 14.0],
];

// Bachelor's degrees conferred by field, thousands (NCES, 2021–22).
export const DEGREES_BY_FIELD = [
  ['Business', 375],
  ['Health professions', 263],
  ['Social sciences & history', 151],
  ['Biological & biomedical sciences', 131],
  ['Psychology', 130],
  ['Engineering', 127],
  ['Computer & information sciences', 98],
  ['Visual & performing arts', 93],
  ['Communication & journalism', 91],
  ['Education', 89],
];

export const EDUCATION_FACTS = [
  { value: '49.5 million', label: 'Students in public elementary & secondary schools', source: 'NCES, fall 2023' },
  { value: '37.5%', label: 'Adults 25+ with a bachelor’s degree or higher', source: 'Census Bureau CPS, 2023' },
  { value: '87%', label: 'Public high-school graduation rate', source: 'NCES, 2021–22' },
  { value: '3.2 million', label: 'Full-time public school teachers', source: 'NCES, 2023' },
  { value: '2.0 million', label: "Bachelor's degrees conferred in one year", source: 'NCES, 2021–22' },
  { value: '15 to 1', label: 'Average pupil–teacher ratio in public schools', source: 'NCES, 2023' },
];
