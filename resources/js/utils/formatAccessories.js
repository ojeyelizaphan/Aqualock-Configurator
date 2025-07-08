function formatKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase to spaced
    .replace(/_/g, ' ')                 // snake_case to spaced
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
}

function flattenObject(obj, parentKey = '') {
  const entries = [];

  for (const key in obj) {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value === null || value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
      continue; // skip empty/null/false/empty arrays
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flattenObject(value, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === 'object') {
          entries.push(...flattenObject(item, `${fullKey}[${i}]`));
        } else {
          entries.push([`${fullKey}[${i}]`, item]);
        }
      });
    } else {
      entries.push([fullKey, value]);
    }
  }

  return entries;
}

export function formatAccessories(accessories = {}) {
  const flatEntries = flattenObject(accessories);

  return flatEntries.map(([path, value]) => {
    const label = formatKey(path.split('.').pop());
    const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
    return `${label}: ${displayValue}`;
  });
}
