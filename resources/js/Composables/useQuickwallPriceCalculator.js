// composables/useQuickwallPriceCalculator.js
import { computed } from 'vue';

import {
  quickwallBetweenReveal,
  quickwallFrontReveal,
  quickwallPostPrices,
  quickwallWidths,
} from '@/Data/quickwallPrices';

const quickwallAccessoryPrices = {
  assemblyKit: 0,
  cornerProfileColourCoating: 89,
  bottomPlatePerRunningMeter: 73,
  hook: 11,
};

export function useQuickwallPriceCalculator(form) {
  const baseCalculatedPrice = computed(() => {
    const options = form.config_options ?? {};

    const width = Number(options.width) || 0;
    const height = Number(options.height) || 0;
    const installationMethod = options.installation_method;

    if (!width || !height || !installationMethod) {
      return null;
    }

    let priceTable;

    if (installationMethod === 'front_reveal') {
      priceTable = quickwallFrontReveal;
    } else if (installationMethod === 'between_reveal') {
      priceTable = quickwallBetweenReveal;
    } else {
      return null;
    }

    const heightRow = priceTable[height];

    if (!heightRow) {
      return null;
    }

    const widthIndex = quickwallWidths.indexOf(width);

    if (widthIndex === -1) {
      return null;
    }

    return heightRow[widthIndex] ?? null;
  });

  const multiPanelSystemCost = computed(() => {
    const options = form.config_options ?? {};

    const height = Number(options.height) || 0;
    const centerPostQuantity = Number.parseInt(
      options.center_posts ?? 0,
      10
    );
    const cornerPostQuantity = Number.parseInt(
      options.corner_posts ?? 0,
      10
    );

    const unitPrice = quickwallPostPrices[height] ?? 0;

    if (!unitPrice) {
      return 0;
    }

    const validCenterPostQuantity =
      Number.isFinite(centerPostQuantity) &&
      centerPostQuantity > 0
        ? centerPostQuantity
        : 0;

    const validCornerPostQuantity =
      Number.isFinite(cornerPostQuantity) &&
      cornerPostQuantity > 0
        ? cornerPostQuantity
        : 0;

    return (
      unitPrice *
      (validCenterPostQuantity + validCornerPostQuantity)
    );
  });

  const bottomPlateCost = computed(() => {
    const options = form.config_options ?? {};

    const panelQuantity = Number.parseInt(
      options.quickwall_panels ?? 0,
      10
    );
    const width = Number(options.width) || 0;

    if (
      !Number.isFinite(panelQuantity) ||
      panelQuantity <= 0 ||
      !width
    ) {
      return 0;
    }

    const widthInMeters = width / 1000;

    return Math.ceil(
      panelQuantity *
        widthInMeters *
        quickwallAccessoryPrices.bottomPlatePerRunningMeter
    );
  });

  const colourCoatingCost = computed(() => {
    const options = form.config_options ?? {};

    const hasColourCoating =
      options.corner_profiles_coloring === 'with';

    if (!hasColourCoating) {
      return 0;
    }

    const cornerPostQuantity = Number.parseInt(
      options.corner_posts ?? 0,
      10
    );

    if (
      !Number.isFinite(cornerPostQuantity) ||
      cornerPostQuantity <= 0
    ) {
      return 0;
    }

    return (
      cornerPostQuantity *
      quickwallAccessoryPrices.cornerProfileColourCoating
    );
  });

  const hooksCost = computed(() => {
    const hookQuantity = Number.parseInt(
      form.config_options?.accessory_quantities
        ?.quickwall_hooks ?? 0,
      10
    );

    if (
      !Number.isFinite(hookQuantity) ||
      hookQuantity <= 0
    ) {
      return 0;
    }

    return hookQuantity * quickwallAccessoryPrices.hook;
  });

  const assemblyKitCost = computed(() => {
    /*
     * The price list says this is mandatory, so it is added
     * once after a valid base configuration exists.
     */
    return baseCalculatedPrice.value === null
      ? 0
      : quickwallAccessoryPrices.assemblyKit;
  });

  const accessoryExtraCost = computed(() => {
    return (
      bottomPlateCost.value +
      colourCoatingCost.value +
      hooksCost.value +
      assemblyKitCost.value
    );
  });

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) {
      return null;
    }

    return (
      baseCalculatedPrice.value +
      multiPanelSystemCost.value +
      accessoryExtraCost.value
    );
  });

  return {
    baseCalculatedPrice,
    multiPanelSystemCost,
    bottomPlateCost,
    colourCoatingCost,
    hooksCost,
    assemblyKitCost,
    accessoryExtraCost,
    finalPrice,
  };
}