<template>
    <label
      class="flex items-start p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md"
      :class="modelValue ? 'border-brand-orange ring-2 ring-brand-orange bg-orange-50/20' : 'border-gray-300'"
    >
      <input
        type="checkbox"
        v-model="internalValue"
        class="mt-1 mr-3 accent-brand-orange w-5 h-5"
      />
      <div>
        <p class="text-gray-800 font-medium">{{ label }}</p>
        <p v-if="price" class="text-sm text-gray-600">{{ price }}</p>
      </div>
    </label>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    label: String,
    price: String,
    modelValue: Boolean,
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
  .accent-brand-orange {
    accent-color: #f39200;
  }
  </style>
  