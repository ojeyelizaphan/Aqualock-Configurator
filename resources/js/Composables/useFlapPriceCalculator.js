import { ref, watch } from 'vue';

export function useFlapPriceCalculator(form) {
  const baseCalculatedPrice = ref(0);
  const colorExtraCost = ref(0);
  const accessoryExtraCost = ref(0);
  const finalPrice = ref(0);

  const versionVMatrix = {
    600: [1656, 1674, 1691, 1706, 1724, 1759],
    700: [1674, 1760, 1777, 1794, 1813, 1848],
    800: [1691, 1777, 1870, 1888, 1907, 1945],
    900: [1706, 1794, 1888, 1985, 2007, 2048],
    1000: [1724, 1813, 1907, 2007, 2113, 2155],
    1100: [1759, 1848, 1945, 2048, 2155, 2243],
  };

  const versionEMatrix = {
    600: [1874, 1894, 1913, 1933, 1952, 1990],
    700: [1894, 1991, 2009, 2030, 2050, 2091],
    800: [1913, 2009, 2114, 2132, 2155, 2198],
    900: [1933, 2030, 2132, 2244, 2266, 2314],
    1000: [1952, 2050, 2155, 2266, 2385, 2433],
    1100: [1990, 2091, 2198, 2314, 2433, 2531],
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

    const m2 = (width * height) / 1_000_000;

    // Color price
    const colorPrice = options.color === 'custom' ? Math.round(m2 * 78) : 0;

    // Accessories
    const panellingCost =
      options.internal_panelling === 'with_panelling' ? Math.round(m2 * 152) : 0;

    const padlockCost =
      options.padlock_preparation === 'with_padlock_preparation' ? 69 : 0;

    const assemblyKitCost = 131; // always included

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