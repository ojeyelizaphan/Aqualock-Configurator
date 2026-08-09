<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- Split -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- LEFT -->
      <div class="space-y-6">

        <!-- Dimensions -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ t('door.dimensions.title') }}
          </h2>

          <p class="text-sm text-gray-600 mb-4" v-html="t('door.dimensions.description')"></p>

          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('door.dimensions.width') }}
              </label>
              <input
                type="number"
                v-model.number="form.config_options.width"
                :min="500"
                :max="1210"
                class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                :placeholder="t('door.dimensions.widthPlaceholder')"
                :class="{'border-red-500': isWidthInvalid}"
              />
              <p v-if="isWidthInvalid" class="text-xs text-red-500">
                {{ t('door.dimensions.widthError') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('door.dimensions.height') }}
              </label>
              <input
                type="number"
                v-model.number="form.config_options.height"
                :min="1200"
                :max="2300"
                class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                :placeholder="t('door.dimensions.heightPlaceholder')"
                :class="{'border-red-500': isHeightInvalid}"
              />
              <p v-if="isHeightInvalid" class="text-xs text-red-500">
                {{ t('door.dimensions.heightError') }}
              </p>
            </div>
          </div>

          <p class="text-xs text-gray-500 mt-2">
            {{ t('door.dimensions.extra') }}
          </p>
        </div>

        <!-- Fixed Panels -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ t('door.panels.title') }}
          </h2>

          <p class="text-sm text-gray-600 mb-5">
            {{ t('door.panels.description') }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Left panel -->
            <div class="border rounded-xl p-4">
              <label class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="form.config_options.fixed_panel_left"
                  class="accent-brand-orange"
                />

                <span class="font-medium">
                  {{ t('door.panels.left') }}
                </span>
              </label>

              <div
                v-if="form.config_options.fixed_panel_left"
                class="mt-4"
              >
                <label class="block text-sm text-gray-700 mb-1">
                  {{ t('door.panels.width') }}
                </label>

                <div class="relative">
                  <input
                    type="number"
                    v-model.number="
                      form.config_options.fixed_panel_left_width
                    "
                    min="1"
                    step="1"
                    class="w-full rounded-lg border-gray-300 pr-12
                          focus:border-brand-orange
                          focus:ring-brand-orange"
                  />

                  <span
                    class="absolute right-3 top-1/2
                          -translate-y-1/2 text-sm text-gray-500"
                  >
                    mm
                  </span>
                </div>
              </div>
            </div>

            <!-- Right panel -->
            <div class="border rounded-xl p-4">
              <label class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="form.config_options.fixed_panel_right"
                  class="accent-brand-orange"
                />

                <span class="font-medium">
                  {{ t('door.panels.right') }}
                </span>
              </label>

              <div
                v-if="form.config_options.fixed_panel_right"
                class="mt-4"
              >
                <label class="block text-sm text-gray-700 mb-1">
                  {{ t('door.panels.width') }}
                </label>

                <div class="relative">
                  <input
                    type="number"
                    v-model.number="
                      form.config_options.fixed_panel_right_width
                    "
                    min="1"
                    step="1"
                    class="w-full rounded-lg border-gray-300 pr-12
                          focus:border-brand-orange
                          focus:ring-brand-orange"
                  />

                  <span
                    class="absolute right-3 top-1/2
                          -translate-y-1/2 text-sm text-gray-500"
                  >
                    mm
                  </span>
                </div>
              </div>
            </div>

            <!-- Top panel -->
            <div class="border rounded-xl p-4">
              <label class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="form.config_options.fixed_panel_top"
                  class="accent-brand-orange"
                />

                <span class="font-medium">
                  {{ t('door.panels.top') }}
                </span>
              </label>

              <div
                v-if="form.config_options.fixed_panel_top"
                class="mt-4"
              >
                <label class="block text-sm text-gray-700 mb-1">
                  {{ t('door.panels.height') }}
                </label>

                <div class="relative">
                  <input
                    type="number"
                    v-model.number="
                      form.config_options.fixed_panel_top_height
                    "
                    min="1"
                    step="1"
                    class="w-full rounded-lg border-gray-300 pr-12
                          focus:border-brand-orange
                          focus:ring-brand-orange"
                  />

                  <span
                    class="absolute right-3 top-1/2
                          -translate-y-1/2 text-sm text-gray-500"
                  >
                    mm
                  </span>
                </div>
              </div>
            </div>

            <!-- Bottom panel -->
            <div class="border rounded-xl p-4">
              <label class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="form.config_options.fixed_panel_bottom"
                  class="accent-brand-orange"
                />

                <span class="font-medium">
                  {{ t('door.panels.bottom') }}
                </span>
              </label>

              <div
                v-if="form.config_options.fixed_panel_bottom"
                class="mt-4"
              >
                <label class="block text-sm text-gray-700 mb-1">
                  {{ t('door.panels.height') }}
                </label>

                <div class="relative">
                  <input
                    type="number"
                    v-model.number="
                      form.config_options.fixed_panel_bottom_height
                    "
                    min="1"
                    step="1"
                    class="w-full rounded-lg border-gray-300 pr-12
                          focus:border-brand-orange
                          focus:ring-brand-orange"
                  />

                  <span
                    class="absolute right-3 top-1/2
                          -translate-y-1/2 text-sm text-gray-500"
                  >
                    mm
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p class="text-xs text-gray-500 mt-3">
            {{ t('door.panels.pricingNote') }}
          </p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">
          {{ t('door.installation.title') }}
        </h2>

        <p
          class="text-sm text-gray-600 mb-4"
          v-html="t('door.installation.description')"
        ></p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <label
            v-for="option in installationOptions"
            :key="option.value"
            class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition text-center"
          >
            <!-- Image -->
            <img
              :src="option.image"
              class="w-full h-32 object-contain mx-auto mb-2"
            />

            <!-- Caption (blue text like screenshot) -->
            <p class="text-sm font-medium text-blue-600 mb-2">
              {{ t(`door.installation.options.${option.value}.desc`) }}
            </p>

            <!-- Radio + label -->
            <div class="flex items-center justify-center gap-2">
              <input
                type="radio"
                :value="option.value"
                v-model="form.config_options.installation_type"
              />
              <span class="text-sm text-gray-800">
                {{ t(`door.installation.options.${option.value}.label`) }}
              </span>
            </div>
          </label>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// images (restore these)
import imgBetween from "@/Assets/3-AquaLOCK Door/Step-2/between-the-reveal.jpg";
import imgBehind from "@/Assets/3-AquaLOCK Door/Step-2/behind-the-reveal.jpg";
import imgInfront from "@/Assets/3-AquaLOCK Door/Step-2/infront-of-the-reveal.jpg";
import imgInterior from "@/Assets/3-AquaLOCK Door/Step-2/interior-flush.jpg";

const { t } = useI18n()

const props = defineProps({ form: Object })

// KEEP structure, REMOVE hardcoded text
const installationOptions = [
  { value: 'between_reveal', image: imgBetween },
  { value: 'infront_reveal', image: imgInfront },
  { value: 'interior_flush', image: imgInterior },
  { value: 'behind_reveal', image: imgBehind }
]


// validation
const isWidthInvalid = computed(() => {
  const w = props.form.config_options.width
  return w < 500 || w > 1210
})

const isHeightInvalid = computed(() => {
  const h = props.form.config_options.height
  return h < 1200 || h > 2300
})
</script>