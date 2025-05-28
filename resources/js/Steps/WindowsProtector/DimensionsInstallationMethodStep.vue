<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
      Dimensions & Installation Method
    </h2>

    <!-- Width & Height Dropdowns + Installation Method All in One Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Width Dropdown -->
      <div>
        <label class="block font-medium text-gray-700 mb-1">Opening Width (mm)</label>
        <select
          v-model="form.config_options.width"
          class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
        >
          <option disabled value="">Select a width</option>
          <option v-for="w in availableWidths" :key="w" :value="w">{{ w }} mm</option>
        </select>
      </div>

      <!-- Height Dropdown -->
      <div>
        <label class="block font-medium text-gray-700 mb-1">Opening Height (mm)</label>
        <select
          v-model="form.config_options.height"
          class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
        >
          <option disabled value="">Select a height</option>
          <option v-for="h in availableHeights" :key="h" :value="h">{{ h }} mm</option>
        </select>
      </div>

      <!-- Installation Method -->
      <div>
        <label class="block font-medium text-gray-700 mb-1">Installation Method</label>
        <div class="flex flex-col space-y-2">
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              class="form-radio text-brand-orange"
              v-model="form.config_options.installation_method"
              value="on_window_frame"
            />
            <span>On the window frame</span>
          </label>
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              class="form-radio text-brand-orange"
              v-model="form.config_options.installation_method"
              value="on_opening_wall"
            />
            <span>On the opening wall</span>
          </label>
        </div>
      </div>
    </div>

  </div>
</template>



<script setup>
import OptionRadioGroup from '@/Components/OptionRadioGroup.vue';

defineProps({
  form: Object
});

// Widths and heights from the price tables
const availableWidths = [
  400, 500, 600, 700, 800, 900, 1000,
  1100, 1200, 1300, 1400, 1500, 1600,
  1700, 1800
];

const availableHeights = [
  400, 500, 600, 700, 800, 900, 1000,
  1100, 1200, 1300, 1400, 1500, 1600,
  1700, 1800
];
</script>
