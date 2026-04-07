<template>
  <div class="space-y-10 max-w-6xl mx-auto">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Accessories
    </h2>

    <!-- Included by default -->
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-4xl mx-auto">
      <h3 class="text-lg font-semibold text-amber-900 mb-2">
        Included by default
      </h3>
      <p class="text-sm text-amber-800 mb-4">
        Motor and assembly kit with sealing are standard options and are automatically added to the total price.
      </p>

      <div class="space-y-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-medium text-gray-900">Motor</p>
            <p class="text-sm text-gray-600">
              Standard option — automatically included.
            </p>
          </div>
          <p class="font-semibold text-gray-900 whitespace-nowrap">
            €651 / piece
          </p>
        </div>

        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-medium text-gray-900">Assembly kit with sealing</p>
            <p class="text-sm text-gray-600">
              Standard option — automatically included.
            </p>
          </div>
          <p class="font-semibold text-gray-900 whitespace-nowrap">
            €246 / piece
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- LEFT -->
      <div class="space-y-6">
        <!-- Upgrade Kit -->
        <div class="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Pre-mounted Upgrade Kit</h3>
            <p class="text-sm text-gray-600 mt-1">
              Select the appropriate upgrade kit depending on the door width.
            </p>
          </div>

          <div class="space-y-3">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                value="upTo3m"
                v-model="form.config_options.upgradeKit"
                class="mt-1"
              />
              <div>
                <p class="font-medium text-gray-900">Width up to 3 m</p>
                <p class="text-sm text-gray-600">€272 / piece</p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                value="upTo6m"
                v-model="form.config_options.upgradeKit"
                class="mt-1"
              />
              <div>
                <p class="font-medium text-gray-900">Width up to 6 m</p>
                <p class="text-sm text-gray-600">€348 / piece</p>
              </div>
            </label>
          </div>

          <p
            v-if="!form.config_options.upgradeKit"
            class="text-sm text-red-600"
          >
            Please select an upgrade kit.
          </p>
        </div>

        <!-- Stainless steel tracks -->
        <div class="bg-white border border-gray-200 rounded-2xl p-5">
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="form.config_options.stainlessTracks"
              class="mt-1"
            />
            <div>
              <p class="font-medium text-gray-900">Stainless steel tracks</p>
              <p class="text-sm text-gray-600">€282 / set</p>
            </div>
          </label>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <!-- Hand transmitters -->
        <div class="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Hand Transmitters</h3>
            <p class="text-sm text-gray-600 mt-1">
              Since the motor is included by default, you can add hand transmitters here.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Hand transmitter quantity
            </label>
            <input
              type="number"
              min="0"
              v-model="form.config_options.handTransmitterQty"
              class="w-full border-gray-300 rounded-md focus:ring-[#f39200] focus:border-[#f39200]"
              placeholder="Enter quantity"
            />
            <p class="text-sm text-gray-600 mt-1">
              €60 / piece
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  form: Object
});

onMounted(() => {
  if (props.form?.config_options) {
    props.form.config_options.motor = true;
    props.form.config_options.assemblyKit = true;

    if (
      props.form.config_options.handTransmitterQty === null ||
      props.form.config_options.handTransmitterQty === undefined
    ) {
      props.form.config_options.handTransmitterQty = 0;
    }
  }
});
</script>