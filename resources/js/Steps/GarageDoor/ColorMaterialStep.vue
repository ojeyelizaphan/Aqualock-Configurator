<template>
  <div class="max-w-5xl mx-auto space-y-10">

    <div class="flex flex-col md:flex-row gap-10">

      <!-- Color Selection -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">Choose Color</h2>
        <p class="text-sm text-gray-600 text-center leading-relaxed">
          216 colors to choose from. You have a choice of 216 RAL colors to give your AquaLOCK® garage door the perfect look for your building.
          This includes seven standard colors (white and 6 shades of grey), which are available at no extra charges.
          Please note: The display of colors on the website may differ from the actual color due to the monitor display. Specifications are therefore without guarantee.
        </p>

        <!-- Compact scroll container -->
        <ColorSelector
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <div
          v-if="form.config_options.color && standardColorCodes.includes(form.config_options.color)"
          class="mt-2 text-sm text-green-600 text-center"
        >
          This is a standard colour and carries no extra charge.
        </div>

        <div
          v-else-if="form.config_options.color && colorExtraCost > 0"
          class="mt-2 text-sm text-red-500 text-center"
        >
          Selected colour is a non-standard RAL colour and incurs an extra charge of €{{ colorExtraCost }}.
        </div>
      </div>

      <!-- Material Information -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">Material</h2>

        <!-- Text content -->
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Galvanized Steel
          </h3>

          <p class="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            Galvanized steel is the only available material option for the
            AquaLOCK® garage door at the moment. As a rule, galvanizing is completely
            sufficient for rust protection, especially as each door is also primed
            and painted. We give a 5-year guarantee against rusting through.
          </p>

        </div>


        <!-- Image wrapper -->
        
          <img
            :src="imgGalvanized"
            alt="Galvanized Steel"
            class="w-full h-56 object-contain rounded-xl"
          />
        

      </div>

    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { colorOptions, standardColorCodes } from '@/Data/colorOptions'
import ColorSelector from '@/Components/ColorSector.vue'
import imgGalvanized from "@/Assets/2-Up-and-over door - Steps/Step-3/galvanized steel.jpeg";

const { form, colorExtraCost } = defineProps({
  form: Object,
  colorExtraCost: Number
});

const ensureMaterialDefaults = () => {
  form.config_options.material = 'galvanized_steel';

  if (form.config_options.protection_height === 'up-to-500mm') {
    form.config_options.version = 'V500';
  } else if (form.config_options.protection_height === 'over-500mm') {
    form.config_options.version = 'V';
  }
};


</script>