<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- Intro -->
    <div class="text-center space-y-3">
      <h2 class="text-2xl font-semibold text-gray-800">
        {{ t('gate.step1.title') }}
      </h2>

      <p class="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ t('gate.step1.description') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- LEFT -->
      <section class="space-y-6">

        <!-- INCLUDED -->
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 class="text-lg font-semibold text-amber-900 mb-2">
            {{ t('gate.step1.included.title') }}
          </h3>

          <p class="text-sm text-amber-800 mb-4">
            {{ t('gate.step1.included.description') }}
          </p>

          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <p class="font-medium text-gray-900">
                {{ t('gate.step1.included.item') }}
              </p>
              <p class="text-sm text-gray-600">
                {{ t('gate.step1.included.auto') }}
              </p>
            </div>

            <p v-if="assemblyKitPrice" class="font-semibold text-gray-900 whitespace-nowrap">
              {{ t('gate.step1.pricePerPiece', { price: assemblyKitPrice }) }}
            </p>
          </div>

          <!-- Breakdown -->
          <div class="text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-3">
            <p><strong>{{ t('gate.step1.included.breakdownTitle') }}</strong></p>
            <p>{{ t('gate.step1.included.upTo1500') }}</p>
            <p>{{ t('gate.step1.included.upTo5000') }}</p>
            <p>{{ t('gate.step1.included.industrial') }}</p>
          </div>
        </div>

        <!-- Upper Design -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">
            {{ t('gate.step1.upperDesign.title') }}
          </p>

          <label
            v-for="option in upperDesignOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.upper_design === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1 accent-orange-500"
              :value="option.value"
              v-model="form.config_options.upper_design"
            />

            <span class="text-sm text-gray-800">
              {{ t(`gate.step1.upperDesign.${option.value}`) }}
            </span>
          </label>
        </div>

        <!-- Gate Size -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('gate.step1.size.title') }}
          </h3>

          <!-- Width -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('gate.step1.size.width') }}
            </label>
            <input
              v-model="enteredWidth"
              type="number"
              min="800"
              max="5000"
              placeholder="e.g. 3500"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <!-- Protection Height -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('gate.step1.size.height') }}
            </label>
            <input
              v-model="enteredHeight"
              type="number"
              min="500"
              max="1200"
              placeholder="e.g. 1000"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <!-- Total Height -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('gate.step1.size.totalHeight') }}
            </label>
            <input
              v-model="enteredTotalGateHeight"
              type="number"
              min="500"
              max="2000"
              placeholder="e.g. 1800"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <!-- Validation -->
          <div
            v-if="(enteredWidth || enteredHeight || enteredTotalGateHeight) && !isSizeValid"
            class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
          >
            {{ t('gate.step1.validation') }}
          </div>
        </div>

      </section>

      <!-- RIGHT -->
      <section class="space-y-4">
        <div class="grid grid-cols-2 gap-4">

          <figure class="text-center">
            <img :src="img1" class="rounded-lg border" />
            <figcaption class="text-xs text-gray-600">
              {{ t('gate.step1.images.wood') }}
            </figcaption>
          </figure>

          <figure class="text-center">
            <img :src="img2" class="rounded-lg border" />
            <figcaption class="text-xs text-gray-600">
              {{ t('gate.step1.images.access') }}
            </figcaption>
          </figure>

        </div>

        <figure class="text-center">
          <img :src="img3" class="rounded-lg border w-full" />
          <figcaption class="text-xs text-gray-600">
            {{ t('gate.step1.images.diagram') }}
          </figcaption>
        </figure>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import img1 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2a.jpg"
import img2 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2b.jpg"
import img3_en from "@/Assets/4-AquaLOCK Gate/Step-2/step-2c.jpg"
import img3_de from "@/Assets/4-AquaLOCK Gate/Step-2/step-2c-de.jpg"

const { t, locale } = useI18n()

const img3 = computed(() => {
  return locale.value === 'de' ? img3_de : img3_en
})

const props = defineProps({
  form: Object,
})

const form = props.form

const upperDesignOptions = [
  { value: 'lattice' },
  { value: 'wood' }
]

const enteredWidth = ref(form.config_options.entered_width || form.config_options.width || '')
const enteredHeight = ref(form.config_options.entered_height || form.config_options.protection_height || '')
const enteredTotalGateHeight = ref(form.config_options.entered_total_gate_height || form.config_options.total_gate_height || '')

const minWidth = 800
const maxWidth = 5000
const minProtectionHeight = 500
const maxProtectionHeight = 1200
const minTotalGateHeight = 500
const maxTotalGateHeight = 2000

const mappedWidth = computed(() => {
  const width = Number(enteredWidth.value)
  if (!width || width < minWidth || width > maxWidth) return null
  return Math.floor((width - 800) / 200) * 200 + 800
})

const mappedProtectionHeight = computed(() => {
  const height = Number(enteredHeight.value)
  if (!height || height < minProtectionHeight || height > maxProtectionHeight) return null
  return Math.floor((height - 500) / 100) * 100 + 500
})

const totalGateHeightValue = computed(() => {
  const totalHeight = Number(enteredTotalGateHeight.value)
  if (!totalHeight || totalHeight < minTotalGateHeight || totalHeight > maxTotalGateHeight) return null
  return totalHeight
})

const isSizeValid = computed(() => {
  return (
    !!mappedWidth.value &&
    !!mappedProtectionHeight.value &&
    !!totalGateHeightValue.value &&
    totalGateHeightValue.value >= mappedProtectionHeight.value
  )
})

const assemblyKitPrice = computed(() => {
  const width = form.config_options.width
  if (!width) return null

  if (width <= 1500) return 131
  if (width <= 5000) return 189
  return 294
})

watch(enteredWidth, (val) => {
  form.config_options.entered_width = val ? Number(val) : null
  form.config_options.width = mappedWidth.value
})

watch(enteredHeight, (val) => {
  form.config_options.entered_height = val ? Number(val) : null
  form.config_options.protection_height = mappedProtectionHeight.value
  form.config_options.height = mappedProtectionHeight.value
})

watch(enteredTotalGateHeight, (val) => {
  form.config_options.entered_total_gate_height = val ? Number(val) : null
  form.config_options.total_gate_height = val ? Number(val) : null
})

watch(mappedWidth, (val) => {
  form.config_options.width = val
})

watch(mappedProtectionHeight, (val) => {
  form.config_options.protection_height = val
  form.config_options.height = val
})
</script>