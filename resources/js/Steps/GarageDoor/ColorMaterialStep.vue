<template>
  <div class="max-w-5xl mx-auto space-y-10">
    <div class="flex flex-col md:flex-row gap-10">

      <!-- Color Selection -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">
          {{ $t('upAndOver.color.title') }}
        </h2>

        <p class="text-sm text-gray-600 text-center leading-relaxed">
          {{ $t('upAndOver.color.description') }}
        </p>

        <ColorSelector
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <div
          v-if="form.config_options.color && standardColorCodes.includes(form.config_options.color)"
          class="mt-2 text-sm text-green-600 text-center"
        >
          {{ $t('upAndOver.color.standardNotice') }}
        </div>

        <div
          v-else-if="form.config_options.color && colorExtraCost > 0"
          class="mt-2 text-sm text-red-500 text-center"
        >
          {{ $t('upAndOver.color.customNotice', { amount: colorExtraCost }) }}
        </div>
      </div>

      <!-- Material Information -->
      <div class="md:w-1/2 space-y-4">
        <h2 class="text-2xl font-semibold mb-2 text-gray-900 text-center">
          {{ $t('upAndOver.material.title') }}
        </h2>

        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            {{ $t('upAndOver.material.name') }}
          </h3>

          <p class="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            {{ $t('upAndOver.material.description') }}
          </p>
        </div>

        <img
          :src="imgGalvanized"
          :alt="$t('upAndOver.material.name')"
          class="w-full h-56 object-contain rounded-xl"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { colorOptions, standardColorCodes } from '@/Data/colorOptions';
import ColorSelector from '@/Components/ColorSector.vue';
import imgGalvanized from "@/Assets/2-Up-and-over door - Steps/Step-3/galvanized steel.jpeg";

const { form, colorExtraCost } = defineProps({
  form: Object,
  colorExtraCost: Number
});
</script>