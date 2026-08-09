import { computed } from 'vue';

export function useFlapPriceCalculator(
  form,
  configurationSteps,
  step
) {
  /*
   * Each object key is the flap height.
   * Array positions correspond to:
   * [600, 700, 800, 900, 1000, 1100] mm widths.
   */
  const versionVMatrix = {
    600: [1706, 1724, 1742, 1757, 1776, 1812],
    700: [1724, 1813, 1830, 1848, 1867, 1903],
    800: [1742, 1830, 1926, 1945, 1964, 2003],
    900: [1757, 1848, 1945, 2045, 2067, 2109],
    1000: [1776, 1867, 1964, 2067, 2176, 2220],
    1100: [1812, 1903, 2003, 2109, 2220, 2310],
  };

  const versionEMatrix = {
    600: [1930, 1951, 1970, 1991, 2011, 2050],
    700: [1951, 2051, 2069, 2091, 2112, 2154],
    800: [1970, 2069, 2177, 2196, 2220, 2364],
    900: [1991, 2091, 2196, 2311, 2334, 2383],
    1000: [2011, 2112, 2220, 2334, 2457, 2506],
    1100: [2050, 2154, 2264, 2383, 2506, 2607],
  };

  const widthSteps = [600, 700, 800, 900, 1000, 1100];

  const baseCalculatedPrice = computed(() => {
    const options = form.config_options ?? {};

    const width = Number(options.width) || 0;
    const height = Number(options.height) || 0;
    const material = options.material;

    const columnIndex = widthSteps.indexOf(width);

    if (columnIndex === -1 || !height || !material) {
      return 0;
    }

    if (material === 'galvanized') {
      return versionVMatrix[height]?.[columnIndex] ?? 0;
    }

    if (material === 'stainless') {
      return versionEMatrix[height]?.[columnIndex] ?? 0;
    }

    return 0;
  });

  const flapAreaM2 = computed(() => {
    const options = form.config_options ?? {};

    const width = Number(options.width) || 0;
    const height = Number(options.height) || 0;

    if (!width || !height) {
      return 0;
    }

    return (width * height) / 1_000_000;
  });

  const colorExtraCost = computed(() => {
    const options = form.config_options ?? {};

    if (options.color !== 'custom') {
      return 0;
    }

    return Math.round(flapAreaM2.value * 80);
  });

  const accessoryExtraCost = computed(() => {
    const options = form.config_options ?? {};

    const panellingCost =
      options.internal_panelling === 'with_panelling'
        ? Math.round(flapAreaM2.value * 157)
        : 0;

    const padlockCost =
      options.padlock_preparation ===
      'with_padlock_preparation'
        ? 71
        : 0;

    const colourStepIndex =
      configurationSteps.value?.findIndex?.(
        (stepObject) =>
          stepObject.name ===
          'Colour, Opening Direction, Cladding.'
      ) ?? -1;

    /*
     * Preserve the existing behaviour: the mandatory
     * assembly kit appears after completing this step.
     */
    const assemblyKitCost =
      step.value > colourStepIndex + 1 ? 135 : 0;

    return (
      panellingCost +
      padlockCost +
      assemblyKitCost
    );
  });

  const finalPrice = computed(() => {
    return (
      baseCalculatedPrice.value +
      colorExtraCost.value +
      accessoryExtraCost.value
    );
  });

  return {
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    finalPrice,
  };
}