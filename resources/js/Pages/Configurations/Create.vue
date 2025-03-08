<script setup>
import { ref, defineProps } from 'vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
  products: Array,
  authUser: Object, // ✅ Receive auth user
});

const form = useForm({
  product_id: '',
  installation_type: '',
  material: '',
  color: '',
  total_price: '',
});

const submit = () => {
  form.post(route('configurations.store'));
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Create Configuration</h1>

    <h1>Create Configuration (Logged in as {{ authUser.name }})</h1>
    
    <form @submit.prevent="submit">
      <label>Product:</label>
      <select v-model="form.product_id" required>
        <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
      </select>

      <label>Installation Type:</label>
      <input type="text" v-model="form.installation_type" required />

      <label>Material:</label>
      <input type="text" v-model="form.material" required />

      <label>Color:</label>
      <input type="text" v-model="form.color" required />

      <label>Total Price:</label>
      <input type="number" v-model="form.total_price" required />

      <button type="submit">Save Configuration</button>
    </form>
  </div>
</template>
