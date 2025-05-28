<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
      Accessories
    </h2>

    <div
      v-for="(item, index) in accessories"
      :key="index"
      class="mb-8"
    >
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
      <p class="text-sm text-gray-600 mb-3">{{ item.description }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="text-lg font-semibold text-gray-800">€{{ item.price }}</span>
          <span class="text-sm text-gray-600">{{ item.unit }}</span>
        </div>
        <input
          type="number"
          min="0"
          class="w-24 p-2 border border-gray-300 rounded-lg text-sm focus:ring-brand-orange focus:border-brand-orange"
          v-model.number="form.config_options.accessory_quantities[item.key]"
          placeholder="Qty"
        />
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  const props = defineProps({
    form: Object
  });

  const { form } = props;

  // Accessory list definition
  const accessories = [
    {
      key: 'assembly_kit',
      title: 'Assembly Kit with Sealing',
      description: 'This kit includes the necessary assembly parts for proper sealing. It is required for installation.',
      price: 132,
      unit: 'Per Set'
    },
    {
      key: 'colour_coating',
      title: 'Colour Coating for Corner Profiles',
      description: 'Provides additional aesthetic appeal and protection to the corner profiles, with a variety of RAL color options.',
      price: 86,
      unit: 'Per Piece'
    },
    {
      key: 'bottom_plate',
      title: 'Bottom Plate',
      description: 'Used to even out floor irregularities and protect the lower joint from friction damage.',
      price: 71,
      unit: 'Per RMT'
    },
    {
      key: 'quickwall_hooks',
      title: 'Hooks for Storing the Quickwall Panel',
      description: 'These hooks store the Quickwall panel when not in use.',
      price: 11,
      unit: 'Per Piece'
    }
  ];

  // Initialize the quantity object if not already defined
  if (!form.config_options.accessory_quantities) {
    form.config_options.accessory_quantities = {};
    accessories.forEach(a => form.config_options.accessory_quantities[a.key] = 0);
  }
  </script>

  