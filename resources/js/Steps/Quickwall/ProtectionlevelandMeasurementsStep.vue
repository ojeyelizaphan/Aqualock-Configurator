<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Protection Level & Measurements
    </h2>

    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-md p-6 md:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        <!-- LEFT: Description + Inputs -->
        <div class="space-y-6">
          <!-- Intro text -->
          <div class="space-y-3 text-gray-700 leading-relaxed">
            <h3 class="text-lg font-semibold text-gray-800">
              Select water protection level
            </h3>
            <p>
              Some structural situations require the installation of mobile flood protection.
              The <span class="font-medium">AquaLOCK® Quickwall panel</span> was designed precisely
              for this purpose.
            </p>
            <p>
              It consists of fixed slats and is available up to a maximum protection height of
              <span class="font-medium">1.6 m</span>, depending on the opening width.
            </p>
          </div>

          <!-- Opening Width -->
          <div>
            <label class="block font-medium text-gray-800 mb-2">
              Opening width (mm)
            </label>
            <select
              v-model="form.config_options.width"
              class="w-full p-3 border border-gray-300 rounded-xl
                     focus:ring-brand-orange focus:border-brand-orange"
            >
              <option disabled value="">Select opening width</option>
              <option
                v-for="w in quickwallWidths"
                :key="w"
                :value="w"
              >
                {{ w }} mm
              </option>
            </select>
          </div>

          <!-- Protection Height -->
          <div>
            <label class="block font-medium text-gray-800 mb-3">
              Protection height (mm)
            </label>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <label
                v-for="h in protectionHeights"
                :key="h"
                class="flex items-center gap-2 p-3 border rounded-xl cursor-pointer
                       hover:border-brand-orange transition
                       peer-checked:border-brand-orange"
              >
                <input
                  type="radio"
                  class="accent-brand-orange"
                  :value="h"
                  v-model="form.config_options.height"
                />
                <span class="text-sm font-medium text-gray-700">
                  {{ h }} mm
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- RIGHT: Images -->
        <div class="space-y-4">
          <img
            v-for="(img, index) in protectionImages"
            :key="index"
            :src="img"
            alt="Quickwall protection example"
            class="w-full h-60 object-contain rounded-xl
                   bg-gray-50 shadow-sm"
          />
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
  import img1 from "@/Assets/5-Quickwall/Step-1/quickwall-1.jpg";
  import img2 from "@/Assets/5-Quickwall/Step-1/quickwall-1b.jpg";
defineProps({
  form: Object
});

import { quickwallWidths } from '@/Data/quickwallPrices';

const protectionHeights = [
  1600, 1470, 1340, 1210, 1080, 950, 810, 680, 550, 410, 280
];

const protectionImages = [
  img1,
  img2
];
</script>
