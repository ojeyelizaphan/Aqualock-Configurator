<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Hatch Options
    </h2>

    <!-- Split layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Removable Hatch -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Removable hatch
        </h3>

        <p class="text-sm text-gray-600">
          Opening dimensions of the hatch (width × height)
        </p>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src=removableImg
            alt="Removable hatch illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <!-- Size options -->
        <div class="space-y-3 pt-4">
          <label
            v-for="size in removableSizes"
            :key="size"
            class="flex items-center gap-3 text-sm text-gray-700"
          >
            <input
              type="radio"
              :value="size"
              v-model="form.config_options.removable_hatch_size"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            {{ size }}
          </label>
        </div>
      </div>

      <!-- RIGHT: Tilt-up Hatch -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Tilt-up hatch
        </h3>

        <p class="text-sm text-gray-600">
          Opening dimensions of the hatch (width × height)
        </p>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src=tiltUpImg
            alt="Tilt-up hatch illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <!-- Size options -->
        <div class="space-y-3 pt-4">
          <label
            v-for="size in tiltUpSizes"
            :key="size"
            class="flex items-center gap-3 text-sm text-gray-700"
          >
            <input
              type="radio"
              :value="size"
              v-model="form.config_options.tilt_up_hatch_size"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            {{ size }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import removableImg from '@/Assets/8-Windows Protector/Step-2/removable.jpg';
import tiltUpImg from '@/Assets/8-Windows Protector/Step-2/tilt-up.jpg';

defineProps({
  form: Object
});

const removableSizes = [
  '200 × 150 mm',
  '300 × 200 mm',
  '400 × 300 mm',
  '600 × 300 mm',
  '600 × 400 mm'
];

const tiltUpSizes = [
  '250 × 100 mm',
  '300 × 200 mm',
  '400 × 300 mm',
  '600 × 300 mm',
  '600 × 400 mm'
];
</script>
