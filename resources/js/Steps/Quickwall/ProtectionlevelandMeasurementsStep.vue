<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Protection Level & Measurements
    </h2>

    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-md p-6 md:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        <!-- LEFT: Description + Inputs -->
        <div class="space-y-6">
          <!-- Intro text -->
          <div class="space-y-3 text-gray-700 leading-relaxed">
            <h3 class="text-lg font-semibold text-gray-800">
              Select water protection level
            </h3>
            <p>
              Some structural situations require the installation of mobile flood protection.
              The <span class="font-medium">AquaLOCK® Quickwall panel</span> was designed precisely
              for this purpose.
            </p>
            <p>
              It consists of fixed slats and is available up to a maximum protection height of
              <span class="font-medium">1.6 m</span>, depending on the opening width.
            </p>
          </div>

          <!-- Opening Width -->
          <div>
            <label class="block font-medium text-gray-800 mb-2">
              Opening width (mm)
            </label>
            <input
              v-model="enteredWidth"
              type="number"
              min="800"
              max="3000"
              step="1"
              placeholder="Enter opening width"
              class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            />
          </div>

          <div
            v-if="enteredWidth && !isWidthValid"
            class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
          >
            Please enter a valid width between 800 mm and 3000 mm.
          </div>

          <!-- Protection Height -->
          <div v-if="isWidthValid">
            <label class="block font-medium text-gray-800 mb-3">
              Protection height (mm)
            </label>

            <div
              v-if="availableProtectionHeights.length"
              class="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              <label
                v-for="h in availableProtectionHeights"
                :key="h"
                class="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:border-brand-orange transition"
                :class="form.config_options.height === h ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-gray-300'"
              >
                <input
                  type="radio"
                  class="accent-brand-orange"
                  :value="h"
                  v-model="form.config_options.height"
                />
                <span class="text-sm font-medium text-gray-700">
                  {{ h }} mm
                </span>
              </label>
            </div>

            <div
              v-else
              class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
            >
              No protection heights are available for this width.
            </div>
          </div>
        </div>

        <!-- RIGHT: Images -->
        <div class="space-y-4">
          <img
            v-for="(img, index) in protectionImages"
            :key="index"
            :src="img"
            alt="Quickwall protection example"
            class="w-full h-60 object-contain rounded-xl bg-gray-50 shadow-sm"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import img1 from "@/Assets/5-Quickwall/Step-1/quickwall-1.jpg";
import img2 from "@/Assets/5-Quickwall/Step-1/quickwall-1b.jpg";
import {
  quickwallWidths,
  quickwallHeights,
  quickwallBetweenReveal,
  quickwallFrontReveal
} from "@/Data/quickwallPrices";

const props = defineProps({
  form: Object
});

const protectionImages = [img1, img2];

const enteredWidth = ref(
  props.form.config_options.entered_width ||
  props.form.config_options.width ||
  ""
);

const minWidth = 800;
const maxWidth = 3000;
const stepSize = 100;

const isWidthValid = computed(() => {
  const width = Number(enteredWidth.value);
  return !!width && width >= minWidth && width <= maxWidth;
});

const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value);

  if (!width || width < minWidth || width > maxWidth) {
    return null;
  }

  return Math.floor((width - minWidth) / stepSize) * stepSize + minWidth;
});

// Decide which price table to use.
// Adjust this field name if your config uses a different one.
const selectedPriceTable = computed(() => {
  const installationMethod = props.form.config_options.installation_method;

  if (installationMethod === "between_reveal") {
    return quickwallBetweenReveal;
  }

  if (installationMethod === "front_reveal") {
    return quickwallFrontReveal;
  }

  // If not selected yet, use either table just to determine availability shape.
  // Both tables have the same available width/height structure.
  return quickwallBetweenReveal;
});

const availableProtectionHeights = computed(() => {
  const width = mappedWidth.value;
  if (!width) return [];

  const widthIndex = quickwallWidths.indexOf(width);
  if (widthIndex === -1) return [];

  return quickwallHeights.filter((height) => {
    const row = selectedPriceTable.value?.[height];
    return Array.isArray(row) && widthIndex < row.length;
  });
});

// keep rounded width in form
watch(enteredWidth, (val) => {
  props.form.config_options.entered_width = val ? Number(val) : null;
  props.form.config_options.width = mappedWidth.value;
});

// if selected height becomes invalid for new width, clear it
watch(availableProtectionHeights, (heights) => {
  if (!heights.includes(props.form.config_options.height)) {
    props.form.config_options.height = null;
  }
});

// also keep width synced if mapped width changes
watch(mappedWidth, (val) => {
  props.form.config_options.width = val;
});
</script>