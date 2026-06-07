<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ $t('sectionalDoor.step1.title') }}
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT: Door Size -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          {{ $t('sectionalDoor.step1.doorSize.title') }}
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          {{ $t('sectionalDoor.step1.doorSize.description') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          <!-- Inputs -->
          <div class="space-y-4">
            <!-- Width -->
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                {{ $t('sectionalDoor.step1.doorSize.widthLabel') }}
              </label>

              <input
                v-model="enteredWidth"
                type="number"
                :min="minWidth"
                :max="maxWidth"
                step="1"
                :placeholder="$t('sectionalDoor.step1.doorSize.widthPlaceholder')"
                class="w-full border rounded-lg p-2"
              />
            </div>

            <!-- Height -->
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                {{ $t('sectionalDoor.step1.doorSize.heightLabel') }}
              </label>

              <input
                v-model="enteredHeight"
                type="number"
                :min="minHeight"
                :max="maxHeight"
                step="1"
                :placeholder="$t('sectionalDoor.step1.doorSize.heightPlaceholder')"
                class="w-full border rounded-lg p-2"
              />
            </div>

            <!-- Validation -->
            <div
              v-if="(enteredWidth || enteredHeight) && !isSizeValid"
              class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
            >
              {{ $t('sectionalDoor.step1.doorSize.validation') }}
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
          {{ $t('sectionalDoor.step1.installation.title') }}
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          {{ $t('sectionalDoor.step1.installation.description') }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <!-- Behind -->
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
                {{ $t('sectionalDoor.step1.installation.behind.description') }}
                <br />
                <strong>
                  {{ $t('sectionalDoor.step1.installation.behind.title') }}
                </strong>
              </span>
            </label>
          </div>

          <!-- Between -->
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
                {{ $t('sectionalDoor.step1.installation.between.description') }}
                <br />
                <strong>
                  {{ $t('sectionalDoor.step1.installation.between.title') }}
                </strong>
                <br />
                <!-- <span class="text-xs text-gray-500">
                  {{ $t('sectionalDoor.step1.installation.between.note') }} 
                </span> -->
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
import img2 from "@/Assets/6-Sectional/Step-1/sectional-1c.jpg";
import img3 from "@/Assets/6-Sectional/Step-1/sectional-1b.jpg";

const props = defineProps({
  form: Object
});

/**
 * CONFIG LIMITS
 */
const minWidth = 2000;
const maxWidth = 6000;
const minHeight = 2000; // ⚠️ Confirm vs German (1875?)
const maxHeight = 3000;
const stepSize = 125;

/**
 * INPUT STATE
 */
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

/**
 * MAPPING LOGIC
 */
const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minWidth || width > maxWidth) return null;

  return Math.floor((width - minWidth) / stepSize) * stepSize + minWidth;
});

const mappedHeight = computed(() => {
  const height = Number(enteredHeight.value);

  if (!height || height < minHeight || height > maxHeight) return null;

  return Math.floor((height - minHeight) / stepSize) * stepSize + minHeight;
});

const isSizeValid = computed(() => {
  return !!mappedWidth.value && !!mappedHeight.value;
});

/**
 * WATCHERS
 */
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