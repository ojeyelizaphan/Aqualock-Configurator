<template>
  <div class="space-y-3">
    <!-- Optional title (smaller, left-aligned) -->
    <h4 v-if="title" class="text-sm font-semibold text-gray-800">
      {{ title }}
    </h4>

    <!-- Scrollable color grid -->
    <div
      class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3
             max-h-64 overflow-y-auto pr-1"
    >
      <label
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer flex flex-col items-center gap-1"
      >
        <input
          type="radio"
          class="sr-only"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
        />

        <!-- Color Swatch -->
        <div
          :class="[
            'w-12 h-12 rounded border transition',
            modelValue === option.value
              ? 'border-brand-orange ring-2 ring-brand-orange'
              : 'border-gray-300 hover:border-gray-500'
          ]"
          :style="{ backgroundColor: option.color }"
          :title="option.label"
        ></div>

        <!-- Label -->
        <span class="text-[11px] text-gray-600 text-center leading-tight">
          {{ option.label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  options: { type: Array, required: true },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>
