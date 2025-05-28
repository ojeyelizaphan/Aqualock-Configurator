<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Choice of Base Plate
      </h2>
  
      <!-- Aluminum Base Plate -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          Aluminum Base Plate (Glued on the Floor)
        </h3>

        <!-- Single Representative Image -->
        <div class="w-full mb-6">
          <img
            src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745933314/sectional-2a_iibls4.jpg"
            alt="Aluminum Base Plate"
            class="w-full max-w-md mx-auto rounded-xl shadow-md object-contain"
          />
        </div>

        <!-- Two Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <label
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border p-4 text-center"
            :class="form.config_options['aluminumBasePlate'] === 'withAluminum' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="'withAluminum'"
              v-model="form.config_options['aluminumBasePlate']"
              class="sr-only"
            />
            <p class="text-lg font-semibold text-gray-800">With Aluminum Base Plate</p>
          </label>

          <label
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border p-4 text-center"
            :class="form.config_options['aluminumBasePlate'] === 'withoutAluminum' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="'withoutAluminum'"
              v-model="form.config_options['aluminumBasePlate']"
              class="sr-only"
            />
            <p class="text-lg font-semibold text-gray-800">Without Aluminum Base Plate</p>
          </label>
        </div>
      </div>

  
      <!-- Stainless Steel Base Plate -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          Stainless Steel Base Plate (Embedded in Concrete)
        </h3>

        <!-- Single Representative Image -->
        <div class="w-full mb-6">
          <img
            src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745933325/sectional-2b_f8urux.jpg"
            alt="Stainless Steel Base Plate"
            class="w-full max-w-md mx-auto rounded-xl shadow-md object-contain"
          />
        </div>

        <!-- Two Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <label
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border p-4 text-center"
            :class="form.config_options['stainlessSteelBasePlate'] === 'withStainlessSteel' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="'withStainlessSteel'"
              v-model="form.config_options['stainlessSteelBasePlate']"
              class="sr-only"
            />
            <p class="text-lg font-semibold text-gray-800">With Stainless Steel Base Plate</p>
          </label>

          <label
            class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border p-4 text-center"
            :class="form.config_options['stainlessSteelBasePlate'] === 'withoutStainlessSteel' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="'withoutStainlessSteel'"
              v-model="form.config_options['stainlessSteelBasePlate']"
              class="sr-only"
            />
            <p class="text-lg font-semibold text-gray-800">Without Stainless Steel Base Plate</p>
          </label>
        </div>
      </div>

    </div>
  </template>
  
  <script setup>
  defineProps({
    form: Object
  });
  </script>
  