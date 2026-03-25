<template>
  <div class="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-sm text-gray-500 mb-1">Configuration Progress</p>
        <p class="text-lg font-medium text-gray-900">
          Step <span class="text-brand-orange font-bold">{{ currentStep }}</span> of {{ totalSteps }}
        </p>
      </div>

      <div class="md:text-right">
        <p class="text-sm text-gray-500 mb-1">Current Price</p>
        <p class="text-2xl md:text-3xl font-bold text-brand-orange">
          €{{ formattedPrice }}
        </p>
      </div>
    </div>

    <div class="mt-5">
      <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-brand-orange rounded-full transition-all duration-300"
          :style="{ width: `${progressWidth}%` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
});

const progressWidth = computed(() => {
  if (!props.totalSteps) return 0;
  return Math.min((props.currentStep / props.totalSteps) * 100, 100);
});

const formattedPrice = computed(() =>
  Number(props.currentPrice || 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
);
</script>