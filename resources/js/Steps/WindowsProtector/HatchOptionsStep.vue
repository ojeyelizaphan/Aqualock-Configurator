<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
      Hatch Options
    </h2>

    <!-- Hatch Type Selector -->
    <div class="mb-6">
      <label class="block font-medium text-gray-700 mb-1">Hatch Type</label>
      <select
        v-model="form.config_options.hatch_type"
        class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
      >
        <option disabled value="">Select a hatch type</option>
        <option value="none">No Hatch</option>
        <option value="removable">Removable Hatch</option>
        <option value="tilt-up">Tilt-up Hatch</option>
      </select>
    </div>


    <div v-if="form.config_options.hatch_type === 'removable'" class="mb-10">
      <!-- Removable Hatch Section -->
      <div class="mb-10">
        <h3 class="text-lg font-medium text-gray-700 mb-4">
          Removable Hatch
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Width -->
          <div>
            <label class="block font-medium text-gray-700 mb-1">Width (mm)</label>
            <select
              v-model="form.config_options.removable_hatch_width"
              class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            >
              <option disabled value="">Select width</option>
              <option v-for="w in [200, 300, 400, 500, 600]" :key="w" :value="w">
                {{ w }} mm
              </option>
            </select>
          </div>

          <!-- Height -->
          <div>
            <label class="block font-medium text-gray-700 mb-1">Height (mm)</label>
            <select
              v-model="form.config_options.removable_hatch_height"
              class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            >
              <option disabled value="">Select height</option>
              <option v-for="h in [150, 200, 300, 400, 500, 600]" :key="h" :value="h">
                {{ h }} mm
              </option>
            </select>
          </div>
        </div>
      </div>


      <!-- Always Included: Assembly Kit Info -->
      <div class="mt-10 border-t pt-6 border-gray-200">
        <h3 class="text-lg font-medium text-gray-700 mb-2">
          Included Accessories
        </h3>
        <div class="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
          <span class="text-gray-800">Assembly kit with sealing (always included)</span>
          <span class="text-brand-orange font-semibold">€132</span>
        </div>
      </div>

    </div>


    <div v-if="form.config_options.hatch_type === 'tilt-up'">
      <!-- Tilt-up Hatch Section -->
      <div>
        <h3 class="text-lg font-medium text-gray-700 mb-4">
          Tilt-up Hatch
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Width -->
          <div>
            <label class="block font-medium text-gray-700 mb-1">Width (mm)</label>
            <select
              v-model="form.config_options.tilt_up_hatch_width"
              class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            >
              <option disabled value="">Select width</option>
              <option v-for="w in [250, 300, 400, 500, 600]" :key="w" :value="w">
                {{ w }} mm
              </option>
            </select>
          </div>

          <!-- Height -->
          <div>
            <label class="block font-medium text-gray-700 mb-1">Height (mm)</label>
            <select
              v-model="form.config_options.tilt_up_hatch_height"
              class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            >
              <option disabled value="">Select height</option>
              <option v-for="h in [100, 200, 300, 400, 500, 600]" :key="h" :value="h">
                {{ h }} mm
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  form: Object
});
</script>
