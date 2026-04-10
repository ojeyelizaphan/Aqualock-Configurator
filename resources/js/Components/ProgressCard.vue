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

    <div v-if="stepLabels?.length" class="mt-5 flex flex-wrap gap-2">
      <button
        v-for="(label, index) in stepLabels"
        :key="index"
        type="button"
        @click="$emit('go-to-step', index + 1)"
        :disabled="!canNavigateTo(index + 1)"
        class="px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
        :class="[
          currentStep === index + 1
            ? 'bg-brand-orange text-white border-brand-orange'
            : canNavigateTo(index + 1)
            ? 'bg-white text-gray-700 border-gray-300 hover:border-brand-orange hover:text-brand-orange'
            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
        ]"
      >
        {{ label }}
      </button>
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
  stepLabels: {
    type: Array,
    default: () => [],
  },
  maxVisitedStep: {
    type: Number,
    default: 1,
  },
});

defineEmits(['go-to-step']);

const progressWidth = computed(() => {
  if (!props.totalSteps) return 0;
  return Math.min((props.currentStep / props.totalSteps) * 100, 100);
});

const formattedPrice = computed(() =>
  Number(props.currentPrice || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
);

const canNavigateTo = (stepNumber) => stepNumber <= props.maxVisitedStep;
</script>