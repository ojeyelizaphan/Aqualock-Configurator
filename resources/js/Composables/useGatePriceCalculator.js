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
    return Math.ceil(squareMeters * 92); // RAL price per m²
  });

  // Accessory extra cost
  // Accessory extra cost
const accessoryExtraCost = computed(() => {
    let total = 0;
    const selectedWidth = form.config_options['width'];
    const selectedHeight = form.config_options['height'];
  
    if (!selectedWidth || !selectedHeight) return 0;
  
    const m2 = (selectedWidth / 1000) * (selectedHeight / 1000);
  
    // Optional accessories
    const opening180Option = form.config_options.accessories?.opening180;
    if (opening180Option) total += 427;
  
    const centralLockingSystem = form.config_options.accessories?.centralLocking;
    if (centralLockingSystem) total += 645;
  
    const durchgriffOption = form.config_options.accessories?.durchgriff;
    if (durchgriffOption) total += 479;
  
    const padlockPreparation = form.config_options.accessories?.padlockPreparation;
    if (padlockPreparation) total += 88;
  
    const latticeBars = form.config_options.accessories?.latticeBars;
    if (latticeBars) {
      const latticeType = latticeBars.type;
      if (latticeType === 'round') total += Math.ceil(m2 * 638);
      if (latticeType === 'angular') total += Math.ceil(m2 * 638);
      if (latticeType === 'forged_round') total += Math.ceil(m2 * 771);
      if (latticeType === 'forged_angular') total += Math.ceil(m2 * 771);
    }
  
    // Assembly kit: include only when on or past the AccessoriesStep
    const accessoriesStepIndex = configurationSteps.value.findIndex(s => s.name === 'Accessories');
    if (step.value > accessoriesStepIndex) {
    if (selectedWidth <= 1500) total += 154;
    else if (selectedWidth <= 5000) total += 223;
    else total += 347;
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
