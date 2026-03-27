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
          €131 / piece
        </p>
      </div>
    </div>

    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Measurement & Material
    </h2>

    <!-- Split layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Measurement -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Dimensions of the flap
        </h3>

        <!-- Description -->
        <div class="space-y-2 text-sm text-gray-600 leading-relaxed">
          <p>
            Please note the maximum size of the wall opening for the
            <strong>AquaLOCK® flap</strong> is
            <strong>1100 × 1100 mm</strong>.
          </p>

          <p>
            <strong>Width of the wall opening:</strong><br />
            Between 600 and 1,100 mm
          </p>

          <p>
            <strong>Height of the wall opening:</strong><br />
            Between 600 and 1,100 mm
          </p>
        </div>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src="img1"
            alt="Flap dimensions illustration"
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
              min="600"
              max="1100"
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
              min="600"
              max="1100"
              step="1"
              v-model="enteredHeight"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>
        </div>

        <div
          v-if="(enteredWidth || enteredHeight) && !isSizeValid"
          class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
        >
          Please enter a valid width and height between 600 mm and 1100 mm.
        </div>
      </div>

      <!-- RIGHT: Material -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Material
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 leading-relaxed">
          In most cases, galvanization provides sufficient corrosion
          protection, especially as each flap is additionally primed and painted.
          <br /><br />
          However, if the flap is exposed to saltwater, we recommend
          <strong>stainless steel</strong> for enhanced durability and rust resistance.
        </p>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src="img2"
            alt="Material options illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <!-- Native radio buttons -->
        <div class="space-y-3 pt-4">
          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="galvanized"
              v-model="form.config_options.material"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            Galvanized steel
          </label>

          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="stainless"
              v-model="form.config_options.material"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            Stainless steel
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import img1 from "@/Assets/7-Flap/Step-1/flap-1a.jpg";
import img2 from "@/Assets/7-Flap/Step-1/flap-1b.jpg";

const props = defineProps({
  form: Object
});

const minSize = 600;
const maxSize = 1100;
const stepSize = 100;

const enteredWidth = ref(
  props.form.config_options.entered_width ||
  props.form.config_options.width ||
  ""
);

const enteredHeight = ref(
  props.form.config_options.entered_height ||
  props.form.config_options.height ||
  ""
);

const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minSize || width > maxSize) {
    return null;
  }

  return Math.floor((width - minSize) / stepSize) * stepSize + minSize;
});

const mappedHeight = computed(() => {
  const height = Number(enteredHeight.value);

  if (!height || height < minSize || height > maxSize) {
    return null;
  }

  return Math.floor((height - minSize) / stepSize) * stepSize + minSize;
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