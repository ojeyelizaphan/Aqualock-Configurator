<template>
  <div class="space-y-8 max-w-6xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">
      {{ t('door.locking.title') }}
    </h2>

    <!-- Intro -->
    <div class="text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
      <p v-html="t('door.locking.description')"></p>
    </div>

    <!-- Options -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <!-- LEFT -->
      <div class="space-y-6">
        <label
          v-for="option in leftOptions"
          :key="option.value"
          class="flex items-start gap-4 cursor-pointer p-3 rounded-md hover:bg-gray-50 transition"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.locking_mechanism"
            class="mt-1"
          />
          <img :src="option.image" :alt="option.label" class="w-20 h-20 object-contain rounded-md border" />
          <div class="flex-1">
            <p class="font-semibold text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600 mt-1">
              {{ t(`door.locking.options.${option.value}`) }}
            </p>
          </div>
        </label>
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <label
          v-for="option in rightOptions"
          :key="option.value"
          class="flex items-start gap-4 cursor-pointer p-3 rounded-md hover:bg-gray-50 transition"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.locking_mechanism"
            class="mt-1"
          />
          <img :src="option.image" :alt="option.label" class="w-20 h-20 object-contain rounded-md border" />
          <div class="flex-1">
            <p class="font-semibold text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600 mt-1">
              {{ t(`door.locking.options.${option.value}`) }}
            </p>
          </div>
        </label>
      </div>
    </div>

    <!-- Additional Info -->
    <div
      v-if="form.config_options.locking_mechanism"
      class="mt-4 text-sm text-gray-600 max-w-4xl mx-auto space-y-1"
    >
      <template v-if="form.config_options.locking_mechanism === 'V1'">
        <p v-html="t('door.locking.details.V1')"></p>
      </template>

      <template v-if="form.config_options.locking_mechanism === 'V2'">
        <p v-html="t('door.locking.details.V2')"></p>
      </template>

      <template v-if="form.config_options.locking_mechanism === 'V3'">
        <p v-html="t('door.locking.details.V3')"></p>
      </template>

      <template v-if="form.config_options.locking_mechanism === 'V6'">
        <p v-html="t('door.locking.details.V6')"></p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import imgV1 from "@/Assets/3-AquaLOCK Door/Step-3/V1.jpg";
import imgV2 from "@/Assets/3-AquaLOCK Door/Step-3/V2.jpg";
import imgV3 from "@/Assets/3-AquaLOCK Door/Step-3/V3.jpg";
import imgV6 from "@/Assets/3-AquaLOCK Door/Step-3/V6.jpg";

const { t } = useI18n();

const props = defineProps({
  form: Object
});

const lockingMechanismOptions = [
  { value: 'V1', label: 'V1', image: imgV1 },
  { value: 'V2', label: 'V2', image: imgV2 },
  { value: 'V3', label: 'V3', image: imgV3 },
  { value: 'V6', label: 'V6', image: imgV6 }
];

const leftOptions = lockingMechanismOptions.slice(0, 2);
const rightOptions = lockingMechanismOptions.slice(2);
</script>

<style scoped>
input[type="radio"] {
  accent-color: rgb(243,146,0);
}
</style>