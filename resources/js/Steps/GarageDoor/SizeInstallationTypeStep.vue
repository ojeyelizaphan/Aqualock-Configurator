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
import { ref, computed, watch } from 'vue';
import { installationTypeOptions } from '@/Data/installationTypeOptions';

const props = defineProps({
  form: Object,
});

const selectedWidth = ref(props.form.config_options.width || null);
const selectedHeight = ref(props.form.config_options.height || null);

const widthOptions = computed(() => {
  const selectedVersion = props.form.config_options['version'];
  if (selectedVersion === 'V500') {
    return [
      2000, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
      3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000,
      4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000,
      5100, 5200
    ];
  }

  return [2000, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000];
});

const heightOptions = ref([2120, 2220, 2320, 2420, 2520]);

// Sync to form
watch(selectedWidth, (newVal) => {
  props.form.config_options.width = newVal;
});

watch(selectedHeight, (newVal) => {
  props.form.config_options.height = newVal;
});
</script>


  