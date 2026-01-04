<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Panel and Profile Colour
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT: Panel Colour -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Colour varieties: 213 different colours
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          To ensure that your AquaLOCK® door perfectly matches your building,
          choose from 213 RAL colours for the appearance of the door leaf.
        </p>

        <p class="text-sm text-gray-600 mb-4">
          There are two standard colours for the outside
          (<strong>RAL 9016 NZ traffic white</strong>,
          <strong>RAL 7016 NZ anthracite grey</strong>)
          and one standard colour for the inside
          (<strong>RAL 9002</strong>) available at no extra charge.
        </p>

        <p class="text-xs text-gray-500 mb-6">
          Please note: The colours shown on the website may differ from the actual
          colour due to monitor display. Therefore the colour choice is without guarantee.
        </p>

        <!-- Image -->
        <div class="mb-6">
          <img
            :src=img1
            alt="Sectional door colour example"
            class="max-h-56 object-contain"
          />
        </div>

        <!-- Scrollable Colour Picker -->
        <ColorSelector
          title="Choose door panel colour"
          :options="colorOptions"
          v-model="form.config_options.color"
        />
      </section>

      <!-- RIGHT: Profile Colour -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Steel corners and aluminum profiles
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          In the standard configuration, the profiles on the bottom slat are
          constructed from silver anodized aluminum, while the steel corners are
          powder-coated in gray.
        </p>

        <p class="text-sm text-gray-600 mb-6">
          For an additional fee, both can be customized to match the color of the
          AquaLOCK® sectional door, enhancing the overall aesthetics and giving the
          door a more refined, seamless look.
        </p>

        <!-- Image -->
        <div class="mb-4">
          <img
            :src=img2
            alt="Steel corners and aluminum profiles"
            class="max-h-56 object-contain"
          />
        </div>

        <!-- Options -->
        <div class="space-y-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="standard"
              v-model="form.config_options.profileColour"
              class="form-radio"
            />
            <span class="text-sm text-gray-800">
              Without customized colour to match sectional door
            </span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="custom"
              v-model="form.config_options.profileColour"
              class="form-radio"
            />
            <span class="text-sm text-gray-800">
              With customized colour (RAL)
            </span>
          </label>
        </div>

        <!-- RAL Input -->
        <div
          v-if="form.config_options.profileColour === 'custom'"
          class="mt-4 max-w-xs"
        >
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Enter RAL colour code
          </label>
          <input
            type="text"
            v-model="form.config_options.profileRAL"
            placeholder="e.g. RAL 7016"
            class="w-full border rounded-lg p-2"
          />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
  import img1 from "@/Assets/6-Sectional/Step-3/step-3a.jpg"
  import img2 from "@/Assets/6-Sectional/Step-3/step-3b.jpg"
import ColorSelector from '@/Components/ColorSector.vue'

defineProps({
  form: Object,
  colorOptions: Array
})
</script>
