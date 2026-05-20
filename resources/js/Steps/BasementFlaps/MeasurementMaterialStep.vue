<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('flap.step1.title') }}
    </h2>

    <!-- Split layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('flap.step1.dimensions.title') }}
        </h3>

        <div class="space-y-2 text-sm text-gray-600 leading-relaxed">
          <p>
            {{ t('flap.step1.dimensions.description.beforeProduct') }}
            <strong>{{ t('flap.step1.dimensions.description.product') }}</strong>
            {{ t('flap.step1.dimensions.description.middle') }}
            <strong>{{ t('flap.step1.dimensions.description.size') }}</strong>.
          </p>

          <p>
            <strong>{{ t('flap.step1.dimensions.widthLabel') }}</strong><br />
            {{ t('flap.step1.dimensions.widthRange') }}
          </p>

          <p>
            <strong>{{ t('flap.step1.dimensions.heightLabel') }}</strong><br />
            {{ t('flap.step1.dimensions.heightRange') }}
          </p>
        </div>

        <div class="flex justify-center pt-2">
          <img :src="img1" class="max-h-48 object-contain" />
        </div>

        <div class="grid grid-cols-2 gap-6 pt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('flap.step1.inputs.width') }}
            </label>
            <input
              type="number"
              min="600"
              max="1100"
              v-model="enteredWidth"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('flap.step1.inputs.height') }}
            </label>
            <input
              type="number"
              min="600"
              max="1100"
              v-model="enteredHeight"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>
        </div>

        <div
          v-if="(enteredWidth || enteredHeight) && !isSizeValid"
          class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
        >
          {{ t('flap.step1.validation') }}
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('flap.step1.material.title') }}
        </h3>

        <p class="text-sm text-gray-600 leading-relaxed">
          {{ t('flap.step1.material.description') }}
        </p>

        <div class="flex justify-center pt-2">
          <img :src="img2" class="max-h-40 object-contain" />
        </div>

        <div class="space-y-3 pt-4">
          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="galvanized"
              v-model="form.config_options.material"
            />
            {{ t('flap.step1.material.galvanized') }}
          </label>

          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="stainless"
              v-model="form.config_options.material"
            />
            {{ t('flap.step1.material.stainless') }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import img1 from "@/Assets/7-Flap/Step-1/flap-1a.jpg";
import img2 from "@/Assets/7-Flap/Step-1/flap-1b.jpg";

const { t } = useI18n();

const props = defineProps({ form: Object });

const minSize = 600;
const maxSize = 1100;
const stepSize = 100;

const enteredWidth = ref(props.form.config_options.width || "");
const enteredHeight = ref(props.form.config_options.height || "");

const mappedWidth = computed(() => {
  const w = Number(enteredWidth.value);
  if (!w || w < minSize || w > maxSize) return null;
  return Math.floor((w - minSize) / stepSize) * stepSize + minSize;
});

const mappedHeight = computed(() => {
  const h = Number(enteredHeight.value);
  if (!h || h < minSize || h > maxSize) return null;
  return Math.floor((h - minSize) / stepSize) * stepSize + minSize;
});

const isSizeValid = computed(() => !!mappedWidth.value && !!mappedHeight.value);

watch(mappedWidth, val => props.form.config_options.width = val);
watch(mappedHeight, val => props.form.config_options.height = val);
</script>