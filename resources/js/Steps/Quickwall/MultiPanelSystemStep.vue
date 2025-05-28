<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Multi Panel System
      </h2>
  
      <!-- Multi Panel System Explanation -->
      <div class="mb-8">
        <p class="text-lg text-gray-800 mb-4">
          For applications where a corner is required, a special corner post can be used to join two Quickwall panels at an angle, providing a seamless and strong corner installation.
        </p>
      </div>
  
      <!-- Panel, Center Post & Corner Post Selection -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Required Quickwall Panels</h3>
        <input
          type="number"
          v-model="form.config_options.quickwall_panels"
          min="1"
          class="w-full px-4 py-2 border rounded-lg text-lg"
          placeholder="Enter number of panels required"
        />
      </div>
  
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Required Center Posts</h3>
        <input
          type="number"
          v-model="form.config_options.center_posts"
          min="1"
          class="w-full px-4 py-2 border rounded-lg text-lg"
          placeholder="Enter number of center posts required"
        />
      </div>
  
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Required Corner Posts</h3>
        <input
          type="number"
          v-model="form.config_options.corner_posts"
          min="1"
          class="w-full px-4 py-2 border rounded-lg text-lg"
          placeholder="Enter number of corner posts required"
        />
      </div>
  
      <!-- Images for Corner & Center Post -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <label
          class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition"
          :class="form.config_options.multi_panel_image === 'corner' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            value="corner"
            v-model="form.config_options.multi_panel_image"
            class="sr-only"
          />
          <img src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745930947/panels-2_uezq6t.jpg" alt="Corner Post" class="w-full h-40 object-cover" />
          <div class="p-4 text-center font-medium text-gray-700">Corner Post</div>
        </label>
  
        <label
          class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition"
          :class="form.config_options.multi_panel_image === 'center' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            value="center"
            v-model="form.config_options.multi_panel_image"
            class="sr-only"
          />
          <img src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745930937/panels-1_ylj9lx.jpg" alt="Center Post" class="w-full h-40 object-cover" />
          <div class="p-4 text-center font-medium text-gray-700">Center Post</div>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    form: Object
  });
  </script>
  