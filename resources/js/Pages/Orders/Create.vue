<script setup>
import { useForm, usePage, router } from "@inertiajs/vue3";
import { ref, computed, onMounted } from "vue";
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import { formatAccessories } from '@/utils/formatAccessories';
import ConfigurationWizard from '@/Pages/Configurations/ConfigurationWizard.vue';


const props = defineProps({
  configuration: Object,
  config_options: Array
});

const page = usePage();
const configuration = computed(() => page.props.configuration || null);
const showSuccessModal = ref(false);

const form = useForm({
  configuration_id: "",
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  accessories_summary: []
});

onMounted(() => {
  if (configuration.value?.id) {
    form.configuration_id = configuration.value.id;
  }
});

onMounted(() => {
  if (page.props?.flash?.success) {
    showSuccessModal.value = true;
  }
});

const accessoriesSummary = computed(() => {
  const accessoriesOption = props.config_options.find(option =>
    option.label.toLowerCase() === 'accessories'
  );
  if (!accessoriesOption || typeof accessoriesOption.value !== 'object') return [];
  return formatAccessories(accessoriesOption.value);
});



const closeModal = () => {
  showSuccessModal.value = false;
  router.visit('/configurations/create');
};


const submitOrder = async () => {
  try {
    form.accessories_summary = accessoriesSummary.value;
    await form.post(route("orders.store"), {
      onSuccess: () => {
        console.log("✅ Order submitted successfully");
        showSuccessModal.value = true;
      },
      onError: (errors) => {
        console.error("Failed to submit order(validation or server error):", errors);
        alert("Something went wrong! Please check your details and try again.");
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error.response?.data || error);
    alert("An unexpected error occurred. Please try again later.");
  }
};
</script>


<template>
  <Navbar />

  <div class="max-w-6xl mx-auto p-6">
    <!-- Page Title -->
    <h1 class="text-3xl font-bold text-center mb-10 text-gray-800">
      Contact Details
    </h1>

    <!-- 2-Column Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- LEFT: Summary Section -->
      <div>
        <!-- Configuration Summary Box -->
        <h2 class="text-2xl font-semibold text-[#f39200] mb-4 text-center md:text-left">
          Configuration Summary
        </h2>

        <div class="bg-white shadow rounded-2xl p-6 border border-[#f39200]/30 mb-6">
          <h2 class="text-xl font-bold mb-2 text-gray-800">
            {{ configuration.product.name }}
          </h2>

          <p class="text-lg text-gray-800">
            <strong>Total Price:</strong>
            <span class="text-[#f39200] font-semibold">
              €{{ parseFloat(configuration.total_price).toFixed(2) }}
            </span>
          </p>
        </div>

        <!-- Configuration Details -->
        <div class="bg-gray-50 shadow rounded-xl p-6 border border-gray-200">
          <h2 class="text-xl font-semibold mb-4 text-[#f39200]">
            Configuration Details
          </h2>

          <ul class="space-y-3">
            <li
              v-for="(option, index) in config_options.filter(opt => opt.label.toLowerCase() !== 'accessories')"
              :key="index"
              class="flex justify-between border-b pb-2 text-gray-700"
            >
              <span class="font-medium">{{ option.label }}:</span>
              <span>{{ option.value }}</span>
            </li>
          </ul>

          <!-- Accessories Summary -->
          <div v-if="accessoriesSummary.length"
               class="bg-white shadow rounded-lg p-6 border border-gray-200 mt-6">
            <h2 class="text-xl font-semibold mb-4 text-[#f39200]">Accessories</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-1">
              <li v-for="(line, i) in accessoriesSummary" :key="i">
                {{ line }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- RIGHT: Contact Form -->
      <div>
        <form
          @submit.prevent="submitOrder"
          class="bg-white shadow-xl rounded-2xl p-6 border border-[#f39200]/20"
        >
          <h2 class="text-2xl font-semibold text-[#f39200] mb-4">
            Get in Touch
          </h2>

          <p class="text-gray-600 text-sm mb-6 leading-relaxed">
            Now, one of our employees or installation partners will be
            happy to talk to you personally.<br /><br />
            We will get in touch with you as soon as we have your contact
            for any further instructions. We’ll do our best to protect your
            building as soon as possible.
          </p>

          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Full Name</label>
            <input
              v-model="form.customer_name"
              type="text"
              class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40"
              placeholder="Enter your full name"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40"
              placeholder="Enter your email"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Phone Number</label>
            <input
              v-model="form.phone"
              type="text"
              class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40"
              placeholder="Enter your phone number"
            />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-medium">Delivery Address</label>
            <textarea
              v-model="form.address"
              class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40"
              placeholder="Enter your delivery address"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-[#f39200] text-white py-3 rounded-md hover:bg-[#d87e00] transition duration-200 font-semibold"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  </div>

  <Footer />

  <!-- Success Modal -->
  <transition name="fade">
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md p-6 text-center">
        <h2 class="text-2xl font-bold text-green-600 mb-3">Congrats! 🎉</h2>
        <p class="text-gray-700 mb-5">
          You successfully configured your customized AquaLOCK® product.
          We'll get in touch.
        </p>
        <button
          @click="closeModal"
          class="bg-[#f39200] hover:bg-[#d87e00] text-white py-2 px-6 rounded-lg transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  </transition>

</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>



