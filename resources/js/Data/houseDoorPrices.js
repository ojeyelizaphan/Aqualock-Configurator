export const houseDoorPrices = {
  base: {
    non_thermally_insulated: {
      small: {
        V1: 4025,
        V2: 4177,
        V3: 4269,
        V6: 4511,
      },
      large: {
        V1: 4193,
        V2: 4345,
        V3: 4438,
        V6: 4678,
      },
    },

    thermally_insulated: {
      small: {
        V1: 5398,
        V2: 5552,
        V3: 5646,
        V6: 5883,
      },
      large: {
        V1: 5563,
        V2: 5714,
        V3: 5810,
        V6: 6049,
      },
    },
  },

  customColorPerM2: 80,

  windows: {
    non_thermal: 456,
    thermal: 596,
  },

  panels: {
    non_thermal: {
      sideUpTo400: 557,
      sideOver400PerM2: 819,
      topBottomUpTo400: 279,
      topBottomOver400PerM2: 819,
    },

    thermal: {
      sideUpTo400: 789,
      sideOver400PerM2: 1195,
      topBottomUpTo400: 394,
      topBottomOver400PerM2: 1195,
    },
  },

  accessories: {
    heavyDuty: 2004,
    dripCap: 303,
    doorCloser: 460,

    drivePlatePerRmt: {
      stainless: 157,
      aluminium: 103,
    },

    panicFunctionE: 398,
    pushbar: 1121,

    burglaryProtection: {
      RC2: 234,
      RC3: 454,
    },

    assemblyKit: 398,
  },

  fittings: {
    V1: 199,
    V2: 401,
    V6: 401,

    knob: {
      aluminium: 116,
      stainless: 312,
    },

    kabaUpgrade: 92,
  },
};