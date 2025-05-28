<template>
    <div class="space-y-12">
      <!-- Colour Selection -->
      <div>
        <!-- <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Choose a Colour</h2> -->
        <ColorSelector
          title="Choose a Colour"
          :options="colorOptions"
          v-model="form.config_options['color']"
        />
      </div>
  
      <!-- Gate Fittings -->
      <div>
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Gate Fittings</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <label
            v-for="option in gateFittingOptions"
            :key="option.value"
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
            :class="form.config_options.gate_fittings === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options.gate_fittings"
              class="hidden"
            />
            <img
              :src="option.image"
              :alt="option.label"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <p class="text-lg font-semibold text-gray-800 mb-1">{{ option.label }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ColorSelector from '@/Components/ColorSector.vue' 
  
  defineProps({
    form: Object,
    colorOptions: Array
  });
  
  const gateFittingOptions = [
    {
      value: 'aluminum_both',
      label: 'Lever handle set inside and outside – Aluminum F1',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745919197/gate-fittings-1_yug48g.jpg'
    },
    {
      value: 'stainless_both',
      label: 'Lever handle set inside and outside – Stainless Steel',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745919208/gate-fittings-2_aeoy4b.jpg'
    },
    {
      value: 'aluminum_inside',
      label: 'Lever handle set only inside – Aluminum F1',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745919221/gate-fittings-3_ycrubb.jpg'
    },
    {
      value: 'stainless_inside',
      label: 'Lever handle set only inside – Stainless Steel',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745919208/gate-fittings-2_aeoy4b.jpg'
    },
    {
      value: 'aluminum_knob',
      label: 'Lever handle inside, fixed knob outside – Aluminum F1',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745919221/gate-fittings-3_ycrubb.jpg'
    },
    {
      value: 'stainless_knob',
      label: 'Lever handle inside, fixed knob outside – Stainless Steel',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745919208/gate-fittings-2_aeoy4b.jpg'
    }
  ];
  </script>
  