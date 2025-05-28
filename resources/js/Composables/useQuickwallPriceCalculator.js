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

    const priceTable = installType === 'in_front'
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
  

  const accessoryExtraCost = computed(() => {
    let total = 0;
    const width = parseInt(form.config_options?.width || 0);
    const quantities = form.config_options?.accessory_quantities || {};

    // Bottom Plate — price per RMT
    if (quantities.bottom_plate > 0 && width > 0) {
      const rmt = width / 1000;
      total += Math.ceil(rmt * 71);
    }

    // Colour Coating for Corner Profiles — per piece
    total += (quantities.colour_coating || 0) * 86;

    // Hooks for storing the Quickwall — per piece
    total += (quantities.quickwall_hooks || 0) * 11;

    // Assembly Kit with Sealing — fixed per set
    total += (quantities.assembly_kit || 0) * 132;

    return total;
  });

  const finalPrice = computed(() => {
    return (baseCalculatedPrice.value || 0) + accessoryExtraCost.value + multiPanelSystemCost.value;
  });

  return {
    baseCalculatedPrice,
    accessoryExtraCost,
    multiPanelSystemCost,
    finalPrice
  };
}
