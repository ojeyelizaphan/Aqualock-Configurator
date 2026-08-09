import { computed } from 'vue';
import { gatePrices, gateRates } from '@/Data/gatePrices';
import { standardColorCodes } from '@/Data/colorOptions';

export function useGatePriceCalculator(
  form,
  configurationSteps,
  step
) {
  const baseCalculatedPrice = computed(() => {
    const selectedHeight = form.config_options?.height;
    const selectedWidth = form.config_options?.width;
    const opening = form.config_options?.gate_opening;

    if (!selectedHeight || !selectedWidth || !opening) {
      return null;
    }

    const priceTable = opening.includes('_in_')
      ? gatePrices.inward
      : gatePrices.outward;

    return priceTable[selectedHeight]?.[selectedWidth] ?? null;
  });

  const colorExtraCost = computed(() => {
    const color = form.config_options?.color;
    const selectedWidth = Number(
      form.config_options?.width || 0
    );
    const selectedHeight = Number(
      form.config_options?.height || 0
    );

    if (!color || !selectedWidth || !selectedHeight) {
      return 0;
    }

    if (standardColorCodes.includes(color)) {
      return 0;
    }

    const squareMeters =
      (selectedWidth / 1000) *
      (selectedHeight / 1000);

    return Math.ceil(
      squareMeters * gateRates.customColorPerM2
    );
  });

  const accessoryExtraCost = computed(() => {
    let total = 0;

    const config = form.config_options ?? {};
    const selectedWidth = Number(config.width || 0);
    const selectedHeight = Number(config.height || 0);

    if (!selectedWidth || !selectedHeight) {
      return 0;
    }

    const accessories = config.accessories ?? {};
    const opening = config.gate_opening;

    /*
     * The existing option identifiers use values such as
     * left_in_180 and right_out_180.
     *
     * The 2026 sheet calls this a 170° opening.
     * Until the option values are renamed, continue checking "180".
     */
    if (opening?.includes('180')) {
      total += gateRates.wideOpening;
    }

    if (config.centralLocking === 'with') {
      total += gateRates.centralLocking;
    }

    if (accessories.electricDoorOpener) {
      total += gateRates.electricDoorOpener;
    }

    if (accessories.durchgriff) {
      total += gateRates.durchgriff;
    }

    if (accessories.padlockPreparation) {
      total += gateRates.padlockPreparation;
    }

    if (accessories.slopingBottom) {
      total += gateRates.slopingBottom;
    }

    // Lattice bars
    const latticeBarType = config.lattice_bar;
    const totalGateHeight = Number(
      config.total_gate_height || 0
    );
    const waterProtectionHeight = Number(
      config.protection_height || 0
    );

    const latticeRate =
      gateRates.latticeBarsPerM2[latticeBarType] ?? 0;

    if (
      latticeRate > 0 &&
      totalGateHeight > waterProtectionHeight
    ) {
      const latticeHeightMm =
        totalGateHeight - waterProtectionHeight;

      const latticeAreaM2 =
        (latticeHeightMm / 1000) *
        (selectedWidth / 1000);

      total += Math.ceil(
        latticeAreaM2 * latticeRate
      );
    }

    // Door fittings
    const fitting = config.gate_fittings;
    const fittingPrice =
      gateRates.fittings[fitting] ?? 0;

    total += fittingPrice;

    const accessoriesStepIndex =
      configurationSteps.value?.findIndex?.(
        (configurationStep) =>
          configurationStep.name === 'Accessories'
      ) ?? -1;

    /*
     * This retains your existing step behavior:
     * the assembly kit is added after Accessories.
     */
    if (step.value > accessoriesStepIndex) {
      const isIndustrial =
        config.gate_version === 'industrial';

      if (isIndustrial) {
        total += gateRates.assemblyKit.industrial;
      } else if (selectedWidth <= 1500) {
        total += gateRates.assemblyKit.upTo1500;
      } else {
        total +=
          gateRates.assemblyKit.from1501To5000;
      }
    }

    return total;
  });

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) {
      return null;
    }

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