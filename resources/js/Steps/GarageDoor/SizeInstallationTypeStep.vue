<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row gap-10">

      <!-- Garage Door Size -->
      <div class="md:w-1/2 space-y-6">
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm text-gray-700 leading-relaxed">
          <h2 class="text-2xl font-semibold mb-3 text-gray-900 text-center">Garage Door Size</h2>
          <p class="mb-2">
            Please note the different maximum widths of your garage door depending on the protection height you have selected.
          </p>
          <ul class="list-disc list-inside text-sm mb-2">
            <li>Protection height up to 0.5 m: width between 2,000 and 5,200 mm</li>
            <li>Protection height up to 1.6 m: width between 2,000 and 3,100 mm</li>
          </ul>
          <p class="text-sm">
            Height of the wall opening: between 1,920 and 2,520 mm
          </p>
        </div>

        <!-- Width & Height Selection -->
        <div class="grid sm:grid-cols-2 gap-6">
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
      <div class="md:w-1/2 space-y-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 text-center">Installation Type</h2>
        <p class="text-sm text-gray-600 mb-6 text-center">
          No worries if you are not sure which type of installation is appropriate for your building - an experienced fitter will clarify this on site.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-10">
          <label
            v-for="option in installationTypeOptions"
            :key="option.value"
            class="flex flex-col items-center cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['installation_type']"
              class="hidden"
            />
            <div
              :class="[
                'w-40 h-40 rounded-full overflow-hidden border-2 transition-all',
                form.config_options['installation_type'] === option.value
                  ? 'border-brand-orange ring-2 ring-brand-orange'
                  : 'border-gray-300'
              ]"
            >
              <img :src="option.image" alt="Installation option" class="w-full h-full object-cover" />
            </div>
            <p class="mt-2 font-semibold text-gray-800 text-center">{{ option.label }}</p>
            <p class="text-xs text-gray-500 text-center">{{ option.description }}</p>
          </label>
        </div>
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
    return Array.from({ length: 31 }, (_, i) => 2000 + i * 100); // 2000 to 5200
  }
  return Array.from({ length: 11 }, (_, i) => 2000 + i * 100); // 2000 to 3000
});

const heightOptions = ref([1920, 2020, 2120, 2220, 2320, 2420, 2520]);

// Sync to form
watch(selectedWidth, (val) => props.form.config_options.width = val);
watch(selectedHeight, (val) => props.form.config_options.height = val);
</script>
