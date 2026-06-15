<script setup>
import { computed } from 'vue'
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
  form: Object
})

const form = props.form

const fittingMethods = [
  { value: 'behind_reveal', key: 'behind' },
  { value: 'between_reveal', key: 'between' },
  { value: 'in_front_reveal', key: 'front' }
]


</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('gate.step2.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

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
        <!-- <div class="grid grid-cols-2 gap-4">
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
        </div> -->
      </section>

      <!-- Images -->
      <section class="space-y-4">
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