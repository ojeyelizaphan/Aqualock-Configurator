<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';


defineProps({
  configuration: Object,
  config_options: Array
});

const page = usePage();
const configuration = computed(() => page.props.configuration || null);

const form = useForm({
  configuration_id: configuration.value?.id || "",
  customer_name: "",
  email: "",
  phone: "",
  address: "",
});

const submitOrder = async () => {
  try {
    await form.post(route("orders.store"), {
      onSuccess: () => {
        window.location.href = route("order.confirmation"); // Redirect to confirmation page
      },
      onError: (errors) => {
        console.error("Failed to submit order:", errors);
        alert("Something went wrong! Please check your details and try again.");
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};


// // Submit order
// const submitOrder = () => {
//   if (confirm("Are you sure you want to submit this order?")) {
//     form.post(route("orders.store"), {
//       onSuccess: () => {
//         alert("Order submitted successfully!"); // ✅ Success Message
//         router.visit('/orders'); // ✅ Redirect to orders list
//       }
//     });
//   }
// };

</script>

<template>
  <Navbar />
  <div class="max-w-2xl mx-auto p-6">
    <!-- Page Title -->
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Complete Your Order</h1>

    <!-- Configuration Summary -->
    <h2 class="text-2xl font-semibold text-center text-[#f39200] mb-6">Order Summary</h2>
    <div class="bg-white shadow rounded-lg p-6 mb-6 border border-[#f39200]/30">
      <h2 class="text-xl font-bold mb-2">{{ configuration.product.name }}</h2>
      <p class="text-lg text-gray-800">
        <strong>Total Price:</strong>
        <span class="text-[#f39200] font-semibold">€{{ parseFloat(configuration.total_price).toFixed(2) }}</span>
      </p>
    </div>

    <!-- Configuration Details -->
    <div class="bg-gray-50 shadow rounded-lg p-6 border border-gray-200">
      <h2 class="text-xl font-semibold mb-4 text-[#f39200]">Configuration Details</h2>
      <ul class="space-y-4">
        <li v-for="(option, index) in config_options" :key="index" class="flex justify-between border-b pb-2 text-gray-700">
          <span class="font-medium">{{ option.label }}:</span>
          <span>{{ option.value }}</span>
        </li>
      </ul>
    </div>

    <!-- Order Form -->
    <form @submit.prevent="submitOrder" class="bg-white shadow-md rounded-lg p-5 mt-8 border border-[#f39200]/20">
      <div class="mb-4">
        <label class="block text-gray-700">Full Name</label>
        <input v-model="form.customer_name" type="text" class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40" placeholder="Enter your full name">
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Email Address</label>
        <input v-model="form.email" type="email" class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40" placeholder="Enter your email">
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Phone Number</label>
        <input v-model="form.phone" type="text" class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40" placeholder="Enter your phone number">
      </div>

      <div class="mb-6">
        <label class="block text-gray-700">Delivery Address</label>
        <textarea v-model="form.address" class="border p-2 w-full rounded focus:ring focus:ring-[#f39200]/40" placeholder="Enter your delivery address"></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-[#f39200] text-white py-3 rounded-md hover:bg-[#d87e00] transition duration-200"
      >
        Submit Order
      </button>
    </form>
  </div>
  <Footer />
</template>


