// Render AI JSON as readable labelled sections, preserving false/0/empty values.
export function readableSections(value) {
  const label = (k) => String(k).replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/^./, (c) => c.toUpperCase());
  const scalar = (v) => (v === null || v === undefined ? '(not supplied)' : v === '' ? '(empty)' : String(v));
  if (Array.isArray(value)) return value.length ? value.map((v) => readableSections(v)).join('\n') : '(empty list)';
  if (value && typeof value === 'object') {
    const e = Object.entries(value);
    return e.length ? e.map(([k, v]) => (v && typeof v === 'object' ? `${label(k)}:\n${readableSections(v)}` : `${label(k)}: ${scalar(v)}`)).join('\n') : '(no fields)';
  }
  return scalar(value);
}
export default readableSections;
