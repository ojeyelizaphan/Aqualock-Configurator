<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import imgInwards from "@/Assets/4-AquaLOCK Gate/Step-1/inwards.jpg"
import imgOutwards from "@/Assets/4-AquaLOCK Gate/Step-1/outwards.jpg"

const { t } = useI18n()

const props = defineProps({
  form: Object
})

const form = props.form

const openingOptions = [
  'left_in_95',
  'left_in_180',
  'left_out_95',
  'left_out_180',
  'right_in_95',
  'right_in_180',
  'right_out_95',
  'right_out_180'
]

const fittingMethods = [
  { value: 'behind_reveal', key: 'behind' },
  { value: 'between_reveal', key: 'between' },
  { value: 'in_front_reveal', key: 'front' }
]

/**
 * 💰 EXTRA COST LOGIC
 */
const openingExtraCost = computed(() => {
  const opening = form.config_options.gate_opening
  if (!opening) return 0

  return opening.includes('180') ? 362 : 0
})
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('gate.step2.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Opening -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold">
          {{ t('gate.step2.opening.title') }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ t('gate.step2.opening.description') }}
        </p>

        <p class="text-sm font-medium text-gray-700">
          {{ t('gate.step2.opening.subtitle') }}
        </p>

        <div class="space-y-3">
          <label
            v-for="option in openingOptions"
            :key="option"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer"
            :class="form.config_options.gate_opening === option
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200'"
          >
            <input
              type="radio"
              class="mt-1 accent-orange-500"
              :value="option"
              v-model="form.config_options.gate_opening"
            />

            <span class="text-sm">
              {{ t(`gate.step2.opening.${option}`) }}
            </span>
          </label>
        </div>

        <!-- 💰 Extra Cost Display -->
        <div v-if="openingExtraCost" class="text-sm text-orange-600 font-medium">
          +€{{ openingExtraCost }} (180° opening)
        </div>
      </section>

      <!-- Installation -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold">
          {{ t('gate.step2.installation.title') }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ t('gate.step2.installation.description') }}
        </p>

        <div class="space-y-3">
          <label
            v-for="method in fittingMethods"
            :key="method.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer"
            :class="form.config_options.fitting_method === method.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200'"
          >
            <input
              type="radio"
              class="mt-1 accent-orange-500"
              :value="method.value"
              v-model="form.config_options.fitting_method"
            />

            <span class="text-sm">
              {{ t(`gate.step2.installation.${method.key}`) }}
            </span>
          </label>
        </div>

        <!-- Images -->
        <div class="grid grid-cols-2 gap-4 pt-4">
          <figure class="text-center">
            <img :src="imgInwards" class="rounded-lg border" />
            <figcaption class="text-xs text-gray-600">
              {{ t('gate.step2.images.inward') }}
            </figcaption>
          </figure>

          <figure class="text-center">
            <img :src="imgOutwards" class="rounded-lg border" />
            <figcaption class="text-xs text-gray-600">
              {{ t('gate.step2.images.outward') }}
            </figcaption>
          </figure>
        </div>
      </section>

    </div>
  </div>
</template>