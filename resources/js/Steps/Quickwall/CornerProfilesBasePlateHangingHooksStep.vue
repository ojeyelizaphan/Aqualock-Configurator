<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Corner Profiles, Base Plate, Hanging Hooks
      </h2>
  
      <!-- Base Plate Option -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Base Plate</h3>
        <p class="text-sm text-gray-600 mb-4">The optional base plate evens out floor irregularities and is applied directly onto the existing floor. Highly recommended to protect the lower joint from friction damage.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.base_plate === 'with' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
            <input type="radio" value="with" v-model="form.config_options.base_plate" class="sr-only" />
            <div class="p-4 text-center">
              <p class="font-semibold text-gray-800">With Base Plate</p>
            </div>
          </label>
  
          <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.base_plate === 'without' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
            <input type="radio" value="without" v-model="form.config_options.base_plate" class="sr-only" />
            <div class="p-4 text-center">
              <p class="font-semibold text-gray-800">Without Base Plate</p>
            </div>
          </label>
        </div>
      </div>
  
      <!-- Corner Profiles Option -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Corner Profiles</h3>
        <p class="text-sm text-gray-600 mb-4">The corner profiles serve as an adjustment aid and support when inserting the Quickwall panel and also provide an optimum sealing surface. This helps level out slopes and angularities on the buildings.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.corner_profiles === 'with' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
            <input type="radio" value="with" v-model="form.config_options.corner_profiles" class="sr-only" />
            <div class="p-4 text-center">
              <p class="font-semibold text-gray-800">With Corner Profiles</p>
            </div>
          </label>
  
          <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.corner_profiles === 'without' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
            <input type="radio" value="without" v-model="form.config_options.corner_profiles" class="sr-only" />
            <div class="p-4 text-center">
              <p class="font-semibold text-gray-800">Without Corner Profiles</p>
            </div>
          </label>
        </div>
  
        <!-- Color Coating Option -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Color Coating of the Corner Profiles</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.corner_profiles_coloring === 'without' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
              <input type="radio" value="without" v-model="form.config_options.corner_profiles_coloring" class="sr-only" />
              <div class="p-4 text-center">
                <p class="font-semibold text-gray-800">Without Color Coating</p>
                <p class="text-sm text-gray-600">Anodized aluminum finish.</p>
              </div>
            </label>
  
            <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.corner_profiles_coloring === 'with' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
              <input type="radio" value="with" v-model="form.config_options.corner_profiles_coloring" class="sr-only" />
              <div class="p-4 text-center">
                <p class="font-semibold text-gray-800">With Color Coating</p>
                <p class="text-sm text-gray-600">RAL color options available.</p>
              </div>
            </label>
          </div>
        </div>
      </div>
  
      <!-- Hanging Hooks Option -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Hooks for Hanging / Storing the Quickwall Panel</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.hanging_hooks === 'with' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
            <input type="radio" value="with" v-model="form.config_options.hanging_hooks" class="sr-only" />
            <div class="p-4 text-center">
              <p class="font-semibold text-gray-800">With Hooks</p>
            </div>
          </label>
  
          <label class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition" :class="form.config_options.hanging_hooks === 'without' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'">
            <input type="radio" value="without" v-model="form.config_options.hanging_hooks" class="sr-only" />
            <div class="p-4 text-center">
              <p class="font-semibold text-gray-800">Without Hooks</p>
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
  </script>
  