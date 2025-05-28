<template>
    <div class="space-y-8 max-w-6xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">
        Select Locking Mechanism
      </h2>
  
      <!-- Locking Mechanism Variations -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <label
          v-for="option in lockingMechanismOptions"
          :key="option.value"
          class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
          :class="form.config_options['locking_mechanism'] === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options['locking_mechanism']"
            class="hidden"
          />
          <div class="p-4">
            <!-- Locking Mechanism Image -->
            <img :src="option.image" :alt="option.label" class="w-full h-32 object-contain mb-4 rounded-lg shadow-md" />
            <p class="font-semibold text-lg text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </div>
        </label>
      </div>
  
      <!-- Display Additional Information Based on Selection -->
      <div v-if="form.config_options['locking_mechanism']">
        <div v-if="form.config_options['locking_mechanism'] === 'V1'" class="mt-4 text-sm text-gray-600">
          <p><strong>Burglary Protection:</strong> RC1N, RC2, RC3 without window cut-out</p>
        </div>
        <div v-if="form.config_options['locking_mechanism'] === 'V2'" class="mt-4 text-sm text-gray-600">
          <p><strong>Burglary Protection:</strong> RC1N, RC2, RC3 possible</p>
          <p><strong>Glass Cut-Out:</strong> Possible only with RC1N. The shoot bolt is visible in the glass cut-out from the outside.</p>
        </div>
        <div v-if="form.config_options['locking_mechanism'] === 'V3'" class="mt-4 text-sm text-gray-600">
          <p><strong>Burglary Protection:</strong> Only RC1N possible</p>
          <p><strong>Window Cut-Out:</strong> Not possible</p>
        </div>
        <div v-if="form.config_options['locking_mechanism'] === 'V6'" class="mt-4 text-sm text-gray-600">
          <p><strong>Burglary Protection:</strong> Only RC1N possible</p>
          <p><strong>Glass Cut-Out:</strong> Possible, but espagnolette bolt is visible in the glass cut-out from the outside.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    form: Object,
    lockingMechanismOptions: Array
  });
  
  const lockingMechanismOptions = [
    {
      value: 'V1',
      label: 'V1',
      description: 'Outside: No door fixture, no locking cylinder. Inside: Locking cylinder, lever handle and espagnolette bolt handle.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915793/V1_casxvm.jpg' // Replace with actual image path
    },
    {
      value: 'V2',
      label: 'V2',
      description: 'Outside: Locking cylinder and a lever handle. Inside: Locking cylinder, lever handle and espagnolette bolt handle.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915812/V2_lrvdc4.jpg' // Replace with actual image path
    },
    {
      value: 'V3',
      label: 'V3',
      description: 'Outside: Locking cylinder with waterproof cover, fixed lever knob. Inside: Locking cylinder, lever handle and espagnolette bolt handle.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915825/V3_wlzsra.jpg' // Replace with actual image path
    },
    {
      value: 'V6',
      label: 'V6',
      description: 'Outside: Locking cylinder, fixed door knob and espagnolette bolt handle. Inside: Locking cylinder, lever handle and espagnolette bolt handle.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915838/V6_qczywi.jpg' // Replace with actual image path
    }
  ];
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  