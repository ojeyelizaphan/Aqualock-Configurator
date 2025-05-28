<template>
  <div class="space-y-10">
    <!-- Flood Protection Height -->
    <div>
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Water Protection Level</h2>
      <div class="max-w-xl mx-auto space-y-4">
        <p class="text-gray-700 text-center">
          AquaLOCK® gates provide protection up to a height of <strong>1,200 mm</strong>, keeping out 99.9% of water.
        </p>

        <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Protection Height (in mm)</label>
        <input
          type="number"
          v-model.number="form.config_options.protection_height"
          min="0"
          max="1200"
          placeholder="Max 1200 mm"
          class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
        />
      </div>
    </div>

    <!-- Upper Design -->
    <div>
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Upper Area Design (Above Protection Height)</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <label
          v-for="option in upperDesignOptions"
          :key="option.value"
          class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden w-64 text-center p-4"
          :class="form.config_options.upper_design === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.upper_design"
            class="hidden"
          />
          <p class="text-lg font-semibold text-gray-800">{{ option.label }}</p>
        </label>
      </div>
    </div>

    <!-- Gate Size -->
    <div>
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Gate Size</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <!-- Width Dropdown -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Desired Width (in mm)</label>
          <select
            v-model.number="form.config_options.width"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option :value="null" disabled>Select width</option>
            <option v-for="w in availableWidths" :key="w" :value="w">
              {{ w }} mm
            </option>
          </select>
        </div>

        <!-- Height Dropdown -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Desired Height (in mm)</label>
          <select
            v-model.number="form.config_options.height"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option :value="null" disabled>Select height</option>
            <option v-for="h in availableHeights" :key="h" :value="h">
              {{ h }} mm
            </option>
          </select>
        </div>

        <!-- Additional Non-Protected Height -->
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Additional Non-Protected Height (optional, in mm)</label>
          <input
            type="number"
            v-model.number="form.config_options.extra_height"
            min="0"
            placeholder="e.g. 100 mm"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { gateInwardPrices, gateOutwardPrices } from '@/Data/gatePrices';

defineProps({
  form: Object,
});

const upperDesignOptions = [
  { value: 'lattice', label: 'Lattice Bars (Round or Angular)' },
  { value: 'wood', label: 'Wood Paneling' },
];

// Extract available heights and widths from gate prices
const availableHeights = Object.keys(gateInwardPrices).map(Number);

const availableWidths = Array.from(
  new Set(
    Object.values(gateInwardPrices)
      .flatMap(row => Object.keys(row).map(Number))
  )
).sort((a, b) => a - b);
</script>
