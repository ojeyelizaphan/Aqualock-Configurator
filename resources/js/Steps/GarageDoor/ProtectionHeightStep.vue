<template>
  <div class="max-w-4xl mx-auto space-y-10">


    <!-- Title -->
    <h2 class="text-3xl font-semibold text-center text-gray-900">
      {{ $t('upAndOver.protection.title') }}
    </h2>

    <!-- Intro -->
    <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 leading-relaxed text-gray-700 shadow-sm">
      <p class="mb-4">
        {{ $t('upAndOver.protection.intro.p1') }}
      </p>

      <p class="mb-4">
        {{ $t('upAndOver.protection.intro.p2') }}
      </p>
    </div>

    <!-- Options -->
    <div class="grid sm:grid-cols-2 gap-8">
      <label
        v-for="option in translatedOptions"
        :key="option.value"
        class="cursor-pointer bg-white rounded-2xl border transition-all overflow-hidden shadow-sm hover:shadow-md"
        :class="form.config_options['protection_height'] === option.value
          ? 'border-brand-orange ring-2 ring-brand-orange'
          : 'border-gray-200'"
      >
        <input
          type="radio"
          :value="option.value"
          v-model="form.config_options['protection_height']"
          class="hidden"
        />

        <img
          :src="option.image"
          :alt="option.label"
          class="w-full h-48 object-contain bg-gray-50 p-4"
        />

        <div class="p-5 space-y-2">
          <p class="text-lg font-semibold text-gray-900">
            {{ option.label }}
          </p>

          <p class="text-sm text-gray-600 leading-relaxed">
            {{ option.description }}
          </p>

          <template v-if="option.value === 'up-to-500mm'">
            <p class="text-xs text-gray-500 mt-2">
              {{ $t('upAndOver.protection.note500') }}
            </p>
          </template>
        </div>
      </label>
    </div>

  </div>
</template>
  
<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { protectionHeightOptions } from '@/Data/protectionHeightOptions';

const { t } = useI18n();

const { form } = defineProps({
  form: Object
});

const translatedOptions = computed(() =>
  protectionHeightOptions.map(option => ({
    ...option,
    label: t(option.labelKey),
    description: t(option.descriptionKey)
  }))
);

watch(
  () => form.config_options['protection_height'],
  (newValue) => {
    if (!newValue) return;

    if (newValue === "up-to-500mm") {
      form.config_options.version = "V500";
      form.config_options.material = "galvanized_steel";
    } else if (newValue === "over-500mm") {
      form.config_options.version = "V";
      form.config_options.material = "galvanized_steel";
    }
  },
  { immediate: true }
);
</script>

  