<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- INCLUDED -->
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-4xl mx-auto">
      <h3 class="text-lg font-semibold text-amber-900 mb-2">
        {{ t('door.included.title') }}
      </h3>

      <p class="text-sm text-amber-800 mb-4">
        {{ t('door.included.description') }}
      </p>

      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-medium text-gray-900">
            {{ t('door.included.item') }}
          </p>
          <p class="text-sm text-gray-600">
            {{ t('door.included.note') }}
          </p>
        </div>

        <p class="font-semibold text-gray-900 whitespace-nowrap">
          {{ t('door.included.price') }}
        </p>
      </div>
    </div>
    

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('door.accessories.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- LEFT -->
      <div class="space-y-6">

        <!-- PANIC -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            {{ t('door.accessories.panic.title') }}
          </h3>

          <div class="space-y-2">
            <label
              v-for="option in panicOptions"
              :key="option.value"
              class="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                :value="option.value"
                v-model="form.config_options.panic_features"
                class="mt-1"
              />
              <div>
                <p class="font-medium text-gray-800">
                  {{ t(`door.accessories.panic.options.${option.value}.label`) }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ t(`door.accessories.panic.options.${option.value}.desc`) }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- DRIP CAP -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            {{ t('door.accessories.drip.title') }}
          </h3>

          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" v-model="form.config_options.drip_cap" />
            <span class="text-gray-800">
              {{ t('door.accessories.drip.option') }}
            </span>
          </label>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="space-y-6">

        <!-- BURGLARY -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            {{ t('door.accessories.burglary.title') }}
          </h3>

          <select
            v-model="form.config_options.burglary_protection"
            class="w-full rounded-lg border-gray-300 px-4 py-2"
          >
            <option value="RC1">RC1</option>

            <option
              value="RC2"
              :disabled="!canUseHigherRC"
            >
              RC2
            </option>

            <option
              value="RC3"
              :disabled="!canUseHigherRC"
            >
              RC3
            </option>
          </select>

          <p v-if="!canUseHigherRC" class="mt-2 text-sm text-red-600">
            {{ t('door.accessories.burglary.restriction') }}
          </p>
        </div>

        <!-- DRIVE PLATE -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            {{ t('door.accessories.drive.title') }}
          </h3>

          <select
            v-model="form.config_options.drive_plate"
            class="w-full rounded-lg border-gray-300 px-4 py-2"
          >
            <option :value="null">
              {{ t('door.accessories.drive.none') }}
            </option>
            <option value="aluminium">
              {{ t('door.accessories.drive.aluminium') }}
            </option>
            <option value="stainless">
              {{ t('door.accessories.drive.stainless') }}
            </option>
          </select>
        </div>

        <!-- DOOR CLOSER -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            {{ t('door.accessories.closer.title') }}
          </h3>

          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" v-model="form.config_options.door_closer" />
            <span class="text-gray-800">
              {{ t('door.accessories.closer.option') }}
            </span>
          </label>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({ form: Object })
const form = props.form

// defaults
if (!form.config_options.panic_features) form.config_options.panic_features = []
if (!form.config_options.drive_plate) form.config_options.drive_plate = null
if (!form.config_options.burglary_protection) form.config_options.burglary_protection = 'RC1'

// ✅ RULE: when can RC2/RC3 be used
const canUseHigherRC = computed(() => {
  const locking = form.config_options.locking_mechanism
  const hasWindow = form.config_options.window_type === 'with'

  return ['V1', 'V2'].includes(locking) && !hasWindow
})

// enforce RC1 if invalid
watch(canUseHigherRC, (allowed) => {
  if (!allowed) {
    form.config_options.burglary_protection = 'RC1'
  }
})

// PANIC OPTIONS
const panicOptions = [
  { value: 'panic_function_e' },
  { value: 'pushbar' }
]
</script>