<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Accessories
      </h2>
  
      <div class="space-y-8">
        <!-- Optional Add-ons -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Optional Add-ons</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label
              v-for="option in optionalAccessories"
              :key="option.modelKey"
              class="flex items-start gap-3 border p-4 rounded-2xl cursor-pointer transition hover:shadow-md"
              :class="form.config_options.accessories[option.modelKey] ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
            >
              <input
                type="checkbox"
                v-model="form.config_options.accessories[option.modelKey]"
                class="mt-1"
              />
              <div>
                <p class="font-medium text-gray-800">{{ option.label }}</p>
                <p class="text-sm text-gray-600">{{ option.description }}</p>
                <p class="text-sm text-gray-500">+ €{{ option.price }}</p>
              </div>
            </label>

          </div>
        </div>
  
        <!-- Lattice Bar Types -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Lattice Bars</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label
              v-for="lattice in latticeOptions"
              :key="lattice.value"
              class="flex items-start gap-3 border p-4 rounded-2xl cursor-pointer transition hover:shadow-md"
              :class="form.config_options.lattice_bar === lattice.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
            >
              <input
                type="radio"
                name="lattice_bar"
                :value="lattice.value"
                v-model="form.config_options.lattice_bar"
                class="mt-1"
              />
              <div>
                <p class="font-medium text-gray-800">{{ lattice.label }}</p>
                <p class="text-sm text-gray-500">€{{ lattice.price }} / m²</p>
              </div>
            </label>
          </div>
        </div>
  
        <!-- Assembly Kit Info -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Assembly Kit with Sealing</h3>
          <p class="text-sm text-gray-600">
            This item is included by default depending on gate width.
          </p>
          <ul class="list-disc ml-6 mt-2 text-sm text-gray-600">
            <li>Up to 1,500 mm width: €154</li>
            <li>1,501 – 5,000 mm width: €223</li>
            <li>Industrial version: €347</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    form: Object
  });

  // Assign it properly after props is defined
  const form = props.form;

  // Safely initialize the accessories array if it's not already set
  if (!form.config_options.accessories || typeof form.config_options.accessories !== 'object') {
  form.config_options.accessories = {};
}


  const optionalAccessories = [
    {
      modelKey: 'opening180',
      label: '180° Gate Opening',
      description: 'Upgrade from standard 95° to full 180° opening',
      price: 427
    },
    {
      modelKey: 'centralLocking',
      label: 'Central Locking System',
      description: 'Enhanced internal locking system',
      price: 645
    },
    {
      modelKey: 'padlockPreparation',
      label: 'Padlock Preparation',
      description: 'Prepared for padlock use (padlock not included)',
      price: 88
    },
    {
      modelKey: 'durchgriff',
      label: 'Through-Access with Central Locking',
      description: 'Access option when central locking is present',
      price: 479
    }
  ];

  
  const latticeOptions = [
    { value: 'round_extruded', label: 'Round Lattice Bars (Extruded)', price: 638 },
    { value: 'angular_extruded', label: 'Angular Lattice Bars (Extruded)', price: 638 },
    { value: 'round_forged', label: 'Round Lattice Bars (Forged)', price: 771 },
    { value: 'angular_forged', label: 'Angular Lattice Bars (Forged)', price: 771 }
  ];
  </script>
  