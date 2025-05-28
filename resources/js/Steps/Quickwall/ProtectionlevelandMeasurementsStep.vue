<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
      Protection Level & Measurements
    </h2>

    <!-- Images -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <img
        v-for="(img, index) in protectionImages"
        :key="index"
        :src="img"
        class="w-96 h-60 object-contain rounded-xl shadow-md"
        alt="Protection example"
      />
    </div>

    <!-- Opening Width Dropdown -->
    <div class="max-w-md mx-auto mb-8">
      <label class="block font-medium text-gray-700 mb-1">Opening Width (mm)</label>
      <select
        v-model="form.config_options.width"
        class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
      >
        <option disabled value="">Select a width</option>
        <option v-for="w in quickwallWidths" :key="w" :value="w">{{ w }} mm</option>
      </select>
    </div>

    <!-- Protection Height Dropdown -->
    <div class="max-w-md mx-auto mb-8">
      <label class="block font-medium text-gray-700 mb-1">Protection Height (mm)</label>
      <select
        v-model="form.config_options.height"
        class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
      >
        <option disabled value="">Select a height</option>
        <option v-for="h in protectionHeights" :key="h" :value="h">{{ h }} mm</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  form: Object
});

import { quickwallWidths } from '@/Data/quickwallPrices';

const protectionHeights = [
  1600, 1470, 1340, 1210, 1080, 950, 810, 680, 550, 410, 280
];

const protectionImages = [
  'https://res.cloudinary.com/ducskpmnn/image/upload/v1745929256/quickwall-1_tch3fy.jpg',
  'https://res.cloudinary.com/ducskpmnn/image/upload/v1745929272/quickwall-1b_nbr0c1.jpg'
];
</script>
