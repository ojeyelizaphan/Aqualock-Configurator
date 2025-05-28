<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Colour, Opening Direction & Cladding
      </h2>
  
      <!-- Colour Selection -->
      <div>
        <ColorSelector
          title="Choose a Colour"
          :options="colorOptions"
          v-model="form.config_options['color']"
        />
      </div>
  
      <!-- Opening Direction -->
      <div class="mb-8">
        <OptionRadioGroup
          label="Opening Direction"
          v-model="form.config_options['opening_direction']"
          :options="[
            { value: 'left_inward', label: 'Left-hand inward opening' },
            { value: 'right_inward', label: 'Right-hand inward opening' },
            { value: 'top', label: 'Top opening' }
          ]"
        />
      </div>
  
      <!-- Closing Mechanism -->
      <div class="mb-8">
        <OptionRadioGroup
          label="Closing Mechanism"
          v-model="form.config_options['closing_mechanism']"
          :options="[
            { value: 'lockable', label: 'Lockable flap (prepared for padlock)' },
            { value: 'non_lockable', label: 'Non-lockable flap' }
          ]"
        />
      </div>
  
      <!-- Internal Cladding -->
      <div>
        <OptionRadioGroup
          label="Internal Cladding"
          v-model="form.config_options['internal_cladding']"
          :options="[
            { value: 'with_aluminium', label: 'With 2mm aluminum sheet' },
            { value: 'without_aluminium', label: 'Without aluminum sheet' }
          ]"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import ColorSelector from '@/Components/ColorSector.vue';
  import OptionRadioGroup from '@/Components/OptionRadioGroup.vue';
 
  defineProps({
    form: Object,
    colorOptions: Array
  });
  </script>
  