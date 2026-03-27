<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- Included by default -->
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-4xl mx-auto">
      <h3 class="text-lg font-semibold text-amber-900 mb-2">
        Included by default
      </h3>
      <p class="text-sm text-amber-800 mb-4">
        Assembly kit with sealing is a standard option and is automatically added to the total price.
      </p>

      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-medium text-gray-900">Assembly kit with sealing</p>
          <p class="text-sm text-gray-600">
            Standard option — automatically included.
          </p>
        </div>
        <p class="font-semibold text-gray-900 whitespace-nowrap">
          €246 / piece
        </p>
      </div>
    </div>

    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Dimensions & Installation Method
    </h2>

    <!-- Split layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Dimensions -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Dimensions of the WindowsProtector
        </h3>

        <!-- Description -->
        <div class="space-y-2 text-sm text-gray-600 leading-relaxed">
          <p>
            Please note the maximum size of the wall opening for the
            <strong>WindowsProtector</strong> is
            <strong>1800 × 1800 mm</strong>.
          </p>

          <p>
            <strong>Width of the wall opening:</strong><br />
            Between 400 and 1,800 mm
          </p>

          <p>
            <strong>Height of the wall opening:</strong><br />
            Between 400 and 1,800 mm
          </p>
        </div>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src="img1"
            alt="WindowsProtector dimensions illustration"
            class="max-h-48 object-contain"
          />
        </div>

        <!-- Inputs -->
        <div class="grid grid-cols-2 gap-6 pt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Width (mm)
            </label>
            <input
              type="number"
              min="400"
              max="1800"
              step="1"
              v-model="enteredWidth"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Height (mm)
            </label>
            <input
              type="number"
              min="400"
              max="1800"
              step="1"
              v-model="enteredHeight"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>
        </div>

        <div
          v-if="(enteredWidth || enteredHeight) && !isInRange"
          class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
        >
          Please enter a valid width and height between 400 mm and 1800 mm.
        </div>

        <div
          v-else-if="isInRange && !isManufacturable"
          class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
        >
          This size is not available for manufacture for the selected configuration.
        </div>
      </div>

      <!-- RIGHT: Installation Method -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Installation method
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 leading-relaxed">
          The acrylic partition for easy retrofitting is the perfect
          solution for sealing basement and building windows.
          <br /><br />
          Installation can be carried out either on the window frame or
          directly onto the building wall. In both cases, the acrylic
          partition is adhered and sealed using a special acrylic adhesive.
        </p>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src="img2"
            alt="WindowsProtector installation illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <!-- Native radio buttons -->
        <div class="space-y-3 pt-4">
          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="on_window_frame"
              v-model="form.config_options.installation_method"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            On the window frame
          </label>

          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="on_opening_wall"
              v-model="form.config_options.installation_method"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            On the opening wall
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import img1 from '@/Assets/8-Windows Protector/Step-1/windows-1a.jpg';
import img2 from '@/Assets/8-Windows Protector/Step-1/windows-1b.jpg';
import {
  windowPricesWithHatch,
  windowPricesWithoutHatch
} from '@/Data/windowsProtectorPrices';

const props = defineProps({
  form: Object
});

const minWidth = 400;
const maxWidth = 1800;
const minHeight = 400;
const maxHeight = 1800;
const stepSize = 100;

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

const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minWidth || width > maxWidth) {
    return null;
  }

  return Math.floor((width - minWidth) / stepSize) * stepSize + minWidth;
});

const mappedHeight = computed(() => {
  const height = Number(enteredHeight.value);

  if (!height || height < minHeight || height > maxHeight) {
    return null;
  }

  return Math.floor((height - minHeight) / stepSize) * stepSize + minHeight;
});

const isInRange = computed(() => {
  return !!mappedWidth.value && !!mappedHeight.value;
});

// Adjust this to your actual hatch field name if different
const selectedPriceTable = computed(() => {
  if (props.form.config_options?.with_hatch === true) {
    return windowPricesWithHatch;
  }

  if (props.form.config_options?.with_hatch === false) {
    return windowPricesWithoutHatch;
  }

  // Before hatch selection is made, allow any size that exists in at least one table
  return null;
});

const isManufacturable = computed(() => {
  const width = mappedWidth.value;
  const height = mappedHeight.value;

  if (!width || !height) return false;

  if (selectedPriceTable.value) {
    return selectedPriceTable.value?.[height]?.[width] != null;
  }

  return (
    windowPricesWithHatch?.[height]?.[width] != null ||
    windowPricesWithoutHatch?.[height]?.[width] != null
  );
});

watch(enteredWidth, (val) => {
  props.form.config_options.entered_width = val ? Number(val) : null;
  props.form.config_options.width =
    isManufacturable.value || selectedPriceTable.value === null
      ? mappedWidth.value
      : null;
});

watch(enteredHeight, (val) => {
  props.form.config_options.entered_height = val ? Number(val) : null;
  props.form.config_options.height =
    isManufacturable.value || selectedPriceTable.value === null
      ? mappedHeight.value
      : null;
});

watch([mappedWidth, mappedHeight, selectedPriceTable], () => {
  if (!mappedWidth.value || !mappedHeight.value) {
    props.form.config_options.width = null;
    props.form.config_options.height = null;
    return;
  }

  if (isManufacturable.value || selectedPriceTable.value === null) {
    props.form.config_options.width = mappedWidth.value;
    props.form.config_options.height = mappedHeight.value;
  } else {
    props.form.config_options.width = null;
    props.form.config_options.height = null;
  }
});
</script>