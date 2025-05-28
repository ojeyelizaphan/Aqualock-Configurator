<template>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
      </label>
      <input
        :type="type"
        :placeholder="placeholder"
        :min="Number(min)"
        :max="Number(max)"
        :step="Number(step)"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full border rounded-xl p-3 text-gray-800 focus:ring-[#f39200] focus:border-[#f39200] border-gray-300"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    modelValue: [String, Number],
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    }
  });
  
  defineEmits(['update:modelValue']);
  </script>
  