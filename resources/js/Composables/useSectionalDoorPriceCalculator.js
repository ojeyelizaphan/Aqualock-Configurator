import { computed } from 'vue';

import {
  sectionalDoorWithMotor,
  sectionalDoorWidthSteps,
} from '@/Data/sectionalDoorPrices';

const sectionalDoorStandardOutsideColors = [
  'RAL 9016',
  'RAL 7016',
];

export function useSectionalDoorPriceCalculator(form) {
  const baseCalculatedPrice = computed(() => {
    const options = form.config_options ?? {};

    const width = Number(options.width) || 0;
    const height = Number(options.height) || 0;

    if (!width || !height) {
      return null;
    }

    const heightRow = sectionalDoorWithMotor[height];

    if (!heightRow) {
      return null;
    }

    const widthIndex =
      sectionalDoorWidthSteps.indexOf(width);

    if (widthIndex === -1) {
      return null;
    }

    return heightRow[widthIndex] ?? null;
  });

  const colorExtraCost = computed(() => {
    const options = form.config_options ?? {};

    const color = options.color;
    const width = Number(options.width) || 0;
    const height = Number(options.height) || 0;

    if (!color || !width || !height) {
      return 0;
    }

    if (
      sectionalDoorStandardOutsideColors.includes(color)
    ) {
      return 0;
    }

    const squareMeters =
      (width / 1000) * (height / 1000);

    return Math.ceil(squareMeters * 71);
  });

  const accessoryExtraCost = computed(() => {
    const options = form.config_options ?? {};

    const width = Number(options.width) || 0;
    const height = Number(options.height) || 0;

    if (!width || !height) {
      return 0;
    }

    let total = 0;

    const runningMeters = width / 1000;

    // Base plates
    if (options.stainlessBasePlate) {
      total += Math.ceil(runningMeters * 89);
    } else if (options.aluminumBasePlate) {
      total += Math.ceil(runningMeters * 44);
    }

    // Pre-mounted upgrade kit
    if (options.upgradeKit === 'upTo3m') {
      total += 272;
    } else if (options.upgradeKit === 'upTo6m') {
      total += 348;
    }

    // Stainless-steel tracks
    if (options.stainlessTracks) {
      total += 298;
    }

    // Custom-coloured steel corners and profiles
    if (options.customColourProfiles) {
      total += 421;
    }

    /*
     * Do not add €651 here.
     * The selected matrix already includes the motor.
     */

    /*
     * The assembly kit is mandatory and is included once
     * valid dimensions have been selected.
     */
    total += 238;

    const transmitterQuantity = Number.parseInt(
      options.handTransmitterQty ?? 0,
      10
    );

    if (
      Number.isFinite(transmitterQuantity) &&
      transmitterQuantity > 0
    ) {
      total += transmitterQuantity * 62;
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