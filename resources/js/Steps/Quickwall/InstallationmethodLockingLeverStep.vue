<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Installation Method & Locking Lever Position
      </h2>
  
      <!-- Locking Lever Position -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Locking Lever Position (viewed from outside)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            class="border rounded-xl p-4 text-center cursor-pointer transition hover:shadow-md"
            :class="form.config_options.locking_lever_position === 'right' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              value="right"
              v-model="form.config_options.locking_lever_position"
              class="sr-only"
            />
            Right Side
          </label>
  
          <label
            class="border rounded-xl p-4 text-center cursor-pointer transition hover:shadow-md"
            :class="form.config_options.locking_lever_position === 'left' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              value="left"
              v-model="form.config_options.locking_lever_position"
              class="sr-only"
            />
            Left Side
          </label>
        </div>
      </div>
  
      <!-- Installation Method -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Installation Method</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <label
            class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition"
            :class="form.config_options.installation_method === 'in_front' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              value="in_front"
              v-model="form.config_options.installation_method"
              class="sr-only"
            />
            <img src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745930785/front-of-the-reveal_nkitxo.jpg" alt="In Front of Reveal" class="w-full h-40 object-cover" />
            <div class="p-4 text-center font-medium text-gray-700">In Front of the Reveal</div>
          </label>
  
          <label
            class="border rounded-xl cursor-pointer overflow-hidden hover:shadow-md transition"
            :class="form.config_options.installation_method === 'between' ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
          >
            <input
              type="radio"
              value="between"
              v-model="form.config_options.installation_method"
              class="sr-only"
            />
            <img src="https://res.cloudinary.com/ducskpmnn/image/upload/v1745930774/between-of-the-reveal_yhujwz.jpg" alt="Between Reveal" class="w-full h-40 object-cover" />
            <div class="p-4 text-center font-medium text-gray-700">Between the Reveal</div>
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
  