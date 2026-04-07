import { computed } from 'vue';
import { gateInwardPrices, gateOutwardPrices } from '@/Data/gatePrices';
import { colorOptions } from '@/Data/colorOptions';

export function useGatePriceCalculator(form, configurationSteps, step) {
  const baseCalculatedPrice = computed(() => {
    const selectedHeight = form.config_options['height'];
    const selectedWidth = form.config_options['width'];
    const opening = form.config_options['gate_opening'];

    if (!selectedHeight || !selectedWidth || !opening) return null;

    const gatePrices = opening.includes('_in_') ? gateInwardPrices : gateOutwardPrices;
    const pricesForHeight = gatePrices[selectedHeight];
    return pricesForHeight?.[selectedWidth] ?? null;
  });

  const colorExtraCost = computed(() => {
    const color = form.config_options['color'];
    const selectedWidth = form.config_options['width'];
    const selectedHeight = form.config_options['height'];

    if (!color || !selectedWidth || !selectedHeight) return 0;

    const standardColors = colorOptions
      .map(option => option.value)
      .filter(value => value !== 'custom');

    if (standardColors.includes(color)) return 0;

    const squareMeters = (selectedWidth / 1000) * (selectedHeight / 1000);
    return Math.ceil(squareMeters * 78);
  });

  const accessoryExtraCost = computed(() => {
    let total = 0;

    const selectedWidth = Number(form.config_options['width'] || 0);
    const selectedHeight = Number(form.config_options['height'] || 0);

    if (!selectedWidth || !selectedHeight) return 0;

    const accessories = form.config_options.accessories ?? {};

    if (accessories.opening180) total += 362;

    if (form.config_options.centralLocking === 'with') {
      total += 547;
    }

    if (accessories.durchgriff) total += 700;
    if (accessories.padlockPreparation) total += 88;

    // Lattice bars
    const latticeBarType = form.config_options.lattice_bar;
    const totalGateHeight = Number(form.config_options.total_gate_height || 0);
    const waterProtectionHeight = Number(form.config_options.protection_height || 0);

    if (latticeBarType) {
      const latticePrices = {
        round_extruded: 638,
        angular_extruded: 638,
        round_forged: 771,
        angular_forged: 771
      };

      const pricePerM2 = latticePrices[latticeBarType] || 0;

      if (pricePerM2 > 0 && totalGateHeight > waterProtectionHeight) {
        const latticeHeightMm = totalGateHeight - waterProtectionHeight;
        const latticeAreaM2 = (latticeHeightMm / 1000) * (selectedWidth / 1000);

        total += Math.ceil(latticeAreaM2 * pricePerM2);
      }
    }

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

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) return null;

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
    finalPrice
  };
}