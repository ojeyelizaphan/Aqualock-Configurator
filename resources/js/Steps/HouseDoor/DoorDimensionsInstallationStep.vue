<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- Split screen: Door dimensions + panels | Installation type -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- LEFT SIDE: Door Dimensions & Panels -->
      <div class="space-y-6">
        <!-- Door Dimensions -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Door Dimensions</h2>
          <p class="text-sm text-gray-600 mb-4">
            Take caution on the permissible dimensions of the door:
            <br>• Width: between 500 and 1,200 mm
            <br>• Height: between 1,200 and 2,300 mm
          </p>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
              <input
                type="number"
                v-model.number="form.config_options.width"
                :min="500"
                :max="1200"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                placeholder="500 - 1200"
                :class="{'border-red-500': isWidthInvalid, 'border-gray-300': !isWidthInvalid}"
              />
              <p v-if="isWidthInvalid" class="text-xs text-red-500">Width must be between 500 and 1200 mm</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
              <input
                type="number"
                v-model.number="form.config_options.height"
                :min="1200"
                :max="2300"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                placeholder="1200 - 2300"
                :class="{'border-red-500': isHeightInvalid, 'border-gray-300': !isHeightInvalid}"
              />
              <p v-if="isHeightInvalid" class="text-xs text-red-500">Height must be between 1200 and 2300 mm</p>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">Larger widths are available on request.</p>
        </div>

        <!-- Optional Fixed Panels -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Optional Fixed Panels</h2>
          <p class="text-sm text-gray-600 mb-3">
            Wider door openings can be evened out with fixed panels that are mounted on the frame to the left, right, and above the door:
          </p>
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="form.config_options.fixed_panel_left" class="accent-brand-orange" />
              <span class="text-gray-700">Fixed side panel (left, up to 400 mm)</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="form.config_options.fixed_panel_right" class="accent-brand-orange" />
              <span class="text-gray-700">Fixed side panel (right, up to 400 mm)</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="form.config_options.fixed_panel_top" class="accent-brand-orange" />
              <span class="text-gray-700">Fixed panel above door (up to 400 mm)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE: Installation Type -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Installation Type</h2>
        <p class="text-sm text-gray-600 mb-4">
          Four installation variations. In cases of complexity of installation, our authorised technician will be on site to offer guidance.
          <br>Attention: Depending on the structural designs, thermally insulated doors may not be possible:
        </p>

        <div class="grid grid-cols-1 gap-6">

          <!-- Split into two columns inside right side -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- LEFT Column: first two options -->
            <div class="space-y-4">
              <label
                v-for="option in leftInstallationOptions"
                :key="option.value"
                class="flex items-start gap-4 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition"
              >
                <input
                  type="radio"
                  :value="option.value"
                  v-model="form.config_options.installation_type"
                  class="mt-1"
                />
                <img :src="option.image" :alt="option.label" class="w-24 h-24 object-contain border rounded-md" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-800">{{ option.label }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ option.description }}</p>
                </div>
              </label>
            </div>

            <!-- RIGHT Column: last two options -->
            <div class="space-y-4">
              <label
                v-for="option in rightInstallationOptions"
                :key="option.value"
                class="flex items-start gap-4 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition"
              >
                <input
                  type="radio"
                  :value="option.value"
                  v-model="form.config_options.installation_type"
                  class="mt-1"
                />
                <img :src="option.image" :alt="option.label" class="w-24 h-24 object-contain border rounded-md" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-800">{{ option.label }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ option.description }}</p>
                </div>
              </label>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import imgBetween from "@/Assets/3-AquaLOCK Door/Step-2/between-the-reveal.jpg";
import imgBehind from "@/Assets/3-AquaLOCK Door/Step-2/behind-the-reveal.jpg";
import imgInfront from "@/Assets/3-AquaLOCK Door/Step-2/infront-of-the-reveal.jpg";
import imgInterior from "@/Assets/3-AquaLOCK Door/Step-2/interior-flush.jpg";
import imgStep from "@/Assets/3-AquaLOCK Door/Step-2/step-a.jpg";
const props = defineProps({ form: Object });

// Full installation options
const installationOptions = [
  { value: 'between_reveal', label: 'Between the Reveal', description: 'Thermally insulated possible.', image: imgBetween },
  { value: 'infront_reveal', label: 'In Front of the Reveal', description: 'Thermally insulated not possible. Drip cap mandatory!', image: imgInfront },
  { value: 'interior_flush', label: 'Interior Flush', description: 'Thermally insulated possible.', image: imgInterior },
  { value: 'behind_reveal', label: 'Behind the Reveal', description: 'Thermally insulated not possible.', image: imgBehind }
];

// Split into two columns for display
const leftInstallationOptions = installationOptions.slice(0, 2);
const rightInstallationOptions = installationOptions.slice(2, 4);

// Input validation
const isWidthInvalid = computed(() => {
  const w = props.form.config_options.width;
  return w < 500 || w > 1200;
});
const isHeightInvalid = computed(() => {
  const h = props.form.config_options.height;
  return h < 1200 || h > 2300;
});
</script>
