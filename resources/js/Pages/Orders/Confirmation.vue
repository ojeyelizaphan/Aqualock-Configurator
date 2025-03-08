<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();
const order = computed(() => page.props.order || null);
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 text-center">
    <h1 class="text-3xl font-bold text-green-600">🎉 Thank You for Your Order!</h1>
    <p class="text-gray-700 mt-3">Your order has been placed successfully.</p>

    <div v-if="order" class="bg-white shadow-md rounded-lg p-5 mt-6 text-left">
      <h2 class="text-xl font-semibold mb-2">Order Details</h2>
      <p><strong>Order ID:</strong> {{ order.id }}</p>
      <p><strong>Customer Name:</strong> {{ order.customer_name }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Phone:</strong> {{ order.phone }}</p>
      <p><strong>Address:</strong> {{ order.address }}</p>
      <p class="text-xl font-bold mt-3"><strong>Total Price:</strong> ${{ order.configuration.total_price.toFixed(2) }}</p>
    </div>

    <div class="mt-6">
      <button @click="$inertia.visit('/orders')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Track Your Order
      </button>
    </div>
  </div>
</template>
