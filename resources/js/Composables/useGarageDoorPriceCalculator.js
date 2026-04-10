import { computed } from 'vue';
import { versionV500Prices } from '@/Data/versionV500Prices';
import { versionVPrices } from '@/Data/versionVPrices';
import { versionEPrices } from '@/Data/versionEPrices';
import { colorOptions } from '@/Data/colorOptions';

export function useGarageDoorPriceCalculator(form, configurationSteps, step) {
  const baseCalculatedPrice = computed(() => {
    const selectedVersion = form.config_options?.version;
    const selectedWidth = form.config_options?.width;
    const selectedHeight = form.config_options?.height;

    if (!selectedVersion || !selectedWidth || !selectedHeight) return null;

    const priceTables = { E: versionEPrices, V: versionVPrices, V500: versionV500Prices };
    const heightRow = priceTables[selectedVersion]?.[selectedHeight];
    return heightRow ? heightRow[selectedWidth] || null : null;
  });

  const colorExtraCost = computed(() => {
    const color = form.config_options?.color;
    const width = form.config_options?.width;
    const height = form.config_options?.height;

    if (!color || !width || !height) return 0;

    const standardColors = colorOptions
      .map(option => option.value)
      .filter(value => value !== 'custom');

    if (standardColors.includes(color)) return 0;

    const squareMeters = (width / 1000) * (height / 1000);
    return Math.ceil(squareMeters * 39);
  });

  const accessoryExtraCost = computed(() => {
    let total = 0;
    const width = form.config_options?.width;
    const height = form.config_options?.height;
    if (!width || !height) return 0;

    const m2 = (width / 1000) * (height / 1000);
    const rmt = width / 1000;

    const accessories = form.config_options?.accessories ?? {};

    // Panelling
    const panelling = accessories.panelling;
    if (panelling === 'uninsulated') total += Math.ceil(m2 * 121);
    else if (panelling === 'insulated') total += Math.ceil(m2 * 148);

    // Glazing - windows
    const glazing = accessories.glazing ?? {};
    const windowConfig = glazing.windows ?? {};
    if (windowConfig?.type && windowConfig?.quantity > 0) {
      const unitPrice = windowConfig.insulated ? 545 : 418;
      total += unitPrice * Number(windowConfig.quantity);
    }

    // Glazing - glass stripe
    const stripe = glazing.stripe ?? {};
    if (stripe?.type && width) {
      const stripeLengthMm = Math.max(Number(width) - 370, 0);
      const stripeLengthM = stripeLengthMm / 1000;
      const stripeHeightM = 0.4; // 400 mm
      const stripeArea = stripeLengthM * stripeHeightM;
      const rate = stripe.insulated ? 509 : 376;

      total += Math.ceil(stripeArea * rate);
    }

    // Drive-over plate
    const plate = accessories.driveOverPlate;
    if (plate === 'stainless') total += Math.ceil(rmt * 165);
    else if (plate === 'aluminium') total += Math.ceil(rmt * 125);

    // Motor + Assembly + Transmitters
    const motorStepIndex = configurationSteps.value?.findIndex?.(
      stepObj => stepObj.name === 'Insulation & Hand Transmitter'
    );

    if (step.value > (motorStepIndex ?? -1) + 1) {
      total += 651 + 334; // Motor + Assembly Kit
      const transmitters = parseInt(accessories.handTransmitters || 0, 10);
      total += transmitters * 60;
    }

    return total;
  });

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) return null;
    return baseCalculatedPrice.value + colorExtraCost.value + accessoryExtraCost.value;
  });

  return { baseCalculatedPrice, colorExtraCost, accessoryExtraCost, finalPrice };
}