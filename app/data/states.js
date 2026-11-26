// State data: the 50 states and the District of Columbia.
//   pop     resident population — Census Bureau estimates, 2024
//   gdpPc   GDP per capita, dollars — Bureau of Economic Analysis, 2024
//   income  median household income, dollars — Census Bureau ACS 2023,
//           rounded to the nearest $1,000 as published in the atlas table
//   unemp   unemployment rate, percent — Bureau of Labor Statistics,
//           2024 annual average
// col/row place each state on the tile-grid map (a cartogram in which every
// state is one equal square, set roughly where it sits on a real map).

export const STATE_SOURCES = {
  pop: 'U.S. Census Bureau, 2024 estimates',
  gdpPc: 'Bureau of Economic Analysis, 2024',
  income: 'Census Bureau ACS, 2023 (rounded to $1k)',
  unemp: 'Bureau of Labor Statistics, 2024 avg',
};

// [abbr, name, col, row, pop, gdpPc, income, unemp]
const ROWS = [
  ['AL', 'Alabama', 6, 5, 5157699, 60000, 60000, 3.2],
  ['AK', 'Alaska', 0, 0, 740133, 91000, 92000, 4.7],
  ['AZ', 'Arizona', 1, 4, 7582384, 70000, 76000, 4.1],
  ['AR', 'Arkansas', 4, 4, 3088354, 59000, 58000, 3.5],
  ['CA', 'California', 0, 3, 39431263, 104000, 96000, 5.4],
  ['CO', 'Colorado', 2, 3, 5957493, 90000, 97000, 4.0],
  ['CT', 'Connecticut', 10, 3, 3675069, 100000, 93000, 3.4],
  ['DE', 'Delaware', 9, 3, 1051917, 98000, 85000, 3.8],
  ['DC', 'District of Columbia', 8, 4, 702250, 242000, 108000, 5.5],
  ['FL', 'Florida', 8, 6, 23372215, 72000, 73000, 3.3],
  ['GA', 'Georgia', 7, 5, 11180878, 76000, 77000, 3.6],
  ['HI', 'Hawaii', 0, 6, 1450625, 75000, 99000, 3.0],
  ['ID', 'Idaho', 1, 1, 2071246, 64000, 74000, 3.6],
  ['IL', 'Illinois', 5, 2, 12710158, 89000, 87000, 4.9],
  ['IN', 'Indiana', 6, 2, 6924281, 72000, 70000, 3.3],
  ['IA', 'Iowa', 4, 2, 3241488, 82000, 72000, 2.9],
  ['KS', 'Kansas', 3, 4, 2970606, 80000, 72000, 3.2],
  ['KY', 'Kentucky', 5, 3, 4588372, 64000, 62000, 4.9],
  ['LA', 'Louisiana', 4, 5, 4597740, 72000, 60000, 3.4],
  ['ME', 'Maine', 11, 0, 1405012, 62000, 73000, 3.2],
  ['MD', 'Maryland', 8, 3, 6263220, 83000, 108000, 3.1],
  ['MA', 'Massachusetts', 10, 2, 7136171, 110000, 104000, 4.0],
  ['MI', 'Michigan', 6, 1, 10140459, 65000, 71000, 4.6],
  ['MN', 'Minnesota', 4, 1, 5793151, 87000, 90000, 3.0],
  ['MS', 'Mississippi', 5, 5, 2938690, 48000, 52000, 4.0],
  ['MO', 'Missouri', 4, 3, 6245466, 70000, 68000, 3.7],
  ['MT', 'Montana', 2, 1, 1137233, 65000, 71000, 3.1],
  ['NE', 'Nebraska', 3, 3, 2043567, 89000, 78000, 2.6],
  ['NV', 'Nevada', 1, 2, 3267871, 76000, 78000, 5.6],
  ['NH', 'New Hampshire', 10, 1, 1409032, 83000, 98000, 2.4],
  ['NJ', 'New Jersey', 9, 2, 9500851, 96000, 104000, 4.6],
  ['NM', 'New Mexico', 2, 4, 2130256, 61000, 62000, 4.4],
  ['NY', 'New York', 8, 1, 19867248, 117000, 84000, 4.4],
  ['NC', 'North Carolina', 6, 4, 11046024, 75000, 71000, 3.7],
  ['ND', 'North Dakota', 3, 1, 796568, 95000, 76000, 2.0],
  ['OH', 'Ohio', 7, 2, 11883304, 74000, 70000, 4.0],
  ['OK', 'Oklahoma', 3, 5, 4095393, 68000, 65000, 3.4],
  ['OR', 'Oregon', 0, 2, 4363081, 81000, 83000, 4.2],
  ['PA', 'Pennsylvania', 8, 2, 13059701, 78000, 76000, 3.6],
  ['RI', 'Rhode Island', 11, 3, 1112308, 78000, 87000, 4.3],
  ['SC', 'South Carolina', 7, 4, 5478831, 62000, 69000, 4.0],
  ['SD', 'South Dakota', 3, 2, 924669, 82000, 74000, 1.9],
  ['TN', 'Tennessee', 5, 4, 7227750, 71000, 67000, 3.4],
  ['TX', 'Texas', 3, 6, 31290831, 86000, 79000, 4.0],
  ['UT', 'Utah', 1, 3, 3503613, 84000, 98000, 3.4],
  ['VT', 'Vermont', 9, 1, 648493, 66000, 82000, 2.1],
  ['VA', 'Virginia', 7, 3, 8811512, 84000, 90000, 2.9],
  ['WA', 'Washington', 0, 1, 7958418, 105000, 97000, 4.6],
  ['WV', 'West Virginia', 6, 3, 1769979, 55000, 55000, 4.4],
  ['WI', 'Wisconsin', 5, 1, 5960975, 74000, 79000, 3.0],
  ['WY', 'Wyoming', 2, 2, 587618, 93000, 76000, 3.3],
];

export const STATES = ROWS.map(([abbr, name, col, row, pop, gdpPc, income, unemp]) => ({
  abbr, name, col, row, pop, gdpPc, income, unemp,
}));

// The four metrics the explorer can colour, sort and search by. `format`
// turns a raw value into the text shown in tiles, tables and the detail
// panel; `scale` says how a value maps onto the colour ramp.
export const METRICS = {
  pop: {
    label: 'Population', short: 'Population', scale: 'log', invert: false,
    format: (v) => (v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : Math.round(v / 1e3) + 'k'),
    axis: (v) => (v / 1e6).toFixed(1) + 'M',
  },
  gdpPc: {
    label: 'GDP per capita', short: 'GDP / capita', scale: 'linear', invert: false,
    format: (v) => '$' + Math.round(v / 1000) + 'k',
    axis: (v) => '$' + Math.round(v / 1000) + 'k',
  },
  income: {
    label: 'Median household income', short: 'Median income', scale: 'linear', invert: false,
    format: (v) => '$' + Math.round(v / 1000) + 'k',
    axis: (v) => '$' + Math.round(v / 1000) + 'k',
  },
  unemp: {
    label: 'Unemployment rate', short: 'Unemployment', scale: 'linear', invert: true,
    format: (v) => v.toFixed(1) + '%',
    axis: (v) => v.toFixed(1) + '%',
  },
};
