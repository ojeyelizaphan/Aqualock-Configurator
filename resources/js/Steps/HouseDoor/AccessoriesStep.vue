<template>
  <div>
    <div class="space-y-10">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Select Accessories</h2>
  
      <!-- Panic Function -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Panic Function</h3>
        <div class="space-y-2">
          <label v-for="option in panicOptions" :key="option.value" class="flex items-start gap-3">
            <input type="checkbox" :value="option.value" v-model="form.config_options.panic_features" class="mt-1" />
            <div>
              <p class="font-medium text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
  
      <!-- KABA Lock -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">KABA Lock</h3>
        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="form.config_options.kaba_lock" />
          <span class="text-gray-800">Add KABA lock (Swiss locking cylinder, no cylinder included)</span>
        </label>
      </div>
  
      <!-- Drip Cap -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Drip Cap</h3>
        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="form.config_options.drip_cap" />
          <span class="text-gray-800">Drip cap mounted on top of the frame</span>
        </label>
      </div>
  
      <!-- Window Options -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Window Type</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <label v-for="option in windowOptions" :key="option.value" class="border rounded-2xl p-4 cursor-pointer"
                 :class="form.config_options.window_type === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-300'">
            <input type="radio" :value="option.value" v-model="form.config_options.window_type" class="hidden" />
            <p class="font-medium text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </label>
        </div>
      </div>
  
      <!-- Fixed Side Panels -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Fixed Side Panels</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="form.config_options.fixed_panel_left" />
            <span class="text-gray-800">Left side panel (100–400 mm)</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="form.config_options.fixed_panel_right" />
            <span class="text-gray-800">Right side panel (100–400 mm)</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="form.config_options.fixed_panel_top" />
            <span class="text-gray-800">Top panel above door (100–400 mm)</span>
          </label>
        </div>
      </div>
  
      <!-- Burglary Protection Level -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Burglary Protection Level</h3>
        <select v-model="form.config_options.burglary_protection" class="w-full rounded-lg border-gray-300 px-4 py-2">
          <option disabled value="">-- Select Protection Level --</option>
          <option value="RC2">RC2</option>
          <option value="RC3">RC3</option>
        </select>
      </div>
  
      <!-- Drive-over Plate -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Drive-over Plate</h3>
        <select v-model="form.config_options.drive_plate" class="w-full rounded-lg border-gray-300 px-4 py-2">
          <option disabled value="">-- Select Plate --</option>
          <option value="aluminium">Aluminium 2mm</option>
          <option value="stainless">Stainless Steel 2mm</option>
        </select>
      </div>
  
      <!-- Door Closer -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Door Closer</h3>
        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="form.config_options.door_closer" />
          <span class="text-gray-800">Add GEZE 5000 Door Closer</span>
        </label>
      </div>
    </div>


    <!-- Flood Protection -->
    <div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Flood Protection</h3>
      <label class="flex items-center gap-3">
        <input type="checkbox" v-model="form.config_options.flood_protection" />
        <span class="text-gray-800">Heavy duty version with flood protection up to 5m</span>
      </label>
    </div>

    <!-- Door Fittings -->
    <div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Door Fittings</h3>

      <!-- Version -->
      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1">Version</label>
        <select v-model="form.config_options.fittings_version" class="w-full rounded-lg border-gray-300 px-4 py-2">
          <option disabled value="">-- Select Fittings Version --</option>
          <option value="V1">V1 – Inside handle only</option>
          <option value="V2">V2 – Inside & outside handle</option>
          <option value="V6">V6 – Inside & outside handle (V6)</option>
        </select>
      </div>

      <!-- Knob Type (only if V2 or V6) -->
      <div v-if="form.config_options.fittings_version === 'V2' || form.config_options.fittings_version === 'V6'" class="mb-4">
        <label class="block font-medium text-gray-700 mb-1">Knob Type</label>
        <select v-model="form.config_options.knob_type" class="w-full rounded-lg border-gray-300 px-4 py-2">
          <option disabled value="">-- Select Knob Type --</option>
          <option value="aluminium">Fixed Aluminium Knob</option>
          <option value="stainless">Fixed Stainless Steel Knob</option>
        </select>
      </div>

      <!-- KABA upgrade -->
      <div>
        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="form.config_options.kaba_upgrade" />
          <span class="text-gray-800">KABA version upgrade</span>
        </label>
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
  
  const panicOptions = [
    {
      value: 'panic_function_e',
      label: 'Panic Function E',
      description: 'For fixed knob on the outside. The door can only be opened from outside with key when espagnolette is open.'
    },
    {
      value: 'pushbar',
      label: 'Pushbar',
      description: 'Enables fast exit, bar-style mechanism on inside.'
    }
  ];
  
  const windowOptions = [
    {
      value: 'non_thermal_transparent',
      label: 'Window (Non-Thermal, Transparent)',
      description: 'Double glazed laminated glass – 650x450 mm'
    },
    {
      value: 'non_thermal_mastercarree',
      label: 'Window (Non-Thermal, Mastercarrée)',
      description: 'Double glazed laminated glass – 650x450 mm'
    },
    {
      value: 'non_thermal_satinato',
      label: 'Window (Non-Thermal, Satinato)',
      description: 'Double glazed laminated glass – 650x450 mm'
    },
    {
      value: 'thermal_transparent',
      label: 'Window (Thermal, Transparent)',
      description: 'Triple glazed laminated glass – 650x450 mm'
    },
    {
      value: 'thermal_mastercarree',
      label: 'Window (Thermal, Mastercarrée)',
      description: 'Triple glazed laminated glass – 650x450 mm'
    },
    {
      value: 'thermal_satinato',
      label: 'Window (Thermal, Satinato)',
      description: 'Triple glazed laminated glass – 650x450 mm'
    }
  ];
  </script>
  
  <style scoped>
  /* Additional tweaks if needed */
  </style>
  