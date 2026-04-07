<template>
  <div class="space-y-3">
    <h4 v-if="title" class="text-sm font-semibold text-gray-800">
      {{ title }}
    </h4>

    <div class="border border-gray-200 rounded-xl overflow-hidden bg-white max-w-md">
      <div class="max-h-64 overflow-y-auto">
        <label
          v-for="option in options"
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
              'w-full px-4 py-2.5 text-sm flex items-center justify-between transition-all duration-150',
              modelValue === option.value
                ? 'ring-2 ring-inset ring-brand-orange'
                : 'hover:opacity-95'
            ]"
            :style="{ backgroundColor: option.color }"
            :title="option.label"
          >
            <span
              class="font-medium"
              :class="isLightColor(option.color) ? 'text-black' : 'text-white'"
            >
              {{ option.label }}
            </span>

            <span
              v-if="modelValue === option.value"
              class="text-xs font-semibold"
              :class="isLightColor(option.color) ? 'text-black' : 'text-white'"
            >
              ✓
            </span>
          </div>
        </label>
      </div>
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

const isLightColor = (hex) => {
  if (!hex) return true

  const cleanHex = hex.replace('#', '')

  if (cleanHex.length !== 6) return true

  const rgb = parseInt(cleanHex, 16)
  const r = (rgb >> 16) & 255
  const g = (rgb >> 8) & 255
  const b = rgb & 255

  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness > 155
}
</script>