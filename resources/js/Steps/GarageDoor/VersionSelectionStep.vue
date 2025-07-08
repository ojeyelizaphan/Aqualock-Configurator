<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Choose a Version</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <label
          v-for="option in versionOptions"
          :key="option.value"
          class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
          :class="form.config_options['version'] === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options['version']"
            class="hidden"
          />
          <img
            :src="option.image"
            :alt="option.label"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <p class="text-lg font-semibold text-gray-800 mb-1">{{ option.label }}</p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </div>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { versionOptions } from '@/Data/versionOptions';
  
 const { form } = defineProps({
  form: Object
});
  </script>
  