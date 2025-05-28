import { computed } from 'vue';
import { versionV500Prices } from '@/Data/versionV500Prices';
import { versionVPrices } from '@/Data/versionVPrices';
import { versionEPrices } from '@/Data/versionEPrices';
import { colorOptions } from '@/Data/colorOptions';

export function useGarageDoorPriceCalculator(form, configurationSteps, step) {
  const baseCalculatedPrice = computed(() => {
    const selectedVersion = form.config_options['version'];
    const selectedWidth = form.config_options['width'];
    const selectedHeight = form.config_options['height'];

    if (!selectedVersion || !selectedWidth || !selectedHeight) return null;

    const priceTables = { E: versionEPrices, V: versionVPrices, V500: versionV500Prices };
    const heightRow = priceTables[selectedVersion]?.[selectedHeight];
    return heightRow ? heightRow[selectedWidth] || null : null;
  });

  const colorExtraCost = computed(() => {
    const color = form.config_options['color'];
    const width = form.config_options['width'];
    const height = form.config_options['height'];

    if (!color || !width || !height) return 0;

    const standardColors = colorOptions.map(option => option.value).filter(value => value !== 'custom');
    if (standardColors.includes(color)) return 0;

    const squareMeters = (width / 1000) * (height / 1000);
    return Math.ceil(squareMeters * 47);
  });

  const accessoryExtraCost = computed(() => {
    let total = 0;
    const width = form.config_options.width;
    const height = form.config_options.height;
    if (!width || !height) return 0;

    const m2 = (width / 1000) * (height / 1000);
    const rmt = width / 1000;

    const panelling = form.config_options.accessories.panelling;
    if (panelling === 'uninsulated') total += Math.ceil(m2 * 142);
    else if (panelling === 'insulated') total += Math.ceil(m2 * 174);

    const windowItems = form.config_options.accessories.glazing?.windows || [];
    windowItems.forEach(win => { total += win.insulated ? 601 : 493; });

    const stripe = form.config_options.accessories.glazing?.stripe;
    if (stripe?.type && stripe?.length) {
      const stripeArea = stripe.length * 0.4;
      const rate = stripe.insulated ? 453 : 444;
      total += Math.ceil(stripeArea * rate);
    }

    const plate = form.config_options.accessories.driveOverPlate;
    if (plate === 'stainless') total += Math.ceil(rmt * 194);
    else if (plate === 'aluminium') total += Math.ceil(rmt * 148);

    const motorStepIndex = configurationSteps.value.findIndex(stepObj => stepObj.name === 'Insulation & Hand Transmitter');
    if (step.value > motorStepIndex + 1) {
      total += 866 + 394; // Motor + Assembly Kit
      const transmitters = parseInt(form.config_options.accessories.handTransmitters || 0);
      total += transmitters * 80;
    }

    return total;
  });

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) return null;
    return baseCalculatedPrice.value + colorExtraCost.value + accessoryExtraCost.value;
  });

  return { baseCalculatedPrice, colorExtraCost, accessoryExtraCost, finalPrice };
}
