<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Door Size & Installation Method
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT: Door Size -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Door Size
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          Please note the maximum size of the wall opening for the sectional door.
          The minimum reveal size inside is <strong>90 mm</strong>, otherwise additional tubes are required.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <!-- Fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                Width of the wall opening
              </label>
              <input
                v-model="enteredWidth"
                type="number"
                min="2000"
                max="6000"
                step="1"
                placeholder="Enter width (mm)"
                class="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                Height of the wall opening
              </label>
              <input
                v-model="enteredHeight"
                type="number"
                min="2000"
                max="3000"
                step="1"
                placeholder="Enter height (mm)"
                class="w-full border rounded-lg p-2"
              />
            </div>

            <div
              v-if="(enteredWidth || enteredHeight) && !isSizeValid"
              class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
            >
              Please enter a valid width between 2000 and 6000 mm and a valid height between 2000 and 3000 mm.
            </div>
          </div>

          <!-- Image -->
          <div class="flex justify-center">
            <img
              :src="img1"
              alt="Door size illustration"
              class="max-h-64 object-contain"
            />
          </div>
        </div>
      </section>

      <!-- RIGHT: Installation Method -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Installation Method
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          Installation method: behind or between the reveal.
          Our authorized technicians will clarify the installation method on site
          if you are uncertain about the appropriate option to go with.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <!-- Behind the reveal -->
          <div class="text-center space-y-3">
            <img
              :src="img3"
              alt="Behind the reveal"
              class="mx-auto max-h-48 object-contain"
            />

            <label class="flex items-start justify-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="behind"
                v-model="form.config_options.installationMethod"
                class="accent-brand-orange mt-1"
              />
              <span class="text-sm text-gray-800 text-left">
                Installation on the interior wall<br />
                <strong>Behind the reveal</strong>
              </span>
            </label>
          </div>

          <!-- Between the reveal -->
          <div class="text-center space-y-3">
            <img
              :src="img2"
              alt="Between the reveal"
              class="mx-auto max-h-48 object-contain"
            />

            <label class="flex items-start justify-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="between"
                v-model="form.config_options.installationMethod"
                class="accent-brand-orange mt-1"
              />
              <span class="text-sm text-gray-800 text-left">
                Installation on the reveal<br />
                <strong>Between the reveal</strong><br />
                <span class="text-xs text-gray-500">(tubes may be required)</span>
              </span>
            </label>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import img1 from "@/Assets/6-Sectional/Step-1/sectional-1.jpg";
import img2 from "@/Assets/6-Sectional/Step-1/sectional-1b.jpg";
import img3 from "@/Assets/6-Sectional/Step-1/sectional-1c.jpg";

const props = defineProps({
  form: Object
});

const minWidth = 2000;
const maxWidth = 6000;
const minHeight = 2000;
const maxHeight = 3000;
const stepSize = 125;

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