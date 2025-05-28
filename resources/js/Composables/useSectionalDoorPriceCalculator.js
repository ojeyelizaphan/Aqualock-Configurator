import { computed, ref } from 'vue';
import { sectionalDoorWithMotor } from '@/Data/sectionalDoorPrices';
import { sectionalDoorWithoutMotor } from '@/Data/sectionalDoorPrices';
import { sectionalDoorWidthSteps } from '@/Data/sectionalDoorPrices';
import { colorOptions } from '@/Data/colorOptions';

export function useSectionalDoorPriceCalculator(form, configurationSteps, step) {
    const baseCalculatedPrice = computed(() => {
        const hasMotor = form.config_options?.motor === true;
        const width = form.config_options?.width;
        const height = form.config_options?.height;
      
        if (!width || !height) return null;
      
        const priceTable = hasMotor ? sectionalDoorWithMotor : sectionalDoorWithoutMotor;
        const heightRow = priceTable[height];
        if (!heightRow) return null;
      
        const widthIndex = sectionalDoorWidthSteps.indexOf(width);
        if (widthIndex === -1) return null;
      
        return heightRow[widthIndex] || null;
      });
      

    const colorExtraCost = computed(() => {
            const color = form.config_options['color'];
            const selectedWidth = form.config_options['width'];
            const selectedHeight = form.config_options['height'];
        
            if (!color || !selectedWidth || !selectedHeight) return 0;
        
        
            const standardColors = colorOptions.map(option => option.value).filter(value => value !== 'custom');
            if (standardColors.includes(color)) return 0;
        
            const squareMeters = (selectedWidth / 1000) * (selectedHeight / 1000);
            return Math.ceil(squareMeters * 69); // RAL price per m²
        });

      const accessoryExtraCost = computed(() => {
        let total = 0;
        const width = form.config_options?.width;
        const height = form.config_options?.height;
        if (!width || !height) return 0;
      
        const rmt = width / 1000;
      
        // Base plates
        if (form.config_options?.stainlessBasePlate) {
          total += Math.ceil(rmt * 148);
        } else if (form.config_options?.aluminumBasePlate) {
          total += Math.ceil(rmt * 42);
        }
      
        // Upgrade kits
        const upgradeKit = form.config_options?.upgradeKit;
        if (upgradeKit === 'upTo3m') {
          total += 272;
        } else if (upgradeKit === 'upTo6m') {
          total += 348;
        }
      
        // Steel tracks
        if (form.config_options?.stainlessTracks) {
          total += 282;
        }
      
        // Colour profile customization
        if (form.config_options?.customColourProfiles) {
          total += 421;
        }
      
        // Motor + Assembly kit
        const motorIncluded = form.config_options?.motor === true;
        if (motorIncluded) {
          total += 651 + 246;
        }
      
        // Hand transmitters
        const transmitters = parseInt(form.config_options?.handTransmitterQty || 0);
        if (!isNaN(transmitters) && transmitters > 0) {
          total += transmitters * 60;
        }
      
        return total;
    });
      

  const finalPrice = computed(() => {
    if (baseCalculatedPrice.value === null) return null;
    return baseCalculatedPrice.value + colorExtraCost.value + accessoryExtraCost.value;
  });

  return {
    baseCalculatedPrice: ref(baseCalculatedPrice.value),
    colorExtraCost: ref(colorExtraCost.value),
    accessoryExtraCost: ref(accessoryExtraCost.value),
    finalPrice: ref(finalPrice.value)
  };
}
