<template>
  <div class="space-y-10 max-w-6xl mx-auto">
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
            Between 400 and 1.100 mm
          </p>

          <p>
            <strong>Height of the wall opening:</strong><br />
            Between 400 and 1.100 mm
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
              min="400"
              max="1100"
              v-model="form.config_options.width"
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
              max="1100"
              v-model="form.config_options.height"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>
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
import img1 from "@/Assets/7-Flap/Step-1/flap-1a.jpg";
import img2 from "@/Assets/7-Flap/Step-1/flap-1b.jpg";

defineProps({
  form: Object
});
</script>

