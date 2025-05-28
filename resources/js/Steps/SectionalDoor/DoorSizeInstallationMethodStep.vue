<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Door Size & Installation Method
      </h2>

      <!-- Motor Option -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Motor Option</h3>
        <p class="text-sm text-gray-600 mb-4">
          Please choose whether the sectional door includes a motor.
        </p>
        <div class="flex gap-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              :value="true"
              v-model="form.config_options['motor']"
              class="form-radio"
            />
            <span class="text-gray-800 font-medium">With Motor</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              :value="false"
              v-model="form.config_options['motor']"
              class="form-radio"
            />
            <span class="text-gray-800 font-medium">Without Motor</span>
          </label>
        </div>
      </div>

  
      <!-- Door Size -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Door Size</h3>
      <p class="text-sm text-gray-600 mb-4">
        Please note the maximum size of the wall opening for the sectional door! The minimum reveal size inside is 90 mm, otherwise additional tubes are required.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <label for="width" class="block text-sm font-semibold text-gray-800 mb-2">Width of the Wall Opening:</label>
          <select
            id="width"
            v-model="form.config_options['width']"
            class="w-full p-2 border rounded-lg"
          >
            <option disabled value="">Select width (mm)</option>
            <option v-for="w in availableWidths" :key="w" :value="w">{{ w }} mm</option>
          </select>
        </div>
        <div>
          <label for="height" class="block text-sm font-semibold text-gray-800 mb-2">Height of the Wall Opening:</label>
          <select
            id="height"
            v-model="form.config_options['height']"
            class="w-full p-2 border rounded-lg"
          >
            <option disabled value="">Select height (mm)</option>
            <option v-for="h in availableHeights" :key="h" :value="h">{{ h }} mm</option>
          </select>
        </div>
        <div>
          <label for="waterProtectionHeight" class="block text-sm font-semibold text-gray-800 mb-2">Water Protection Height:</label>
          <input
            type="number"
            id="waterProtectionHeight"
            v-model="form.config_options['waterProtectionHeight']"
            min="0"
            max="500"
            class="w-full p-2 border rounded-lg"
            placeholder="Up to 500 mm"
          />
        </div>
      </div>
    </div>
  
      <!-- Installation Method -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Installation Method</h3>
        <p class="text-sm text-gray-600 mb-4">
          Choose the method for installing the sectional door.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden">
            <input
              type="radio"
              :value="'behind'"
              v-model="form.config_options['installationMethod']"
              class="hidden"
            />
            <img
              src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745932515/sectional-1c_rlx64p.jpg"
              alt="Behind the Reveal"
              class="w-full h-48 object-contain bg-white"
            />
            <div class="p-4">
              <p class="text-lg font-semibold text-gray-800">Behind the Reveal</p>
            </div>
          </label>
  
          <label class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden">
            <input
              type="radio"
              :value="'between'"
              v-model="form.config_options['installationMethod']"
              class="hidden"
            />
            <img
              src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745932506/sectional-1b_jfshft.jpg"
              alt="Between the Reveal"
              class="w-full h-48 object-contain bg-white"
            />
            <div class="p-4">
              <p class="text-lg font-semibold text-gray-800">Between the Reveal</p>
              <p class="text-sm text-gray-600">Tubes may be required</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    form: Object
  });

  const availableWidths = [
  2000, 2125, 2250, 2375, 2500, 2625, 2750, 2875, 3000, 
  3125, 3250, 3375, 3500, 3625, 3750, 3875, 4000, 
  4125, 4250, 4375, 4500, 4625, 4750, 4875, 5000, 
  5125, 5250, 5375, 5500, 5625, 5750, 5875, 6000
  ];

  const availableHeights = [
    2000, 2125, 2250, 2375,
    2500, 2625, 2750, 2875, 3000
  ];
  </script>
  