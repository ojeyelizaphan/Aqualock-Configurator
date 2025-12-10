<template>
  <div class="max-w-5xl mx-auto space-y-10">

    <!-- Color & Material Side by Side -->
    <div class="flex flex-col md:flex-row gap-10">

      <!-- Color Selection -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">Choose Color</h2>
        <p class="text-sm text-gray-600 text-center leading-relaxed">
          213 colors to choose from. You have a choice of 213 RAL colors to give your AquaLOCK® garage door the perfect look for your building.  
          This includes seven standard colors (white and 6 shades of grey), which are available at no extra charges.
          Please note: The display of colors on the website may differ from the actual color due to the monitor display. Specifications are therefore without guarantee.
        </p>

        <!-- Horizontally scrollable palette -->
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
                'w-12 h-12 rounded-full transition-all duration-300 hover:ring-2 hover:ring-brand-orange',
                form.config_options['color'] === option.value ? 'ring-2 ring-brand-orange' : ''
              ]"
              :style="{ backgroundColor: option.color }"
            ></div>
            <p class="text-xs mt-1 text-gray-700 text-center">{{ option.label }}</p>
          </label>
        </div>

        <div v-if="colorExtraCost > 0" class="mt-2 text-sm text-red-500 text-center">
          Extra charge for custom color: €{{ colorExtraCost }}
        </div>
      </div>

      <!-- Material Selection -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">Choose Material</h2>
        <p class="text-sm text-gray-600 text-center leading-relaxed">
          Material: Galvanized steel or stainless steel. As a rule, galvanizing is completely sufficient for rust protection,
          especially as each door is also primed and painted. We give a 5-year guarantee against rusting through.
          However, if your garage door comes into contact with salt water or your house is located near the sea, we recommend stainless steel.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-8 mt-4">
          <label
            v-for="option in materialOptions"
            :key="option.value"
            class="flex flex-col items-center cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['material']"
              class="hidden"
            />
            <div
              :class="[
                'w-40 h-40 rounded-lg overflow-hidden border-2 transition-shadow duration-300 hover:shadow-lg',
                form.config_options['material'] === option.value
                  ? 'border-brand-orange ring-2 ring-brand-orange'
                  : 'border-gray-300'
              ]"
            >
              <img :src="option.image" alt="Material option" class="w-full h-full object-cover" />
            </div>
            <p class="mt-2 font-semibold text-gray-800 text-center">{{ option.label }}</p>
            <p class="text-xs text-gray-500 text-center">{{ option.description }}</p>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { watch } from 'vue';
import { colorOptions } from '@/Data/colorOptions';
import { materialOptions } from '@/Data/materialOptions';

const { form, colorExtraCost } = defineProps({
  form: Object,
  colorExtraCost: Number
});

// AUTO-DETERMINE VERSION BASED ON MATERIAL (only if height > 500mm)
watch(
  () => form.config_options['material'],
  (newMaterial) => {
    if (!newMaterial) return;

    // If protection height is up to 500mm, version is already v500 and cannot change
    if (form.config_options['protection_height'] === "up-to-500mm") {
      return;
    }

    // Otherwise assign V or E based on material
    if (newMaterial === 'galvanized_steel') {
      form.config_options.version = 'V';
    }

    if (newMaterial === 'stainless_steel') {
      form.config_options.version = 'E';
    }
  }
);
</script>
