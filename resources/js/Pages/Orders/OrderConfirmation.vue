<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#fffaf3] px-4">
    <div class="bg-white shadow-2xl rounded-3xl p-10 sm:p-12 max-w-lg text-center border border-[#f39200]/20">
      <!-- Image -->
      <img
        src="/images/thank-you.svg"
        alt="Thank you"
        class="w-28 h-28 mx-auto mb-6 drop-shadow-sm animate-pulse"
      />

      <!-- Heading -->
      <h1 class="text-4xl font-extrabold text-[#f39200] mb-4">Order Received!</h1>

      <!-- Subheading -->
      <p class="text-lg text-gray-700 mb-4">
        Thank you for placing your order with <span class="font-semibold text-[#f39200]">AquaLOCK</span>.
      </p>

      <!-- Additional Message -->
      <p class="text-sm text-gray-500 leading-relaxed">
        We’re processing your order and you’ll receive an email shortly with next steps.
        In the meantime, feel free to continue exploring our website.
      </p>

      <!-- CTA Button -->
      <a
        href="/"
        class="mt-8 inline-block bg-[#f39200] text-white px-6 py-3 rounded-xl text-base font-medium shadow-md hover:bg-[#d87e00] transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  </div>
</template>

  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  