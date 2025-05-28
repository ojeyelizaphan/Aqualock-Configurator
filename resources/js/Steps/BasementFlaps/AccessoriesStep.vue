<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Accessories
      </h2>
  
      <!-- Optional: Preparation for padlock -->
      <div class="mb-8">
        <OptionRadioGroup
          label="Preparation for Padlock Locking"
          v-model="form.config_options['padlock_preparation']"
          :options="[
            { value: 'with_padlock_preparation', label: 'With padlock preparation (without padlock)' },
            { value: 'without_padlock_preparation', label: 'Without padlock preparation' }
          ]"
        />
      </div>
  
      <!-- Optional: Internal Panelling -->
      <div class="mb-8">
        <OptionRadioGroup
          label="Internal Aluminium Panelling (2 mm)"
          v-model="form.config_options['internal_panelling']"
          :options="[
            { value: 'with_panelling', label: 'With aluminium panelling (2 mm)' },
            { value: 'without_panelling', label: 'Without aluminium panelling' }
          ]"
        />
      </div>
  
      <!-- Assembly Kit (Always Included) -->
      <div class="p-4 bg-gray-50 border rounded-md text-gray-700">
        <strong>Note:</strong> Assembly kit with sealing is always included (116 €).
      </div>
    </div>
  </template>
  
  <script setup>
  import OptionRadioGroup from '@/Components/OptionRadioGroup.vue';
  defineProps({
    form: Object
  });
  </script>
  