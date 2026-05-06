<script setup>
import { useI18n } from 'vue-i18n'
import plateImg from "@/Assets/5-Quickwall/Step-4/base-plate.jpg";

import { colorOptions } from '@/Data/colorOptions';
import ColorSelector from '@/Components/ColorSector.vue';

const { t } = useI18n()

const props = defineProps({
  form: Object
});

const { form } = props;

// Ensure defaults
if (!form.config_options.accessory_quantities) {
  form.config_options.accessory_quantities = {};
}

if (form.config_options.accessory_quantities.quickwall_hooks == null) {
  form.config_options.accessory_quantities.quickwall_hooks = 0;
}

if (!form.config_options.corner_profiles_coloring) {
  form.config_options.corner_profiles_coloring = 'without';
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-12">
    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('quickwall.stepAccessories.title') }}
    </h2>

    <!-- INCLUDED -->
    <div class="rounded-2xl border border-green-200 bg-green-50 p-6">
      <h3 class="text-lg font-semibold text-green-900 mb-2">
        {{ t('quickwall.stepAccessories.included.title') }}
      </h3>
      <p class="text-sm text-green-800 leading-relaxed">
        {{ t('quickwall.stepAccessories.included.description') }}
      </p>
    </div>

    <!-- BOTTOM PLATE -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('quickwall.stepAccessories.bottomPlate.title') }}
        </h3>

        <p class="text-gray-700 leading-relaxed">
          {{ t('quickwall.stepAccessories.bottomPlate.description') }}
        </p>
      </div>

      <div>
        <img :src="plateImg" class="mx-auto max-h-48 object-contain" />
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- CORNER PROFILES -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">
        {{ t('quickwall.stepAccessories.cornerProfiles.title') }}
      </h3>

      <p class="text-gray-700 leading-relaxed">
        {{ t('quickwall.stepAccessories.cornerProfiles.description') }}
      </p>

      <!-- RADIO -->
      <div class="space-y-3">
        <label class="flex items-center gap-3">
          <input
            type="radio"
            value="without"
            v-model="form.config_options.corner_profiles_coloring"
            class="accent-brand-orange"
          />
          <span class="text-gray-700">
            {{ t('quickwall.stepAccessories.cornerProfiles.without') }}
          </span>
        </label>

        <label class="flex items-center gap-3">
          <input
            type="radio"
            value="with"
            v-model="form.config_options.corner_profiles_coloring"
            class="accent-brand-orange"
          />
          <span class="text-gray-700">
            {{ t('quickwall.stepAccessories.cornerProfiles.with') }}
          </span>
        </label>
      </div>

      <!-- ✅ COLOR SELECTOR -->
      <div v-if="form.config_options.corner_profiles_coloring === 'with'" class="pt-4">
        <ColorSelector
          :options="colorOptions"
          v-model="form.config_options.color"
        />
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- ACCESSORIES -->
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-800">
        {{ t('quickwall.stepAccessories.accessories.title') }}
      </h3>

      <div class="flex items-center justify-between gap-6">
        <div>
          <p class="font-medium text-gray-800">
            {{ t('quickwall.stepAccessories.accessories.hooks.title') }}
          </p>
          <p class="text-sm text-gray-600">
            {{ t('quickwall.stepAccessories.accessories.hooks.description') }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <span class="font-semibold text-gray-800">
            {{ t('quickwall.stepAccessories.accessories.hooks.price') }}
          </span>
          <input
            type="number"
            min="0"
            class="w-24 p-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange"
            v-model.number="form.config_options.accessory_quantities.quickwall_hooks"
          />
        </div>
      </div>
    </div>

  </div>
</template>