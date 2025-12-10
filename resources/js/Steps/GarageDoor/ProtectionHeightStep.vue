<template>
  <div class="max-w-4xl mx-auto space-y-10">

    <!-- Title -->
    <h2 class="text-3xl font-semibold text-center text-gray-900">
      Select Water Protection Level
    </h2>

    <!-- Intro Description -->
    <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 leading-relaxed text-gray-700 shadow-sm">
      <p class="mb-4">
        Heavy rainfall may cause an accumulation of water in a very short time, but it seldom exceeds a 
        water level of more than half a meter. The situation is different if you have an underground garage — 
        the sunken driveway acts like a funnel and quickly fills up beyond a height of 500 mm, creating pressure 
        that only a reinforced door can withstand for longer periods.
      </p>

      <p class="mb-4">
        The <span class="font-semibold">AquaLOCK®</span> up-and-over garage doors ensure protection 
        up to <span class="font-semibold">1,600 mm</span>, depending on the height of the door. 
        If your garage door is between <span class="font-semibold">3,100 mm and 5,200 mm wide</span>, 
        we recommend the <span class="font-semibold">V500 version</span>, which is limited to a 
        protection height of <span class="font-semibold">500 mm</span>.
      </p>
    </div>

    <!-- Options -->
    <div class="grid sm:grid-cols-2 gap-8">
      <label
        v-for="option in protectionHeightOptions"
        :key="option.value"
        class="cursor-pointer bg-white rounded-2xl border transition-all overflow-hidden shadow-sm hover:shadow-md"
        :class="form.config_options['protection_height'] === option.value
          ? 'border-brand-orange ring-2 ring-brand-orange'
          : 'border-gray-200'"
      >
        <input
          type="radio"
          :value="option.value"
          v-model="form.config_options['protection_height']"
          class="hidden"
        />

        <!-- Image -->
        <img
          :src="option.image"
          :alt="option.label"
          class="w-full h-48 object-contain bg-gray-50 p-4"
        />


        <!-- Text -->
        <div class="p-5 space-y-2">
          <p class="text-lg font-semibold text-gray-900">
            {{ option.label }}
          </p>

          <p class="text-sm text-gray-600 leading-relaxed">
            {{ option.description }}
          </p>

          <!-- Extra Information (based on value) -->
          <template v-if="option.value === 'up-to-500mm'">
            <p class="text-xs text-gray-500 mt-2">
              For doors from 3,100 mm width, manual locking must be closed to achieve full protection.
            </p>
          </template>

          <template v-else>
            <p class="text-xs text-gray-500 mt-2">
              Door width is limited to 3,100 mm.
            </p>
          </template>
        </div>
      </label>
    </div>

  </div>
</template>
  
  <script setup>
  import { watch } from 'vue';
  import { protectionHeightOptions } from '@/Data/protectionHeightOptions';

  const { form } = defineProps({
    form: Object
  });

  // AUTO-DETERMINE VERSION BASED ON PROTECTION HEIGHT
  watch(
    () => form.config_options['protection_height'],
    (newValue) => {
      if (!newValue) return;

      if (newValue === "up-to-500mm") {
        form.config_options.version = "V500";
      } else if (newValue === "over-500mm") {
        // version will be determined later in the material step
        form.config_options.version = null;
      }
    }
  );
  </script>

  