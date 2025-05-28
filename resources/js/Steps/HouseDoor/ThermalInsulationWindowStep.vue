<template>
  <div class="space-y-12 max-w-6xl mx-auto px-4">
    <!-- Thermal Insulation -->
    <section>
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Thermal Insulation</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label
          v-for="option in insulationOptions"
          :key="option.value"
          class="cursor-pointer"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options['thermal_insulation']"
            class="hidden"
          />
          <div
            :class="[
              'border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg',
              form.config_options['thermal_insulation'] === option.value
                ? 'border-brand-orange ring-2 ring-brand-orange'
                : 'border-gray-300'
            ]"
          >
            <p class="text-lg font-semibold text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </div>
        </label>
      </div>
    </section>

    <!-- Window Type -->
    <section>
  <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Window Options</h2>
  <div class="flex justify-center gap-6 flex-wrap">
    <label class="cursor-pointer w-44">
      <input
        type="radio"
        value="without"
        v-model="form.config_options['window_type']"
        class="hidden"
      />
      <div
        :class="[
          'flex flex-col justify-center items-center h-36 border rounded-2xl p-4 text-center transition-all duration-300 hover:shadow-lg',
          form.config_options['window_type'] === 'without'
            ? 'border-brand-orange ring-2 ring-brand-orange'
            : 'border-gray-300'
        ]"
      >
        <p class="font-semibold text-gray-800">Without Window</p>
      </div>
    </label>
    <label class="cursor-pointer w-44">
      <input
        type="radio"
        value="with"
        v-model="form.config_options['window_type']"
        class="hidden"
      />
      <div
        :class="[
          'flex flex-col justify-center items-center h-36 border rounded-2xl p-4 text-center transition-all duration-300 hover:shadow-lg',
          form.config_options['window_type'] === 'with'
            ? 'border-brand-orange ring-2 ring-brand-orange'
            : 'border-gray-300'
        ]"
      >
        <p class="font-semibold text-gray-800">With Window</p>
      </div>
    </label>
  </div>
</section>


    <!-- Window Versions -->
    <section v-if="form.config_options['window_type'] === 'with'">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Choose Window Version</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <label
          v-for="option in windowVersions"
          :key="option.value"
          class="cursor-pointer"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options['window_version']"
            class="hidden"
          />
          <div
            :class="[
              'border rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-lg',
              form.config_options['window_version'] === option.value
                ? 'border-brand-orange ring-2 ring-brand-orange'
                : 'border-gray-300'
            ]"
          >
            <img
              :src="option.image"
              :alt="option.label"
              class="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div class="text-center">
              <p class="font-semibold text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </div>
        </label>
      </div>
    </section>
  </div>
</template>

  
  <script setup>
  const props = defineProps({
    form: Object
  });
  
  const insulationOptions = [
    { value: 'thermally_insulated', label: 'Thermally Insulated', description: 'Enhanced thermal efficiency for energy savings.' },
    { value: 'non_thermally_insulated', label: 'Non-Thermally Insulated', description: 'Standard door without thermal break.' }
  ];
  
  const windowVersions = [
    {
      value: 'clear',
      label: 'Clear Glass',
      description: 'Transparent and modern look.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745914933/aqualock-1a_bluavk.jpg'
    },
    {
      value: 'mastercarree',
      label: 'Mastercarrée',
      description: 'Textured for light and privacy.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745914983/aqualock-1b_iyzmdv.jpg'
    },
    {
      value: 'satinato',
      label: 'Satinato (Frosted)',
      description: 'Soft, frosted appearance for privacy.',
      image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745915009/aqualock-1c_oipjw3.jpg'
    }
  ];
  </script>
  