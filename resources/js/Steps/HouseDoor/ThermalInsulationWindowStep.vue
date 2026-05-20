<template>
  <div class="max-w-6xl mx-auto px-4 space-y-20">

    

    <!-- SPLIT -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-14">

      <!-- ========================= -->
      <!-- INSULATION -->
      <!-- ========================= -->
      <section>
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">
          {{ t('door.insulation.title') }}
        </h2>

        <div
          class="text-gray-700 leading-relaxed space-y-4 mb-8"
          v-html="t('door.insulation.description')"
        ></div>

        <div class="space-y-3">
          <label
            v-for="option in insulationOptions"
            :key="option.value"
            class="flex items-start gap-3 cursor-pointer"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options.thermal_insulation"
              class="mt-1"
            />

            <div>
              <p class="font-semibold text-gray-900">
                {{ t(`door.insulation.options.${option.value}.label`) }}
              </p>
              <p class="text-sm text-gray-600">
                {{ t(`door.insulation.options.${option.value}.desc`) }}
              </p>
            </div>
          </label>
        </div>
      </section>

      <!-- ========================= -->
      <!-- WINDOWS -->
      <!-- ========================= -->
      <section>
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">
          {{ t('door.windows.title') }}
        </h2>

        <!-- DESCRIPTION -->
        <div class="text-gray-700 leading-relaxed space-y-4">

          <div v-html="t('door.windows.description')"></div>

          <p class="text-red-600 font-medium">
            {{ t('door.windows.warning') }}
          </p>

          <p class="text-sm text-gray-500">
            {{ t('door.windows.samePrice') }}
          </p>

          <!-- WITHOUT / WITH -->
          <div class="space-y-3 pt-4">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="without"
                v-model="form.config_options.window_type"
              />
              <span class="font-medium text-gray-900">
                {{ t('door.windows.without') }}
              </span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="with"
                v-model="form.config_options.window_type"
                :disabled="form.config_options.locking_mechanism === 'V3'"
              />
              <span class="font-medium text-gray-900">
                {{ t('door.windows.with') }}
              </span>
            </label>

            <!-- V3 WARNING -->
            <p
              v-if="form.config_options.locking_mechanism === 'V3'"
              class="text-sm text-red-600 mt-1"
            >
              {{ t('door.windows.v3Warning') }}
            </p>
          </div>

          <!-- ========================= -->
          <!-- FLOOD -->
          <!-- ========================= -->
          <div class="mt-6 border-t pt-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              {{ t('door.flood.title') }}
            </h3>

            <p class="text-sm text-gray-600 mb-3">
              {{ t('door.flood.description') }}
            </p>

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                v-model="form.config_options.heavy_duty"
                :disabled="form.config_options.window_type === 'with'"
                class="mt-1"
              />

              <div>
                <p class="font-medium text-gray-900">
                  {{ t('door.flood.option') }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ t('door.flood.note') }}
                </p>
              </div>
            </label>

            <p
              v-if="form.config_options.window_type === 'with'"
              class="text-sm text-red-600 mt-2"
            >
              {{ t('door.flood.disabledNote') }}
            </p>
          </div>
        </div>

        <!-- ========================= -->
        <!-- WINDOW VERSIONS -->
        <!-- ========================= -->
        <div
          v-if="form.config_options.window_type === 'with'"
          class="mt-10 border-t pt-10"
        >
          <h3 class="text-2xl font-semibold text-center mb-6">
            {{ t('door.windows.versionTitle') }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            <!-- RADIO LIST -->
            <div class="space-y-3">
              <label
                v-for="option in windowVersions"
                :key="option.value"
                class="flex items-start gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  :value="option.value"
                  v-model="form.config_options.window_version"
                  class="mt-1"
                />

                <div>
                  <p class="font-semibold text-gray-900">
                    {{ t(`door.windows.versions.${option.value}.label`) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ t(`door.windows.versions.${option.value}.desc`) }}
                  </p>
                </div>
              </label>
            </div>

            <!-- IMAGES -->
            <div class="flex gap-4 justify-center flex-wrap">
              <img
                v-for="option in windowVersions"
                :key="option.value"
                :src="option.image"
                :alt="option.value"
                class="w-32 h-32 object-cover rounded-lg border"
              />
            </div>

          </div>
        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import imgDoor1 from "@/Assets/3-AquaLOCK Door/Step-1/aqualock-1a.jpg"
import imgDoor2 from "@/Assets/3-AquaLOCK Door/Step-1/aqualock-1b.jpg"
import imgDoor3 from "@/Assets/3-AquaLOCK Door/Step-1/aqualock-1c.jpg"

const { t } = useI18n()

const props = defineProps({
  form: Object
})

const form = props.form

// INSULATION OPTIONS
const insulationOptions = [
  { value: "thermally_insulated" },
  { value: "non_thermally_insulated" }
]

// WINDOW TYPES
const windowVersions = [
  { value: "clear", image: imgDoor1 },
  { value: "mastercarree", image: imgDoor2 },
  { value: "satinato", image: imgDoor3 }
]

// =========================
// LOGIC (KEEP THIS)
// =========================

// V3 → no windows
watch(
  () => form.config_options.locking_mechanism,
  (value) => {
    if (value === 'V3') {
      form.config_options.window_type = 'without'
      form.config_options.window_version = null
    }
  }
)

// window ↔ flood exclusion
watch(
  () => form.config_options.window_type,
  (value) => {
    if (value === 'with') {
      form.config_options.heavy_duty = false
    }

    if (value !== 'with') {
      form.config_options.window_version = null
    }
  }
)

// flood ↔ window exclusion
watch(
  () => form.config_options.heavy_duty,
  (value) => {
    if (value) {
      form.config_options.window_type = 'without'
      form.config_options.window_version = null
    }
  }
)
</script>