<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Central Locking (for inward-opening gates only)
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <label
          v-for="option in centralLockingOptions"
          :key="option.value"
          class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden text-center p-6"
          :class="form.config_options.central_locking === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.central_locking"
            class="hidden"
          />
          <p class="text-lg font-semibold text-gray-800 mb-2">{{ option.label }}</p>
          <p class="text-sm text-gray-600">{{ option.description }}</p>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    form: Object
  });
  
  const centralLockingOptions = [
    {
      value: 'with',
      label: 'With Central Locking',
      description: 'To be operated from the inside – improves water sealing and safety'
    },
    {
      value: 'without',
      label: 'Without Central Locking',
      description: 'Standard configuration – no internal locking mechanism'
    }
  ];
  </script>
  