<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();
const order = computed(() => page.props.order || null);
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 text-center">
    <!-- Thank You Message -->
    <h1 class="text-3xl font-bold text-[#f39200]">🎉 Thank You for Your Order!</h1>
    <p class="text-gray-700 mt-3">Your order has been placed successfully.</p>

    <!-- Order Details Card -->
    <div v-if="order" class="bg-white shadow-md rounded-xl p-6 mt-6 text-left border border-[#f39200]/20">
      <h2 class="text-xl font-semibold mb-4 text-[#f39200]">Order Details</h2>
      <div class="space-y-2 text-gray-800 text-sm sm:text-base">
        <p><strong>Order ID:</strong> {{ order.id }}</p>
        <p><strong>Customer Name:</strong> {{ order.customer_name }}</p>
        <p><strong>Email:</strong> {{ order.email }}</p>
        <p><strong>Phone:</strong> {{ order.phone }}</p>
        <p><strong>Address:</strong> {{ order.address }}</p>
      </div>
      <p class="text-lg font-bold text-right text-[#f39200] mt-4">
        Total Price: €{{ order.configuration.total_price.toFixed(2) }}
      </p>
    </div>

    <!-- CTA Button -->
    <div class="mt-8">
      <button
        @click="$inertia.visit('/orders')"
        class="bg-[#f39200] text-white px-6 py-3 rounded-md hover:bg-[#d87e00] transition font-medium"
      >
        Track Your Order
      </button>
    </div>
  </div>
</template>

