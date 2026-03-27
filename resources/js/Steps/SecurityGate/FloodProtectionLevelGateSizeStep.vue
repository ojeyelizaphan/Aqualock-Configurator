<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- Intro -->
    <div class="text-center space-y-3">
      <h2 class="text-2xl font-semibold text-gray-800">
        Selection of Water-Protection Level
      </h2>
      <p class="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
        The AquaLOCK® gate offers protection for your driveway with a maximum width
        of 5,000 mm and a water protection height of up to 1,200 mm, keeping out
        99.9% of the water.
      </p>
    </div>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Options / Inputs -->
      <section class="space-y-6">

        <!-- Upper Area Design -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">
            Options for designing the upper area
          </p>

          <label
            v-for="option in upperDesignOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.upper_design === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1"
              :value="option.value"
              v-model="form.config_options.upper_design"
            />
            <span class="text-sm text-gray-800">
              {{ option.label }}
            </span>
          </label>
        </div>

        <!-- Gate Size -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            Gate Size
          </h3>

          <!-- Width -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Desired Width (800 – 5,000 mm)
            </label>
            <input
              v-model="enteredWidth"
              type="number"
              min="800"
              max="5000"
              step="1"
              placeholder="e.g. 3500"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <!-- Height -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Desired Water-Protection Height (500 – 1,200 mm)
            </label>
            <input
              v-model="enteredHeight"
              type="number"
              min="500"
              max="1200"
              step="1"
              placeholder="e.g. 1000"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <div
            v-if="(enteredWidth || enteredHeight) && !isSizeValid"
            class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
          >
            Please enter a valid width between 800 and 5000 mm and a valid height between 500 and 1200 mm.
          </div>

          <!-- Assembly Kit -->
          <div
            v-if="assemblyKitPrice"
            class="bg-amber-50 border border-amber-200 rounded-2xl p-5"
          >
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
                €{{ assemblyKitPrice }} / piece
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Images -->
      <section class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <figure class="space-y-2 text-center">
            <img
              :src="img1"
              alt="Wood panel design"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              Wood paneling above protection height
            </figcaption>
          </figure>

          <figure class="space-y-2 text-center">
            <img
              :src="img2"
              alt="Upper area lattice design"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              Portal with lattice bars
            </figcaption>
          </figure>
        </div>

        <figure class="space-y-2 text-center">
          <img
            :src="img3"
            alt="Gate height and flood protection diagram"
            class="rounded-lg border w-full"
          />
          <figcaption class="text-xs text-gray-600">
            Maximum flood protection height: 1,200 mm
          </figcaption>
        </figure>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import img1 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2a.jpg";
import img2 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2b.jpg";
import img3 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2c.jpg";

const props = defineProps({
  form: Object,
});

const upperDesignOptions = [
  { value: 'lattice', label: 'Lattice Bars (Round or Angular)' },
  { value: 'wood', label: 'Wood Paneling' },
];

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

const minWidth = 800;
const maxWidth = 5000;
const minHeight = 500;
const maxHeight = 1200;

const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minWidth || width > maxWidth) {
    return null;
  }

  return Math.floor((width - 800) / 200) * 200 + 800;
});

const mappedHeight = computed(() => {
  const height = Number(enteredHeight.value);

  if (!height || height < minHeight || height > maxHeight) {
    return null;
  }

  return Math.floor((height - 500) / 100) * 100 + 500;
});

const isSizeValid = computed(() => {
  return !!mappedWidth.value && !!mappedHeight.value;
});

const assemblyKitPrice = computed(() => {
  const width = props.form.config_options.width;

  if (!width) return null;

  if (width <= 1500) return 131;
  if (width <= 5000) return 189;
  return 294;
});

watch(enteredWidth, (val) => {
  props.form.config_options.entered_width = val ? Number(val) : null;
  props.form.config_options.width = mappedWidth.value;
});

watch(enteredHeight, (val) => {
  props.form.config_options.entered_height = val ? Number(val) : null;
  props.form.config_options.height = mappedHeight.value;
  props.form.config_options.protection_height = mappedHeight.value;
});

watch(mappedWidth, (val) => {
  props.form.config_options.width = val;
});

watch(mappedHeight, (val) => {
  props.form.config_options.height = val;
  props.form.config_options.protection_height = val;
});
</script>