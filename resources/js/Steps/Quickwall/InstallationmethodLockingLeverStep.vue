<script setup>
import { useI18n } from 'vue-i18n'
import lockingImg from "@/Assets/5-Quickwall/Step-2/locking-lever-layout.jpg";
import betweenImg from "@/Assets/5-Quickwall/Step-2/between-of-the-reveal.jpg";
import frontImg from "@/Assets/5-Quickwall/Step-2/front-of-the-reveal.jpg";

const { t } = useI18n()

defineProps({
  form: Object
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('quickwall.stepInstallation.title') }}
    </h2>

    <div class="bg-white rounded-2xl shadow-md p-6 md:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

        <!-- LEFT: INSTALLATION -->
        <div class="space-y-5">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('quickwall.stepInstallation.installation.title') }}
          </h3>

          <p class="text-gray-700 leading-relaxed">
            {{ t('quickwall.stepInstallation.installation.description') }}
          </p>

          <!-- Images -->
          <div class="grid grid-cols-2 gap-4">
            <img :src="frontImg" class="mx-auto max-h-48 object-contain" />
            <img :src="betweenImg" class="mx-auto max-h-48 object-contain" />
          </div>

          <!-- Options -->
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="front_reveal"
                v-model="form.config_options.installation_method"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                {{ t('quickwall.stepInstallation.installation.front') }}
              </span>
            </label>

            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="between_reveal"
                v-model="form.config_options.installation_method"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                {{ t('quickwall.stepInstallation.installation.between') }}
              </span>
            </label>
          </div>
        </div>

        <!-- RIGHT: LOCKING -->
        <div class="space-y-5">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ t('quickwall.stepInstallation.locking.title') }}
          </h3>

          <p class="text-gray-700 leading-relaxed">
            {{ t('quickwall.stepInstallation.locking.description') }}
            <br />
            <span class="text-sm text-gray-500">
              {{ t('quickwall.stepInstallation.locking.view') }}
            </span>
          </p>

          <!-- Image -->
          <img
            :src="lockingImg"
            class="mx-auto max-h-48 object-contain"
          />

          <!-- Options -->
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="right"
                v-model="form.config_options.locking_lever_position"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                {{ t('quickwall.stepInstallation.locking.right') }}
              </span>
            </label>

            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="left"
                v-model="form.config_options.locking_lever_position"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                {{ t('quickwall.stepInstallation.locking.left') }}
              </span>
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>