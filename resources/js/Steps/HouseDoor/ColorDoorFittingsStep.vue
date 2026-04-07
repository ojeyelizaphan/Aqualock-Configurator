<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT SIDE: Colour Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Plenty of Colours</h2>
        <p class="text-sm text-gray-600 mb-4">
          In order for your AquaLOCK® door to perfectly match your building, you have a choice of 216 RAL colours.
          Seven standard colours (white, black and several shades of grey) are available at no extra charge.
          <br>Please Note: The colour shades on the website may differ from the actual colour due to monitor display
          and therefore, we offer no guarantee for an exact match.
        </p>

        <ColorSelector
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <!-- Custom RAL input -->
        <div v-if="form.config_options['color'] === 'custom'" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Enter preferred RAL color
          </label>
          <input
            type="text"
            v-model="form.config_options['custom_ral_color']"
            placeholder="e.g. RAL 1001 Beige"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
          />
          <p class="text-xs text-gray-500 mt-1">
            Example: RAL 1001 Beige
          </p>
        </div>
      </div>

      <!-- RIGHT SIDE: Door Fittings -->
      <div class="flex gap-6">
        <div class="flex-1 space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Door Fittings</h2>
          <p class="text-sm text-gray-600 mb-4">
            Door fittings are based on the locking mechanism selected earlier.
          </p>

          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p class="text-sm text-gray-600">
              Selected locking mechanism:
              <strong>{{ form.config_options.locking_mechanism || 'Not selected' }}</strong>
            </p>
          </div>

          <div
            v-if="form.config_options.locking_mechanism === 'V2' || form.config_options.locking_mechanism === 'V6'"
          >
            <label class="block font-medium text-gray-700 mb-1">Knob Type</label>
            <select
              v-model="form.config_options.knob_type"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option value="">-- No Knob --</option>
              <option value="aluminium">Fixed Aluminium Knob</option>
              <option value="stainless">Fixed Stainless Steel Knob</option>
            </select>
          </div>

          <div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.config_options.kaba_upgrade" />
              <span class="text-gray-800">KABA version upgrade (+€92)</span>
            </label>
          </div>
        </div>

        <div class="flex-shrink-0 flex justify-center items-start">
          <img
            :src="imgDoor"
            alt="Door Fittings"
            class="w-64 h-auto object-contain rounded-md border"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import imgStep4 from "@/Assets/3-AquaLOCK Door/Step-4/step-4.jpg";
import ColorSelector from '@/Components/ColorSector.vue'
import { watch } from 'vue';

defineProps({
  form: Object,
  colorOptions: Array
});

// Clear custom RAL input if user moves away from custom color
// watch(
//   () => form.config_options['color'],
//   (newColor) => {
//     if (newColor !== 'custom') {
//       form.config_options.custom_ral_color = '';
//     }
//   }
// );

const imgDoor = imgStep4;
</script>