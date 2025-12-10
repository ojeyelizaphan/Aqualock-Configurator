<template>
  <div v-if="form.config_options?.accessories" class="max-w-6xl mx-auto space-y-10">

    <!-- Casing & Hand Transmitters Section -->
    <div class="flex flex-col sm:flex-row gap-6">

      <!-- Casing & Insulation -->
      <div class="sm:w-1/2 border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">Casing & Insulation</h2>
        <p class="text-sm text-gray-600 text-center leading-relaxed mb-4">
          The inside of the door is lined with smooth aluminum sheet metal, painted in your chosen color.
          The casing reduces condensation and increases insulation value. You may also choose to insulate your door.
        </p>

        <div class="flex flex-col sm:flex-row gap-6">
            <div class="flex-1 space-y-3 pl-2">
            <label
                v-for="option in insulationOptions"
                :key="option.value"
                class="flex items-center text-gray-700 cursor-pointer"
            >
                <input
                type="radio"
                :value="option.value"
                v-model="form.config_options['insulation']"
                class="mr-3 accent-brand-orange"
                />
                {{ option.label }}
            </label>
            </div>

            <!-- Reference Image -->
            <div class="hidden sm:flex w-40 h-40 border rounded-lg overflow-hidden items-center justify-center">
            <img :src="casing" alt="Up-and-over door without insulation" class="w-full h-full object-cover" />
            </div>
            
        </div>
      </div>

      <!-- Hand Transmitters -->
      <div class="sm:w-1/2 border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">Hand-held Transmitters</h2>
        <p class="text-sm text-gray-600 text-center mb-4">
          How many radio hand-held transmitters do you need for your AquaLOCK® garage door?
        </p>

        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <!-- Images -->
            <div class="w-full md:w-1/2 flex gap-6 justify-center md:justify-start">
                <img
                :src="handTransmitterImage1"
                alt="Up-and-over door"
                class="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-lg shadow-md"
                />
                <img
                :src="handTransmitterImage2"
                alt="TBS radio remote control"
                class="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-lg shadow-md"
                />
            </div>

            <!-- Quantity Input -->
            <div class="w-full md:w-1/2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                Number of hand-held transmitters
                </label>
                <input
                type="number"
                v-model.number="form.config_options.accessories.handTransmitters"
                min="0"
                placeholder="Enter quantity"
                class="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-brand-orange"
                />
            </div>
        </div>

      </div>
    </div>

    <!-- Drive-over Plate & Glazing Section -->
    <div class="flex flex-col sm:flex-row gap-6">

      <!-- Drive-over Plate -->
      <div class="sm:w-1/2 border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">Drive-over Plate for Threshold</h2>
        <div class="space-y-3 pl-2">
          <label
            v-for="(label, value) in { stainless: 'Stainless Steel', aluminium: 'Aluminium' }"
            :key="value"
            class="flex items-center text-gray-700 cursor-pointer"
          >
            <input
              type="radio"
              :value="value"
              v-model="form.config_options.accessories.driveOverPlate"
              class="mr-3 accent-brand-orange"
            />
            <div>
              <p class="font-semibold">{{ label }}</p>
              <p class="text-sm text-green-600 mt-1">{{ value === 'stainless' ? '€194 per RMT' : '€148 per RMT' }}</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Glazing Options -->
      <div class="sm:w-1/2 border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">Choose Glazing</h2>

        <!-- Windows -->
        <label class="flex items-center gap-2 text-gray-700 font-medium">
          <input type="checkbox" v-model="enableWindows" class="accent-brand-orange" />
          Add Windows (650x450 mm)
        </label>
        <div v-if="enableWindows" class="space-y-3 pl-2">
          <label
            v-for="option in glazingOptions.filter(opt => opt.type === 'window')"
            :key="option.value"
            class="flex items-center text-gray-700 cursor-pointer"
          >
            <input
              type="radio"
              :value="option"
              v-model="selectedWindow"
              class="mr-3 accent-brand-orange"
            />
            {{ option.label }} - €{{ option.price }} / piece
          </label>
        </div>

        <!-- Glass Stripes -->
        <label class="flex items-center gap-2 text-gray-700 font-medium mt-4">
          <input type="checkbox" v-model="enableStripe" class="accent-brand-orange" />
          Add Glass Stripes (height 400 mm)
        </label>
        <div v-if="enableStripe" class="space-y-3 pl-2">
          <label
            v-for="option in glazingOptions.filter(opt => opt.type === 'stripe')"
            :key="option.value"
            class="flex items-center text-gray-700 cursor-pointer"
          >
            <input
              type="radio"
              :value="option"
              v-model="selectedStripe"
              class="mr-3 accent-brand-orange"
            />
            {{ option.label }} - €{{ option.price }} / m²
          </label>

          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Stripe Length (m)</label>
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

    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { glazingOptions } from '@/Data/glazingOptions'
import { insulationOptions } from '@/Data/insulationOptions'
import imgTransmitters from '@/Assets/2-Up-and-over door - Steps/step-4/transmitters.jpg';
import imgTransmitters2 from '@/Assets/2-Up-and-over door - Steps/step-4/transmitters-2.jpg';
import imgCasing from '@/Assets/2-Up-and-over door - Steps/step-4/casing.jpg';


const props = defineProps({
  form: Object,
  accessoryExtraCost: Number
})


const enableWindows = ref(false)
const enableStripe = ref(false)
const selectedWindow = ref(null)
const selectedStripe = ref(null)

const handTransmitterImage2 = imgTransmitters2;
const handTransmitterImage1 = imgTransmitters;
const casing = imgCasing;

// Initialize glazing structure
function ensureGlazingStructure() {
  const accessories = props.form.config_options.accessories ||= {}
  const glazing = accessories.glazing ||= {
    windows: [],
    stripe: { type: '', length: 0, insulated: false }
  }
}

// Stripe selection watcher
watch(selectedStripe, (val) => {
  ensureGlazingStructure()
  const stripe = props.form.config_options.accessories.glazing.stripe
  if (val) {
    stripe.type = val.label
    stripe.insulated = val.insulation
    stripe.unit = val.unit
    stripe.value = val.value
    stripe.price = val.price
  } else {
    stripe.type = null
    stripe.length = null
    stripe.insulated = false
  }
})

onMounted(() => {
  ensureGlazingStructure()
  const glazing = props.form.config_options.accessories.glazing
  if (glazing.windows?.length) enableWindows.value = true
  if (glazing.stripe?.type) {
    selectedStripe.value = {
      label: glazing.stripe.type,
      insulation: glazing.stripe.insulated,
      unit: glazing.stripe.unit,
      value: glazing.stripe.value,
      price: glazing.stripe.price
    }
    enableStripe.value = true
  }
})
</script>
