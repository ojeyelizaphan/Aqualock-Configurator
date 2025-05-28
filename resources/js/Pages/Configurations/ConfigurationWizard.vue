<template>
  <Navbar />

  <div class="w-full max-w-screen-xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-4">Step {{ step }} of {{ configurationSteps.length + 1 }}</h1>

    <div class="text-center mb-6">
      <div class="inline-block bg-gray-50 border border-gray-200 shadow-sm px-6 py-4 rounded-xl">
        <span class="text-gray-600 text-lg font-medium">Current Price:</span>
        <span class="text-brand-orange text-2xl font-bold ml-2">€{{ finalPrice }}</span>
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

    <component
      :is="currentStepComponent"
      v-bind="filteredStepProps"
      v-model:selectedWidth="selectedWidth"
      v-model:selectedHeight="selectedHeight"
      v-if="currentStepComponent"
    />


    <!-- <Component :is="currentStepComponent" v-bind="currentStepProps" v-if="currentStepComponent" /> -->




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
import { ref, computed, defineProps, watch, defineAsyncComponent} from "vue";
import { useForm } from "@inertiajs/vue3";
import { colorOptions } from '@/Data/colorOptions';
import { glazingOptions } from '@/Data/glazingOptions';
import { materialOptions } from "@/Data/materialOptions";
import { insulationOptions } from "@/Data/insulationOptions";
import { useDynamicPriceCalculator } from "@/Composables/useDynamicPriceCalculator";
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
  },
  panic_features: [],
  flood_protection: false,
  fittings_version: '',
  knob_type: '',
  kaba_upgrade: false,
}


const productSlug = computed(() => {
  if (!selectedProduct.value || !selectedProduct.value.product_type) return '';
  return selectedProduct.value.product_type.slug
    || selectedProduct.value.product_type.name?.toLowerCase().replace(/\s+/g, '-');
});

const currentStepComponent = computed(() => {
  if (!productSlug.value) return null;

  const folderName = toPascalCase(productSlug.value);
  const stepData = configurationSteps.value[step.value - 2];
  if (!stepData) return null;

  const formattedStepName = stepData.name
    .replace(/\s|&/g, '')
    .replace(/[^a-zA-Z]/g, '');

  try {
    return defineAsyncComponent(() =>
      import(`@/Steps/${folderName}/${formattedStepName}Step.vue`)
    );
  } catch (e) {
    console.warn(`Missing component for ${folderName}/${formattedStepName}Step.vue`);
    return null;
  }
});






// Helper to format slug to PascalCase
function toPascalCase(slug) {
  return slug
    .toLowerCase()
    .replace(/[_\s]+/g, '-') // replace spaces/underscores with dashes
    .split('-')
    .filter(Boolean)         // remove any empty parts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}


// Props to pass to each step
// const currentStepProps = computed(() => ({
//   form,
//   colorOptions,
//   materialOptions,
//   insulationOptions,
//   glazingOptions,
//   accessoryExtraCost: accessoryExtraCost?.value ?? 0,
//   colorExtraCost: colorExtraCost?.value ?? 0,
//   handTransmitterImage1,
//   handTransmitterImage2,
//   widthOptions: widthOptions.value,
//   heightOptions, // This is a plain array already
//   selectedWidth: form.config_options['width'],
//   selectedHeight: form.config_options['height'],
// }));

const currentStep = computed(() => configurationSteps.value?.[step.value - 2]);


const filteredStepProps = computed(() => {
  const base = { form, colorOptions};

  switch (currentStep.value?.name) {
    case 'Accessories':
      return {
        ...base,
        // Only pass what's actually used in AccessoriesStep.vue for this product
        widthOptions: widthOptions.value,
        heightOptions,
        selectedWidth,
        selectedHeight,
        accessoryExtraCost,
        colorExtraCost,
        finalPrice,
      };

    case 'Insulation & Hand Transmitter':
      return {
        ...base,
        handTransmitterImage1,
        handTransmitterImage2,
        casingInsulationOptions,
      };

    case 'Thermal Insulation and Window':
      return {
        ...base,
        insulationOptions,
        glazingOptions,
        windowTypeImage1,
        windowTypeImage2,
      };

    default:
      return base;
  }
});




const handTransmitterImage2 = 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745484950/transmitters-2_jiobff.jpg'
const handTransmitterImage1 = 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745485281/transmitters_kty3fk.jpg';


const widthOptions = computed(() => {
  const selectedVersion = form.config_options['version'];
  if (selectedVersion === 'V500') {
    return [
      2000, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
      3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000,
      4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000,
      5100, 5200
    ];
  }

  return [2000, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000];
});
const heightOptions = [2120, 2220, 2320, 2420, 2520];



watch([selectedWidth, selectedHeight], ([newWidth, newHeight]) => {
  form.config_options['width'] = newWidth;
  form.config_options['height'] = newHeight;
});




const selectProduct = (product) => {
  // console.log('Selected product:', product);
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



const calculator = computed(() =>
  useDynamicPriceCalculator(productSlug.value, form, configurationSteps, step)
);

const baseCalculatedPrice = computed(() =>
  calculator.value?.baseCalculatedPrice?.value ?? 0
);

const colorExtraCost = computed(() =>
  calculator.value?.colorExtraCost?.value ?? 0
);

const accessoryExtraCost = computed(() =>
  calculator.value?.accessoryExtraCost?.value ?? 0
);

const finalPrice = computed(() =>
  calculator.value?.finalPrice?.value ?? 0
);



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
