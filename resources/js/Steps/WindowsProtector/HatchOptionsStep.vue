<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('windowsProtector.step2.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- REMOVABLE -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('windowsProtector.step2.removable.title') }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ t('windowsProtector.step2.removable.description') }}
        </p>

        <div class="flex justify-center pt-2">
          <img :src="removableImg" class="max-h-40 object-contain" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

          <!-- WIDTH -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('windowsProtector.step2.removable.width') }}
            </label>

            <select
              v-model.number="form.config_options.removable_hatch_width"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">
                {{ t('windowsProtector.step2.removable.selectWidth') }}
              </option>

              <option
                v-for="width in filteredRemovableWidths"
                :key="width"
                :value="width"
              >
                {{ width }} mm
              </option>
            </select>
          </div>

          <!-- HEIGHT -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('windowsProtector.step2.removable.height') }}
            </label>

            <select
              v-model.number="form.config_options.removable_hatch_height"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">
                {{ t('windowsProtector.step2.removable.selectHeight') }}
              </option>

              <option
                v-for="height in filteredRemovableHeights"
                :key="height"
                :value="height"
              >
                {{ height }} mm
              </option>
            </select>
          </div>
        </div>

        <p v-if="removableSelectedPrice > 0" class="text-sm font-medium text-gray-700">
          {{ t('windowsProtector.step2.removable.price') }}: €{{ removableSelectedPrice }}
        </p>
      </div>

      <!-- TILT-UP -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('windowsProtector.step2.tiltUp.title') }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ t('windowsProtector.step2.tiltUp.description') }}
        </p>

        <div class="flex justify-center pt-2">
          <img :src="tiltUpImg" class="max-h-40 object-contain" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

          <!-- WIDTH -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('windowsProtector.step2.tiltUp.width') }}
            </label>

            <select
              v-model.number="form.config_options.tilt_up_hatch_width"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">
                {{ t('windowsProtector.step2.tiltUp.selectWidth') }}
              </option>

              <option
                v-for="width in filteredTiltUpWidths"
                :key="width"
                :value="width"
              >
                {{ width }} mm
              </option>
            </select>
          </div>

          <!-- HEIGHT -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('windowsProtector.step2.tiltUp.height') }}
            </label>

            <select
              v-model.number="form.config_options.tilt_up_hatch_height"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">
                {{ t('windowsProtector.step2.tiltUp.selectHeight') }}
              </option>

              <option
                v-for="height in filteredTiltUpHeights"
                :key="height"
                :value="height"
              >
                {{ height }} mm
              </option>
            </select>
          </div>
        </div>

        <p v-if="tiltUpSelectedPrice > 0" class="text-sm font-medium text-gray-700">
          {{ t('windowsProtector.step2.tiltUp.price') }}: €{{ tiltUpSelectedPrice }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import removableImg from '@/Assets/8-Windows Protector/Step-2/removable.jpg';
import tiltUpImg from '@/Assets/8-Windows Protector/Step-2/tilt-up.jpg';
import {
  removableHatchPrices,
  tiltUpHatchPrices,
} from '@/Data/windowsProtectorPrices';

const { t } = useI18n();

const props = defineProps({
  form: Object
});

const form = props.form;

// BASE OPTIONS
const removableWidths = [200, 300, 400, 500, 600];
const removableHeights = [150, 200, 300, 400, 500, 600];

const tiltUpWidths = [250, 300, 400, 500, 600];
const tiltUpHeights = [100, 200, 300, 400, 500, 600];

// CONSTRAINTS
const maxHatchWidth = computed(() => (form.config_options.width || 0) - 100);
const maxHatchHeight = computed(() => (form.config_options.height || 0) - 100);

// FILTERING
const filteredRemovableWidths = computed(() =>
  removableWidths.filter(w => w <= maxHatchWidth.value)
);

const filteredRemovableHeights = computed(() =>
  removableHeights.filter(h => h <= maxHatchHeight.value)
);

const filteredTiltUpWidths = computed(() =>
  tiltUpWidths.filter(w => w <= maxHatchWidth.value)
);

const filteredTiltUpHeights = computed(() =>
  tiltUpHeights.filter(h => h <= maxHatchHeight.value)
);

// PRICES
const removableSelectedPrice = computed(() => {
  const w = form.config_options.removable_hatch_width;
  const h = form.config_options.removable_hatch_height;
  return w && h ? removableHatchPrices[w]?.[h] || 0 : 0;
});

const tiltUpSelectedPrice = computed(() => {
  const w = form.config_options.tilt_up_hatch_width;
  const h = form.config_options.tilt_up_hatch_height;
  return w && h ? tiltUpHatchPrices[w]?.[h] || 0 : 0;
});

// TYPE AUTO
watch(
  () => [
    form.config_options.removable_hatch_width,
    form.config_options.removable_hatch_height,
    form.config_options.tilt_up_hatch_width,
    form.config_options.tilt_up_hatch_height,
  ],
  ([rw, rh, tw, th]) => {
    if (rw && rh) form.config_options.hatch_type = 'removable';
    else if (tw && th) form.config_options.hatch_type = 'tilt-up';
    else form.config_options.hatch_type = 'none';
  },
  { immediate: true }
);

// MUTUAL RESET
watch(
  () => [form.config_options.removable_hatch_width, form.config_options.removable_hatch_height],
  ([rw, rh]) => {
    if (rw || rh) {
      form.config_options.tilt_up_hatch_width = null;
      form.config_options.tilt_up_hatch_height = null;
    }
  }
);

watch(
  () => [form.config_options.tilt_up_hatch_width, form.config_options.tilt_up_hatch_height],
  ([tw, th]) => {
    if (tw || th) {
      form.config_options.removable_hatch_width = null;
      form.config_options.removable_hatch_height = null;
    }
  }
);

// INVALID RESET
watch([maxHatchWidth, maxHatchHeight], () => {
  if (
    form.config_options.removable_hatch_width > maxHatchWidth.value ||
    form.config_options.removable_hatch_height > maxHatchHeight.value
  ) {
    form.config_options.removable_hatch_width = null;
    form.config_options.removable_hatch_height = null;
  }

  if (
    form.config_options.tilt_up_hatch_width > maxHatchWidth.value ||
    form.config_options.tilt_up_hatch_height > maxHatchHeight.value
  ) {
    form.config_options.tilt_up_hatch_width = null;
    form.config_options.tilt_up_hatch_height = null;
  }
});
</script>