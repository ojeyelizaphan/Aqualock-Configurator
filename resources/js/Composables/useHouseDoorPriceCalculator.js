import { computed } from 'vue';
import { colorOptions } from '@/Data/colorOptions';

export function useHouseDoorPriceCalculator(form, steps, step) {
  const basePrices = {
    thermally_insulated: {
      small: { V1: 6185, V2: 6361, V3: 6469, V6: 6740 },
      large: { V1: 6373, V2: 6548, V3: 6657, V6: 6931 }
    },
    non_thermally_insulated: {
      small: { V1: 4612, V2: 4785, V3: 4892, V6: 5168 },
      large: { V1: 4804, V2: 4978, V3: 5085, V6: 5360 }
    }
  };

  const panelExtras = {
    fixed_panel_left: 250,
    fixed_panel_right: 250,
    fixed_panel_top: 300
  };

  const windowExtras = {
    non_thermal: 379,
    thermal: 639
  };

  const additionalAccessories = {
    kaba_lock: 158,
    drip_cap: 96,
    door_closer: 224,
    drive_plate: {
      aluminium: 156,
      stainless: 264
    },
    panic_function_e: 189,
    pushbar: 322,
    burglary_protection: {
      RC2: 256,
      RC3: 395
    }
  };

  const nonThermalInstallations = ['infront_reveal', 'behind_reveal'];

  const baseCalculatedPrice = computed(() => {
    const options = form.config_options;
    const insulation = options.thermal_insulation || 'non_thermally_insulated';
    const locking = options.locking_mechanism;
    const width = options.door_width || 0;
    const installationType = options.installation_type;
    const size = width <= 1100 ? 'small' : 'large';

    const effectiveInsulation =
      insulation === 'thermally_insulated' && nonThermalInstallations.includes(installationType)
        ? 'non_thermally_insulated'
        : insulation;

    const basePrice = basePrices?.[effectiveInsulation]?.[size]?.[locking] ?? 0;

    let extras = 0;
    for (const panel in panelExtras) {
      if (options[panel]) {
        extras += panelExtras[panel];
      }
    }

    return basePrice + extras;
  });

  const colorExtraCost = computed(() => {
      const color = form.config_options['color'];
      const selectedWidth = form.config_options['width'];
      const selectedHeight = form.config_options['height'];
  
      if (!color || !selectedWidth || !selectedHeight) return 0;
  
  
      const standardColors = colorOptions.map(option => option.value).filter(value => value !== 'custom');
      if (standardColors.includes(color)) return 0;
  
      const squareMeters = (selectedWidth / 1000) * (selectedHeight / 1000);
      return Math.ceil(squareMeters * 92); // RAL price per m²
    });

  const accessoryExtraCost = computed(() => {
    const options = form.config_options;
    let total = 0;

    // KABA Lock
    if (options.kaba_lock) total += additionalAccessories.kaba_lock;

    // Drip Cap
    if (options.drip_cap) total += additionalAccessories.drip_cap;

    // Door Closer
    if (options.door_closer) total += additionalAccessories.door_closer;

    // Drive-over plate
    if (options.drive_plate && additionalAccessories.drive_plate[options.drive_plate]) {
      total += additionalAccessories.drive_plate[options.drive_plate];
    }

    // Panic Features
    if (options.panic_features?.includes('panic_function_e')) total += additionalAccessories.panic_function_e;
    if (options.panic_features?.includes('pushbar')) total += additionalAccessories.pushbar;

    // Burglary protection
    if (options.burglary_protection && additionalAccessories.burglary_protection[options.burglary_protection]) {
      total += additionalAccessories.burglary_protection[options.burglary_protection];
    }

    // Window type
    const windowType = options.window_type || '';
    if (windowType.startsWith('non_thermal')) total += windowExtras.non_thermal;
    if (windowType.startsWith('thermal')) total += windowExtras.thermal;

    return total;
  });

  const finalPrice = computed(() => {
    return baseCalculatedPrice.value + colorExtraCost.value + accessoryExtraCost.value;
  });

  return {
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    finalPrice
  };
}
