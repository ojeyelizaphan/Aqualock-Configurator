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
            <li>Protection height up to 0.5 m: width between 2,200 and 5,200 mm</li>
            <li>Protection height up to 1.6 m: width between 2,200 and 3,100 mm</li>
          </ul>
          <p class="text-sm">
            Height of the wall opening: between 2,120 and 2,520 mm
          </p>
        </div>

        <!-- Width & Height Input -->
        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
            <input
              v-model="enteredWidth"
              type="number"
              min="2200"
              :max="maxAllowedWidth"
              step="1"
              placeholder="Enter width"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            <p class="text-xs text-gray-500 mt-1">
              Allowed range: 2200 - {{ maxAllowedWidth }} mm
            </p>
            <!-- <p v-if="enteredWidth && mappedWidth" class="text-xs text-amber-700 mt-1">
              Price will be calculated using width: <strong>{{ mappedWidth }} mm</strong>
            </p> -->
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
            <input
              v-model="enteredHeight"
              type="number"
              min="2120"
              max="2520"
              step="1"
              placeholder="Enter height"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            <p class="text-xs text-gray-500 mt-1">
              Allowed range: 2120 - 2520 mm
            </p>
          </div>

          <div
            v-if="(enteredWidth || enteredHeight) && !isSizeValid"
            class="sm:col-span-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
          >
            Please enter a valid size within the allowed range.
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

// store raw user input
const enteredWidth = ref(props.form.config_options.entered_width || props.form.config_options.width || '');
const enteredHeight = ref(props.form.config_options.entered_height || props.form.config_options.height || '');

const selectedVersion = computed(() => props.form.config_options['version']);

// width limit depends on version
const maxAllowedWidth = computed(() => {
  return selectedVersion.value === 'V500' ? 5200 : 3100;
});

const minAllowedWidth = 2200;
const minAllowedHeight = 2120;
const maxAllowedHeight = 2520;

// round width down to nearest 100
const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minAllowedWidth || width > maxAllowedWidth.value) {
    return null;
  }

  return Math.floor(width / 100) * 100;
});

// heights are 2120, 2220, 2320, 2420, 2520
const heightBreakpoints = [2120, 2220, 2320, 2420, 2520];

const mappedHeight = computed(() => {
  const height = Number(enteredHeight.value);

  if (!height || height < minAllowedHeight || height > maxAllowedHeight) {
    return null;
  }

  let result = heightBreakpoints[0];

  for (const breakpoint of heightBreakpoints) {
    if (height >= breakpoint) {
      result = breakpoint;
    } else {
      break;
    }
  }

  return result;
});

const isSizeValid = computed(() => {
  return !!mappedWidth.value && !!mappedHeight.value;
});

// sync raw values + mapped values into form
watch(enteredWidth, (val) => {
  props.form.config_options.entered_width = val ? Number(val) : null;
  props.form.config_options.width = mappedWidth.value;
});

watch(enteredHeight, (val) => {
  props.form.config_options.entered_height = val ? Number(val) : null;
  props.form.config_options.height = mappedHeight.value;
});

watch(mappedWidth, (val) => {
  props.form.config_options.width = val;
});

watch(mappedHeight, (val) => {
  props.form.config_options.height = val;
});
</script>