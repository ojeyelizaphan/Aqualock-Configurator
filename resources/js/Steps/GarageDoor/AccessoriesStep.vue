<template>
    <div class="space-y-10 max-w-5xl mx-auto">
      <!-- Panelling -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Panelling (inside of the door)</h2>
        <div class="space-y-3 pl-2">
          <label class="flex items-center text-gray-700">
            <input type="radio" value="" v-model="form.config_options.accessories.panelling" class="mr-3 accent-brand-orange" />
            No panelling
          </label>
          <label class="flex items-center text-gray-700">
            <input type="radio" value="uninsulated" v-model="form.config_options.accessories.panelling" class="mr-3 accent-brand-orange" />
            Panelling without insulation (€142/m²)
          </label>
          <label class="flex items-center text-gray-700">
            <input type="radio" value="insulated" v-model="form.config_options.accessories.panelling" class="mr-3 accent-brand-orange" />
            Panelling with insulation (40mm) (€174/m²)
          </label>
        </div>
      </div>
  
      <!-- Glazing -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Choose Glazing</h2>
  
        <!-- Toggle: Windows -->
        <div class="mb-4">
          <label class="flex items-center gap-2 text-gray-700 font-medium">
            <input type="checkbox" v-model="enableWindows" class="accent-brand-orange" />
            Add Windows (650x450 mm)
          </label>
        </div>
  
        <!-- Windows Options -->
        <div v-if="enableWindows">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label
              v-for="option in glazingOptions.filter(opt => opt.type === 'window')"
              :key="option.value"
              class="cursor-pointer border rounded-2xl p-4 hover:shadow-md transition-shadow flex gap-4"
            >
              <input
                type="radio"
                name="windowOption"
                :value="option"
                v-model="selectedWindow"
                class="accent-brand-orange mt-1"
              />
              <div>
                <p class="font-semibold text-gray-800">{{ option.label }}</p>
                <p class="text-sm text-gray-600">
                  {{ option.insulation ? 'With insulation' : 'Without insulation' }}
                </p>
                <p class="text-sm text-green-600 mt-1">€{{ option.price }} / piece</p>
              </div>
            </label>
          </div>
        </div>
  
        <!-- Toggle: Glass Stripes -->
        <div class="mt-8 mb-4">
          <label class="flex items-center gap-2 text-gray-700 font-medium">
            <input type="checkbox" v-model="enableStripe" class="accent-brand-orange" />
            Add Glass Stripes (height 400 mm)
          </label>
        </div>
  
        <!-- Stripe Options -->
        <div v-if="enableStripe">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label
              v-for="option in glazingOptions.filter(opt => opt.type === 'stripe')"
              :key="option.value"
              class="cursor-pointer border rounded-2xl p-4 hover:shadow-md transition-shadow flex gap-4"
            >
              <input
                type="radio"
                name="stripeOption"
                :value="option"
                v-model="selectedStripe"
                class="accent-brand-orange mt-1"
              />
              <div>
                <p class="font-semibold text-gray-800">{{ option.label }}</p>
                <p class="text-sm text-gray-600">
                  {{ option.insulation ? 'With insulation' : 'Without insulation' }}
                </p>
                <p class="text-sm text-green-600 mt-1">€{{ option.price }} / m²</p>
              </div>
            </label>
          </div>
  
          <!-- Stripe Length -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Stripe Length (in meters)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              v-model.number="form.config_options.accessories.glazing.stripe.length"
              class="w-48 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
        </div>
      </div>
  
      <!-- Extra Cost -->
      <div v-if="accessoryExtraCost > 0" class="text-red-600 text-sm font-medium mt-4">
        Extra charge for accessories: €{{ accessoryExtraCost }}
      </div>
    </div>
  </template>

  
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  
  const props = defineProps({
    form: Object,
    glazingOptions: Array,
    accessoryExtraCost: Number
  })
  
  const enableWindows = ref(false)
  const enableStripe = ref(false)
  
  const selectedWindow = ref(null)
  const selectedStripe = ref(null)
  
  function ensureGlazingStructure() {
    if (!props.form.config_options.accessories) {
      props.form.config_options.accessories = {}
    }
    if (!props.form.config_options.accessories.glazing) {
      props.form.config_options.accessories.glazing = {
        windows: [],
        stripe: { type: '', length: 0, insulated: false }
      }
    }
  }
  
  // --- Window selection handlers ---
  function toggleWindow(option) {
    ensureGlazingStructure()
    const windows = props.form.config_options.accessories.glazing.windows;
    const exists = windows.find(w => w.value === option.value);
    if (exists) {
      props.form.config_options.accessories.glazing.windows = windows.filter(w => w.value !== option.value);
    } else {
      props.form.config_options.accessories.glazing.windows.push(option);
    }
  }
  
  function isWindowSelected(option) {
    ensureGlazingStructure()
    return props.form.config_options.accessories.glazing.windows.some(w => w.value === option.value);
  }
  
  // --- Stripe syncing ---
  watch(selectedStripe, (val) => {
    ensureGlazingStructure()
    if (val) {
      props.form.config_options.accessories.glazing.stripe.type = val.label;
      props.form.config_options.accessories.glazing.stripe.insulated = val.insulation;
      props.form.config_options.accessories.glazing.stripe.unit = val.unit;
      props.form.config_options.accessories.glazing.stripe.value = val.value;
      props.form.config_options.accessories.glazing.stripe.price = val.price;
    } else {
      props.form.config_options.accessories.glazing.stripe = {
        type: null,
        length: null,
        insulated: false
      };
    }
  })
  
  // --- Initialize when step loads ---
  onMounted(() => {
    ensureGlazingStructure()
  
    if (props.form.config_options.accessories.glazing.windows?.length) {
      enableWindows.value = true;
    }
  
    if (props.form.config_options.accessories.glazing.stripe?.type) {
      selectedStripe.value = {
        label: props.form.config_options.accessories.glazing.stripe.type,
        insulation: props.form.config_options.accessories.glazing.stripe.insulated,
        unit: props.form.config_options.accessories.glazing.stripe.unit,
        value: props.form.config_options.accessories.glazing.stripe.value,
        price: props.form.config_options.accessories.glazing.stripe.price
      };
      enableStripe.value = true;
    }
  })
  </script>
  
  