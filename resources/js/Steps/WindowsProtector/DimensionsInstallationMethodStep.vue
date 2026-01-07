<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Dimensions & Installation Method
    </h2>

    <!-- Split layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Dimensions -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Dimensions of the WindowsProtector
        </h3>

        <!-- Description -->
        <div class="space-y-2 text-sm text-gray-600 leading-relaxed">
          <p>
            Please note the maximum size of the wall opening for the
            <strong>WindowsProtector</strong> is
            <strong>1800 × 1800 mm</strong>.
          </p>

          <p>
            <strong>Width of the wall opening:</strong><br />
            Between 300 and 1.800 mm
          </p>

          <p>
            <strong>Height of the wall opening:</strong><br />
            Between 400 and 1.800 mm
          </p>
        </div>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src="img1"
            alt="WindowsProtector dimensions illustration"
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
              min="300"
              max="1800"
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
              max="1800"
              v-model="form.config_options.height"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
            />
          </div>
        </div>
      </div>

      <!-- RIGHT: Installation Method -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          Installation method
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 leading-relaxed">
          The acrylic partition for easy retrofitting is the perfect
          solution for sealing basement and building windows.
          <br /><br />
          Installation can be carried out either on the window frame or
          directly onto the building wall. In both cases, the acrylic
          partition is adhered and sealed using a special acrylic adhesive.
        </p>

        <!-- Illustration -->
        <div class="flex justify-center pt-2">
          <img
            :src="img2"
            alt="WindowsProtector installation illustration"
            class="max-h-40 object-contain"
          />
        </div>

        <!-- Native radio buttons -->
        <div class="space-y-3 pt-4">
          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="on_window_frame"
              v-model="form.config_options.installation_method"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            On the window frame
          </label>

          <label class="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              value="on_opening_wall"
              v-model="form.config_options.installation_method"
              class="text-[#f39200] focus:ring-[#f39200]"
            />
            On the opening wall
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from '@/Assets/8-Windows Protector/Step-1/windows-1a.jpg';
import img2 from '@/Assets/8-Windows Protector/Step-1/windows-1b.jpg';

defineProps({
  form: Object
});
</script>
