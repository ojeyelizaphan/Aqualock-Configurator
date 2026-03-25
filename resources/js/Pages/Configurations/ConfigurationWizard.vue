<template>
  <Navbar />
  <SecondaryNavbar />
  

  <div class="min-h-screen bg-[#f8f8f8]">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <!-- Header -->
      <!-- <div class="mb-8 md:mb-10">
        <div class="max-w-3xl">
          <p class="text-sm uppercase tracking-[0.2em] text-brand-orange font-semibold mb-3">
            AquaLOCK Configurator
          </p>
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
            Configure Your Flood Protection Product
          </h1>
          <p class="text-gray-600 text-base md:text-lg">
            Choose a product to begin your configuration and see your current price update as you go.
          </p>
        </div>
      </div> -->

      <!-- Progress / Price -->
      <div class="mb-8">
        <ProgressCard
          :current-step="step"
          :total-steps="configurationSteps.length + 1"
          :current-price="finalPrice"
        />
      </div>

      <!-- Errors -->
      <div
        v-if="Object.keys(form.errors).length"
        class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-6"
      >
        <ul class="space-y-1 text-sm list-disc list-inside">
          <li v-for="(error, field) in form.errors" :key="field">
            {{ error }}
          </li>
        </ul>
      </div>

      <!-- Step 1 -->
      <section
        v-if="step === 1"
        class="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        <div class="mb-8">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Choose Your Product
          </h2>
          <p class="text-gray-600">
            Select one of the available AquaLOCK systems to continue.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :name="product.name"
            :description="product.description"
            :image="product.image"
            :selected="form.product_id === product.id"
            @select="selectProduct(product)"
          />
        </div>
      </section>

      <!-- Dynamic steps -->
      <section
        v-if="currentStepComponent"
        class="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        <component
          :is="currentStepComponent"
          v-bind="currentStepProps"
          v-model:selectedWidth="selectedWidth"
          v-model:selectedHeight="selectedHeight"
        />
      </section>

      <!-- Navigation -->
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          v-if="step > 1"
          @click="prevStep"
          class="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
        >
          ← Back
        </button>

        <div class="sm:ml-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            v-if="step < configurationSteps.length + 1 && form.product_id"
            @click="nextStep"
            class="bg-brand-orange hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
          >
            Next →
          </button>

          <button
            v-if="step === configurationSteps.length + 1"
            @click="submitConfiguration"
            class="bg-brand-orange hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, computed, defineProps, watch, defineAsyncComponent } from "vue";
import { useForm } from "@inertiajs/vue3";
import { useDynamicPriceCalculator } from "@/Composables/useDynamicPriceCalculator";
import { colorOptions } from "@/Data/colorOptions";

import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";
import SecondaryNavbar from "@/Components/SecondaryNavbar.vue";
import ProgressCard from "@/Components/ProgressCard.vue";
import ProductCard from "@/Components/ProductCard.vue";

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

const productSlug = computed(() => {
  if (!selectedProduct.value || !selectedProduct.value.product_type) return "";
  return (
    selectedProduct.value.product_type.slug ||
    selectedProduct.value.product_type.name?.toLowerCase().replace(/\s+/g, "-")
  );
});

function toPascalCase(slug) {
  return slug
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const currentStepComponent = computed(() => {
  if (!productSlug.value) return null;

  const folderName = toPascalCase(productSlug.value);
  const stepData = configurationSteps.value[step.value - 2];
  if (!stepData) return null;

  const formattedStepName = stepData.name
    .replace(/\s|&/g, "")
    .replace(/[^a-zA-Z]/g, "");

  return defineAsyncComponent(() =>
    import(`@/Steps/${folderName}/${formattedStepName}Step.vue`)
  );
});

const calculator = computed(() =>
  useDynamicPriceCalculator(productSlug.value, form, configurationSteps, step)
);

const colorExtraCost = computed(() => calculator.value?.colorExtraCost?.value ?? 0);
const accessoryExtraCost = computed(() => calculator.value?.accessoryExtraCost?.value ?? 0);
const finalPrice = computed(() => calculator.value?.finalPrice?.value ?? 0);

const currentStepProps = computed(() => ({
  form,
  colorOptions,
  accessoryExtraCost: accessoryExtraCost.value,
  colorExtraCost: colorExtraCost.value,
}));

watch(finalPrice, (newPrice) => {
  if (newPrice !== null) {
    form.total_price = newPrice;
  }
});

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

const nextStep = () => {
  if (step.value < configurationSteps.value.length + 1) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const submitConfiguration = () => {
  form.post(route("configurations.store"), {
    onSuccess: () => {
      const configurationId = form.id;
      if (configurationId) {
        window.location.href = route("orders.create", {
          configuration_id: configurationId,
        });
      }
    },
    onError: (errors) => {
      console.error("Failed to save configuration:", errors);
    },
  });
};
</script>