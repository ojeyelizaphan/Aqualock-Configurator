<template>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">{{ title }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <label
          v-for="option in options"
          :key="option.value"
          class="cursor-pointer flex flex-col items-center"
        >
          <input
            type="radio"
            class="hidden"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="$emit('update:modelValue', option.value)"
          />
          <div
            :class="[
              'w-24 h-24 rounded-lg border-2 transition-all duration-300',
              modelValue === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'
            ]"
            :style="{ backgroundColor: option.color }"
          ></div>
          <p class="mt-2 text-sm text-gray-700 font-medium text-center">{{ option.label }}</p>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: { type: String, default: 'Choose a Colour' },
    options: Array,
    modelValue: String
  });
  
  defineEmits(['update:modelValue']);
  </script>
  