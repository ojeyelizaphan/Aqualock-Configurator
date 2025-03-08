<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-4">Step {{ step }} of {{ configurationSteps.length + 1 }}</h1>

    <div class="text-lg font-semibold text-center mb-4 bg-gray-100 p-3 rounded-lg shadow">
      <span class="text-gray-700">Current Price: </span>
      <span class="text-green-500 text-xl font-bold">${{ calculatePrice }}</span>
    </div>

    <div v-if="form.errors" class="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
      <ul>
        <li v-for="(error, field) in form.errors" :key="field">{{ error }}</li>
      </ul>
    </div>

    <!-- Step 1: Product selection -->
    <div v-if="step === 1">
      <h2 class="text-xl font-semibold mb-2">Choose Your Product</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="product in products"
          :key="product.id"
          @click="selectProduct(product)"
          :class="{ 'border-blue-500 border-2': form.product_id === product.id }"
          class="border p-3 rounded-lg text-left"
        >
          <p class="font-bold">{{ product.name }}</p>
          <p class="text-sm text-gray-500">${{ product.price }}</p>
        </button>
      </div>
    </div>

    <!-- Step 2: Protection Height -->
    <div v-else-if="configurationSteps[step - 2]?.name === 'Protection Height'" class="grid grid-cols-2 gap-4">
      <label v-for="option in protectionHeightOptions" :key="option.value" class="border p-3 rounded-lg text-left cursor-pointer">
        <input
          type="radio"
          :value="option.value"
          v-model="form.config_options['protection_height']"
          class="hidden"
          @change="updateProtectionHeightCost(option.cost)"
        />
        <div :class="{ 'border-blue-500 border-2': form.config_options['protection_height'] === option.value }" class="p-3 rounded-lg">
          <img :src="option.image" alt="Option image" class="w-full h-32 object-cover rounded-lg mb-2" />
          <p class="font-bold">{{ option.label }}</p>
          <p class="text-sm text-gray-500">{{ option.description }}</p>
        </div>
      </label>
    </div>

    <!-- Step 3: Size & Installation Type -->
<div v-else-if="configurationSteps[step - 2]?.name === 'Size & Installation Type'">
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Enter Size of Wall Opening</h2>
    <label class="block mb-2">Width (mm)</label>
    <input
      v-model="form.config_options['width']"
      type="number"
      placeholder="Enter width"
      class="border p-2 rounded w-full"
      @input="updateSizeCost"
    />
    <label class="block mb-2 mt-4">Height (mm)</label>
    <input
      v-model="form.config_options['height']"
      type="number"
      placeholder="Enter height"
      class="border p-2 rounded w-full"
      @input="updateSizeCost"
    />
  </div>
  <div>
    <h2 class="text-xl font-semibold mb-2">Choose Installation Type</h2>
    <div class="grid grid-cols-2 gap-4">
      <label
        v-for="option in installationTypeOptions"
        :key="option.value"
        class="border p-3 rounded-lg text-left cursor-pointer"
      >
        <input
          type="radio"
          :value="option.value"
          v-model="form.config_options['installation_type']"
          class="hidden"
        />
        <div
          :class="{ 'border-blue-500 border-2': form.config_options['installation_type'] === option.value }"
          class="p-3 rounded-lg"
        >
          <img :src="option.image" alt="Installation option" class="w-full h-32 object-cover rounded-lg mb-2" />
          <p class="font-bold">{{ option.label }}</p>
          <p class="text-sm text-gray-500">{{ option.description }}</p>
        </div>
      </label>
    </div>
  </div>
