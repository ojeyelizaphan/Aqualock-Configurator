<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Choose Protection Height
      </h2>
      <div class="flex justify-center">
        <div class="grid sm:grid-cols-2 gap-6 justify-center max-w-2xl mx-auto">
          <label
            v-for="option in protectionHeightOptions"
            :key="option.value"
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
            :class="form.config_options['protection_height'] === option.value
              ? 'border-brand-orange ring-2 ring-brand-orange'
              : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['protection_height']"
              class="hidden"
            />
            <img
              :src="option.image"
              :alt="option.label"
              class="w-full aspect-[3/2] object-contain"
            />
            <div class="p-4">
              <p class="text-lg font-semibold text-gray-800 mb-1">
                {{ option.label }}
              </p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { protectionHeightOptions } from '@/Data/protectionHeightOptions';
  
  defineProps({
    form: Object
  });
  </script>
  