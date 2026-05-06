<script setup>
import { useI18n } from 'vue-i18n'
import ColorSelector from '@/Components/ColorSector.vue'
import { colorOptions, standardColorCodes } from '@/Data/colorOptions'

import img1 from "@/Assets/4-AquaLOCK Gate/Step-3/gate-fittings-1.jpg"
import img2 from "@/Assets/4-AquaLOCK Gate/Step-3/gate-fittings-2.jpg"
import img3 from "@/Assets/4-AquaLOCK Gate/Step-3/gate-fittings-3.jpg"

const { t } = useI18n()

const props = defineProps({
  form: Object,
  colorExtraCost: Number
})

const form = props.form

const gateFittingOptions = [
  'aluminum_both',
  'stainless_both',
  'aluminum_inside',
  'stainless_inside',
  'aluminum_knob',
  'stainless_knob'
]
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('gate.step3.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- COLOR -->
      <section class="space-y-6">
        <h3 class="text-xl font-semibold text-center">
          {{ t('gate.step3.color.title') }}
        </h3>

        <p class="text-sm text-gray-600 text-center">
          {{ t('gate.step3.color.description') }}
          <br><br>
          {{ t('gate.step3.color.note') }}
        </p>

        <ColorSelector
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <!-- Color Messages -->
        <div
          v-if="form.config_options.color && standardColorCodes.includes(form.config_options.color)"
          class="text-green-600 text-sm text-center"
        >
          {{ t('gate.step3.color.standard') }}
        </div>

        <div
          v-else-if="form.config_options.color && colorExtraCost > 0"
          class="text-red-500 text-sm text-center"
        >
          {{ t('gate.step3.color.custom', { price: colorExtraCost }) }}
        </div>

        <!-- Images -->
        <div class="grid grid-cols-3 gap-4 pt-6">
          <img :src="img1" class="rounded-lg border" />
          <img :src="img2" class="rounded-lg border" />
          <img :src="img3" class="rounded-lg border" />
        </div>
      </section>

      <!-- FITTINGS -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold">
          {{ t('gate.step3.fittings.title') }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ t('gate.step3.fittings.description') }}
        </p>

        <div class="space-y-3">
          <label
            v-for="option in gateFittingOptions"
            :key="option"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer"
            :class="form.config_options.gate_fittings === option
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200'"
          >
            <input
              type="radio"
              class="mt-1 accent-orange-500"
              :value="option"
              v-model="form.config_options.gate_fittings"
            />

            <span class="text-sm">
              {{ t(`gate.step3.fittings.${option}`) }}
            </span>
          </label>
        </div>
      </section>

    </div>
  </div>
</template>