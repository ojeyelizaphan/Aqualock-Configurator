// Composables/useDynamicPriceCalculator.js
import { ref, unref } from 'vue';
import { useGarageDoorPriceCalculator } from './useGarageDoorPriceCalculator';
import { useGatePriceCalculator } from './useGatePriceCalculator';
import { useHouseDoorPriceCalculator } from './useHouseDoorPriceCalculator'; 
import { useFlapPriceCalculator } from './useFlapPriceCalculator';
import { useSectionalDoorPriceCalculator } from './useSectionalDoorPriceCalculator';
import { useQuickwallPriceCalculator } from './useQuickwallPriceCalculator';
import { useWindowsProtectorPriceCalculator } from './useWindowsProtectorPriceCalculator';
export function useDynamicPriceCalculator(productTypeSlugRef, form, steps, step) {
  const slug = unref(productTypeSlugRef);

  if (!slug) {
    // Return default refs to avoid errors before a product is selected
    return {
      baseCalculatedPrice: ref(0),
      colorExtraCost: ref(0),
      accessoryExtraCost: ref(0),
      finalPrice: ref(0)
    };
  }

  switch (slug) {
    case 'garage-door':
      return useGarageDoorPriceCalculator(form, steps, step);
    case 'security-gate':
      return useGatePriceCalculator(form, steps, step);
    case 'house-door':
      return useHouseDoorPriceCalculator(form, steps, step); 
    case 'basement-flaps':
      return useFlapPriceCalculator(form, steps, step);
    case 'sectional-door':
      return useSectionalDoorPriceCalculator(form, steps, step);
    case 'quickwall':
      return useQuickwallPriceCalculator(form, steps, step);
    case 'windows-protector':
      return useWindowsProtectorPriceCalculator(form, steps, step);
    default:
      console.warn(`No price calculator found for product type: ${slug}`);
      return {
        baseCalculatedPrice: ref(0),
        colorExtraCost: ref(0),
        accessoryExtraCost: ref(0),
        finalPrice: ref(0)
      };
  }
}
