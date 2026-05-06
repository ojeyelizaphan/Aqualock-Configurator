<script setup>
import { useI18n } from 'vue-i18n'

import img1 from "@/Assets/4-AquaLOCK Gate/Step-4/center-locking-4.jpg"

const { t } = useI18n()

const props = defineProps({
  form: Object
})

const form = props.form

// Ensure accessories object exists
if (!form.config_options.accessories) {
  form.config_options.accessories = {}
}

const centralLockingOptions = [
  { value: 'with' },
  { value: 'without' }
]

const optionalAccessories = [
  { key: 'gateStop' },
  { key: 'padlockPreparation' },
  { key: 'durchgriff' }
]

const latticeOptions = [
  { value: 'round_extruded', price: 638 },
  { value: 'angular_extruded', price: 638 },
  { value: 'round_forged', price: 771 },
  { value: 'angular_forged', price: 771 }
]
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('gate.step4.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- CENTRAL LOCKING -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold">
          {{ t('gate.step4.centralLocking.title') }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ t('gate.step4.centralLocking.note') }}
          <br><br>
          {{ t('gate.step4.centralLocking.description') }}
        </p>

        <div class="space-y-3">
          <label
            v-for="option in centralLockingOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer"
            :class="form.config_options.centralLocking === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options.centralLocking"
              class="mt-1 accent-orange-500"
            />

            <div class="flex-1">
              <p class="text-sm font-medium">
                {{ t(`gate.step4.centralLocking.${option.value}.label`) }}
              </p>
              <p class="text-xs text-gray-600">
                {{ t(`gate.step4.centralLocking.${option.value}.description`) }}
              </p>
            </div>

            <span class="text-sm">
              {{ t(`gate.step4.centralLocking.${option.value}.price`) }}
            </span>
          </label>
        </div>

        <figure class="pt-4 text-center">
          <img :src="img1" class="rounded-lg border mx-auto" />
          <figcaption class="text-xs text-gray-600 mt-2">
            {{ t('gate.step4.imageCaption') }}
          </figcaption>
        </figure>
      </section>

      <!-- ACCESSORIES -->
      <section class="space-y-6">

        <h3 class="text-xl font-semibold">
          {{ t('gate.step4.accessories.title') }}
        </h3>

        <p class="text-sm font-medium text-gray-700">
          {{ t('gate.step4.accessories.optional') }}
        </p>

        <div class="space-y-3">
          <label
            v-for="acc in optionalAccessories"
            :key="acc.key"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer"
            :class="form.config_options.accessories[acc.key]
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200'"
          >
            <input
              type="checkbox"
              v-model="form.config_options.accessories[acc.key]"
              class="mt-1"
            />

            <div class="flex-1">
              <p class="text-sm font-medium">
                {{ t(`gate.step4.accessories.${acc.key}.label`) }}
              </p>
              <p class="text-xs text-gray-600">
                {{ t(`gate.step4.accessories.${acc.key}.description`) }}
              </p>
            </div>

            <span class="text-sm">
              {{ t(`gate.step4.accessories.${acc.key}.price`) }}
            </span>
          </label>
        </div>

        <!-- LATTICE -->
        <div class="pt-4 space-y-3">
          <p class="text-sm font-medium text-gray-700">
            {{ t('gate.step4.lattice.title') }}
          </p>

          <label
            v-for="lattice in latticeOptions"
            :key="lattice.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer"
            :class="form.config_options.lattice_bar === lattice.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200'"
          >
            <input
              type="radio"
              :value="lattice.value"
              v-model="form.config_options.lattice_bar"
              class="mt-1"
            />

            <div class="flex-1">
              {{ t(`gate.step4.lattice.${lattice.value}`) }}
            </div>

            <span class="text-sm">
              {{ t('gate.step4.lattice.unit', { price: lattice.price }) }}
            </span>
          </label>
        </div>

      </section>

    </div>
  </div>
</template>