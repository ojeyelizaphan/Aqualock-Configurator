<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row gap-10">

      <!-- Garage Door Size -->
      <div class="md:w-1/2 space-y-6">
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm text-gray-700 leading-relaxed">
          <h2 class="text-2xl font-semibold mb-3 text-gray-900 text-center">
            {{ $t('upAndOver.dimensions.title') }}
          </h2>

          <p class="text-sm">
            {{ $t('upAndOver.dimensions.widthInfo') }}
          </p>

          <p class="text-sm">
            {{ $t('upAndOver.dimensions.heightInfo') }}
          </p>
        </div>

        <!-- Width & Height Input -->
        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('upAndOver.dimensions.widthLabel') }}
            </label>

            <input
              v-model="enteredWidth"
              type="number"
              min="2200"
              :max="maxAllowedWidth"
              step="1"
              :placeholder="$t('upAndOver.dimensions.widthPlaceholder')"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <p class="text-xs text-gray-500 mt-1">
              {{ $t('upAndOver.dimensions.widthRange', { max: maxAllowedWidth }) }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('upAndOver.dimensions.heightLabel') }}
            </label>

            <input
              v-model="enteredHeight"
              type="number"
              min="1920"
              max="2520"
              step="1"
              :placeholder="$t('upAndOver.dimensions.heightPlaceholder')"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <p class="text-xs text-gray-500 mt-1">
              {{ $t('upAndOver.dimensions.heightRange') }}
            </p>
          </div>

          <div
            v-if="(enteredWidth || enteredHeight) && !isSizeValid"
            class="sm:col-span-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
          >
            {{ $t('upAndOver.dimensions.invalid') }}
          </div>
        </div>
      </div>

      <!-- Installation Type -->
      <div class="md:w-1/2 space-y-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 text-center">
          {{ $t('upAndOver.installation.title') }}
        </h2>

        <p class="text-sm text-gray-600 mb-6 text-center">
          {{ $t('upAndOver.installation.description') }}
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-10">
          <label
            v-for="option in translatedInstallationTypeOptions"
            :key="option.value"
            class="flex flex-col items-center cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['installation_type']"
              class="hidden"
            />

            <div
              :class="[
                'w-40 h-40 rounded-full overflow-hidden border-2 transition-all',
                form.config_options['installation_type'] === option.value
                  ? 'border-brand-orange ring-2 ring-brand-orange'
                  : 'border-gray-300'
              ]"
            >
              <img
                :src="option.image"
                :alt="option.label"
                class="w-full h-full object-cover"
              />
            </div>

            <p class="mt-2 font-semibold text-gray-800 text-center">
              {{ option.label }}
            </p>

            <p class="text-xs text-gray-500 text-center">
              {{ option.description }}
            </p>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { installationTypeOptions } from '@/Data/installationTypeOptions';

const props = defineProps({
  form: Object,
});

const { t } = useI18n();

const enteredWidth = ref(
  props.form.config_options.entered_width || props.form.config_options.width || ''
);

const enteredHeight = ref(
  props.form.config_options.entered_height || props.form.config_options.height || ''
);

const translatedInstallationTypeOptions = computed(() =>
  installationTypeOptions.map((option) => ({
    ...option,
    label: t(option.labelKey),
    description: t(option.descriptionKey),
  }))
);

const maxAllowedWidth = computed(() => {
  return 5200;
});

const minAllowedWidth = 2200;
const minAllowedHeight = 1920;
const maxAllowedHeight = 2520;

const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minAllowedWidth || width > maxAllowedWidth.value) {
    return null;
  }

  return Math.floor(width / 100) * 100;
});

const heightBreakpoints = [2120, 2220, 2320, 2420, 2520];

const mappedHeight = computed(() => {
  const height = Number(enteredHeight.value);

  if (!height || height < minAllowedHeight || height > maxAllowedHeight) {
    return null;
  }

  let result = heightBreakpoints[0];

  for (const breakpoint of heightBreakpoints) {
    if (height >= breakpoint) {
      result = breakpoint;
    } else {
      break;
    }
  }

  return result;
});

const isSizeValid = computed(() => {
  return !!mappedWidth.value && !!mappedHeight.value;
});

watch(enteredWidth, (val) => {
  props.form.config_options.entered_width = val ? Number(val) : null;
  props.form.config_options.width = mappedWidth.value;
});

watch(enteredHeight, (val) => {
  props.form.config_options.entered_height = val ? Number(val) : null;
  props.form.config_options.height = mappedHeight.value;
});

watch(mappedWidth, (val) => {
  props.form.config_options.width = val;
});

watch(mappedHeight, (val) => {
  props.form.config_options.height = val;
});
</script>