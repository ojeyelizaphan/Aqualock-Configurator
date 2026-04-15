<template>
  <div class="space-y-3">
    <h4 v-if="title" class="text-sm font-semibold text-gray-800">
      {{ title }}
    </h4>

    <div class="border border-gray-200 rounded-xl overflow-hidden bg-white max-w-md">
      <!-- Search -->
      <div class="border-b border-gray-200 p-3 bg-gray-50">
        <input
          v-model="search"
          type="text"
          placeholder="Search RAL code or name..."
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
        />
      </div>

      <div class="max-h-80 overflow-y-auto">
        <label
          v-for="option in filteredOptions"
          :key="option.value"
          class="block cursor-pointer"
        >
          <input
            type="radio"
            class="sr-only"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="$emit('update:modelValue', option.value)"
          />

          <div
            :class="[
              'w-full px-4 py-2.5 text-sm flex items-center justify-between transition-all duration-150 border-b border-white/20',
              modelValue === option.value
                ? 'ring-2 ring-inset ring-brand-orange'
                : 'hover:opacity-95'
            ]"
            :style="option.color ? { backgroundColor: option.color } : { backgroundColor: '#ffffff' }"
            :title="option.label"
          >
            <span
              class="font-medium"
              :class="option.color ? (isLightColor(option.color) ? 'text-black' : 'text-white') : 'text-gray-800'"
            >
              {{ option.label }}
            </span>

            <span
              v-if="modelValue === option.value"
              class="text-xs font-semibold"
              :class="option.color ? (isLightColor(option.color) ? 'text-black' : 'text-white') : 'text-gray-800'"
            >
              ✓
            </span>
          </div>
        </label>

        <div
          v-if="filteredOptions.length === 0"
          class="px-4 py-6 text-sm text-gray-500 text-center"
        >
          No colours found.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  options: { type: Array, required: true },
  modelValue: String
});

defineEmits(['update:modelValue']);

const search = ref('');

const filteredOptions = computed(() => {
  const term = search.value.trim().toLowerCase();

  if (!term) return props.options;

  return props.options.filter((option) =>
    option.label?.toLowerCase().includes(term) ||
    option.value?.toLowerCase().includes(term)
  );
});

const isLightColor = (hex) => {
  if (!hex) return true;

  const cleanHex = hex.replace('#', '');

  if (cleanHex.length !== 6) return true;

  const rgb = parseInt(cleanHex, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 155;
};
</script>