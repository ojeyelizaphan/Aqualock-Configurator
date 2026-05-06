<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- ========================= -->
      <!-- LEFT: COLOURS -->
      <!-- ========================= -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">
          {{ t('door.colors.title') }}
        </h2>

        <p
          class="text-sm text-gray-600 mb-4"
          v-html="t('door.colors.description')"
        ></p>

        <ColorSelector
          :options="colorOptions"
          v-model="form.config_options.color"
        />

        <!-- STANDARD -->
        <div
          v-if="form.config_options.color && standardColorCodes.includes(form.config_options.color)"
          class="mt-2 text-sm text-green-600 text-center"
        >
          {{ t('door.colors.standard') }}
        </div>

        <!-- EXTRA COST -->
        <div
          v-else-if="form.config_options.color && colorExtraCost > 0"
          class="mt-2 text-sm text-red-500 text-center"
        >
          {{ t('door.colors.extra', { price: colorExtraCost }) }}
        </div>
      </div>

      <!-- ========================= -->
      <!-- RIGHT: DOOR FITTINGS -->
      <!-- ========================= -->
      <div class="flex gap-6">

        <!-- LEFT CONTENT -->
        <div class="flex-1 space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ t('door.fittings.title') }}
          </h2>

          <p class="text-sm text-gray-600 mb-4">
            {{ t('door.fittings.description') }}
          </p>

          <!-- Selected mechanism -->
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p class="text-sm text-gray-600">
              {{ t('door.fittings.selected') }}:
              <strong>
                {{ form.config_options.locking_mechanism || t('door.fittings.notSelected') }}
              </strong>
            </p>
          </div>

          <!-- KNOB -->
          <div
            v-if="form.config_options.locking_mechanism === 'V2' || form.config_options.locking_mechanism === 'V6'"
          >
            <label class="block font-medium text-gray-700 mb-1">
              {{ t('door.fittings.knobTitle') }}
            </label>

            <select
              v-model="form.config_options.knob_type"
              class="w-full rounded-lg border-gray-300 px-4 py-2"
            >
              <option value="">
                {{ t('door.fittings.knob.none') }}
              </option>
              <option value="aluminium">
                {{ t('door.fittings.knob.aluminium') }}
              </option>
              <option value="stainless">
                {{ t('door.fittings.knob.stainless') }}
              </option>
            </select>
          </div>

          <!-- KABA -->
          <div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.config_options.kaba_upgrade" />
              <span class="text-gray-800">
                {{ t('door.fittings.kaba') }}
              </span>
            </label>
          </div>
        </div>

        <!-- IMAGE -->
        <div class="flex-shrink-0 flex justify-center items-start">
          <img
            :src="imgDoor"
            alt="Door Fittings"
            class="w-64 h-auto object-contain rounded-md border"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import imgStep4 from "@/Assets/3-AquaLOCK Door/Step-4/step-4.jpg"
import ColorSelector from '@/Components/ColorSector.vue'
import { colorOptions, standardColorCodes } from '@/Data/colorOptions'

const { t } = useI18n()

const props = defineProps({
  form: Object,
  colorExtraCost: Number
})

const imgDoor = imgStep4

</script>