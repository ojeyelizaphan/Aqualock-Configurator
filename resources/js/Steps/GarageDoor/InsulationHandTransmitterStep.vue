<template>
    <div class="space-y-8 max-w-6xl mx-auto">
        <!-- Insulation Section -->
        <div class="border rounded-xl p-6 shadow-sm">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Casing Insulation</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <label
                v-for="option in insulationOptions"
                :key="option.value"
                class="cursor-pointer flex flex-col h-full"
                >
                <input type="radio" :value="option.value" v-model="form.config_options['insulation']" class="hidden" />
                <div
                    :class="{
                    'border-brand-orange border-2': form.config_options['insulation'] === option.value
                    }"
                    class="border rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
                >
                    <img :src="option.image" alt="Insulation option" class="w-full h-32 object-cover rounded-lg mb-3" />
                    <div>
                    <p class="font-semibold text-lg text-gray-800">{{ option.label }}</p>
                    <p class="text-sm text-gray-600">{{ option.description }}</p>
                    </div>
                </div>
                </label>
            </div>
        </div>

    <!-- Hand Transmitters Section -->
    <div class="border rounded-xl p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Hand Transmitters</h2>
        
        <div class="flex flex-col md:flex-row items-center gap-6">
            <!-- Hand Transmitter Images -->
            <div class="w-full md:w-1/2 flex gap-6 justify-center">
            <img
                :src="handTransmitterImage1"
                alt="Hand Transmitter 1"
                class="w-36 h-36 object-contain rounded-lg shadow-md"
            />
            <img
                :src="handTransmitterImage2"
                alt="Hand Transmitter 2"
                class="w-36 h-36 object-contain rounded-lg shadow-md"
            />
            </div>

            <!-- Quantity Input -->
            <div class="w-full md:w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input
                type="number"
                v-model.number="form.config_options.accessories.handTransmitters"
                min="0"
                placeholder="Enter quantity"
                class="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-brand-orange"
            />
            </div>
        </div>
    

    <!-- Drive-over Plate Section -->
    <div class="border rounded-xl p-6 shadow-sm">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Drive-over Plate for Threshold</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <label
        v-for="(label, value) in { stainless: 'Stainless Steel', aluminium: 'Aluminium' }"
        :key="value"
        class="cursor-pointer flex flex-col h-full"
    >
        <input
        type="radio"
        :value="value"
        v-model="form.config_options.accessories.driveOverPlate"
        class="hidden"
        />
        <div
        :class="{
            'border-brand-orange border-2': form.config_options.accessories.driveOverPlate === value
        }"
        class="border rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
        >
        <div>
            <p class="font-semibold text-lg text-gray-800">{{ label }}</p>
            <p class="text-sm text-green-600 mt-1">{{ value === 'stainless' ? '€194 per RMT' : '€148 per RMT' }}</p>
        </div>
        </div>
    </label>
    </div>
</div>

<!-- Included Items -->
<div class="border rounded-xl p-6 shadow-sm">
<h2 class="text-xl font-semibold text-gray-800 mb-3">Included by Default</h2>
<ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
  <li><span class="font-medium">Motor</span> – €866 (automatically included)</li>
  <li><span class="font-medium">Assembly Kit with sealing</span> – €394 (automatically included)</li>
</ul>
</div>

</div>
</div>
  </template>
  
  <script setup>
  import { insulationOptions } from '@/Data/insulationOptions';

  defineProps({
    form: Object,
  });

  const handTransmitterImage2 = 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745484950/transmitters-2_jiobff.jpg'
  const handTransmitterImage1 = 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745485281/transmitters_kty3fk.jpg';
  </script>
  