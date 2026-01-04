<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Door Size & Installation Method
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT: Door Size -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Door Size
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          Please note the maximum size of the wall opening for the sectional door.
          The minimum reveal size inside is <strong>90 mm</strong>, otherwise additional tubes are required.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <!-- Fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                Width of the wall opening
              </label>
              <select
                v-model="form.config_options.width"
                class="w-full border rounded-lg p-2"
              >
                <option disabled value="">Select width (mm)</option>
                <option v-for="w in availableWidths" :key="w" :value="w">
                  {{ w }} mm
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                Height of the wall opening
              </label>
              <select
                v-model="form.config_options.height"
                class="w-full border rounded-lg p-2"
              >
                <option disabled value="">Select height (mm)</option>
                <option v-for="h in availableHeights" :key="h" :value="h">
                  {{ h }} mm
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-800 mb-1">
                Water protection height
              </label>
              <input
                type="number"
                min="0"
                max="500"
                placeholder="Up to 500 mm"
                v-model="form.config_options.waterProtectionHeight"
                class="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          <!-- Image (no background) -->
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
          Installation Method
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          Installation method: behind or between the reveal.
          Our authorized technicians will clarify the installation method on site
          if you are uncertain about the appropriate option to go with.
        </p>

        <!-- Images with captions + radios -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <!-- Behind the reveal -->
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
                class="form-radio mt-1"
              />
              <span class="text-sm text-gray-800 text-left">
                Installation on the interior wall<br />
                <strong>Behind the reveal</strong>
              </span>
            </label>
          </div>

          <!-- Between the reveal -->
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
                class="form-radio mt-1"
              />
              <span class="text-sm text-gray-800 text-left">
                Installation on the reveal<br />
                <strong>Between the reveal</strong><br />
                <span class="text-xs text-gray-500">(tubes may be required)</span>
              </span>
            </label>
          </div>

        </div>
      </section>

    </div>
  </div>
</template>


<script setup>
  import img1 from "@/Assets/6-Sectional/Step-1/sectional-1.jpg"
  import img2 from "@/Assets/6-Sectional/Step-1/sectional-1b.jpg"
  import img3 from "@/Assets/6-Sectional/Step-1/sectional-1c.jpg"
defineProps({
  form: Object
})

const availableWidths = [
  2000, 2125, 2250, 2375, 2500, 2625, 2750, 2875, 3000,
  3125, 3250, 3375, 3500, 3625, 3750, 3875, 4000,
  4125, 4250, 4375, 4500, 4625, 4750, 4875, 5000,
  5125, 5250, 5375, 5500, 5625, 5750, 5875, 6000
]

const availableHeights = [
  2000, 2125, 2250, 2375,
  2500, 2625, 2750, 2875, 3000
]
</script>