</div>



   <!-- Step 4: Color & Material -->
   <div v-else-if="configurationSteps[step - 2]?.name === 'Color & Material'">
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Choose Color</h2>
        <div class="grid grid-cols-4 gap-4">
          <label v-for="option in colorOptions" :key="option.value" class="text-center cursor-pointer">
            <input type="radio" :value="option.value" v-model="form.config_options['color']" class="hidden" @change="updateColorCost(option.value)" />
            <div :class="{ 'ring-2 ring-blue-500': form.config_options['color'] === option.value }" class="w-12 h-12 rounded-full mx-auto" :style="{ backgroundColor: option.color }"></div>
            <p class="text-sm mt-1">{{ option.label }}</p>
          </label>
          <label class="text-center cursor-pointer">
            <input type="radio" value="custom" v-model="form.config_options['color']" class="hidden" @change="updateColorCost('custom')" />
            <div :class="{ 'ring-2 ring-blue-500': form.config_options['color'] === 'custom' }" class="w-12 h-12 rounded-full mx-auto bg-gray-300 flex items-center justify-center">
              🎨
            </div>
            <p class="text-sm mt-1">Custom Color (€35/m²)</p>
          </label>
        </div>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Choose Material</h2>
        <div class="grid grid-cols-2 gap-4">
          <label v-for="option in materialOptions" :key="option.value" class="border p-3 rounded-lg text-left cursor-pointer">
            <input type="radio" :value="option.value" v-model="form.config_options['material']" class="hidden" @change="updateMaterialCost(option.value)" />
            <div :class="{ 'border-blue-500 border-2': form.config_options['material'] === option.value }" class="p-3 rounded-lg">
              <img :src="option.image" alt="Material option" class="w-full h-32 object-cover rounded-lg mb-2" />
              <p class="font-bold">{{ option.label }}</p>
              <p class="text-sm text-gray-500">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>


    <!-- Step 5: Insulation & Hand Transmitter -->
    <div v-else-if="configurationSteps[step - 2]?.name === 'Insulation & Hand Transmitter'">
      <div class="grid grid-cols-3 gap-4 mb-4">
        <label v-for="option in insulationOptions" :key="option.value" class="border p-3 rounded-lg text-left cursor-pointer">
          <input type="radio" :value="option.value" v-model="form.config_options['insulation']" class="hidden" @change="updateInsulationCost(option.value)" />
          <div :class="{ 'border-blue-500 border-2': form.config_options['insulation'] === option.value }" class="p-3 rounded-lg">
            <img :src="option.image" alt="Insulation option" class="w-full h-32 object-cover rounded-lg mb-2" />
            <p class="font-bold">{{ option.label }}</p>
            <p class="text-sm text-gray-500">{{ option.description }}</p>
          </div>
        </label>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Choose Number of Hand Transmitters</h2>
        <input type="number" v-model="form.config_options['hand_transmitter_count']" min="0" placeholder="Enter quantity" class="border p-2 rounded w-full" @input="updateTransmitterCost(form.config_options['hand_transmitter_count'])" />
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="mt-4 flex justify-between">
      <button v-if="step > 1" @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
      <button v-if="step < configurationSteps.length + 1 && form.product_id" @click="nextStep" class="bg-green-500 text-white px-4 py-2 rounded">Next</button>
      <button v-if="step === configurationSteps.length + 1" @click="submitConfiguration" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, defineProps } from "vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
  products: Array,
});

const step = ref(1);
const selectedProduct = ref(null);
const configurationSteps = ref([]);

const form = useForm({
  product_id: "",
  config_options: {},
  total_price: 0,
});

const protectionHeightOptions = [
  {
    value: "up-to-500mm",
    label: "Protection height up to 500mm",
    description: "Manual locking devices are used in addition to the operating pressure for a safety height of up to 500 mm.",
    image: "/images/product-placeholder.jpg",
    cost: 0
  },
  {
    value: "over-500mm",
    label: "Protection height over 500mm",
    description: "At a safety height of over 500 mm, the door is maintained firmly latched by the pressure of the special garage door drive.",
    image: "/images/product-placeholder.jpg",
    cost: 300
  },
];

const updateProtectionHeightCost = (cost) => {
  console.log('Updating protection height cost:', cost); // Debugging
  form.config_options['protection_height_cost'] = Number(cost) || 0; // Ensure it's a number
};


