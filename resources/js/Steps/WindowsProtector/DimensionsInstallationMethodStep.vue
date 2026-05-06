<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- INCLUDED -->
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-4xl mx-auto">
      <h3 class="text-lg font-semibold text-amber-900 mb-2">
        {{ t('windowsProtector.step1.included.title') }}
      </h3>

      <p class="text-sm text-amber-800 mb-4">
        {{ t('windowsProtector.step1.included.description') }}
      </p>

      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-medium text-gray-900">
            {{ t('windowsProtector.step1.included.name') }}
          </p>
          <p class="text-sm text-gray-600">
            {{ t('windowsProtector.step1.included.note') }}
          </p>
        </div>

        <p class="font-semibold text-gray-900 whitespace-nowrap">
          {{ t('windowsProtector.step1.included.price') }}
        </p>
      </div>
    </div>

    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('windowsProtector.step1.title') }}
    </h2>

    <!-- GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- LEFT: DIMENSIONS -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('windowsProtector.step1.dimensions.title') }}
        </h3>

        <div class="space-y-2 text-sm text-gray-600 leading-relaxed">
          <p>
            {{ t('windowsProtector.step1.dimensions.description1') }}
          </p>

          <p>
            <strong>{{ t('windowsProtector.step1.dimensions.width') }}</strong><br />
            {{ t('windowsProtector.step1.dimensions.widthRange') }}
          </p>

          <p>
            <strong>{{ t('windowsProtector.step1.dimensions.height') }}</strong><br />
            {{ t('windowsProtector.step1.dimensions.heightRange') }}
          </p>
        </div>

        <!-- IMAGE -->
        <div class="flex justify-center pt-2">
          <img :src="img1" class="max-h-48 object-contain" />
        </div>

        <!-- INPUTS -->
        <div class="grid grid-cols-2 gap-6 pt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('windowsProtector.step1.dimensions.inputWidth') }}
            </label>
            <input
              type="number"
              min="400"
              max="1800"
              v-model="enteredWidth"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('windowsProtector.step1.dimensions.inputHeight') }}
            </label>
            <input
              type="number"
              min="400"
              max="1800"
              v-model="enteredHeight"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>
        </div>

        <!-- ERRORS -->
        <div
          v-if="(enteredWidth || enteredHeight) && !isInRange"
          class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
        >
          {{ t('windowsProtector.step1.dimensions.invalidRange') }}
        </div>

        <div
          v-else-if="isInRange && !isManufacturable"
          class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
        >
          {{ t('windowsProtector.step1.dimensions.notManufacturable') }}
        </div>
      </div>

      <!-- RIGHT: INSTALLATION -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('windowsProtector.step1.installation.title') }}
        </h3>

        <p class="text-sm text-gray-600 leading-relaxed">
          {{ t('windowsProtector.step1.installation.description') }}
        </p>

        <!-- IMAGE -->
        <div class="flex justify-center pt-2">
          <img :src="img2" class="max-h-40 object-contain" />
        </div>

        <!-- RADIO -->
        <div class="space-y-3 pt-4">
          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="on_window_frame"
              v-model="form.config_options.installation_method"
              class="text-[#f39200]"
            />
            {{ t('windowsProtector.step1.installation.frame') }}
          </label>

          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="on_opening_wall"
              v-model="form.config_options.installation_method"
              class="text-[#f39200]"
            />
            {{ t('windowsProtector.step1.installation.wall') }}
          </label>
        </div>

        <!-- OPTIONAL UX: SHOW PRODUCT SIZE -->
        <div v-if="productWidth && productHeight" class="text-sm text-gray-500 pt-2">
          {{ productWidth }} × {{ productHeight }} mm
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import img1 from '@/Assets/8-Windows Protector/Step-1/windows-1a.jpg';
import img2 from '@/Assets/8-Windows Protector/Step-1/windows-1b.jpg';
import {
  windowPricesWithHatch,
  windowPricesWithoutHatch
} from '@/Data/windowsProtectorPrices';

const { t } = useI18n();

const props = defineProps({
  form: Object
});

// -------------------
// CONSTANTS
// -------------------
const min = 400;
const max = 1800;
const stepSize = 100;

// -------------------
// INPUT (OPENING SIZE)
// -------------------
const enteredWidth = ref(
  props.form.config_options.entered_width ||
  props.form.config_options.width ||
  ''
);

const enteredHeight = ref(
  props.form.config_options.entered_height ||
  props.form.config_options.height ||
  ''
);

// -------------------
// GRID MAPPING
// -------------------
const mappedWidth = computed(() => {
  const val = Number(enteredWidth.value);
  if (!val || val < min || val > max) return null;
  return Math.floor((val - min) / stepSize) * stepSize + min;
});

const mappedHeight = computed(() => {
  const val = Number(enteredHeight.value);
  if (!val || val < min || val > max) return null;
  return Math.floor((val - min) / stepSize) * stepSize + min;
});

// -------------------
// INSTALLATION
// -------------------
const installationMethod = computed(() =>
  props.form.config_options.installation_method || 'on_window_frame'
);

// -------------------
// PRODUCT SIZE
// -------------------
const productWidth = computed(() => {
  if (!mappedWidth.value) return null;
  return installationMethod.value === 'on_opening_wall'
    ? mappedWidth.value + 100
    : mappedWidth.value;
});

const productHeight = computed(() => {
  if (!mappedHeight.value) return null;
  return installationMethod.value === 'on_opening_wall'
    ? mappedHeight.value + 100
    : mappedHeight.value;
});

// -------------------
// VALIDATION
// -------------------
const isInRange = computed(() =>
  !!mappedWidth.value && !!mappedHeight.value
);

const isManufacturable = computed(() => {
  const w = productWidth.value;
  const h = productHeight.value;

  if (!w || !h) return false;

  return (
    windowPricesWithHatch?.[h]?.[w] != null ||
    windowPricesWithoutHatch?.[h]?.[w] != null
  );
});

// -------------------
// SYNC FORM
// -------------------
watch(enteredWidth, (val) => {
  props.form.config_options.entered_width = val ? Number(val) : null;
});

watch(enteredHeight, (val) => {
  props.form.config_options.entered_height = val ? Number(val) : null;
});

watch(
  [productWidth, productHeight, installationMethod],
  () => {
    if (!productWidth.value || !productHeight.value) {
      props.form.config_options.width = null;
      props.form.config_options.height = null;
      return;
    }

    if (isManufacturable.value) {
      props.form.config_options.width = productWidth.value;
      props.form.config_options.height = productHeight.value;
    } else {
      props.form.config_options.width = null;
      props.form.config_options.height = null;
    }
  },
  { immediate: true }
);
</script>