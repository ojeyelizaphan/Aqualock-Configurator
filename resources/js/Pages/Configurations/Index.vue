<script setup>
import { defineProps } from "vue";
import { router } from "@inertiajs/vue3";

defineProps({
  configurations: Array,
});

const deleteConfiguration = (id) => {
  if (confirm("Are you sure you want to delete this configuration?")) {
    router.delete(`/configurations/${id}`);
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Your Configurations</h1>


    <ul v-if="configurations.length">
      <li v-for="config in configurations" :key="config.id" class="border p-2 my-2">
        <strong>{{ config.product?.name || 'No product' }}</strong> - {{ config.color }} ({{ config.material }})
        <button @click="router.get(`/configurations/${config.id}`)" class="text-blue-500 ml-4">View</button>
        <button @click="deleteConfiguration(config.id)" class="text-red-500 ml-2">Delete</button>
      </li>
    </ul>
    <p v-else>No configurations found.</p>
    <button @click="$inertia.visit('/configurations/create')" class="text-blue-500">+ Create Configuration</button>
  </div>
</template>
