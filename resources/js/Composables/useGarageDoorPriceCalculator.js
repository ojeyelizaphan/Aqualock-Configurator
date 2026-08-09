import { computed } from 'vue';
import {
  garageDoorExtraPrices,
  garageDoorPrices,
} from '@/Data/garageDoorPrices';
import { standardColorCodes } from '@/Data/colorOptions';

export function useGarageDoorPriceCalculator(form, configurationSteps, step) {
  const baseCalculatedPrice = computed(() => {
    const selectedVersion = form.config_options?.version;
    const selectedWidth = form.config_options?.width;
    const selectedHeight = form.config_options?.height;

    if (!selectedVersion || !selectedWidth || !selectedHeight) return null;

    return garageDoorPrices[selectedVersion]?.[selectedHeight]?.[selectedWidth] ?? null;
  });

  const colorExtraCost = computed(() => {
    const color = form.config_options?.color;
    const width = Number(form.config_options?.width);
    const height = Number(form.config_options?.height);

    if (!color || !width || !height) return 0;
    if (standardColorCodes.includes(color)) return 0;

    const squareMeters = (width / 1000) * (height / 1000);

    return Math.ceil(squareMeters * garageDoorExtraPrices.customColorPerM2);
  });

  const accessoryExtraCost = computed(() => {
    let total = 0;
    const width = Number(form.config_options?.width);
    const height = Number(form.config_options?.height);

    if (!width || !height) return 0;

    const squareMeters = (width / 1000) * (height / 1000);
    const runningMeters = width / 1000;
    const accessories = form.config_options?.accessories ?? {};

    const panellingRate = garageDoorExtraPrices.panellingPerM2[accessories.panelling];
    if (panellingRate) {
      total += Math.ceil(squareMeters * panellingRate);
    }

    const glazing = accessories.glazing ?? {};
    const windowConfig = glazing.windows ?? {};

    if (windowConfig.type && Number(windowConfig.quantity) > 0) {
      const insulationKey = windowConfig.insulated ? 'insulated' : 'uninsulated';
      const unitPrice = garageDoorExtraPrices.glazing.windowPerPiece[insulationKey];
      total += unitPrice * Number(windowConfig.quantity);
    }

    const stripe = glazing.stripe ?? {};
    if (stripe.type) {
      const stripeLengthMeters = Math.max(width - 370, 0) / 1000;
      const stripeArea = stripeLengthMeters * 0.4;
      const insulationKey = stripe.insulated ? 'insulated' : 'uninsulated';
      const rate = garageDoorExtraPrices.glazing.stripePerM2[insulationKey];

      total += Math.ceil(stripeArea * rate);
    }

    const plateRate = garageDoorExtraPrices.driveOverPlatePerRunningMeter[
      accessories.driveOverPlate
    ];

    if (plateRate) {
      total += Math.ceil(runningMeters * plateRate);
    }

    const motorStepIndex = configurationSteps.value?.findIndex?.(
      (stepObject) => stepObject.name === 'Insulation & Hand Transmitter',
    );

    if (step.value > (motorStepIndex ?? -1) + 1) {
      total += garageDoorExtraPrices.motor + garageDoorExtraPrices.assemblyKit;

      const transmitters = Number.parseInt(accessories.handTransmitters || 0, 10);
      total += transmitters * garageDoorExtraPrices.handTransmitter;
    }

    return total;
  });

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) return null;

    return (
      baseCalculatedPrice.value
      + colorExtraCost.value
      + accessoryExtraCost.value
    );
  });

  return {
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    finalPrice,
  };
}