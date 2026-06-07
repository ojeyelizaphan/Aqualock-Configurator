<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ $t('sectionalDoor.step3.title') }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- ================= LEFT: PANEL COLOUR ================= -->
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

        <!-- Image -->
        <div class="mb-6">
          <img
            :src="img1"
            class="max-h-56 object-contain"
          />
        </div>

        <!-- Color Selector -->
        <ColorSelector
          :title="$t('sectionalDoor.step3.panel.selectorTitle')"
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <!-- Standard / Custom Messages -->
        <div
          v-if="isStandardColor"
          class="mt-2 text-sm text-green-600"
        >
          {{ $t('sectionalDoor.step3.panel.standardSelected') }}
        </div>

        <div
          v-else-if="isCustomColor"
          class="mt-2 text-sm text-red-500"
        >
          {{ $t('sectionalDoor.step3.panel.customSelected', { price: colorExtraCost }) }}
        </div>

        <!-- Inside Colour -->
        <div class="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p class="text-sm font-medium text-gray-800 mb-1">
            {{ $t('sectionalDoor.step3.panel.insideTitle') }}
          </p>
          <p class="text-sm text-gray-600">
            {{ $t('sectionalDoor.step3.panel.insideValue') }}
          </p>
        </div>
      </section>

      <!-- ================= RIGHT: PROFILE COLOUR ================= -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          {{ $t('sectionalDoor.step3.profile.title') }}
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          {{ $t('sectionalDoor.step3.profile.description1') }}
        </p>

        <p class="text-sm text-gray-600 mb-6">
          {{ $t('sectionalDoor.step3.profile.description2') }}
        </p>

        <!-- Image -->
        <div class="mb-4">
          <img
            :src="img2"
            class="max-h-56 object-contain"
          />
        </div>

        <!-- Options -->
        <div class="space-y-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="standard"
              v-model="form.config_options.profileColour"
              class="accent-brand-orange"
            />
            <span class="text-sm text-gray-800">
              {{ $t('sectionalDoor.step3.profile.standardOption') }}
            </span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="custom"
              v-model="form.config_options.profileColour"
              class="accent-brand-orange"
            />
            <span class="text-sm text-gray-800">
              {{ $t('sectionalDoor.step3.profile.customOption') }}
            </span>
          </label>
        </div>

        <!-- Custom Input -->
        <!-- Custom Profile Colour Selector -->
        <div v-if="isCustomProfile" class="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p class="text-sm font-medium text-gray-800 mb-1">
            {{ $t('sectionalDoor.step3.profile.inputLabel') }}
          </p>

          <p class="text-sm text-gray-700">
            {{ form.config_options.profileRAL || '-' }}
          </p>

          <p class="text-xs text-gray-500 mt-2">
            {{ $t('sectionalDoor.step3.profile.inputHint') }}
          </p>
        </div>
        <!-- Extra Cost -->
        <div
          v-if="isCustomProfile"
          class="mt-3 text-sm text-red-500"
        >
          {{ $t('sectionalDoor.step3.profile.extraCost') }}
        </div>

        <!-- Warning -->
        <div class="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p class="text-sm text-amber-900">
            {{ $t('sectionalDoor.step3.profile.warning') }}
          </p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import img1 from "@/Assets/6-Sectional/Step-3/step-3a.jpg"
import img2 from "@/Assets/6-Sectional/Step-3/step-3b.jpg"
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

const isCustomProfile = computed(() => {
  return props.form.config_options.profileColour === 'custom'
})

const syncProfileRALWithOutsideColour = () => {
  if (props.form.config_options.profileColour === 'custom') {
    props.form.config_options.profileRAL =
      props.form.config_options.color || ''
  }
}

const ensureDefaults = () => {
  props.form.config_options.insideColour = 'RAL 9002'

  if (!props.form.config_options.profileColour) {
    props.form.config_options.profileColour = 'standard'
  }

  props.form.config_options.customColourProfiles =
    props.form.config_options.profileColour === 'custom'

  syncProfileRALWithOutsideColour()
}

onMounted(() => {
  ensureDefaults()
})

watch(
  () => props.form.config_options.profileColour,
  (val) => {
    props.form.config_options.customColourProfiles = val === 'custom'

    if (val === 'custom') {
      syncProfileRALWithOutsideColour()
    } else {
      props.form.config_options.profileRAL = ''
    }
  },
  { immediate: true }
)

watch(
  () => props.form.config_options.color,
  () => {
    syncProfileRALWithOutsideColour()
  }
)
</script>