// Small formatting helpers shared by every view.

export const fmtInt = (n) => Math.round(n).toLocaleString('en-US');

export const fmtMoney = (n) => '$' + fmtInt(n);

export const fmtMillions = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : fmtInt(n));

// Escape a string for safe interpolation into HTML.
export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
