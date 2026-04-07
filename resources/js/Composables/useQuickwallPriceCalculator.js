// composables/useQuickwallPriceCalculator.js
import { computed } from 'vue';
import {
  quickwallBetweenReveal,
  quickwallFrontReveal,
  quickwallWidths
} from '@/Data/quickwallPrices';

export function useQuickwallPriceCalculator(form) {
  const baseCalculatedPrice = computed(() => {
    const width = form.config_options?.width;
    const height = form.config_options?.height;
    const installType = form.config_options?.installation_method; // 'between' or 'in_front'

    if (!width || !height || !installType) return null;

    const priceTable =
      installType === 'in_front'
        ? quickwallFrontReveal
        : quickwallBetweenReveal;

    const heightRow = priceTable[height];
    if (!heightRow) return null;

    const widthIndex = quickwallWidths.indexOf(width);
    if (widthIndex === -1) return null;

    return heightRow[widthIndex] || null;
  });

  const multiPanelSystemCost = computed(() => {
    const panelQty = parseInt(form.config_options?.quickwall_panels || 0);
    const centerQty = parseInt(form.config_options?.center_posts || 0);
    const cornerQty = parseInt(form.config_options?.corner_posts || 0);
    const height = form.config_options?.height;

    if (!height) return 0;

    const heightPriceMap = {
      1340: 820,
      1210: 782,
      1080: 742,
      950: 718,
      810: 698,
      680: 672,
      550: 661,
      410: 641,
      280: 572
    };

    const unitPrice = heightPriceMap[height] || 0;

    return unitPrice * (panelQty + centerQty + cornerQty);
  });

  const bottomPlateCost = computed(() => {
    const panelQty = parseInt(form.config_options?.quickwall_panels || 0);
    const width = parseInt(form.config_options?.width || 0);

    if (!panelQty || !width) return 0;

    const widthInMeters = width / 1000;

    // number of panels × width × €71
    return panelQty * widthInMeters * 71;
  });

  const colourCoatingCost = computed(() => {
    const cornerQty = parseInt(form.config_options?.corner_posts || 0);
    const hasColourCoating =
      form.config_options?.corner_profiles_coloring === 'with';

    if (!hasColourCoating) return 0;

    // colour coating applies to the profiles only
    return cornerQty * 86;
  });

  const hooksCost = computed(() => {
    const hookQty = parseInt(
      form.config_options?.accessory_quantities?.quickwall_hooks || 0
    );

    return hookQty * 11;
  });

  const accessoryExtraCost = computed(() => {
    return bottomPlateCost.value + colourCoatingCost.value + hooksCost.value;
  });

  const finalPrice = computed(() => {
    return (
      (baseCalculatedPrice.value || 0) +
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
    accessoryExtraCost,
    finalPrice
  };
}