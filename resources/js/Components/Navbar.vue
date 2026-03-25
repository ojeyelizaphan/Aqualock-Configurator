<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="w-full max-w-screen-2xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <a href="https://aqualock.uk/" class="flex items-center gap-3 shrink-0">
            <img
              src="/images/aqualock-logo.jpeg"
              alt="AquaLOCK Logo"
              class="h-12 w-auto object-contain"
            />
          </a>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <a
            href="mailto:info@torbau-schwaben.de"
            class="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-orange transition-colors"
          >
            <!-- Mail Icon -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12H8m8 0l-8 0m12 8H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z" />
            </svg>

            <span>info@torbau-schwaben.de</span>
          </a>

          <a
            href="tel:+49735593100"
            class="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-orange transition-colors"
          >
            <!-- Phone Icon -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.57 2.281a2 2 0 01-.502 1.93l-1.287 1.287a16 16 0 006.364 6.364l1.287-1.287a2 2 0 011.93-.502l2.281.57A2 2 0 0121 15.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
            </svg>

            <span>+49 (0)7355 / 9310-0</span>
          </a>
          <Link
            href="https://aqualock.uk/kontakt/"
            class="bg-brand-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors inline-flex items-center justify-center"
          >
            Request for Quote
          </Link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
</script>