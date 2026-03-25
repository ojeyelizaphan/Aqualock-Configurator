import { computed } from 'vue';
import { gateInwardPrices, gateOutwardPrices } from '@/Data/gatePrices';
import { colorOptions } from '@/Data/colorOptions';

export function useGatePriceCalculator(form, configurationSteps, step) {
  // Base calculated price
  const baseCalculatedPrice = computed(() => {
    const selectedHeight = form.config_options['height'];
    const selectedWidth = form.config_options['width'];
    const opening = form.config_options['gate_opening'];

    if (!selectedHeight || !selectedWidth || !opening) return null;

    const gatePrices = opening.includes('_in_') ? gateInwardPrices : gateOutwardPrices;
    const pricesForHeight = gatePrices[selectedHeight];
    return pricesForHeight?.[selectedWidth] ?? null;
  });

  // Color extra cost
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

  // Accessory extra cost
  // Accessory extra cost
const accessoryExtraCost = computed(() => {
  let total = 0;
  const selectedWidth = form.config_options['width'];
  const selectedHeight = form.config_options['height'];

  if (!selectedWidth || !selectedHeight) return 0;

  const m2 = (selectedWidth / 1000) * (selectedHeight / 1000);

  const accessories = form.config_options.accessories ?? {};

  // Opening 180°
  if (accessories.opening180) total += 362;

  // Central locking
  if (accessories.centralLocking) total += 303;

  // Durchgriff
  if (accessories.durchgriff) total += 479;

  //Padlock
  if (accessories.padlockPreparation) total += 88;

  //Lattice bars
  const latticeBars = accessories.latticeBars;
  if (latticeBars) {
    const type = latticeBars.type;
    if (type === 'round' || type === 'angular') {
      total += Math.ceil(m2 * 638);
    } else if (type === 'forged_round' || type === 'forged_angular') {
      total += Math.ceil(m2 * 771);
    }
  }

  //Gate fittings (NEW)
  const fitting = form.config_options.gate_fittings;

  const fittingPrices = {
    aluminum_both: 423,
    stainless_both: 559,
    aluminum_knob: 441,
    stainless_knob: 580,
    aluminum_inside: 379,
    stainless_inside: 423
  };

  if (fitting && fittingPrices[fitting]) {
    total += fittingPrices[fitting];
  }

  // Assembly kit
  const accessoriesStepIndex = configurationSteps.value.findIndex(
    s => s.name === 'Accessories'
  );

  if (step.value > accessoriesStepIndex) {
    if (selectedWidth <= 1500) total += 131;
    else if (selectedWidth <= 5000) total += 189;
    else total += 294;
  }

  return total;
});

  // Final price calculation
  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) return null;
    return baseCalculatedPrice.value + colorExtraCost.value + accessoryExtraCost.value;
  });

  return { baseCalculatedPrice, colorExtraCost, accessoryExtraCost, finalPrice };
}
