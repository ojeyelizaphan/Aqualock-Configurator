<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- TITLE -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      {{ $t('sectionalDoor.step2.title') }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- Aluminum -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          {{ $t('sectionalDoor.step2.aluminum.title') }}
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          {{ $t('sectionalDoor.step2.aluminum.description') }}
        </p>

        <div class="flex justify-start mb-4">
          <img :src="img1" class="mx-auto max-h-48 object-contain" />
        </div>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="aluminum"
            v-model="form.config_options.basePlate"
            class="accent-brand-orange"
          />
          <span class="text-sm text-gray-800">
            {{ $t('sectionalDoor.step2.aluminum.option') }}
          </span>
        </label>
      </section>

      <!-- Stainless Steel -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          {{ $t('sectionalDoor.step2.steel.title') }}
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          {{ $t('sectionalDoor.step2.steel.description1') }}
        </p>

        <p class="text-sm text-gray-600 mb-6">
          {{ $t('sectionalDoor.step2.steel.description2') }}
        </p>

        <div class="flex justify-start mb-4">
          <img :src="img2" class="mx-auto max-h-48 object-contain" />
        </div>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="stainless_steel"
            v-model="form.config_options.basePlate"
            class="accent-brand-orange"
          />
          <span class="text-sm text-gray-800">
            {{ $t('sectionalDoor.step2.steel.option') }}
          </span>
        </label>
      </section>
    </div>

    <!-- NONE -->
    <section class="border rounded-2xl p-6 bg-gray-50">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="none"
          v-model="form.config_options.basePlate"
          class="accent-brand-orange"
        />
        <span class="text-sm text-gray-800 font-medium">
          {{ $t('sectionalDoor.step2.none.option') }}
        </span>
      </label>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import img1 from "@/Assets/6-Sectional/Step-2/sectional-2a.jpg";
import img2 from "@/Assets/6-Sectional/Step-2/sectional-2b.jpg";

const props = defineProps({
  form: Object
});

onMounted(() => {
  if (!props.form.config_options.basePlate) {
    props.form.config_options.basePlate = "none";
  }
});
</script>