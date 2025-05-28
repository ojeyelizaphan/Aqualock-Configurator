<template>
    <div>
      <label class="block text-base font-semibold text-gray-800 mb-3">
        {{ label }}
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label
          v-for="option in options"
          :key="option.value"
          class="flex items-center p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md"
          :class="modelValue === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-300'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="internalValue"
            class="sr-only"
          />
          <span class="text-gray-800 font-medium">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    label: String,
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: String,
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const internalValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
  </script>
  
  <style scoped>
  .border-brand-orange {
    border-color: #f39200;
  }
  .ring-brand-orange {
    --tw-ring-color: #f39200;
  }
  </style>
  