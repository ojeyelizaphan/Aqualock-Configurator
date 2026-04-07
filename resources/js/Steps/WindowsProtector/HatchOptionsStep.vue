<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Hatch Options
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Removable Hatch -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Removable hatch
        </h3>

        <p class="text-sm text-gray-600">
          Select predefined width and height. The hatch price will be mapped automatically.
        </p>

        <div class="flex justify-center pt-2">
          <img
            :src="removableImg"
            alt="Removable hatch illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Width
            </label>
            <select
              v-model.number="form.config_options.removable_hatch_width"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">Select width</option>
              <option
                v-for="width in removableWidths"
                :key="width"
                :value="width"
              >
                {{ width }} mm
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <select
              v-model.number="form.config_options.removable_hatch_height"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">Select height</option>
              <option
                v-for="height in removableHeights"
                :key="height"
                :value="height"
              >
                {{ height }} mm
              </option>
            </select>
          </div>
        </div>

        <p
          v-if="removableSelectedPrice > 0"
          class="text-sm font-medium text-gray-700"
        >
          Hatch price: €{{ removableSelectedPrice }}
        </p>
      </div>

      <!-- RIGHT: Tilt-up Hatch -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Tilt-up hatch
        </h3>

        <p class="text-sm text-gray-600">
          Select predefined width and height. The hatch price will be mapped automatically.
        </p>

        <div class="flex justify-center pt-2">
          <img
            :src="tiltUpImg"
            alt="Tilt-up hatch illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Width
            </label>
            <select
              v-model.number="form.config_options.tilt_up_hatch_width"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">Select width</option>
              <option
                v-for="width in tiltUpWidths"
                :key="width"
                :value="width"
              >
                {{ width }} mm
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <select
              v-model.number="form.config_options.tilt_up_hatch_height"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option disabled :value="null">Select height</option>
              <option
                v-for="height in tiltUpHeights"
                :key="height"
                :value="height"
              >
                {{ height }} mm
              </option>
            </select>
          </div>
        </div>

        <p
          v-if="tiltUpSelectedPrice > 0"
          class="text-sm font-medium text-gray-700"
        >
          Hatch price: €{{ tiltUpSelectedPrice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import removableImg from '@/Assets/8-Windows Protector/Step-2/removable.jpg';
import tiltUpImg from '@/Assets/8-Windows Protector/Step-2/tilt-up.jpg';
import {
  removableHatchPrices,
  tiltUpHatchPrices,
} from '@/Data/windowsProtectorPrices';

const props = defineProps({
  form: Object
});

const form = props.form;

const removableWidths = [200, 300, 400, 500, 600];
const removableHeights = [150, 200, 300, 400, 500, 600];

const tiltUpWidths = [250, 300, 400, 500, 600];
const tiltUpHeights = [100, 200, 300, 400, 500, 600];

const removableSelectedPrice = computed(() => {
  const width = form.config_options.removable_hatch_width;
  const height = form.config_options.removable_hatch_height;

  if (!width || !height) return 0;
  return removableHatchPrices[width]?.[height] || 0;
});

const tiltUpSelectedPrice = computed(() => {
  const width = form.config_options.tilt_up_hatch_width;
  const height = form.config_options.tilt_up_hatch_height;

  if (!width || !height) return 0;
  return tiltUpHatchPrices[width]?.[height] || 0;
});

watch(
  () => [
    form.config_options.removable_hatch_width,
    form.config_options.removable_hatch_height,
    form.config_options.tilt_up_hatch_width,
    form.config_options.tilt_up_hatch_height,
  ],
  ([rw, rh, tw, th]) => {
    const hasRemovable = !!rw && !!rh;
    const hasTiltUp = !!tw && !!th;

    if (hasRemovable && !hasTiltUp) {
      form.config_options.hatch_type = 'removable';
    } else if (hasTiltUp && !hasRemovable) {
      form.config_options.hatch_type = 'tilt-up';
    } else if (!hasRemovable && !hasTiltUp) {
      form.config_options.hatch_type = 'none';
    }
  },
  { immediate: true }
);

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
</script>