<script setup>
import { defineProps } from "vue";

defineProps({
  order: Object,
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Order Details</h1>
    <p><strong>Customer:</strong> {{ order.customer_name }}</p>
    <p><strong>Email:</strong> {{ order.email }}</p>
    <p><strong>Phone:</strong> {{ order.phone }}</p>
    <p><strong>Address:</strong> {{ order.address }}</p>
    <p><strong>Product:</strong> {{ order.configuration.product.name }}</p>
    <p><strong>Installation Type:</strong> {{ order.configuration.installation_type }}</p>
    <p><strong>Material:</strong> {{ order.configuration.material }}</p>
    <p><strong>Color:</strong> {{ order.configuration.color }}</p>
    <p><strong>Total Price:</strong> ${{ order.configuration.total_price }}</p>
    <button @click="$inertia.visit('/orders')" class="mt-4 text-blue-500">Back</button>
  </div>
</template>
