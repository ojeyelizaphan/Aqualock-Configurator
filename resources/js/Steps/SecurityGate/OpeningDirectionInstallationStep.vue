<template>
    <div class="space-y-10">
      <!-- Gate Opening Direction and Angle -->
      <div>
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Select Gate Opening Direction & Angle</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <label
            v-for="option in openingOptions"
            :key="option.value"
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
            :class="form.config_options['gate_opening'] === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['gate_opening']"
              class="hidden"
            />
            <img
              :src="option.image"
              :alt="option.label"
              class="w-full h-32 object-cover"
            />
            <div class="p-4 text-center">
              <p class="text-lg font-semibold text-gray-800 mb-1">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
  
      <!-- Fitting Method -->
      <div>
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Select Fitting Method</h2>
        <div class="flex flex-wrap justify-center gap-6">
          <label
            v-for="method in fittingMethods"
            :key="method.value"
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden w-64"
            :class="form.config_options['fitting_method'] === method.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="method.value"
              v-model="form.config_options['fitting_method']"
              class="hidden"
            />
            <div class="p-4 text-center">
              <p class="text-lg font-semibold text-gray-800">{{ method.label }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    form: Object
  });
  
  const openingOptions = [
    { value: 'left_in_95', label: 'Left Inward 95°', description: 'Opens inwards to the left at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'left_in_180', label: 'Left Inward 180°', description: 'Opens inwards to the left at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
    { value: 'left_out_95', label: 'Left Outward 95°', description: 'Opens outwards to the left at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'left_out_180', label: 'Left Outward 180°', description: 'Opens outwards to the left at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
    { value: 'right_in_95', label: 'Right Inward 95°', description: 'Opens inwards to the right at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'right_in_180', label: 'Right Inward 180°', description: 'Opens inwards to the right at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
    { value: 'right_out_95', label: 'Right Outward 95°', description: 'Opens outwards to the right at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'right_out_180', label: 'Right Outward 180°', description: 'Opens outwards to the right at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
  ];
  
  const fittingMethods = [
    { value: 'behind_reveal', label: 'Behind the Reveal' },
    { value: 'between_reveal', label: 'Between the Reveal' },
    { value: 'in_front_reveal', label: 'In Front of the Reveal' },
  ];
  </script>
  