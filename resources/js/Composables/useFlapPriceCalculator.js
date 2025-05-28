import { computed, ref, watch } from 'vue';

export function useFlapPriceCalculator(form) {
  const baseCalculatedPrice = ref(0);
  const colorExtraCost = ref(0);
  const accessoryExtraCost = ref(0);
  const finalPrice = ref(0);

  const versionVMatrix = {
    600: [1469, 1485, 1500, 1514, 1530, 1561],
    700: [1485, 1562, 1577, 1592, 1609, 1640],
    800: [1500, 1577, 1659, 1675, 1692, 1726],
    900: [1514, 1592, 1675, 1761, 1781, 1817],
    1000: [1530, 1609, 1692, 1781, 1875, 1912],
    1100: [1561, 1640, 1726, 1817, 1912, 1990],
  };

  const versionEMatrix = {
    600: [1663, 1681, 1697, 1715, 1732, 1766],
    700: [1681, 1767, 1783, 1801, 1819, 1855],
    800: [1697, 1783, 1876, 1892, 1912, 1950],
    900: [1715, 1801, 1892, 1991, 2011, 2053],
    1000: [1732, 1819, 1912, 2011, 2116, 2159],
    1100: [1766, 1855, 1950, 2053, 2159, 2246],
  };

  const widthSteps = [600, 700, 800, 900, 1000, 1100];

  const calculatePrice = () => {
    const options = form.config_options || {};
    const width = Number(options.width);
    const height = Number(options.height);
    const material = options.material;

    const colIndex = widthSteps.indexOf(width);
    let basePrice = 0;

    if (material === 'galvanized') {
      basePrice = versionVMatrix[height]?.[colIndex] ?? 0;
    } else if (material === 'stainless') {
      basePrice = versionEMatrix[height]?.[colIndex] ?? 0;
    }

    // Area
    const m2 = (width * height) / 1_000_000;

    // Color price
    const colorPrice = options.color === 'custom' ? Math.round(m2 * 69) : 0;

    // Accessories
    const panellingCost = options.internal_panelling === 'with_panelling' ? Math.round(m2 * 145) : 0;
    const padlockCost = options.padlock_preparation === 'with_padlock_preparation' ? 61 : 0;
    const assemblyKitCost = 116; // always included

    const accessoriesCost = panellingCost + padlockCost + assemblyKitCost;

    baseCalculatedPrice.value = basePrice;
    colorExtraCost.value = colorPrice;
    accessoryExtraCost.value = accessoriesCost;
    finalPrice.value = basePrice + colorPrice + accessoriesCost;
  };

  watch(form, calculatePrice, { deep: true, immediate: true });

  return {
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    finalPrice,
  };
}
