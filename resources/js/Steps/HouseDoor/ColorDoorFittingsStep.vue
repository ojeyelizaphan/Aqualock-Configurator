<template>
    <div class="space-y-10">
      <!-- Colour Selection -->
      <div>
        <ColorSelector
          title="Choose a Colour"
          :options="colorOptions"
          v-model="form.config_options['color']"
        />
      </div>
  
      <!-- Door Fitting Selection -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Choose a Door Fitting</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <label
            v-for="option in fittingOptions"
            :key="option.value"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['fitting']"
              class="hidden"
            />
            <div
              :class="[
                'rounded-xl overflow-hidden border transition-shadow hover:shadow-md p-5',
                form.config_options['fitting'] === option.value
                  ? 'border-brand-orange ring-2 ring-brand-orange'
                  : 'border-gray-200'
              ]"
            >
              <p class="text-lg font-semibold text-gray-800 mb-2">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
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
  
  const fittingOptions = [
    {
      value: 'steel_lever_both_sides',
      label: 'Stainless Steel Lever (Both Sides)',
      description: 'Stainless steel lever on both the inside and outside of the door.'
    },
    {
      value: 'aluminium_fixed_knob_outside',
      label: 'Aluminium Fixed Knob (Outside)',
      description: 'Aluminium fixed knob on the outside only.'
    },
    {
      value: 'steel_knob_outside_lever_inside',
      label: 'Steel Knob Outside / Lever Inside',
      description: 'Fixed stainless steel knob outside with lever handle inside.'
    },
    {
      value: 'standard_aluminium_lever',
      label: 'Standard Aluminium Lever',
      description: 'Aluminium lever handle – standard version.'
    }
  ];
  </script>
  