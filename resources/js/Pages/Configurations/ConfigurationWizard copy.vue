<script setup>
import { ref, computed, defineProps } from "vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
  products: Array, // ✅ Products from Laravel backend
});

// Step tracking
const step = ref(1);
const form = useForm({
  product_id: "",
  installation_type: "",
  material: "",
  color: "",
  total_price: 0,
});

// **Dynamic Image Paths**
const getImage = computed(() => {
  switch (step.value) {
    case 1: return form.product_id ? `/images/product-${form.product_id}.jpg` : '/images/product-placeholder.jpg';
    case 2: return form.installation_type ? `/images/installation-${form.installation_type}.jpg` : '/images/installation-placeholder.jpg';
    case 3: return form.material ? `/images/material-${form.material.replace(" ", "-")}.jpg` : '/images/material-placeholder.jpg';
    case 4: return form.color ? `/images/color-${form.color}.jpg` : '/images/color-placeholder.jpg';
    default: return '/images/default-preview.png';
  }
});

// Dynamic price calculation
const calculatePrice = computed(() => {
  let basePrice = Number(props.products.find(p => p.id === form.product_id)?.price || 0);
  let installationCost = form.installation_type === "premium" ? 300 : 100;
  let materialCost = form.material === "stainless steel" ? 200 : 0;
  let colorCost = form.color === "custom" ? 150 : 0;
  
  let total = basePrice + installationCost + materialCost + colorCost;
  form.total_price = total;
  return form.total_price;
});

// Move to the next step
const nextStep = () => {
  if (step.value < 5) step.value++;
};

// Move to the previous step
const prevStep = () => {
  if (step.value > 1) step.value--;
};


const isFormComplete = computed(() => {
  return (
    form.product_id &&
    form.installation_type &&
    form.material &&
    form.color
  );
});

const missingFields = computed(() => {
  let fields = [];
  if (!form.product_id) fields.push("Product");
  if (!form.installation_type) fields.push("Installation Type");
  if (!form.material) fields.push("Material");
  if (!form.color) fields.push("Color");
  return fields.length ? `Missing: ${fields.join(", ")}` : "";
});

// Submit configuration
const submitConfiguration = () => {
  form.post(route("configurations.store"));
};

</script>

<template>
  <div class="max-w-2xl mx-auto p-6">

    <!-- Progress Bar -->
    <div class="w-full bg-gray-200 rounded-full h-3 mb-5">
    <div
        class="bg-green-500 h-3 rounded-full transition-all duration-300"
        :style="{ width: (step / 5) * 100 + '%' }"
    ></div>
    </div>


    <h1 class="text-3xl font-bold text-center mb-4">Step {{ step }} of 5</h1>

    <!-- ✅ Dynamic Price Display (Shown on Every Step) -->
    <div class="text-lg font-semibold text-center mb-4 bg-gray-100 p-3 rounded-lg shadow">
      <span class="text-gray-700">Current Price: </span>
      <span class="text-green-500 text-xl font-bold">${{ calculatePrice }}</span>
    </div>

    <!-- ✅ Image Preview -->
    <div class="flex justify-center mb-4">
      <img :src="getImage" alt="Preview" class="w-60 h-60 object-contain rounded-lg shadow-lg">
    </div>

    <!-- Step 1: Select Product -->
    <div v-if="step === 1" class="step">
      <h2 class="text-xl font-semibold mb-2">Choose Your Product</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="product in products"
          :key="product.id"
          @click="form.product_id = product.id"
          :class="{'border-blue-500 border-2': form.product_id === product.id}"
          class="border p-3 rounded-lg text-left"
        >
          <p class="font-bold">{{ product.name }}</p>
          <p class="text-sm text-gray-500">${{ product.price }}</p>
        </button>
      </div>
    </div>

    <!-- Step 2: Installation Type -->
    <div v-if="step === 2" class="step">
      <h2 class="text-xl font-semibold mb-2">Select Installation Type</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="form.installation_type = 'standard'"
          :class="{'border-blue-500 border-2': form.installation_type === 'standard'}"
          class="border p-3 rounded-lg"
        >
          Standard - $100
        </button>
        <button
          @click="form.installation_type = 'premium'"
          :class="{'border-blue-500 border-2': form.installation_type === 'premium'}"
          class="border p-3 rounded-lg"
        >
          Premium - $300
        </button>
      </div>
    </div>

    <!-- Step 3: Select Material -->
    <div v-if="step === 3" class="step">
      <h2 class="text-xl font-semibold mb-2">Choose Material</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="form.material = 'galvanized steel'"
          :class="{'border-blue-500 border-2': form.material === 'galvanized steel'}"
          class="border p-3 rounded-lg"
        >
          Galvanized Steel - $0
        </button>
        <button
          @click="form.material = 'stainless steel'"
          :class="{'border-blue-500 border-2': form.material === 'stainless steel'}"
          class="border p-3 rounded-lg"
        >
          Stainless Steel - $200
        </button>
      </div>
    </div>

    <!-- Step 4: Choose Color -->
    <div v-if="step === 4" class="step">
      <h2 class="text-xl font-semibold mb-2">Select Color</h2>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="form.color = 'standard'"
          :class="{'border-blue-500 border-2': form.color === 'standard'}"
          class="border p-3 rounded-lg"
        >
          Standard - $0
        </button>
        <button
          @click="form.color = 'custom'"
          :class="{'border-blue-500 border-2': form.color === 'custom'}"
          class="border p-3 rounded-lg"
        >
          Custom Color - $150
        </button>
      </div>
    </div>

    <!-- Step 5: Summary -->
    <div v-if="step === 5" class="step">
      <h2 class="text-xl font-semibold mb-2">Summary</h2>
      <p><strong>Product:</strong> {{ products.find(p => p.id === form.product_id)?.name || "Not selected" }}</p>
      <p><strong>Installation Type:</strong> {{ form.installation_type }}</p>
      <p><strong>Material:</strong> {{ form.material }}</p>
      <p><strong>Color:</strong> {{ form.color }}</p>
      <p><strong>Total Price:</strong> ${{ calculatePrice }}</p>

      <!-- <button @click="submitConfiguration" class="bg-blue-500 text-white px-4 py-2 rounded mt-3">
        Submit Configuration
      </button> -->

      <div class="relative group">
        <button 
            @click="submitConfiguration" 
            :disabled="!isFormComplete"
            class="px-4 py-2 rounded mt-3 transition-all duration-300"
            :class="{
            'bg-blue-500 text-white': isFormComplete,
            'bg-gray-300 text-gray-500 cursor-not-allowed': !isFormComplete
            }"
        >
            Submit Configuration
        </button>

        <!-- Tooltip: Only show when the button is disabled -->
        <div 
            v-if="!isFormComplete" 
            class="absolute left-0 mt-2 w-64 bg-gray-700 text-white text-sm px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            {{ missingFields }}
        </div>
      </div>


    </div>

    <!-- Navigation Buttons  -->
     <div class="mt-4 flex justify-between">
      <button v-if="step > 1" @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
      <button v-if="step < 5" @click="nextStep" class="bg-green-500 text-white px-4 py-2 rounded">Next</button>
    </div>


    <!-- Navigation Buttons -->
    <div class="mt-4 flex justify-between">
    <button
        v-for="n in 5"
        :key="n"
        @click="step = n"
        class="px-4 py-2 rounded"
        :class="{
        'bg-blue-500 text-white': step === n,
        'bg-gray-300 text-gray-700': step !== n
        }"
    >
        Step {{ n }}
    </button>
    </div>

  </div>
</template>

<style scoped>
.step {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
