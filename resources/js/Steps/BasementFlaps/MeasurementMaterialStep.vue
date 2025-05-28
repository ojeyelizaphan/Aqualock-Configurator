<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
      Measurement & Material
    </h2>

    <!-- Material Selection First -->
    <div class="mb-8">
      <OptionRadioGroup
        label="Material"
        v-model="form.config_options['material']"
        :options="[
          { value: 'galvanized', label: 'Galvanized steel' },
          { value: 'stainless', label: 'Stainless steel' }
        ]"
      />
    </div>

    <!-- Wall Opening Dimensions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Width of the wall opening (mm)
        </label>
        <select
          v-model="form.config_options['width']"
          class="w-full border rounded-lg p-2 focus:ring-[#f39200] focus:border-[#f39200]"
        >
          <option disabled value="">Select width</option>
          <option v-for="w in sizeOptions" :key="w" :value="w">
            {{ w }} mm
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Height of the wall opening (mm)
        </label>
        <select
          v-model="form.config_options['height']"
          class="w-full border rounded-lg p-2 focus:ring-[#f39200] focus:border-[#f39200]"
        >
          <option disabled value="">Select height</option>
          <option v-for="h in sizeOptions" :key="h" :value="h">
            {{ h }} mm
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import OptionRadioGroup from '@/Components/OptionRadioGroup.vue';

defineProps({
  form: Object
});

const sizeOptions = [600, 700, 800, 900, 1000, 1100];
</script>

  