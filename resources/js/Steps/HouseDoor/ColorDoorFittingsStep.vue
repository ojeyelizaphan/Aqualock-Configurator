<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- LEFT SIDE: Colour Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Plenty of Colours</h2>
        <p class="text-sm text-gray-600 mb-4">
          In order for your AquaLOCK® door to perfectly match your building, you have a choice of 213 RAL colours.
          Seven standard colours (white, black and several shades of grey) are available at no extra charge.
          <br>Please Note: The colour shades on the website may differ from the actual colour due to monitor display
          and therefore, we offer no guarantee for an exact match.
        </p>

        <!-- Horizontally scrollable circular palette -->
        <div class="flex overflow-x-auto gap-4 py-2 px-1">
          <label
            v-for="option in colorOptions"
            :key="option.value"
            class="flex flex-col items-center cursor-pointer flex-shrink-0"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options.color"
              class="hidden"
            />
            <div
              :class="[
                'w-12 h-12 rounded-full transition-all duration-300 hover:ring-2 hover:ring-brand-orange',
                form.config_options.color === option.value ? 'ring-2 ring-brand-orange' : ''
              ]"
              :style="{ backgroundColor: option.color }"
            ></div>
            <p class="text-xs mt-1 text-gray-700 text-center">{{ option.label }}</p>
          </label>
        </div>
      </div>

      <!-- RIGHT SIDE: Door Fittings Section (options + image side by side) -->
      <div class="flex gap-6">
        <!-- Door Fittings Options -->
        <div class="flex-1 space-y-3">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Door Fittings</h2>
          <p class="text-sm text-gray-600 mb-4">
            Do you have some special specifications for your door fittings? We have a couple of options for you to choose from:
          </p>

          <div class="space-y-3">
            <label
              v-for="option in fittingOptions"
              :key="option.value"
              class="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="form.config_options.fitting"
                class="mt-1"
              />
              <div class="flex-1">
                <p class="font-semibold text-gray-800">{{ option.label }}</p>
                <p class="text-sm text-gray-600">{{ option.description }}</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Door Fittings Image -->
        <div class="flex-shrink-0 flex justify-center items-start">
          <img
            :src="imgDoor"
            alt="Door Fittings"
            class="w-64 h-auto object-contain rounded-md border"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import ColorSelector from '@/Components/ColorSector.vue'
import imgStep4 from "@/Assets/3-AquaLOCK Door/Step-4/step-4.jpg";

defineProps({
  form: Object,
  colorOptions: Array
})

const imgDoor = imgStep4;

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
]
</script>
