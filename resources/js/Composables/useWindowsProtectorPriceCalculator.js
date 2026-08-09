import { computed } from 'vue';

import {
  windowProtectorWidths,
  windowPricesWithRemovableHatch,
  windowPricesWithTiltUpHatch,
  windowPricesWithoutHatch,
  removableHatchWidths,
  removableHatchPrices,
  tiltUpHatchWidths,
  tiltUpHatchPrices,
} from '@/Data/windowsProtectorPrices';

const ASSEMBLY_KIT_PRICE = 136;

/**
 * Gets a price from a height-row matrix.
 *
 * The matrix is structured as:
 * priceTable[height][widthIndex]
 */
function getMatrixPrice(
  priceTable,
  widths,
  width,
  height
) {
  const heightRow = priceTable[height];

  if (!heightRow) {
    return null;
  }

  const widthIndex = widths.indexOf(width);

  if (widthIndex === -1) {
    return null;
  }

  return heightRow[widthIndex] ?? null;
}

export function useWindowsProtectorPriceCalculator(form) {
  const windowBasePrice = computed(() => {
    const config = form.config_options ?? {};

    const width = Number(config.width) || 0;
    const height = Number(config.height) || 0;
    const hatchType = config.hatch_type ?? 'none';

    if (!width || !height) {
      return null;
    }

    let priceTable;

    if (hatchType === 'none') {
      priceTable = windowPricesWithoutHatch;
    } else if (hatchType === 'removable') {
      priceTable = windowPricesWithRemovableHatch;
    } else if (hatchType === 'tilt-up') {
      priceTable = windowPricesWithTiltUpHatch;
    } else {
      return null;
    }

    return getMatrixPrice(
      priceTable,
      windowProtectorWidths,
      width,
      height
    );
  });

  const hatchPrice = computed(() => {
    const config = form.config_options ?? {};
    const hatchType = config.hatch_type ?? 'none';

    if (hatchType === 'none') {
      return 0;
    }

    if (hatchType === 'removable') {
      const width =
        Number(config.removable_hatch_width) || 0;
      const height =
        Number(config.removable_hatch_height) || 0;

      if (!width || !height) {
        return null;
      }

      return getMatrixPrice(
        removableHatchPrices,
        removableHatchWidths,
        width,
        height
      );
    }

    if (hatchType === 'tilt-up') {
      const width =
        Number(config.tilt_up_hatch_width) || 0;
      const height =
        Number(config.tilt_up_hatch_height) || 0;

      if (!width || !height) {
        return null;
      }

      return getMatrixPrice(
        tiltUpHatchPrices,
        tiltUpHatchWidths,
        width,
        height
      );
    }

    return null;
  });

  const assemblyKitCost = computed(() => {
    /*
     * The assembly kit is mandatory, but it should only be
     * charged after a complete, valid configuration exists.
     */
    if (
      windowBasePrice.value === null ||
      hatchPrice.value === null
    ) {
      return 0;
    }

    return ASSEMBLY_KIT_PRICE;
  });

  const baseCalculatedPrice = computed(() => {
    if (
      windowBasePrice.value === null ||
      hatchPrice.value === null
    ) {
      return null;
    }

    return (
      windowBasePrice.value +
      hatchPrice.value
    );
  });

  const colorExtraCost = computed(() => 0);

  const accessoryExtraCost = computed(() => {
    return assemblyKitCost.value;
  });

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) {
      return null;
    }

    return (
      baseCalculatedPrice.value +
      accessoryExtraCost.value
    );
  });

  return {
    windowBasePrice,
    hatchPrice,
    assemblyKitCost,
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    finalPrice,
  };
}