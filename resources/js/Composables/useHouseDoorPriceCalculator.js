import { computed } from 'vue';
import { colorOptions } from '@/Data/colorOptions';

export function useHouseDoorPriceCalculator(form, steps, step) {
  const basePrices = {
    thermally_insulated: {
      small: { V1: 5241, V2: 5390, V3: 5482, V6: 5712 },
      large: { V1: 5401, V2: 5548, V3: 5641, V6: 5873 }
    },
    non_thermally_insulated: {
      small: { V1: 3908, V2: 4055, V3: 4145, V6: 4380 },
      large: { V1: 4071, V2: 4218, V3: 4309, V6: 4542 }
    }
  };

  const panelExtras = {
    fixed_panel_left_non_thermal: 541,
    fixed_panel_right_non_thermal: 541,
    fixed_panel_left_thermal: 766,
    fixed_panel_right_thermal: 766
  };

  const windowExtras = {
    non_thermal: 443,
    thermal: 552
  };

  const additionalAccessories = {
    kaba_lock: 92,
    drip_cap: 303,
    door_closer: 460,
    heavy_duty: 1946,
    drive_plate: {
      aluminium: 157,
      stainless: 103
    },
    panic_function_e: 398,
    pushbar: 1121,
    burglary_protection: {
      RC2: 234,
      RC3: 454
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
    const isThermal = effectiveInsulation === 'thermally_insulated';

    if (options.fixed_panel_left) {
      extras += isThermal
        ? panelExtras.fixed_panel_left_thermal
        : panelExtras.fixed_panel_left_non_thermal;
    }

    if (options.fixed_panel_right) {
      extras += isThermal
        ? panelExtras.fixed_panel_right_thermal
        : panelExtras.fixed_panel_right_non_thermal;
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
      return Math.ceil(squareMeters * 78); // RAL price per m²
    });

  const accessoryExtraCost = computed(() => {
    const options = form.config_options;
    let total = 0;

    const width = options.door_width || 0;
    const rmt = width / 1000;

    // Heavy duty
    if (options.heavy_duty) total += additionalAccessories.heavy_duty;

    // Drip Cap
    if (options.drip_cap) total += additionalAccessories.drip_cap;

    // Door Closer
    if (options.door_closer) total += additionalAccessories.door_closer;

    // Drive-over plate (NOW per meter)
    if (options.drive_plate && additionalAccessories.drive_plate[options.drive_plate]) {
      total += Math.ceil(rmt * additionalAccessories.drive_plate[options.drive_plate]);
    }

    // Panic Features
    if (options.panic_features?.includes('panic_function_e')) {
      total += additionalAccessories.panic_function_e;
    }

    if (options.panic_features?.includes('pushbar')) {
      total += additionalAccessories.pushbar;
    }

    // Burglary protection (ONLY V1 & V2)
    const locking = options.locking_mechanism;
    if (
      ['V1', 'V2'].includes(locking) &&
      options.burglary_protection &&
      additionalAccessories.burglary_protection[options.burglary_protection]
    ) {
      total += additionalAccessories.burglary_protection[options.burglary_protection];
    }

    // Windows
    const windowType = options.window_type || '';
    if (windowType.startsWith('non_thermal')) total += windowExtras.non_thermal;
    if (windowType.startsWith('thermal')) total += windowExtras.thermal;

    //Assembly kit
    total += 398;

    return total;
  });

  const fittingExtraCost = computed(() => {
    const options = form.config_options;
    let total = 0;

    const version = options.locking_mechanism;

    // Base fitting
    if (version === 'V1') {
      total += 199;
    }

    if (version === 'V2' || version === 'V6') {
      total += 401;

      if (options.knob_type === 'aluminium') total += 116;
      if (options.knob_type === 'stainless') total += 312;
    }

    // KABA upgrade
    if (options.kaba_upgrade) {
      total += 92;
    }

    return total;
  });

  const finalPrice = computed(() => {
    return baseCalculatedPrice.value 
    + colorExtraCost.value 
    + accessoryExtraCost.value
    + fittingExtraCost.value;
  });

  return {
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    finalPrice
  };
}