const updateSizeCost = () => {
  const width = Number(form.config_options['width'] || 0);
  const height = Number(form.config_options['height'] || 0);

  // Only add cost if either width or height exceeds 2100mm
  form.config_options['size_cost'] = (width > 2100 || height > 2100) ? 300 : 0;

  console.log('Size cost updated:', form.config_options['size_cost']);
};

const updateColorCost = (color) => {
  // Custom color adds €35/m², standard colors are free
  form.config_options['color_cost'] = (color === 'custom') ? 35 : 0;
  console.log('Color cost updated:', form.config_options['color_cost']);
};

const updateMaterialCost = (material) => {
  // Stainless steel adds €700, galvanized steel is free
  form.config_options['material_cost'] = (material === 'stainless_steel') ? 700 : 0;
  console.log('Material cost updated:', form.config_options['material_cost']);
};


const updateInsulationCost = (insulation) => {
  switch(insulation) {
    case 'with-casing-no-insulation':
      form.config_options['insulation_cost'] = 300;
      break;
    case 'with-casing-and-insulation':
      form.config_options['insulation_cost'] = 400;
      break;
    default:
      form.config_options['insulation_cost'] = 0;
  }
};

const updateTransmitterCost = (count) => {
  form.config_options['transmitter_cost'] = Number(count) * 60;
};

const installationTypeOptions = [
  {
    value: "behind-reveal",
    label: "Behind the reveal",
    description: "Mounted on the interior wall.",
    image: "/images/product-placeholder.jpg",
  },
  {
    value: "between-reveal",
    label: "Between the reveal",
    description: "Installed in the wall opening.",
    image: "/images/product-placeholder.jpg",
  },
];

const colorOptions = [
  { value: 'white', label: 'White', color: '#FFFFFF' },
  { value: 'grey1', label: 'Light Grey', color: '#D3D3D3' },
  { value: 'grey2', label: 'Slate Grey', color: '#708090' },
  { value: 'grey3', label: 'Anthracite Grey', color: '#36454F' },
  { value: 'grey4', label: 'Basalt Grey', color: '#4B4B4B' },
  { value: 'grey5', label: 'Quartz Grey', color: '#6D6D6D' },
  { value: 'grey6', label: 'Graphite Grey', color: '#3B3B3B' }
];

const materialOptions = [
  { value: 'galvanized_steel', label: 'Galvanized Steel', description: 'Sturdy and cost-effective.', image: '/images/product-placeholder.jpg' },
  { value: 'stainless_steel', label: 'Stainless Steel', description: 'High-end, corrosion-resistant finish.', image: '/images/product-placeholder.jpg' }
];

const insulationOptions = [
  { value: 'without-casing', label: 'Without casing', description: 'Basic installation without any casing.', image: '/images/product-placeholder.jpg' },
  { value: 'with-casing-no-insulation', label: 'With casing but without insulation', description: 'Casing installed but no additional insulation.', image: '/images/product-placeholder.jpg' },
  { value: 'with-casing-and-insulation', label: 'With casing and insulation', description: 'Complete casing with added insulation for maximum efficiency.', image: '/images/product-placeholder.jpg' }
];

const selectProduct = (product) => {
  form.product_id = product.id;
  selectedProduct.value = product;

  if (product.product_type) {
    configurationSteps.value = product.product_type.configuration_steps || [];
    step.value = 2;
  } else {
    configurationSteps.value = [];
  }
};


const calculatePrice = computed(() => {
  let basePrice = Number(selectedProduct.value?.price || 0);

  // Only sum up costs, not input values like width or height
  let additionalCost = Object.entries(form.config_options)
    .filter(([key]) => key.endsWith('_cost')) // Only sum cost fields
    .reduce((sum, [_, cost]) => sum + Number(cost || 0), 0);

  form.total_price = basePrice + additionalCost;

  console.log('Base price:', basePrice);
  console.log('Additional cost:', additionalCost);
  console.log('Total price:', form.total_price);

  return form.total_price;
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
