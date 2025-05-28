<template>
  <Navbar />

  <div class="w-full max-w-screen-xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-4">Step {{ step }} of {{ configurationSteps.length + 1 }}</h1>

    <div class="text-center mb-6">
      <div class="inline-block bg-gray-50 border border-gray-200 shadow-sm px-6 py-4 rounded-xl">
        <span class="text-gray-600 text-lg font-medium">Current Price:</span>
        <span class="text-green-600 text-2xl font-bold ml-2">€{{ finalPrice }}</span>
      </div>
    </div>

    <div v-if="Object.keys(form.errors).length" class="bg-red-100 text-red-700 p-4 rounded-lg mb-4 border border-red-300">
      <ul class="space-y-1 text-sm list-disc list-inside">
        <li v-for="(error, field) in form.errors" :key="field">{{ error }}</li>
      </ul>
    </div>


    <!-- Step 1: Product selection -->
    <div v-if="step === 1">
      <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">Choose Your Product</h2>
      
      <!-- Responsive 1–4 column grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <button
          v-for="product in products"
          :key="product.id"
          @click="selectProduct(product)"
          :class="[
            'rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg text-left',
            form.product_id === product.id ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'
          ]"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 mb-1">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
            <p class="text-brand-orange font-semibold text-md">${{ product.price }}</p>
          </div>
        </button>
      </div>
    </div>


    <!-- Step 2: Version Selection -->
    <div v-if="configurationSteps[step - 2]?.name === 'Version Selection'">
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Choose a Version</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <label
          v-for="option in versionOptions"
          :key="option.value"
          class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
          :class="form.config_options['version'] === option.value ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options['version']"
            class="hidden"
          />
          <img
            :src="option.image"
            :alt="option.label"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <p class="text-lg font-semibold text-gray-800 mb-1">{{ option.label }}</p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </div>
        </label>
      </div>
    </div>


    <!-- Step 3: Protection Height --> 
    <div v-else-if="configurationSteps[step - 2]?.name === 'Protection Height'">
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Choose Protection Height
      </h2>
      <div class="flex justify-center">
      <div class="grid sm:grid-cols-2 gap-6 justify-center max-w-2xl mx-auto">
        <label
          v-for="option in protectionHeightOptions"
          :key="option.value"
          class="cursor-pointer transition-shadow hover:shadow-md rounded-2xl border overflow-hidden"
          :class="form.config_options['protection_height'] === option.value
            ? 'border-brand-orange ring-2 ring-brand-orange'
            : 'border-gray-200'"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options['protection_height']"
            class="hidden"
          />
          <img
            :src="option.image"
            :alt="option.label"
            class="w-full aspect-[3/2] object-contain"
          />
          <div class="p-4">
            <p class="text-lg font-semibold text-gray-800 mb-1">
              {{ option.label }}
            </p>
            <p class="text-sm text-gray-600">{{ option.description }}</p>
          </div>
        </label>
      </div>
      </div>
    </div>


    <!-- Step 4: Size & Installation Type --> 
    <div v-else-if="configurationSteps[step - 2]?.name === 'Size & Installation Type'" class="space-y-8">
      <!-- Size of Wall Opening -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Select Size of Wall Opening</h2>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
            <select
              v-model="selectedWidth"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option disabled value="">-- Select Width --</option>
              <option v-for="width in widthOptions" :key="width" :value="width">{{ width }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
            <select
              v-model="selectedHeight"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option disabled value="">-- Select Height --</option>
              <option v-for="height in heightOptions" :key="height" :value="height">{{ height }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Installation Type -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Choose Installation Type</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <label
            v-for="option in installationTypeOptions"
            :key="option.value"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['installation_type']"
              class="hidden"
            />
            <div
              :class="[ 
                'rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg p-6 text-left', 
                form.config_options['installation_type'] === option.value
                  ? 'border-brand-orange ring-2 ring-brand-orange'
                  : 'border-gray-200'
              ]"
            >
              <img :src="option.image" alt="Installation option" class="w-full h-48 object-contain rounded-lg mb-4" />
              <p class="text-lg font-semibold text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>



    <!-- Step 5: Color & Material -->
    <div v-else-if="configurationSteps[step - 2]?.name === 'Color & Material'">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Choose Color</h2>
        <div class="grid grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
          <label
            v-for="option in colorOptions"
            :key="option.value"
            class="text-center cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['color']"
              class="hidden"
            />
            <div
              :class="{ 'ring-2 ring-blue-500': form.config_options['color'] === option.value }"
              class="w-16 h-16 rounded-full mx-auto transition-all duration-300 hover:ring-2 hover:ring-blue-500"
              :style="{ backgroundColor: option.color }"
            ></div>
            <p class="text-sm mt-2 text-gray-700">{{ option.label }}</p>
          </label>
        </div>

        <!-- Show extra cost only if there's a charge -->
        <div v-if="colorExtraCost > 0" class="mt-2 text-sm text-red-500">
          Extra charge for custom color: €{{ colorExtraCost }}
        </div>
      </div>

      <!-- Material Selection -->
      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">Choose Material</h2>
        <div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <label v-for="option in materialOptions" :key="option.value" class="cursor-pointer">
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options['material']"
              class="hidden"
            />
            <div
              :class="{ 'border-blue-500 border-2': form.config_options['material'] === option.value }"
              class="border p-4 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <img :src="option.image" alt="Material option" class="w-full max-h-48 object-contain rounded-lg mb-3" />
              <p class="font-semibold text-lg text-gray-800">{{ option.label }}</p>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>



    <!-- Step 6: Accessories -->
    <div v-if="configurationSteps[step - 2]?.name === 'Accessories'" class="space-y-10 max-w-5xl mx-auto">
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

        <!-- Windows -->
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
                <p class="text-sm text-green-600 mt-1">
                  €{{ option.price }} / piece
                </p>
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

        <!-- Glass Stripes -->
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
                <p class="text-sm text-green-600 mt-1">
                  €{{ option.price }} / m²
                </p>
              </div>
            </label>
          </div>

          <!-- Stripe length input -->
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

      <!-- Display extra cost -->
      <div v-if="accessoryExtraCost > 0" class="text-red-600 text-sm font-medium mt-4">
        Extra charge for accessories: €{{ accessoryExtraCost }}
      </div>
    </div>




    <!-- Step 7: Insulation & Hand Transmitter --> 
    <div v-else-if="configurationSteps[step - 2]?.name === 'Insulation & Hand Transmitter'" class="space-y-8 max-w-6xl mx-auto">

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
        </div>

      <!-- </div> -->

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




    <!-- Navigation buttons -->
    <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <button
        v-if="step > 1"
        @click="prevStep"
        class="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
      >
        ← Back
      </button>

      <button
        v-if="step < configurationSteps.length + 1 && form.product_id"
        @click="nextStep"
        class="bg-[#f39200] hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
      >
        Next →
      </button>

      <button
        v-if="step === configurationSteps.length + 1"
        @click="submitConfiguration"
        class="bg-[#f39200] hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
      >
        Submit
      </button>
    </div>

  </div>

  <Footer />
</template>


<script setup>
import { ref, computed, defineProps, watch} from "vue";
import { useForm } from "@inertiajs/vue3";
import { versionV500Prices } from '@/Data/versionV500Prices';
import {versionVPrices} from '@/Data/versionVPrices';
import { versionEPrices } from '@/Data/versionEPrices';
import { colorOptions } from '@/Data/colorOptions';
import { glazingOptions } from '@/Data/glazingOptions';
import { versionOptions } from "@/Data/versionOptions";
import { installationTypeOptions } from "@/Data/installationTypeOptions";
import { protectionHeightOptions } from "@/Data/protectionHeightOptions";
import { materialOptions } from "@/Data/materialOptions";
import { insulationOptions } from "@/Data/insulationOptions";
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';



const props = defineProps({
  products: Array,
});

const step = ref(1);
const selectedProduct = ref(null);
const configurationSteps = ref([]);
const selectedWidth = ref(null);
const selectedHeight = ref(null);
const selectedStripe = ref(null);
const enableWindows = ref(false);
const enableStripe = ref(false);
const selectedWindow = ref(null);

const form = useForm({
  product_id: "",
  config_options: {},
  total_price: 0,
});

// Setup default structure
form.config_options = {
  width: null,
  height: null,
  accessories: {
    panelling: null,
    glazing: {
      windows: [],
      stripe: {
        type: null,
        length: null,
        insulated: false
      }
    },
    driveOverPlate: null,
    handTransmitters: 0,
  }
}



// Track window selections
function toggleWindow(option) {
  const windows = form.config_options.accessories.glazing.windows;
  const exists = windows.find(w => w.value === option.value);
  if (exists) {
    form.config_options.accessories.glazing.windows = windows.filter(w => w.value !== option.value);
  } else {
    form.config_options.accessories.glazing.windows.push(option);
  }
}

function isWindowSelected(option) {
  return form.config_options.accessories.glazing.windows.some(w => w.value === option.value);
}

// Watch selected stripe and sync to form
watch(selectedStripe, (val) => {
  if (val) {
    form.config_options.accessories.glazing.stripe.type = val.label;
    form.config_options.accessories.glazing.stripe.insulated = val.insulation;
    form.config_options.accessories.glazing.stripe.unit = val.unit;
    form.config_options.accessories.glazing.stripe.value = val.value;
    form.config_options.accessories.glazing.stripe.price = val.price;
  } else {
    form.config_options.accessories.glazing.stripe = {
      type: null,
      length: null,
      insulated: false
    };
  }
});

const handTransmitterImage2 = 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745484950/transmitters-2_jiobff.jpg'
const handTransmitterImage1 = 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745485281/transmitters_kty3fk.jpg';


const widthOptions = computed(() => {
  const selectedVersion = form.config_options['version'];
  if (selectedVersion === 'V500') {
    return [
      2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
      3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000,
      4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000,
      5100, 5200
    ];
  }

  return [2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000];
});
const heightOptions = [2120, 2220, 2320, 2420, 2520];


const baseCalculatedPrice = computed(() => {
  const selectedVersion = form.config_options['version'];
  const selectedWidth = form.config_options['width'];
  const selectedHeight = form.config_options['height'];

  if (!selectedVersion || !selectedWidth || !selectedHeight) return null;

  if (selectedVersion === 'E') {
    const heightRow = versionEPrices[selectedHeight];
    if (heightRow && heightRow[selectedWidth]) {
      return heightRow[selectedWidth];
    } else {
      return null;
    }
  }

  if (selectedVersion === 'V') {
    const heightRow = versionVPrices[selectedHeight]; // <- you'll define this object next
    if (heightRow && heightRow[selectedWidth]) {
      return heightRow[selectedWidth];
    } else {
      return null;
    }
  }

  if (selectedVersion === 'V500') {
    const heightRow = versionV500Prices[selectedHeight];
    if (heightRow && heightRow[selectedWidth]) {
      return heightRow[selectedWidth];
    }
  }

  return null; // fallback for unknown versions
});



watch([selectedWidth, selectedHeight], ([newWidth, newHeight]) => {
  form.config_options['width'] = newWidth;
  form.config_options['height'] = newHeight;

  if (baseCalculatedPrice.value) {
    form.total_price = baseCalculatedPrice.value;
  }
});



const selectProduct = (product) => {
  form.product_id = product.id;
  selectedProduct.value = product;

  if (product.product_type) {
    configurationSteps.value = product.product_type.configuration_steps || [];
    // console.log("Steps: ",  configurationSteps.value);
    step.value = 2;
  } else {
    configurationSteps.value = [];
  }
};


const colorExtraCost = computed(() => {
  const color = form.config_options['color'];
  const width = form.config_options['width'];
  const height = form.config_options['height'];

  if (!color || !width || !height) return 0;

  // Extract all standard color values from colorOptions
  const standardColors = colorOptions
    .map(option => option.value)
    .filter(value => value !== 'custom');

  // If color is in standard list, no extra charge
  if (standardColors.includes(color)) {
    return 0;
  }

  // If custom color or any non-standard color is selected
  const squareMeters = (width / 1000) * (height / 1000);
  return Math.ceil(squareMeters * 47); // round up to nearest euro
});



// Computed: accessory price
const accessoryExtraCost = computed(() => {
  let total = 0;

  const width = form.config_options.width;
  const height = form.config_options.height;
  if (!width || !height) return 0;

  const m2 = (width / 1000) * (height / 1000);
  const rmt = width / 1000;

  // Panelling
  const panelling = form.config_options.accessories.panelling;
  if (panelling === 'uninsulated') {
    total += Math.ceil(m2 * 142);
  } else if (panelling === 'insulated') {
    total += Math.ceil(m2 * 174);
  }

  // Glazing - Windows
  const windowItems = form.config_options.accessories.glazing?.windows || [];
  windowItems.forEach((win) => {
    total += win.insulated ? 601 : 493;
  });

  // Glazing - Stripes
  const stripe = form.config_options.accessories.glazing?.stripe;
  if (stripe?.type && stripe?.length) {
    const stripeArea = stripe.length * 0.4;
    const rate = stripe.insulated ? 453 : 444;
    total += Math.ceil(stripeArea * rate);
  }

  // Drive-over Plate
  const plate = form.config_options.accessories.driveOverPlate;
  if (plate === 'stainless') {
    total += Math.ceil(rmt * 194);
  } else if (plate === 'aluminium') {
    total += Math.ceil(rmt * 148);
  }

  const motorStepIndex = configurationSteps.value.findIndex(stepObj =>
    stepObj.name === 'Insulation & Hand Transmitter'
  );

  if (step.value > motorStepIndex + 1) {
    total += 866; // Motor
    total += 394; // Assembly Kit

    // Drive-over plate
    const plate = form.config_options.accessories.driveOverPlate;
    if (plate === 'stainless') {
      total += Math.ceil(width / 1000) * 194;
    } else if (plate === 'aluminium') {
      total += Math.ceil(width / 1000) * 148;
    }

    // Hand transmitters
    const transmitters = parseInt(form.config_options.accessories.handTransmitters || 0);
    total += transmitters * 80;
  }

  return total;
});




const finalPrice = computed(() => {
  const base = baseCalculatedPrice.value;
  const colorCost = colorExtraCost.value;
  const accessoriesCost = accessoryExtraCost.value;

  if (base === null) return null;

  return base + colorCost + accessoriesCost;
});


watch(finalPrice, (newPrice) => {
  if (newPrice !== null) {
    form.total_price = newPrice;
  }
});



const nextStep = () => {
  if (step.value < configurationSteps.value.length + 1) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const submitConfiguration = () => {
  console.log("Submitting configuration:", form);

  preserveState: true,
  
  form.post(route("configurations.store"), {
    onSuccess: () => {
      const configurationId = form.id; // Assuming the response includes the created configuration’s ID
      console.log('Configuration saved, redirecting to order page with ID:', configurationId);

      if (configurationId) {
        window.location.href = route('orders.create', { configuration_id: configurationId });
      }
    },
    onError: (errors) => {
      console.error('Failed to save configuration:', errors);
    }
  });
};

</script>

<style scoped>
.step {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
