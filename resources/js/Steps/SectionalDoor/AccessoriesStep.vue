<template>
  <div class="space-y-10 max-w-6xl mx-auto">

    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ $t('sectionalDoor.step4.title') }}
    </h2>

    <!-- INCLUDED -->
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-4xl mx-auto">
      <h3 class="text-lg font-semibold text-amber-900 mb-2">
        {{ $t('sectionalDoor.step4.included.title') }}
      </h3>

      <p class="text-sm text-amber-800 mb-4">
        {{ $t('sectionalDoor.step4.included.description') }}
      </p>

      <div class="space-y-4">

        <!-- Motor -->
        <div class="flex justify-between">
          <div>
            <p class="font-medium">{{ $t('sectionalDoor.step4.included.motor.title') }}</p>
            <p class="text-sm text-gray-600">
              {{ $t('sectionalDoor.step4.included.motor.note') }}
            </p>
          </div>
          <p class="font-semibold">
            {{ $t('sectionalDoor.step4.included.motor.price') }}
          </p>
        </div>

        <!-- Assembly -->
        <div class="flex justify-between">
          <div>
            <p class="font-medium">
              {{ $t('sectionalDoor.step4.included.assembly.title') }}
            </p>
            <p class="text-sm text-gray-600">
              {{ $t('sectionalDoor.step4.included.assembly.note') }}
            </p>
          </div>
          <p class="font-semibold">
            {{ $t('sectionalDoor.step4.included.assembly.price') }}
          </p>
        </div>

      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- LEFT -->
      <div class="space-y-6">

        <!-- Upgrade Kit -->
        <div class="bg-white border rounded-2xl p-5 space-y-4">
          <h3 class="text-lg font-semibold">
            {{ $t('sectionalDoor.step4.upgradeKit.title') }}
          </h3>

          <p class="text-sm text-gray-600">
            {{ $t('sectionalDoor.step4.upgradeKit.description') }}
          </p>

          <label class="flex gap-3">
            <input type="radio" value="upTo3m" v-model="form.config_options.upgradeKit" />
            <div>
              <p>{{ $t('sectionalDoor.step4.upgradeKit.upTo3m.label') }}</p>
              <p class="text-sm text-gray-600">
                {{ $t('sectionalDoor.step4.upgradeKit.upTo3m.price') }}
              </p>
            </div>
          </label>

          <label class="flex gap-3">
            <input type="radio" value="upTo6m" v-model="form.config_options.upgradeKit" />
            <div>
              <p>{{ $t('sectionalDoor.step4.upgradeKit.upTo6m.label') }}</p>
              <p class="text-sm text-gray-600">
                {{ $t('sectionalDoor.step4.upgradeKit.upTo6m.price') }}
              </p>
            </div>
          </label>

          <p v-if="!form.config_options.upgradeKit" class="text-red-600 text-sm">
            {{ $t('sectionalDoor.step4.upgradeKit.validation') }}
          </p>
        </div>

        <!-- Tracks -->
        <div class="bg-white border rounded-2xl p-5">
          <label class="flex gap-3">
            <input type="checkbox" v-model="form.config_options.stainlessTracks" />
            <div>
              <p>{{ $t('sectionalDoor.step4.tracks.label') }}</p>
              <p class="text-sm text-gray-600">
                {{ $t('sectionalDoor.step4.tracks.price') }}
              </p>
            </div>
          </label>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="space-y-6">

        <!-- Transmitters -->
        <div class="bg-white border rounded-2xl p-5 space-y-4">
          <h3 class="text-lg font-semibold">
            {{ $t('sectionalDoor.step4.transmitters.title') }}
          </h3>

          <p class="text-sm text-gray-600">
            {{ $t('sectionalDoor.step4.transmitters.description') }}
          </p>

          <label class="text-sm font-medium">
            {{ $t('sectionalDoor.step4.transmitters.label') }}
          </label>

          <input
            type="number"
            min="0"
            v-model="form.config_options.handTransmitterQty"
            :placeholder="$t('sectionalDoor.step4.transmitters.placeholder')"
            class="w-full border rounded-md px-3 py-2"
          />

          <p class="text-sm text-gray-600">
            {{ $t('sectionalDoor.step4.transmitters.price') }}
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  form: Object
})

onMounted(() => {
  if (props.form?.config_options) {
    props.form.config_options.motor = true
    props.form.config_options.assemblyKit = true

    if (!props.form.config_options.handTransmitterQty) {
      props.form.config_options.handTransmitterQty = 0
    }
  }
})
</script>