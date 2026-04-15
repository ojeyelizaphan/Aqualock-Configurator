<template>
  <div class="max-w-6xl mx-auto px-4 space-y-20">

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
          €398 / piece
        </p>
      </div>
    </div>

    <!-- ============================= -->
    <!--  SPLIT: INSULATION | WINDOWS -->
    <!-- ============================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-14">

      <!-- LEFT: INSULATION -->
      <section>
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">
          Thermal Insulation
        </h2>

        <div class="text-gray-700 leading-relaxed space-y-4 mb-8">
          <p class="font-semibold text-lg text-gray-900">
            Thermally insulated AquaLOCK® doors — efficient protection against heat and cold
          </p>

          <p>
            The German Energy Conservation Ordinance (EnEV) requires front doors to have a maximum
            Ud value of <strong>1.8 W/m²K</strong>.
          </p>

          <p>
            AquaLOCK® thermally insulated doors achieve <strong>Ud 1.5 W/m²K</strong>.
          </p>

          <p>
            Non-thermal doors suit garages or unheated spaces.
          </p>
        </div>

        <!-- SIMPLE RADIO LIST -->
        <div class="space-y-3">
          <label
            v-for="option in insulationOptions"
            :key="option.value"
            class="flex items-start gap-3 cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options.thermal_insulation"
              class="mt-1"
            />
            <div>
              <p class="font-semibold text-gray-900">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </section>



      <!-- RIGHT: WINDOWS -->
      <!-- ========================= -->
<!-- WINDOWS (RIGHT SIDE ONLY) -->
<!-- ========================= -->
<section>
  <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">
    Windows
  </h2>

  <!-- DESCRIPTION + BASIC WINDOW TYPE OPTIONS -->

    <!-- LEFT: DESCRIPTION -->
    <div class="text-gray-700 leading-relaxed space-y-4">
      <p>
        A non-opening window (max <strong>650 × 450 mm</strong>) can be added to bring natural light inside.
      </p>

      <p>
        • Thermally insulated doors → <strong>triple glazing</strong><br>
        • Non-insulated doors → <strong>double glazing</strong>
      </p>

      <p class="text-red-600 font-medium">
        Note: Windows are not flood-resistant and should not be used where full-height flood protection is required.
      </p>

      <p>
        Available in 3 variants, all at the same price.
      </p>

      <!-- RADIO OPTIONS: WITHOUT / WITH -->
      <div class="space-y-3 pt-4">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="without"
            v-model="form.config_options.window_type"
          />
          <span class="font-medium text-gray-900">Without Window</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="with"
            v-model="form.config_options.window_type"
            :disabled="form.config_options.locking_mechanism === 'V3'"
          />
          <span class="font-medium text-gray-900">With Window</span>
        </label>

        <p
          v-if="form.config_options.locking_mechanism === 'V3'"
          class="text-sm text-red-600 mt-1"
        >
          Windows are not available for V3 — this version is fully watertight over the entire door height.
        </p>
      </div>

      <!-- FLOOD PROTECTION OPTION-->
      <div class="mt-6 border-t pt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">
          Flood Protection
        </h3>

        <p class="text-sm text-gray-600 mb-3">
          The heavy duty version provides flood protection up to 5 m.
        </p>

        <label class="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="form.config_options.heavy_duty"
            :disabled="form.config_options.window_type === 'with'"
            class="mt-1"
          />
          <div>
            <p class="font-medium text-gray-900">
              Heavy duty version with flood protection up to 5 m
            </p>
            <p class="text-sm text-gray-600">
              Not available when a window is selected.
            </p>
          </div>
        </label>

        <p
          v-if="form.config_options.window_type === 'with'"
          class="text-sm text-red-600 mt-2"
        >
          Flood protection is not available with windows.
        </p>
      </div>
    </div>
 <!-- END DESCRIPTION GRID -->


  <!-- ============================== -->
  <!-- WINDOW VERSIONS BELOW CONTENT -->
  <!-- ============================== -->
  <div
    v-if="form.config_options.window_type === 'with'"
    class="mt-10 border-t pt-10"
  >
    <h3 class="text-2xl font-semibold text-center mb-6">
      Choose Window Version
    </h3>

      
    <div >

      <!-- LEFT: RADIO LIST -->
      <div class="space-y-3">
        <label
          v-for="option in windowVersions"
          :key="option.value"
          class="flex items-start gap-3 cursor-pointer"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.window_version"
            class="mt-1"
          />
          <div>
            <p class="font-semibold text-gray-900">{{ option.label }}</p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </div>
        </label>
      </div>

      <!-- RIGHT: IMAGES IN ROW -->
      <div class="flex gap-4 justify-center flex-wrap">
        <img
          v-for="option in windowVersions"
          :key="option.value"
          :src="option.image"
          :alt="option.label"
          class="w-32 h-32 object-cover rounded-lg border"
        />
      </div>

    </div>
  </div>

</section>


    </div> <!-- END SPLIT GRID -->



    


  </div>
</template>



<script setup>
import { watch } from 'vue';
import imgDoor1 from "@/Assets/3-AquaLOCK Door/Step-1/aqualock-1a.jpg";
import imgDoor2 from "@/Assets/3-AquaLOCK Door/Step-1/aqualock-1b.jpg";
import imgDoor3 from "@/Assets/3-AquaLOCK Door/Step-1/aqualock-1c.jpg";

const props = defineProps({
  form: Object
});

const form = props.form;

const insulationOptions = [
  { value: "thermally_insulated", label: "Thermally Insulated", description: "High thermal efficiency for energy savings." },
  { value: "non_thermally_insulated", label: "Non-Thermally Insulated", description: "Standard construction without thermal break." },
];

const windowVersions = [
  {
    value: "clear",
    label: "Clear Glass",
    description: "Clean transparent finish.",
    image: imgDoor1
  },
  {
    value: "mastercarree",
    label: "Mastercarrée",
    description: "Textured glass for privacy and style.",
    image: imgDoor2
  },
  {
    value: "satinato",
    label: "Satinato (Frosted Glass)",
    description: "Soft frosted appearance for maximum privacy.",
    image: imgDoor3
  }
];

watch(
  () => form.config_options.locking_mechanism,
  (value) => {
    if (value === 'V3') {
      form.config_options.window_type = 'without';
      form.config_options.window_version = null;
    }
  }
);

watch(
  () => form.config_options.window_type,
  (value) => {
    if (value === 'with') {
      form.config_options.heavy_duty = false;
    }

    if (value !== 'with') {
      form.config_options.window_version = null;
    }
  }
);

watch(
  () => form.config_options.heavy_duty,
  (value) => {
    if (value) {
      form.config_options.window_type = 'without';
      form.config_options.window_version = null;
    }
  }
);
</script>
