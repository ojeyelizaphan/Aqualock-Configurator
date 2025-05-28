import { computed } from 'vue';
import {
  windowPricesWithHatch,
  windowPricesWithoutHatch,
  removableHatchPrices,
  tiltUpHatchPrices,
} from '@/Data/windowsProtectorPrices';

export function useWindowsProtectorPriceCalculator(form) {
  const ASSEMBLY_KIT_PRICE = 132;

  const baseCalculatedPrice = computed(() => {
    const config = form.config_options || {};
    const width = parseInt(config.width);
    const height = parseInt(config.height);
    const hatchType = config.hatch_type || 'none';

    if (!width || !height) return 0;

    const baseWindowPrice =
      (hatchType === 'none'
        ? windowPricesWithoutHatch[width]?.[height]
        : windowPricesWithHatch[width]?.[height]) || 0;

    let hatchPrice = 0;

    if (hatchType === 'removable') {
      const rw = parseInt(config.removable_hatch_width);
      const rh = parseInt(config.removable_hatch_height);
      hatchPrice = removableHatchPrices[rw]?.[rh] || 0;
    }

    if (hatchType === 'tilt-up') {
      const tw = parseInt(config.tilt_up_hatch_width);
      const th = parseInt(config.tilt_up_hatch_height);
      hatchPrice = tiltUpHatchPrices[tw]?.[th] || 0;
    }

    return baseWindowPrice + hatchPrice + ASSEMBLY_KIT_PRICE;
  });

  return {
    baseCalculatedPrice,
    colorExtraCost: computed(() => 0),
    accessoryExtraCost: computed(() => 0),
    finalPrice: baseCalculatedPrice,
  };
}
