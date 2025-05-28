<template>
    <div class="space-y-8">
      <!-- Size of Wall Opening -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Select Size of Wall Opening</h2>
  
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
            <select
              v-model="selectedWidth"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option disabled value="">-- Select Width --</option>
              <option v-for="width in widthOptions" :key="width" :value="width">{{ width }}</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
            <select
              v-model="selectedHeight"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option disabled value="">-- Select Height --</option>
              <option v-for="height in heightOptions" :key="height" :value="height">{{ height }}</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Installation Type -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Choose Installation Type</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <label
            v-for="option in installationTypeOptions"
            :key="option.value"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['installation_type']"
              class="hidden"
            />
            <div
              :class="[ 
                'rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg p-6 text-left', 
                form.config_options['installation_type'] === option.value
                  ? 'border-brand-orange ring-2 ring-brand-orange'
                  : 'border-gray-200'
              ]"
            >
              <img :src="option.image" alt="Installation option" class="w-full h-48 object-contain rounded-lg mb-4" />
              <p class="text-lg font-semibold text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed, watch } from 'vue';
import { installationTypeOptions } from '@/Data/installationTypeOptions';

const props = defineProps({
  form: Object,
  selectedWidth: Number,
  selectedHeight: Number,
  widthOptions: Array,
  heightOptions: Array
});

const emit = defineEmits(['update:selectedWidth', 'update:selectedHeight']);

const selectedWidth = computed({
  get: () => props.selectedWidth,
  set: val => emit('update:selectedWidth', val)
});

const selectedHeight = computed({
  get: () => props.selectedHeight,
  set: val => emit('update:selectedHeight', val)
});

// Sync selected values to form.config_options (for usePriceCalculator)
watch(selectedWidth, (newVal) => {
  props.form.config_options.width = newVal;
});

watch(selectedHeight, (newVal) => {
  props.form.config_options.height = newVal;
});
</script>

  