<template>
    <div class="space-y-10 max-w-5xl mx-auto">
      <!-- Door Dimensions -->
      <div>
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Door Dimensions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
            <input
              type="number"
              v-model.number="form.config_options['width']"
              :min="500"
              :max="1200"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              placeholder="500 - 1200"
              :class="{
                'border-red-500': isWidthInvalid,
                'border-gray-300': !isWidthInvalid
              }"
            />
            <p v-if="isWidthInvalid" class="text-xs text-red-500">Width must be between 500 and 1200 mm</p>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
            <input
              type="number"
              v-model.number="form.config_options['height']"
              :min="1200"
              :max="2300"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              placeholder="1200 - 2300"
              :class="{
                'border-red-500': isHeightInvalid,
                'border-gray-300': !isHeightInvalid
              }"
            />
            <p v-if="isHeightInvalid" class="text-xs text-red-500">Height must be between 1200 and 2300 mm</p>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          Larger widths are available on request.
        </p>
      </div>
  
      <!-- Fixed Panels -->
      <div>
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Optional Fixed Panels</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="form.config_options['fixed_panel_left']" class="accent-brand-orange" />
            <span class="text-gray-700">Fixed side panel (left, up to 400 mm)</span>
          </label>
  
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="form.config_options['fixed_panel_right']" class="accent-brand-orange" />
            <span class="text-gray-700">Fixed side panel (right, up to 400 mm)</span>
          </label>
  
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="form.config_options['fixed_panel_top']" class="accent-brand-orange" />
            <span class="text-gray-700">Fixed panel above door (up to 400 mm)</span>
          </label>
        </div>
      </div>
  
      <!-- Installation Options -->
      <div>
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Installation Type</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <label
            v-for="option in installationOptions"
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
              :class="{
                'border-brand-orange ring-2 ring-brand-orange': form.config_options['installation_type'] === option.value
              }"
              class="border rounded-2xl p-4 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
            >
              <img :src="option.image" :alt="option.label" class="w-full h-32 object-cover mb-3 rounded-lg" />
              <p class="font-semibold text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'; 
  const props = defineProps({
    form: Object
  });
  
  const installationOptions = [
    {
      value: 'between_reveal',
      label: 'Between the Reveal',
      description: 'Thermally insulated possible.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915328/behind-the-reveal_pok5yw.jpg'
    },
    {
      value: 'infront_reveal',
      label: 'In Front of the Reveal',
      description: 'Thermal insulation not possible. Drip cap mandatory!',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915436/infront-of-the-reveal_cwhuyk.jpg'
    },
    {
      value: 'interior_flush',
      label: 'Interior Flush',
      description: 'Thermally insulated possible.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915653/interior-flush_lrdi1s.jpg'
    },
    {
      value: 'behind_reveal',
      label: 'Behind the Reveal',
      description: 'Thermal insulation not possible.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915328/behind-the-reveal_pok5yw.jpg'
    }
  ];
  
  // Computed properties to validate input ranges
  const isWidthInvalid = computed(() => {
    const width = props.form.config_options['width'];
    return width < 500 || width > 1200;
  });
  
  const isHeightInvalid = computed(() => {
    const height = props.form.config_options['height'];
    return height < 1200 || height > 2300;
  });
  
  // Determine if the form is valid (disables the submit button)
  const isFormInvalid = computed(() => isWidthInvalid.value || isHeightInvalid.value);
  </script>
  