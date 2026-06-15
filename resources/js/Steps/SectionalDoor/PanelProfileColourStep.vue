<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ $t('sectionalDoor.step3.title') }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <!-- LEFT: INFO -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          {{ $t('sectionalDoor.step3.panel.title') }}
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          {{ $t('sectionalDoor.step3.panel.description1') }}
        </p>

        <p class="text-sm text-gray-600 mb-4">
          {{ $t('sectionalDoor.step3.panel.description2') }}
        </p>

        <p class="text-sm text-gray-600 mb-4">
          {{ $t('sectionalDoor.step3.panel.description3') }}
        </p>

        <p class="text-xs text-gray-500 mb-6">
          {{ $t('sectionalDoor.step3.panel.note') }}
        </p>

        <div class="rounded-2xl bg-gray-50 border border-gray-200 p-4">
          <img
            :src="img1"
            class="w-full max-h-72 object-contain rounded-xl"
          />
        </div>
      </section>

      <!-- RIGHT: PANEL COLOUR CHOICE -->
      <section class="space-y-5">
        <ColorSelector
          :title="$t('sectionalDoor.step3.panel.selectorTitle')"
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <div
          v-if="isStandardColor"
          class="text-sm text-green-600"
        >
          {{ $t('sectionalDoor.step3.panel.standardSelected') }}
        </div>

        <div
          v-else-if="isCustomColor"
          class="text-sm text-red-500"
        >
          {{ $t('sectionalDoor.step3.panel.customSelected', { price: colorExtraCost }) }}
        </div>

        <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p class="text-sm font-medium text-gray-800 mb-1">
            {{ $t('sectionalDoor.step3.panel.insideTitle') }}
          </p>

          <p class="text-sm text-gray-600">
            {{ $t('sectionalDoor.step3.panel.insideValue') }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import img1 from "@/Assets/6-Sectional/Step-3/step-3a.jpg"
import ColorSelector from '@/Components/ColorSector.vue'
import { colorOptions } from '@/Data/colorOptions'

const props = defineProps({
  form: Object,
  colorExtraCost: {
    type: Number,
    default: 0
  }
})

const standardOutsideColors = ['RAL 9016', 'RAL 7016']

const isStandardColor = computed(() => {
  return standardOutsideColors.includes(props.form.config_options.color)
})

const isCustomColor = computed(() => {
  return props.form.config_options.color && !isStandardColor.value
})

onMounted(() => {
  props.form.config_options.insideColour = 'RAL 9002'

  // Since customised profile colour is no longer offered
  props.form.config_options.profileColour = 'standard'
  props.form.config_options.customColourProfiles = false
  props.form.config_options.profileRAL = ''
})
</script>