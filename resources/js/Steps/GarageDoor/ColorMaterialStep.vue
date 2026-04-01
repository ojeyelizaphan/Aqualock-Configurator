<template>
  <div class="max-w-5xl mx-auto space-y-10">

    <div class="flex flex-col md:flex-row gap-10">

      <!-- Color Selection -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">Choose Color</h2>
        <p class="text-sm text-gray-600 text-center leading-relaxed">
          213 colors to choose from. You have a choice of 213 RAL colors to give your AquaLOCK® garage door the perfect look for your building.
          This includes seven standard colors (white and 6 shades of grey), which are available at no extra charges.
          Please note: The display of colors on the website may differ from the actual color due to the monitor display. Specifications are therefore without guarantee.
        </p>

        <div class="flex overflow-x-auto gap-4 py-2 px-1">
          <label
            v-for="option in colorOptions"
            :key="option.value"
            class="flex flex-col items-center cursor-pointer flex-shrink-0"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['color']"
              class="hidden"
            />
            <div
              :class="[
                'w-12 h-12 rounded-full border-2 transition-all duration-300 hover:ring-2 hover:ring-brand-orange',
                form.config_options['color'] === option.value
                  ? 'ring-2 ring-brand-orange border-brand-orange'
                  : 'border-gray-400'
              ]"
              :style="{ backgroundColor: option.color }"
            ></div>
            <p class="text-xs mt-1 text-gray-700 text-center">{{ option.label }}</p>
          </label>
        </div>

        <div v-if="form.config_options['color'] === 'custom'" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Enter preferred RAL color
          </label>
          <input
            type="text"
            v-model="form.config_options['custom_ral_color']"
            placeholder="e.g. RAL 1001 Beige"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
          />
          <p class="text-xs text-gray-500 mt-1">
            Example: RAL 1001 Beige
          </p>
        </div>

        <div v-if="colorExtraCost > 0" class="mt-2 text-sm text-red-500 text-center">
          Extra charge for custom color: €{{ colorExtraCost }}
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
import { colorOptions } from '@/Data/colorOptions';
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

onMounted(() => {
  ensureMaterialDefaults();
});

watch(
  () => form.config_options['color'],
  (newColor) => {
    if (newColor !== 'custom') {
      form.config_options.custom_ral_color = '';
    }
  }
);

watch(
  () => form.config_options['protection_height'],
  () => {
    ensureMaterialDefaults();
  }
);
</script>