<script setup>
import { useI18n } from 'vue-i18n'
import img1 from "@/Assets/5-Quickwall/Step-3/panels-1.jpg";
import img2 from "@/Assets/5-Quickwall/Step-3/panels-2.jpg";

const { t } = useI18n()

defineProps({
  form: Object
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-10">
    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ t('quickwall.stepMultiPanel.title') }}
    </h2>

    <!-- INTRO -->
    <div class="space-y-4 text-gray-700 leading-relaxed">
      <p class="font-medium">
        {{ t('quickwall.stepMultiPanel.intro.highlight') }}
      </p>

      <p>{{ t('quickwall.stepMultiPanel.intro.p1') }}</p>
      <p>{{ t('quickwall.stepMultiPanel.intro.p2') }}</p>

      <!-- EXAMPLE -->
      <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <p class="font-medium text-gray-800 mb-2">
          {{ t('quickwall.stepMultiPanel.example.title') }}
        </p>

        <p class="mb-3">
          {{ t('quickwall.stepMultiPanel.example.p') }}
        </p>

        <p class="font-mono text-sm text-gray-800">
          {{ t('quickwall.stepMultiPanel.example.calc1') }}
        </p>
        <p class="font-mono text-sm text-gray-800">
          {{ t('quickwall.stepMultiPanel.example.calc2') }}
        </p>
      </div>
    </div>

    <!-- DIVIDER -->
    <div class="border-t border-gray-200"></div>

    <!-- INPUTS + IMAGES -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      <!-- INPUTS -->
      <div class="space-y-6">
        <div>
          <label class="block font-medium text-gray-800 mb-2">
            {{ t('quickwall.stepMultiPanel.inputs.panels.label') }}
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options.quickwall_panels"
            class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            :placeholder="t('quickwall.stepMultiPanel.inputs.panels.placeholder')"
          />
        </div>

        <div>
          <label class="block font-medium text-gray-800 mb-2">
            {{ t('quickwall.stepMultiPanel.inputs.centerPosts.label') }}
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options.center_posts"
            class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            :placeholder="t('quickwall.stepMultiPanel.inputs.centerPosts.placeholder')"
          />
        </div>

        <div>
          <label class="block font-medium text-gray-800 mb-2">
            {{ t('quickwall.stepMultiPanel.inputs.cornerPosts.label') }}
          </label>
          <input
            type="number"
            min="0"
            v-model="form.config_options.corner_posts"
            class="w-full p-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange"
            :placeholder="t('quickwall.stepMultiPanel.inputs.cornerPosts.placeholder')"
          />
        </div>
      </div>

      <!-- IMAGES -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <img :src="img1" class="mx-auto max-h-48 object-contain" />
          <p class="text-sm text-gray-600 mt-2 text-center">
            {{ t('quickwall.stepMultiPanel.images.center') }}
          </p>
        </div>

        <div>
          <img :src="img2" class="mx-auto max-h-48 object-contain" />
          <p class="text-sm text-gray-600 mt-2 text-center">
            {{ t('quickwall.stepMultiPanel.images.corner') }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>