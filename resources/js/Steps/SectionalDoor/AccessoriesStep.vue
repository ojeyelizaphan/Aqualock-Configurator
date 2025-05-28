<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Accessories
      </h2>
  
      <!-- Optional Accessories -->
      <div class="space-y-6">
        <OptionCheckbox
          v-model="form.config_options['aluminumBasePlate']"
          label="Aluminum base plate"
          price="42 € / RMT"
        />
        <OptionCheckbox
          v-model="form.config_options['stainlessBasePlate']"
          label="Stainless steel base plate"
          price="148 € / RMT"
        />
  
        <OptionRadioGroup
          label="Pre-mounted Upgrade Kit"
          v-model="form.config_options['upgradeKit']"
          :options="[
            { value: 'upTo3m', label: 'Width up to 3 m – 272 €' },
            { value: 'upTo6m', label: 'Width up to 6 m – 348 €' },
            { value: 'none', label: 'No upgrade kit' }
          ]"
        />
  
        <OptionCheckbox
          v-model="form.config_options['stainlessTracks']"
          label="Stainless steel tracks"
          price="282 € / set"
        />
  
        <!-- Hand Transmitter Quantity -->
        <div class="max-w-sm">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Hand transmitter quantity (60 € each)
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options['handTransmitterQty']"
            class="w-full border rounded-lg p-2 focus:ring-[#f39200] focus:border-[#f39200]"
          />
        </div>
  
        <OptionCheckbox
          v-model="form.config_options['customColourProfiles']"
          label="Steel corners & aluminium profiles – customized colour"
          price="421 € / set"
        />
      </div>
  
      <!-- Always-included items -->
      <div class="mt-10 border-t pt-6 text-gray-600 text-sm">
        <p class="mb-1">🔧 <strong>Motor:</strong> Always included (651 €)</p>
        <p>🧰 <strong>Assembly kit with sealing:</strong> Always included (246 €)</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import OptionRadioGroup from '@/Components/OptionRadioGroup.vue';
  import OptionCheckbox from '@/Components/OptionCheckbox.vue';
  defineProps({
    form: Object
  });
  </script>
  