<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('flap.step2.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT: Colour -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ t('flap.step2.color.title') }}
        </h3>

        <div class="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p v-html="t('flap.step2.color.description')"></p>

          <p>
            {{ t('flap.step2.color.freeColors') }}
          </p>

          <p class="text-xs text-gray-500">
            {{ t('flap.step2.color.note') }}
          </p>
        </div>

        <div class="flex justify-center pt-2">
          <img :src="img1" class="max-h-40 object-contain" />
        </div>

        <div class="pt-4">
          <ColorSelector
            :options="colorOptions"
            v-model="form.config_options.color"
          />
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-10">
        <!-- Opening -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('flap.step2.opening.title') }}
          </h3>

          <p class="text-sm text-gray-600 leading-relaxed">
            {{ t('flap.step2.opening.description') }}
          </p>

          <div class="space-y-3 pt-2">
            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="left_inward" v-model="form.config_options.opening_direction"/>
              {{ t('flap.step2.opening.left') }}
            </label>

            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="right_inward" v-model="form.config_options.opening_direction"/>
              {{ t('flap.step2.opening.right') }}
            </label>

            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="top" v-model="form.config_options.opening_direction"/>
              {{ t('flap.step2.opening.top') }}
            </label>
          </div>
        </div>

        <!-- Closing -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('flap.step2.closing.title') }}
          </h3>

          <div class="space-y-3">
            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="lockable" v-model="form.config_options.closing_mechanism"/>
              {{ t('flap.step2.closing.lockable') }}
            </label>

            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="non_lockable" v-model="form.config_options.closing_mechanism"/>
              {{ t('flap.step2.closing.nonLockable') }}
            </label>
          </div>
        </div>

        <!-- Cladding -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('flap.step2.cladding.title') }}
          </h3>

          <div class="space-y-3">
            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="with_aluminium" v-model="form.config_options.internal_cladding"/>
              {{ t('flap.step2.cladding.with') }}
            </label>

            <label class="flex items-center gap-3 text-sm">
              <input type="radio" value="without_aluminium" v-model="form.config_options.internal_cladding"/>
              {{ t('flap.step2.cladding.without') }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ColorSelector from '@/Components/ColorSector.vue'
import img1 from '@/Assets/7-Flap/Step-2/flap-2.jpg'

const { t } = useI18n()

defineProps({
  form: Object,
  colorOptions: Array
})
</script>