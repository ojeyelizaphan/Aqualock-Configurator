<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Panel and Profile Colour
      </h2>
  
      <!-- Panel Colour -->
      <div class="mb-10">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">Panel Colour</h3>
        <ColorSelector
          title="Choose a Colour"
          :options="colorOptions"
          v-model="form.config_options['color']"
        />
      </div>
  
      <!-- Profile Colour Customization -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">
          Steel Corners and Aluminum Profiles
        </h3>
        <p class="text-gray-600 mb-4">
          In the standard configuration, the profiles on the bottom slat are silver anodized aluminum,
          and the steel corners are powder-coated in gray. For a more refined look, you can opt to
          customize their color to match the sectional door.
        </p>
  
        <div class="flex flex-col sm:flex-row gap-4">
          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="standard"
              v-model="form.config_options['profileColour']"
              class="form-radio text-[#f39200]"
            />
            <span class="text-gray-800">Without customized colour</span>
          </label>
  
          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="custom"
              v-model="form.config_options['profileColour']"
              class="form-radio text-[#f39200]"
            />
            <span class="text-gray-800">With customized colour (RAL)</span>
          </label>
        </div>
  
        <!-- RAL input if "custom" is selected -->
        <div v-if="form.config_options['profileColour'] === 'custom'" class="mt-4 max-w-xs">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Enter RAL Colour Code
          </label>
          <input
            type="text"
            v-model="form.config_options['profileRAL']"
            placeholder="e.g. RAL 7016"
            class="w-full border rounded-lg p-2 focus:ring-[#f39200] focus:border-[#f39200]"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ColorSelector from '@/Components/ColorSector.vue';
  
  defineProps({
    form: Object,
    colorOptions: Array
  });
  

  </script>
  