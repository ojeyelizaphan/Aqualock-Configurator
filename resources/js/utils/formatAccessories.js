function formatKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

function flattenObject(obj, parentKey = '') {
  const entries = [];

  for (const key in obj) {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      value === null ||
      value === '' ||
      value === false ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
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
  const stripeType = accessories?.glazing?.stripe?.type;

  return flatEntries
    .filter(([path, value]) => {
      // Hide stripe length unless a stripe type has actually been selected
      if (path === 'glazing.stripe.length' && !stripeType) {
        return false;
      }

      // Also hide zero/empty stripe length even if somehow present
      if (
        path === 'glazing.stripe.length' &&
        (value === 0 || value === '0' || value === null || value === '')
      ) {
        return false;
      }

      return true;
    })
    .map(([path, value]) => {
      let label;

      if (path === 'glazing.stripe.length') {
        label = 'Stripe Length';
      } else {
        label = formatKey(path.split('.').pop().replace(/\[\d+\]/g, ''));
      }

      const displayValue =
        typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;

      return `${label}: ${displayValue}`;
    });
}