<script setup>
import { useI18n } from 'vue-i18n'

import plateImg from '@/Assets/5-Quickwall/Step-4/base-plate.jpg'
import accessoriesImg from '@/Assets/5-Quickwall/Step-4/accessories.jpg'

import { colorOptions } from '@/Data/colorOptions'
import ColorSelector from '@/Components/ColorSector.vue'

const { t } = useI18n()

const props = defineProps({
  form: Object,
})

const { form } = props

if (!form.config_options.accessory_quantities) {
  form.config_options.accessory_quantities = {}
}

if (form.config_options.accessory_quantities.quickwall_hooks == null) {
  form.config_options.accessory_quantities.quickwall_hooks = 0
}

if (!form.config_options.corner_profiles_coloring) {
  form.config_options.corner_profiles_coloring = 'without'
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-10">
    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('quickwall.stepAccessories.title') }}
    </h2>

    <!-- MAIN LAYOUT -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <!-- LEFT SIDE -->
      <div class="space-y-8">
        <!-- INCLUDED -->
        <div class="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h3 class="text-lg font-semibold text-green-900 mb-2">
            {{ t('quickwall.stepAccessories.included.title') }}
          </h3>

          <p class="text-sm text-green-800 leading-relaxed">
            {{ t('quickwall.stepAccessories.included.description') }}
          </p>
        </div>

        <!-- BOTTOM PLATE -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ t('quickwall.stepAccessories.bottomPlate.title') }}
            </h3>

            <p class="text-gray-700 leading-relaxed">
              {{ t('quickwall.stepAccessories.bottomPlate.description') }}
            </p>
          </div>

          <img
            :src="plateImg"
            class="mx-auto max-h-48 object-contain"
            alt="Quickwall bottom plate"
          />
        </div>

        <!-- CORNER PROFILES -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('quickwall.stepAccessories.cornerProfiles.title') }}
          </h3>

          <p class="text-gray-700 leading-relaxed">
            {{ t('quickwall.stepAccessories.cornerProfiles.description') }}
          </p>

          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="without"
                v-model="form.config_options.corner_profiles_coloring"
                class="accent-brand-orange"
              />

              <span class="text-gray-700">
                {{ t('quickwall.stepAccessories.cornerProfiles.without') }}
              </span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="with"
                v-model="form.config_options.corner_profiles_coloring"
                class="accent-brand-orange"
              />

              <span class="text-gray-700">
                {{ t('quickwall.stepAccessories.cornerProfiles.with') }}
              </span>
            </label>
          </div>

          <div
            v-if="form.config_options.corner_profiles_coloring === 'with'"
            class="pt-4"
          >
            <ColorSelector
              :options="colorOptions"
              v-model="form.config_options.color"
            />
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE: ACCESSORIES -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-4 flex items-center justify-center">
          <img
            :src="accessoriesImg"
            class="w-full max-h-64 object-contain"
            alt="Quickwall accessories"
          />
        </div>

        <div class="p-6 space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ t('quickwall.stepAccessories.accessories.title') }}
            </h3>

            <p class="text-sm text-gray-600">
              {{ t('quickwall.stepAccessories.accessories.hooks.description') }}
            </p>
          </div>

          <div class="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p class="font-medium text-gray-800">
                  {{ t('quickwall.stepAccessories.accessories.hooks.title') }}
                </p>

                <p class="text-sm text-brand-orange font-semibold mt-1">
                  {{ t('quickwall.stepAccessories.accessories.hooks.price') }}
                </p>
              </div>

              <input
                type="number"
                min="0"
                class="w-full sm:w-28 p-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange"
                v-model.number="form.config_options.accessory_quantities.quickwall_hooks"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>