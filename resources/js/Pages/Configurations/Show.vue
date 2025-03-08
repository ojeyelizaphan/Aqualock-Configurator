<script setup>
import { defineProps } from "vue";

defineProps({
  configuration: Object,
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Configuration Details</h1>

    <p><strong>Product:</strong> {{ configuration.product?.name || 'No product' }}</p>
    <p><strong>Installation Type:</strong> {{ configuration.installation_type }}</p>
    <p><strong>Material:</strong> {{ configuration.material }}</p>
    <p><strong>Color:</strong> {{ configuration.color }}</p>
    <p><strong>Total Price:</strong> ${{ configuration.total_price }}</p>
    <button @click="$inertia.visit('/configurations')" class="mt-4 text-blue-500">Back</button>
  </div>
</template>
