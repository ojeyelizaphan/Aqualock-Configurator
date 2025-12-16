<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Locking System & Accessories
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Central Locking -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold text-gray-800">
          Central Locking
        </h3>

        <p class="text-sm text-gray-600 leading-relaxed">
          (For inward-opening portals only, operated from the inside)
          <br /><br />
          The central locking system allows all single locking bolts
          to be operated via a central lever.
        </p>

        <!-- Options -->
        <div class="space-y-3">
          <label
            v-for="option in centralLockingOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.central_locking === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1"
              :value="option.value"
              v-model="form.config_options.central_locking"
            />
            <div>
              <p class="text-sm font-medium text-gray-800">
                {{ option.label }}
              </p>
              <p class="text-xs text-gray-600">
                {{ option.description }}
              </p>
            </div>
          </label>
        </div>

        <!-- Reference Image -->
        <figure class="pt-4 space-y-2 text-center">
          <img
            :src="img1"
            alt="Central locking system illustration"
            class="rounded-lg border mx-auto"
          />
          <figcaption class="text-xs text-gray-600">
            Central locking mechanism (inward-opening gate)
          </figcaption>
        </figure>
      </section>

      <!-- Accessories -->
      <section class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-800">
          Accessories
        </h3>

        <!-- Optional Add-ons -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">
            Optional Add-ons
          </p>

          <label
            v-for="option in optionalAccessories"
            :key="option.modelKey"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.accessories[option.modelKey]
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="checkbox"
              v-model="form.config_options.accessories[option.modelKey]"
              class="mt-1"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800">
                {{ option.label }}
              </p>
              <p class="text-xs text-gray-600">
                {{ option.description }}
              </p>
            </div>
            <span class="text-sm text-gray-700">
              + €{{ option.price }}
            </span>
          </label>
        </div>

        <!-- Lattice Bars -->
        <div class="space-y-3 pt-4">
          <p class="text-sm font-medium text-gray-700">
            Lattice Bars
          </p>

          <label
            v-for="lattice in latticeOptions"
            :key="lattice.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.lattice_bar === lattice.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              name="lattice_bar"
              :value="lattice.value"
              v-model="form.config_options.lattice_bar"
              class="mt-1"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800">
                {{ lattice.label }}
              </p>
            </div>
            <span class="text-sm text-gray-700">
              €{{ lattice.price }} / m²
            </span>
          </label>
        </div>

        <!-- Assembly Kit Info -->
        <div class="pt-4 space-y-2">
          <p class="text-sm font-medium text-gray-700">
            Assembly Kit with Sealing
          </p>
          <p class="text-xs text-gray-600">
            Included by default depending on gate width:
          </p>
          <ul class="list-disc ml-5 text-xs text-gray-600">
            <li>Up to 1,500 mm width: €154</li>
            <li>1,501 – 5,000 mm width: €223</li>
            <li>Industrial version: €347</li>
          </ul>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
  import img1 from "@/Assets/4-AquaLOCK Gate/Step-4/center-locking-4.jpg"
const props = defineProps({
    form: Object
  });

const form = props.form;

// Ensure accessories object exists
if (
  !form.config_options.accessories ||
  typeof form.config_options.accessories !== 'object'
) {
  form.config_options.accessories = {};
}

const centralLockingOptions = [
  {
    value: 'with',
    label: 'With central locking system',
    description: 'All locking bolts operated via a central lever'
  },
  {
    value: 'without',
    label: 'Without central locking system',
    description: 'Standard configuration without internal locking'
  }
];

const optionalAccessories = [
  {
    modelKey: 'opening180',
    label: '180° Gate Opening',
    description: 'Upgrade from standard 95° to full 180° opening',
    price: 427
  },
  {
    modelKey: 'centralLockingAccessory',
    label: 'Central Locking System',
    description: 'Enhanced internal locking system',
    price: 645
  },
  {
    modelKey: 'padlockPreparation',
    label: 'Padlock Preparation',
    description: 'Prepared for padlock use (padlock not included)',
    price: 88
  },
  {
    modelKey: 'durchgriff',
    label: 'Through-access with central locking',
    description: 'Access option when central locking is present',
    price: 479
  }
];

const latticeOptions = [
  { value: 'round_extruded', label: 'Round lattice bars (extruded)', price: 638 },
  { value: 'angular_extruded', label: 'Angular lattice bars (extruded)', price: 638 },
  { value: 'round_forged', label: 'Round lattice bars (forged)', price: 771 },
  { value: 'angular_forged', label: 'Angular lattice bars (forged)', price: 771 }
];
</script>
