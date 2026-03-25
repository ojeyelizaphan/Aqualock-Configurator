<template>
  <nav class="sticky top-0 z-40 bg-brand-orange shadow-md">
    <div class="w-full max-w-screen-2xl mx-auto px-4 lg:px-6">
      <div class="h-12 flex items-center justify-between">
        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-6">
          <!-- Products dropdown -->
          <div
            class="relative"
            @mouseenter="productsOpen = true"
            @mouseleave="productsOpen = false"
          >
            <button
              class="flex items-center gap-1 text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
              type="button"
            >
              Products
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-if="productsOpen"
              class="absolute left-0 top-full mt-1 w-72 bg-white rounded-md shadow-xl py-2 z-50"
            >
              <a href="https://aqualock.uk/aqualock-tur/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Door</a>
              <a href="https://aqualock.uk/schwingtor/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Up-and-over Garage Door</a>
              <a href="https://aqualock.uk/sektionaltor/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Sectional Door</a>
              <a href="https://aqualock.uk/portal/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Gate</a>
              <a href="https://aqualock.uk/quickwall/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Quickwall</a>
              <a href="https://aqualock.uk/klappe/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Flap</a>
              <a href="https://aqualock.uk/protector/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Windows Protector</a>
              <a href="https://aqualock.uk/industrie-gewerbe/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">AquaLOCK® Industrial</a>
            </div>
          </div>

          <a
            href="https://aqualock.uk/fm-approved/"
            class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
          >
            FM Approved
          </a>

          <a
            href="#"
            class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
          >
            Configurator
          </a>

          <a
            href="https://aqualock.uk/download-2/"
            class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
          >
            Download
          </a>

          <a
            href="#"
            class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
          >
            Shop
          </a>

          <a
            href="https://aqualock.uk/unternehmen/"
            class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
          >
            About
          </a>

          <!-- Gallery dropdown -->
          <div
            class="relative"
            @mouseenter="galleryOpen = true"
            @mouseleave="galleryOpen = false"
          >
            <button
              class="flex items-center gap-1 text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
              type="button"
            >
              Gallery
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-if="galleryOpen"
              class="absolute left-0 top-full mt-1 w-52 bg-white rounded-md shadow-xl py-2 z-50"
            >
              <a href="https://aqualock.uk/galerie/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">Photo Gallery</a>
              <a href="https://www.youtube.com/@aqualock7157" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">Videos</a>
            </div>
          </div>

          <a
            href="#"
            class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide"
          >
            Contact
          </a>
        </div>

        <!-- Mobile button -->
        <div class="lg:hidden flex items-center justify-between w-full">
          <span class="text-white text-sm font-semibold uppercase tracking-wide">
            Menu
          </span>

          <button
            @click="mobileOpen = !mobileOpen"
            class="text-white"
            type="button"
          >
            <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Right side icons desktop -->
        <div class="hidden lg:flex items-center gap-4">
          <a href="#" class="text-white hover:text-orange-100 transition-colors" title="Deutsch">🇩🇪</a>
          <a href="#" class="text-white hover:text-orange-100 transition-colors" title="Français">🇫🇷</a>

          <a
            href="https://www.youtube.com/@aqualock7157"
            class="text-black hover:text-orange-100 transition-colors"
            title="YouTube"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.9 4.9 12 4.9 12 4.9h0s-3.9 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5C2 14.4 2.2 16 2.2 16s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 6.6.2 6.6.2s3.9 0 6.9-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.5C22 9.6 21.8 8 21.8 8zM9.8 15.3V8.7l6.3 3.3-6.3 3.3z"/>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/aqualock/posts/?feedView=all"
            class="text-black hover:text-orange-100 transition-colors"
            title="LinkedIn"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 103 4.97 1.98 1.98 0 005.25 3zM20.44 12.46c0-3.09-1.65-4.53-3.85-4.53a3.33 3.33 0 00-3 1.65V8.5h-3.38V20h3.38v-6.06c0-1.6.3-3.15 2.27-3.15 1.94 0 1.97 1.82 1.97 3.25V20h3.38z"/>
            </svg>
          </a>

          <a
            href="https://www.instagram.com/aqualock_dach?igsh=MWJiZ3F0cG1ubXl2Mw%3D%3D"
            class="text-black hover:text-orange-100 transition-colors"
            title="Instagram"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95zm8.9 1.35a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8A3.2 3.2 0 1015.2 12 3.2 3.2 0 0012 8.8z"/>
            </svg>
          </a>

          <a
            href="https://www.facebook.com/people/Aqualock/100091361281845/"
            class="text-black hover:text-orange-100 transition-colors"
            title="Facebook"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V5a22 22 0 00-2.4-.1c-2.4 0-4 1.5-4 4.2V11H8v3h2.9v8z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Mobile menu panel -->
      <div v-if="mobileOpen" class="lg:hidden border-t border-orange-400 py-4">
        <div class="flex flex-col gap-3">
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">Products</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">FM Approved</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">Configurator</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">Download</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">Shop</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">About</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">Gallery</a>
          <a href="#" class="text-black hover:text-orange-100 transition-colors text-sm font-semibold uppercase tracking-wide py-1">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const productsOpen = ref(false);
const galleryOpen = ref(false);
const mobileOpen = ref(false);
</script>