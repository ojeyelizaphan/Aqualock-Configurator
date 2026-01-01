<template>
  <div class="max-w-6xl mx-auto space-y-10">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Multi Panel System
    </h2>

    <!-- Explanation -->
    <div class="space-y-4 text-gray-700 leading-relaxed">
      <p class="font-medium">
        Solutions for wide openings with a center post or corner mounting.
      </p>

      <p>
        Multiple <span class="font-medium">AquaLOCK® Quickwall</span> panels can be connected using a
        fixed central post (width: <span class="font-medium">60 mm</span>) where a higher level of
        protection is required, e.g. <span class="font-medium">2.5 m wide × 1 m high</span>.
      </p>

      <p>
        The central post is inserted into a stainless steel sleeve embedded in concrete.
        Quickwall panels are then mounted on each side of the post to create a stable and secure barrier.
      </p>

      <p>
        For corner applications, a special corner post can be used to join two Quickwall panels at an
        angle, providing a seamless and strong corner installation.
      </p>
    </div>

    <!-- Subtle divider -->
    <div class="border-t border-gray-200"></div>

    <!-- Inputs + Images -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- LEFT: Input Fields -->
      <div class="space-y-6">
        <div>
          <label class="block font-medium text-gray-800 mb-2">
            Required Quickwall panels
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options.quickwall_panels"
            class="w-full p-3 border border-gray-300 rounded-xl
                   focus:ring-brand-orange focus:border-brand-orange"
            placeholder="Number of panels"
          />
        </div>

        <div>
          <label class="block font-medium text-gray-800 mb-2">
            Required center posts
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options.center_posts"
            class="w-full p-3 border border-gray-300 rounded-xl
                   focus:ring-brand-orange focus:border-brand-orange"
            placeholder="Number of center posts"
          />
        </div>

        <div>
          <label class="block font-medium text-gray-800 mb-2">
            Required corner posts
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options.corner_posts"
            class="w-full p-3 border border-gray-300 rounded-xl
                   focus:ring-brand-orange focus:border-brand-orange"
            placeholder="Number of corner posts"
          />
        </div>
      </div>

      <!-- RIGHT: Reference Images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <img
            :src=img1
            alt="Center post configuration"
            class="w-full h-40 object-contain rounded-xl "
          />
          <p class="text-sm text-gray-600 mt-2 text-center">
            Center post configuration
          </p>
        </div>

        <div>
          <img
            :src=img2
            alt="Corner post configuration"
            class="w-full h-40 object-contain rounded-xl "
          />
          <p class="text-sm text-gray-600 mt-2 text-center">
            Corner post configuration
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


  
  <script setup>
    import img1 from "@/Assets/5-Quickwall/Step-3/panels-1.jpg";
    import img2 from "@/Assets/5-Quickwall/Step-3/panels-2.jpg";
  defineProps({
    form: Object
  });
  </script>
  