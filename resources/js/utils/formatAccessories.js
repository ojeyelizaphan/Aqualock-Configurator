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

  return flatEntries
    .filter(([path, value]) => {
      const lastKey = path.split('.').pop().replace(/\[\d+\]/g, '');

      // Hide internal/helper fields everywhere
      if (['value', 'price', 'unit', 'insulated'].includes(lastKey)) {
        return false;
      }

      // Hide empty drive-over "none" if you don't want it shown in summary
      if (path === 'driveOverPlate' && value === 'none') {
        return false;
      }

      // Hide window quantity if no window selected
      if (
        path === 'glazing.windows.quantity' &&
        !accessories?.glazing?.windows?.type
      ) {
        return false;
      }

      // Hide empty or zero window quantity
      if (
        path === 'glazing.windows.quantity' &&
        (value === 0 || value === '0' || value === null || value === '')
      ) {
        return false;
      }

      // Hide stripe length if no stripe selected
      if (
        path === 'glazing.stripe.length' &&
        !accessories?.glazing?.stripe?.type
      ) {
        return false;
      }

      // Hide empty or zero stripe length
      if (
        path === 'glazing.stripe.length' &&
        (value === 0 || value === '0' || value === null || value === '')
      ) {
        return false;
      }

      return true;
    })
    .map(([path, value]) => {
      let label = '';
      let displayValue = value;

      // Drive-over plate formatting
      if (path === 'driveOverPlate') {
        label = 'Drive-over Plate';
        displayValue =
          value === 'stainless'
            ? 'Stainless Steel'
            : value === 'aluminium'
            ? 'Aluminium'
            : value;
      }

      // Window formatting
      else if (path === 'glazing.windows.type') {
        label = 'Window';
      } else if (path === 'glazing.windows.quantity') {
        label = 'Number of Windows';
      }

      // Stripe formatting
      else if (path === 'glazing.stripe.type') {
        label = 'Glass Stripe';
      } else if (path === 'glazing.stripe.length') {
        label = 'Stripe Length';
        displayValue = `${value} mm`;
      }

      // Generic fallback
      else {
        label = formatKey(path.split('.').pop().replace(/\[\d+\]/g, ''));
      }

      if (typeof displayValue === 'boolean') {
        displayValue = displayValue ? 'Yes' : 'No';
      }

      return `${label}: ${displayValue}`;
    });
}