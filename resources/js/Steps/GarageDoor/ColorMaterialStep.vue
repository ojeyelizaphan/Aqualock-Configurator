<template>
    <div class="space-y-10">
      <!-- Color Selection -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Choose Color</h2>
        <div class="grid grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
          <label
            v-for="option in colorOptions"
            :key="option.value"
            class="text-center cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['color']"
              class="hidden"
            />
            <div
              :class="{ 'ring-2 ring-blue-500': form.config_options['color'] === option.value }"
              class="w-16 h-16 rounded-full mx-auto transition-all duration-300 hover:ring-2 hover:ring-blue-500"
              :style="{ backgroundColor: option.color }"
            ></div>
            <p class="text-sm mt-2 text-gray-700">{{ option.label }}</p>
          </label>
        </div>
        <div v-if="colorExtraCost > 0" class="mt-2 text-sm text-red-500 text-center">
          Extra charge for custom color: €{{ colorExtraCost }}
        </div>
      </div>
  
      <!-- Material Selection -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Choose Material</h2>
        <div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <label
            v-for="option in materialOptions"
            :key="option.value"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['material']"
              class="hidden"
            />
            <div
              :class="{ 'border-blue-500 border-2': form.config_options['material'] === option.value }"
              class="border p-4 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <img
                :src="option.image"
                alt="Material option"
                class="w-full max-h-48 object-contain rounded-lg mb-3"
              />
              <p class="font-semibold text-lg text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { colorOptions } from '@/Data/colorOptions';
  import { materialOptions } from '@/Data/materialOptions';
  const props = defineProps({
    form: Object,
    colorExtraCost: Number
  });
  </script>
  