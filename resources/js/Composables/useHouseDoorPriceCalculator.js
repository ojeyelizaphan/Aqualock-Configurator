import { computed } from 'vue';
import { standardColorCodes } from '@/Data/colorOptions';
import { houseDoorPrices } from '@/Data/houseDoorPrices';

export function useHouseDoorPriceCalculator(form, steps, step) {
  const nonThermalInstallations = [
    'infront_reveal',
    'behind_reveal',
  ];

  const effectiveInsulation = computed(() => {
    const options = form.config_options ?? {};

    const selectedInsulation =
      options.thermal_insulation ||
      'non_thermally_insulated';

    if (
      selectedInsulation === 'thermally_insulated' &&
      nonThermalInstallations.includes(
        options.installation_type
      )
    ) {
      return 'non_thermally_insulated';
    }

    return selectedInsulation;
  });

  const isThermal = computed(
    () =>
      effectiveInsulation.value ===
      'thermally_insulated'
  );

  const baseCalculatedPrice = computed(() => {
    const options = form.config_options ?? {};

    const doorWidth = Number(options.width) || 0;
    const doorHeight = Number(options.height) || 0;
    const locking = options.locking_mechanism;

    if (!doorWidth || !doorHeight || !locking) {
      return 0;
    }

    const size = doorWidth >= 1101 ? 'large' : 'small';

    const basePrice =
      houseDoorPrices.base
        ?.[effectiveInsulation.value]
        ?.[size]
        ?.[locking] ?? 0;

    const panelPrices = isThermal.value
      ? houseDoorPrices.panels.thermal
      : houseDoorPrices.panels.non_thermal;

    const calculateSidePanelPrice = (panelWidth) => {
      const width = Number(panelWidth) || 0;

      if (!width) {
        return 0;
      }

      // Fixed price for side panels up to 400 mm wide.
      if (width <= 400) {
        return panelPrices.sideUpTo400;
      }

      // Panels from 401 mm are priced per square metre.
      const panelAreaM2 =
        (width / 1000) * (doorHeight / 1000);

      return Math.ceil(
        panelAreaM2 * panelPrices.sideOver400PerM2
      );
    };

    const calculateTopBottomPanelPrice = (panelHeight) => {
      const height = Number(panelHeight) || 0;

      if (!height) {
        return 0;
      }

      // Fixed price for top/bottom panels up to 400 mm high.
      if (height <= 400) {
        return panelPrices.topBottomUpTo400;
      }

      // Panels from 401 mm are priced per square metre.
      const panelAreaM2 =
        (doorWidth / 1000) * (height / 1000);

      return Math.ceil(
        panelAreaM2 * panelPrices.topBottomOver400PerM2
      );
    };

    let panelTotal = 0;

    if (options.fixed_panel_left) {
      panelTotal += calculateSidePanelPrice(
        options.fixed_panel_left_width
      );
    }

    if (options.fixed_panel_right) {
      panelTotal += calculateSidePanelPrice(
        options.fixed_panel_right_width
      );
    }

    if (options.fixed_panel_top) {
      panelTotal += calculateTopBottomPanelPrice(
        options.fixed_panel_top_height
      );
    }

    if (options.fixed_panel_bottom) {
      panelTotal += calculateTopBottomPanelPrice(
        options.fixed_panel_bottom_height
      );
    }

    return basePrice + panelTotal;
  });

  const colorExtraCost = computed(() => {
    const options = form.config_options ?? {};

    const color = options.color;
    const selectedWidth = Number(options.width) || 0;
    const selectedHeight = Number(options.height) || 0;

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
      squareMeters *
      houseDoorPrices.customColorPerM2
    );
  });

  const accessoryExtraCost = computed(() => {
    const options = form.config_options ?? {};
    let total = 0;

    const width = Number(options.width) || 0;
    const runningMeters = width / 1000;

    if (options.heavy_duty) {
      total +=
        houseDoorPrices.accessories.heavyDuty;
    }

    if (options.drip_cap) {
      total += houseDoorPrices.accessories.dripCap;
    }

    if (options.door_closer) {
      total +=
        houseDoorPrices.accessories.doorCloser;
    }

    const drivePlateRate =
      houseDoorPrices.accessories.drivePlatePerRmt[
        options.drive_plate
      ];

    if (drivePlateRate) {
      total += Math.ceil(
        runningMeters * drivePlateRate
      );
    }

    if (
      options.panic_features?.includes(
        'panic_function_e'
      )
    ) {
      total +=
        houseDoorPrices.accessories.panicFunctionE;
    }

    if (
      options.panic_features?.includes('pushbar')
    ) {
      total += houseDoorPrices.accessories.pushbar;
    }

    const locking = options.locking_mechanism;
    const burglaryProtection =
      options.burglary_protection;

    if (
      ['V1', 'V2'].includes(locking) &&
      burglaryProtection
    ) {
      total +=
        houseDoorPrices.accessories
          .burglaryProtection[burglaryProtection] ?? 0;
    }

    if (options.window_type === 'with') {
      total += isThermal.value
        ? houseDoorPrices.windows.thermal
        : houseDoorPrices.windows.non_thermal;
    }

    const accessoriesStepIndex =
      steps.value?.findIndex?.(
        (stepObject) =>
          stepObject.name === 'Accessories'
      ) ?? -1;

    /*
     * Retains your current timing:
     * add the mandatory kit after Accessories.
     */
    if (step.value > accessoriesStepIndex + 1) {
      total +=
        houseDoorPrices.accessories.assemblyKit;
    }

    return total;
  });

  const fittingExtraCost = computed(() => {
    const options = form.config_options ?? {};
    const version = options.locking_mechanism;

    let total = 0;

    const standardFittingPrice =
      houseDoorPrices.fittings[version] ?? 0;

    total += standardFittingPrice;

    if (['V2', 'V6'].includes(version)) {
      const knobPrice =
        houseDoorPrices.fittings.knob[
          options.knob_type
        ] ?? 0;

      total += knobPrice;
    }

    if (options.kaba_upgrade) {
      total +=
        houseDoorPrices.fittings.kabaUpgrade;
    }

    return total;
  });

  const finalPrice = computed(() => {
    return (
      baseCalculatedPrice.value +
      colorExtraCost.value +
      accessoryExtraCost.value +
      fittingExtraCost.value
    );
  });

  return {
    effectiveInsulation,
    baseCalculatedPrice,
    colorExtraCost,
    accessoryExtraCost,
    fittingExtraCost,
    finalPrice,
  };
}