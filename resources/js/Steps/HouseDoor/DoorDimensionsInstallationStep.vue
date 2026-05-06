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

          <p class="text-sm text-gray-600 mb-3">
            {{ t('door.panels.description') }}
          </p>

          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="form.config_options.fixed_panel_left" class="accent-brand-orange" />
              <span>{{ t('door.panels.left') }}</span>
            </label>

            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="form.config_options.fixed_panel_right" class="accent-brand-orange" />
              <span>{{ t('door.panels.right') }}</span>
            </label>

            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="form.config_options.fixed_panel_top" class="accent-brand-orange" />
              <span>{{ t('door.panels.top') }}</span>
            </label>
          </div>

          <!-- 🔴 Missing note you highlighted -->
          <p class="text-xs text-gray-500 mt-2">
            {{ t('door.panels.extra') }}
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

// split columns
const leftInstallationOptions = installationOptions.slice(0, 2)
const rightInstallationOptions = installationOptions.slice(2, 4)

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