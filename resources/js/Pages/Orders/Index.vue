<script setup>
import { defineProps } from "vue";
import { router } from "@inertiajs/vue3";

defineProps({
  orders: Array,
});

const deleteOrder = (id) => {
  if (confirm("Are you sure you want to delete this order?")) {
    router.delete(`/orders/${id}`);
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Your Orders</h1>
    <ul v-if="orders.length">
      <li v-for="order in orders" :key="order.id" class="border p-2 my-2">
        <strong>{{ order.customer_name }}</strong> - {{ order.configuration.product.name }}
        <button @click="router.get(`/orders/${order.id}`)" class="text-blue-500 ml-4">View</button>
        <button @click="deleteOrder(order.id)" class="text-red-500 ml-2">Delete</button>
      </li>
    </ul>
    <p v-else>No orders found.</p>
    <button @click="$inertia.visit('/orders/create')" class="text-blue-500">+ Place Order</button>
  </div>
</template>
