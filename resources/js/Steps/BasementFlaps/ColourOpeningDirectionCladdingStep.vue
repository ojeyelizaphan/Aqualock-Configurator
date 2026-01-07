<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Colour, Opening Direction & Cladding
    </h2>

    <!-- Split layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Colour -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Colour varieties
        </h3>

        <!-- Description -->
        <div class="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            In order to customize the colour of your
            <strong>AquaLOCK® flap</strong>, you can choose between
            <strong>213 RAL colours</strong>.
          </p>

          <p>
            Seven standard colours (white and six shades of gray) are
            available at no extra cost.
          </p>

          <p class="text-xs text-gray-500">
            Note: The colour displayed on the website may differ from the
            actual colour due to monitor settings. Therefore, no guarantee
            can be given for the colour choice.
          </p>
        </div>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src=img1
            alt="RAL colour illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <!-- Scrollable colour palette -->
        <div class="pt-4">
          <ColorSelector
            :options="colorOptions"
            v-model="form.config_options.color"
          />
        </div>
      </div>

      <!-- RIGHT: Functional options -->
      <div class="space-y-10">
        <!-- Opening Direction -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            Opening direction
          </h3>

          <p class="text-sm text-gray-600 leading-relaxed">
            The AquaLOCK® flap is always supplied with hinges to ensure
            easy opening. It can be installed vertically or horizontally.
          </p>

          <div class="space-y-3 pt-2">
            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="left_inward"
                v-model="form.config_options.opening_direction"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              Left-hand inward opening
            </label>

            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="right_inward"
                v-model="form.config_options.opening_direction"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              Right-hand inward opening
            </label>

            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="top"
                v-model="form.config_options.opening_direction"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              Top opening
            </label>
          </div>
        </div>

        <!-- Closing Mechanism -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            Closing mechanism
          </h3>

          <div class="space-y-3">
            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="lockable"
                v-model="form.config_options.closing_mechanism"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              Lockable flap (prepared for padlock)
            </label>

            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="non_lockable"
                v-model="form.config_options.closing_mechanism"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              Non-lockable flap
            </label>
          </div>
        </div>

        <!-- Internal Cladding -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            Internal cladding
          </h3>

          <div class="space-y-3">
            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="with_aluminium"
                v-model="form.config_options.internal_cladding"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              With 2 mm aluminum sheet
            </label>

            <label class="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="radio"
                value="without_aluminium"
                v-model="form.config_options.internal_cladding"
                class="text-[#f39200] focus:ring-[#f39200]"
              />
              Without aluminum sheet
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ColorSelector from '@/Components/ColorSector.vue';
import img1 from '@/Assets/7-Flap/Step-2/flap-2.jpg';

defineProps({
  form: Object,
  colorOptions: Array
});
</script>
