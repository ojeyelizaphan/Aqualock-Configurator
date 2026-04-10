<template>
  <div v-if="form.config_options?.accessories" class="max-w-6xl mx-auto space-y-10">

    <!-- Included by default -->
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h2 class="text-lg font-semibold text-amber-900 mb-2">
          Included by default
        </h2>
        <p class="text-sm text-amber-800 mb-4">
          For this door configuration, the following items are automatically included and added to the total price.
        </p>

        <div class="space-y-3">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-gray-900">Motor</p>
              <p class="text-sm text-gray-600">No option required — always included.</p>
            </div>
            <p class="font-semibold text-gray-900 whitespace-nowrap">€651 / piece</p>
          </div>

          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-gray-900">Assembly kit with sealing</p>
              <p class="text-sm text-gray-600">No option required — always included.</p>
            </div>
            <p class="font-semibold text-gray-900 whitespace-nowrap">€334 / piece</p>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-amber-200 flex items-center justify-between">
          <p class="text-sm font-medium text-amber-900">Automatically added total</p>
          <p class="text-lg font-bold text-amber-900">€985</p>
        </div>
      </div>

    <!-- Cladding & Hand Transmitters Section -->
    <div class="flex flex-col sm:flex-row gap-6">

      <!-- Cladding & Insulation -->
      <div class="sm:w-1/2 border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">Cladding & Insulation</h2>
        <p class="text-sm text-gray-600 text-center leading-relaxed mb-4">
          The inside of the door is lined with smooth aluminum sheet metal, painted in your chosen color.
          The cladding reduces condensation and increases insulation value. You may also choose to insulate your door.
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
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Drive-over Plate for Threshold
        </h2>

        <div class="space-y-3 pl-2">
          <label
            v-for="(label, value) in {
              none: 'Without',
              stainless: 'Stainless Steel',
              aluminium: 'Aluminium'
            }"
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
              <p class="text-sm text-green-600 mt-1">
                {{
                  value === 'stainless'
                    ? '€165 per RMT'
                    : value === 'aluminium'
                    ? '€125 per RMT'
                    : 'No extra cost'
                }}
              </p>
            </div>
          </label>
        </div>
      </div>

      <!-- Glazing Options -->
      <div class="sm:w-1/2 border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Choose Glazing
        </h2>

        <!-- Windows -->
        <label class="flex items-center gap-2 text-gray-700 font-medium">
          <input type="checkbox" v-model="enableWindows" class="accent-brand-orange" />
          Add Windows (650x450 mm)
        </label>

        <div v-if="enableWindows" class="space-y-4 pl-2">
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

          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Number of windows
            </label>
            <input
              type="number"
              min="1"
              v-model.number="form.config_options.accessories.glazing.windows.quantity"
              class="w-48 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              placeholder="Enter quantity"
            />
          </div>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Stripe Length (mm)
            </label>
            <input
              type="text"
              :value="calculatedStripeLength"
              readonly
              class="w-48 border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
            />
            <p class="text-xs text-gray-500 mt-1">
              Automatically calculated as door width - 370 mm. Quantity: 1 piece.
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { glazingOptions } from '@/Data/glazingOptions'
import { insulationOptions } from '@/Data/insulationOptions'
import imgTransmitters from '@/Assets/2-Up-and-over door - Steps/step-4/transmitters.jpg'
import imgTransmitters2 from '@/Assets/2-Up-and-over door - Steps/step-4/transmitters-2.jpg'
import imgCasing from '@/Assets/2-Up-and-over door - Steps/step-4/casing.jpg'

const props = defineProps({
  form: Object,
  accessoryExtraCost: Number
})

const enableWindows = ref(false)
const enableStripe = ref(false)
const selectedWindow = ref(null)
const selectedStripe = ref(null)

const handTransmitterImage2 = imgTransmitters2
const handTransmitterImage1 = imgTransmitters
const casing = imgCasing

const calculatedStripeLength = computed(() => {
  const width = Number(props.form.config_options?.width || 0)
  if (!width) return ''
  return Math.max(width - 370, 0)
})

function ensureGlazingStructure() {
  const accessories = props.form.config_options.accessories ||= {}

  if (!accessories.driveOverPlate) {
    accessories.driveOverPlate = 'none'
  }

  accessories.handTransmitters ??= 0
  props.form.config_options.insulation ??= 'none'

  const glazing = accessories.glazing ||= {
    windows: {
      type: null,
      quantity: 0,
      insulated: false,
      unit: null,
      value: null,
      price: null
    },
    stripe: {
      type: null,
      length: 0,
      insulated: false,
      unit: null,
      value: null,
      price: null
    }
  }
}

watch(selectedWindow, (val) => {
  ensureGlazingStructure()
  const windows = props.form.config_options.accessories.glazing.windows

  if (val) {
    windows.type = val.label
    windows.insulated = val.insulation
    windows.unit = val.unit
    windows.value = val.value
    windows.price = val.price

    if (!windows.quantity || windows.quantity < 1) {
      windows.quantity = 1
    }
  } else {
    windows.type = null
    windows.quantity = 0
    windows.insulated = false
    windows.unit = null
    windows.value = null
    windows.price = null
  }
})

watch(enableWindows, (enabled) => {
  ensureGlazingStructure()
  const windows = props.form.config_options.accessories.glazing.windows

  if (!enabled) {
    selectedWindow.value = null
    windows.type = null
    windows.quantity = 0
    windows.insulated = false
    windows.unit = null
    windows.value = null
    windows.price = null
  }
})

watch(selectedStripe, (val) => {
  ensureGlazingStructure()
  const stripe = props.form.config_options.accessories.glazing.stripe

  if (val) {
    stripe.type = val.label
    stripe.insulated = val.insulation
    stripe.unit = val.unit
    stripe.value = val.value
    stripe.price = val.price
    stripe.length = Math.max(Number(props.form.config_options?.width || 0) - 370, 0)
  } else {
    stripe.type = null
    stripe.length = 0
    stripe.insulated = false
    stripe.unit = null
    stripe.value = null
    stripe.price = null
  }
})

watch(enableStripe, (enabled) => {
  ensureGlazingStructure()
  const stripe = props.form.config_options.accessories.glazing.stripe

  if (!enabled) {
    selectedStripe.value = null
    stripe.type = null
    stripe.length = 0
    stripe.insulated = false
    stripe.unit = null
    stripe.value = null
    stripe.price = null
  }
})

watch(
  () => props.form.config_options?.width,
  (newWidth) => {
    ensureGlazingStructure()

    const stripe = props.form.config_options.accessories.glazing.stripe

    if (enableStripe.value && stripe.type) {
      stripe.length = Math.max(Number(newWidth || 0) - 370, 0)
    }
  },
  { immediate: true }
)

onMounted(() => {
  ensureGlazingStructure()

  const glazing = props.form.config_options.accessories.glazing

  if (glazing.windows?.type) {
    enableWindows.value = true
    selectedWindow.value = {
      label: glazing.windows.type,
      insulation: glazing.windows.insulated,
      unit: glazing.windows.unit,
      value: glazing.windows.value,
      price: glazing.windows.price
    }
  }

  if (glazing.stripe?.type) {
    enableStripe.value = true
    selectedStripe.value = {
      label: glazing.stripe.type,
      insulation: glazing.stripe.insulated,
      unit: glazing.stripe.unit,
      value: glazing.stripe.value,
      price: glazing.stripe.price
    }

    glazing.stripe.length = Math.max(Number(props.form.config_options?.width || 0) - 370, 0)
  }
})
</script>
