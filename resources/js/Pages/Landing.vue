<script setup>
import { usePage, router } from "@inertiajs/vue3";

const page = usePage();
const user = page.props.auth?.user || null;

// Logout function
const logout = () => {
  router.post("/logout");
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
    <!-- Navbar -->
    <nav class="w-full flex justify-between p-5 bg-white shadow-md fixed top-0">
      <h1 class="text-2xl font-bold text-blue-600">AquaLOCK</h1>
      <div>
        <template v-if="user">
          <span class="text-gray-800 font-semibold mr-4">Welcome, {{ user.name }}!</span>
          <button 
            @click="logout" 
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <button 
            @click="$inertia.visit('/login')" 
            class="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Login
          </button>
          <button 
            @click="$inertia.visit('/register')" 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </template>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="text-center p-6 mt-16">
      <h1 class="text-4xl font-bold text-blue-600">Welcome to AquaLOCK Configurator</h1>
      <p class="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
        Customize your product step-by-step and get the perfect fit for your needs. 
        Choose from different materials, colors, and installation types.
      </p>

      <!-- CTA Button -->
      <button 
        @click="$inertia.visit('/configurations/create')" 
        class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
      >
        Start Configuring
      </button>
    </div>

    <!-- Feature Section -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-4xl">
      <div class="bg-white shadow-md rounded-lg p-5 text-center">
        <h2 class="text-xl font-semibold text-gray-800">🔧 Easy Customization</h2>
        <p class="text-gray-600 mt-2">Select your preferred material, color, and installation type.</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-5 text-center">
        <h2 class="text-xl font-semibold text-gray-800">🚀 Quick Order Process</h2>
        <p class="text-gray-600 mt-2">Place an order seamlessly and track your progress.</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-5 text-center">
        <h2 class="text-xl font-semibold text-gray-800">✅ High-Quality Products</h2>
        <p class="text-gray-600 mt-2">We provide premium quality with customizable options.</p>
      </div>
    </div>
  </div>
</template>
