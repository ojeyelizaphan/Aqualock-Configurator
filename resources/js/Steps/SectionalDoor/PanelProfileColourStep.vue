<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Panel and Profile Colour
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- LEFT: Panel Colour -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Colour varieties: 216 different colours
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          To ensure that your AquaLOCK® door perfectly matches your building,
          choose from standard outside colours or enter a customized RAL colour.
        </p>

        <p class="text-sm text-gray-600 mb-4">
          There are two standard colours for the outside
          (<strong>RAL 9016 NZ traffic white</strong>,
          <strong>RAL 7016 NZ anthracite grey</strong>)
          and one standard colour for the inside
          (<strong>RAL 9002</strong>) available at no extra charge.
        </p>

        <p class="text-sm text-gray-600 mb-4">
          Customized colour is only available for the outside, not for the inside.
          The inside colour is fixed as <strong>RAL 9002</strong>.
        </p>

        <p class="text-xs text-gray-500 mb-6">
          Please note: The colours shown on the website may differ from the actual
          colour due to monitor display. Therefore the colour choice is without guarantee.
        </p>

        <div class="mb-6">
          <img
            :src="img1"
            alt="Sectional door colour example"
            class="max-h-56 object-contain"
          />
        </div>

        <ColorSelector
          title="Choose outside panel colour"
          :options="outsideStandardColorOptions"
          v-model="form.config_options.color"
        />

        <div v-if="form.config_options.color === 'custom'" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Enter preferred RAL colour
          </label>
          <input
            type="text"
            v-model="form.config_options.custom_ral_color"
            placeholder="e.g. RAL 1001 Beige"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
          />
          <p class="text-xs text-gray-500 mt-1">
            Example: RAL 1001 Beige
          </p>
        </div>

        <div
          v-if="form.config_options.color === 'custom' && colorExtraCost > 0"
          class="mt-2 text-sm text-red-500"
        >
          Extra charge for custom colour: €{{ colorExtraCost }}
        </div>

        <div class="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p class="text-sm font-medium text-gray-800 mb-1">
            Inside panel colour
          </p>
          <p class="text-sm text-gray-600">
            RAL 9002 (mandatory)
          </p>
        </div>
      </section>

      <!-- RIGHT: Profile Colour -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Steel corners and aluminium profiles
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          In the standard configuration, the profiles on the bottom slat are
          constructed from silver anodized aluminium, while the steel corners are
          powder-coated in grey.
        </p>

        <p class="text-sm text-gray-600 mb-6">
          For an additional fee, both can be customized to match the colour of the
          AquaLOCK® sectional door, enhancing the overall aesthetics and giving the
          door a more refined, seamless look.
        </p>

        <div class="mb-4">
          <img
            :src="img2"
            alt="Steel corners and aluminium profiles"
            class="max-h-56 object-contain"
          />
        </div>

        <div class="space-y-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="standard"
              v-model="form.config_options.profileColour"
              class="accent-brand-orange"
            />
            <span class="text-sm text-gray-800">
              Without customized colour to match sectional door
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
              With customized colour (RAL)
            </span>
          </label>
        </div>

        <div
          v-if="form.config_options.profileColour === 'custom'"
          class="mt-4"
        >
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Enter RAL colour code
          </label>
          <input
            type="text"
            v-model="form.config_options.profileRAL"
            placeholder="e.g. RAL 7016"
            class="w-full max-w-md border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
          />
          <p class="text-xs text-gray-500 mt-1">
            Example: RAL 7016
          </p>
        </div>

        <div
          v-if="form.config_options.profileColour === 'custom'"
          class="mt-3 text-sm text-red-500"
        >
          Extra charge for customized steel corners and aluminium profiles: €421 / set
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import img1 from "@/Assets/6-Sectional/Step-3/step-3a.jpg"
import img2 from "@/Assets/6-Sectional/Step-3/step-3b.jpg"
import ColorSelector from '@/Components/ColorSector.vue'

const props = defineProps({
  form: Object,
  colorExtraCost: {
    type: Number,
    default: 0
  }
})

const outsideStandardColorOptions = [
  {
    value: 'ral9016',
    label: 'RAL 9016 NZ Traffic White',
    color: '#F1F0EA'
  },
  {
    value: 'ral7016',
    label: 'RAL 7016 NZ Anthracite Grey',
    color: '#383E42'
  },
  {
    value: 'custom',
    label: 'Custom RAL Colour',
    color: '#D1D5DB'
  }
]

const ensureDefaults = () => {
  props.form.config_options.insideColour = 'RAL 9002'

  if (!props.form.config_options.profileColour) {
    props.form.config_options.profileColour = 'standard'
  }

  props.form.config_options.customColourProfiles =
    props.form.config_options.profileColour === 'custom'
}

onMounted(() => {
  ensureDefaults()
})

watch(
  () => props.form.config_options.color,
  (newColor) => {
    if (newColor !== 'custom') {
      props.form.config_options.custom_ral_color = ''
    }
  }
)

watch(
  () => props.form.config_options.profileColour,
  (newValue) => {
    props.form.config_options.customColourProfiles = newValue === 'custom'

    if (newValue !== 'custom') {
      props.form.config_options.profileRAL = ''
    }
  },
  { immediate: true }
)
</script>