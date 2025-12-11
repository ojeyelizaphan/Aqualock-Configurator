<template>
  <div class="space-y-8 max-w-6xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">
      Select Locking Mechanism
    </h2>

    <!-- Introductory text -->
    <div class="text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
      <p>
        There are four different locking mechanism variations to choose from.
        The four variants depend on the structural designs and, of course, individual preferences.
        We guarantee flood protection up to a maximum of <strong>5,000 mm</strong> for all variants,
        with an exemption of version <strong>V2</strong> which has a protection maximum of <strong>1,600 mm</strong>.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

      <!-- LEFT column (V1, V2) -->
      <div class="space-y-6">
        <label
          v-for="option in leftOptions"
          :key="option.value"
          class="flex items-start gap-4 cursor-pointer p-3 rounded-md hover:bg-gray-50 transition"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.locking_mechanism"
            class="mt-1"
          />
          <img :src="option.image" :alt="option.label" class="w-20 h-20 object-contain rounded-md border" />
          <div class="flex-1">
            <p class="font-semibold text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600 mt-1">{{ option.description }}</p>
          </div>
        </label>
      </div>

      <!-- RIGHT column (V3, V6) -->
      <div class="space-y-6">
        <label
          v-for="option in rightOptions"
          :key="option.value"
          class="flex items-start gap-4 cursor-pointer p-3 rounded-md hover:bg-gray-50 transition"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="form.config_options.locking_mechanism"
            class="mt-1"
          />
          <img :src="option.image" :alt="option.label" class="w-20 h-20 object-contain rounded-md border" />
          <div class="flex-1">
            <p class="font-semibold text-gray-800">{{ option.label }}</p>
            <p class="text-sm text-gray-600 mt-1">{{ option.description }}</p>
          </div>
        </label>
      </div>

    </div>

    <!-- Additional info -->
    <div v-if="form.config_options.locking_mechanism" class="mt-4 text-sm text-gray-600 max-w-4xl mx-auto space-y-1">
      <div v-if="form.config_options.locking_mechanism === 'V1'">
        <p><strong>Burglary Protection:</strong> RC1N, RC2, RC3 without window cut-out</p>
      </div>
      <div v-if="form.config_options.locking_mechanism === 'V2'">
        <p><strong>Burglary Protection:</strong> RC1N, RC2, RC3 possible</p>
        <p><strong>Glass Cut-Out:</strong> Possible only with RC1N. Shoot bolt visible outside.</p>
      </div>
      <div v-if="form.config_options.locking_mechanism === 'V3'">
        <p><strong>Burglary Protection:</strong> Only RC1N possible</p>
        <p><strong>Window Cut-Out:</strong> Not possible</p>
      </div>
      <div v-if="form.config_options.locking_mechanism === 'V6'">
        <p><strong>Burglary Protection:</strong> Only RC1N possible</p>
        <p><strong>Glass Cut-Out:</strong> Possible, espagnolette bolt visible outside.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import imgV1 from "@/Assets/3-AquaLOCK Door/Step-3/V1.jpg";
import imgV2 from "@/Assets/3-AquaLOCK Door/Step-3/V2.jpg";
import imgV3 from "@/Assets/3-AquaLOCK Door/Step-3/V3.jpg";
import imgV6 from "@/Assets/3-AquaLOCK Door/Step-3/V6.jpg";

const props = defineProps({
  form: Object
});

const lockingMechanismOptions = [
  { value: 'V1', label: 'V1', description: 'Outside: No door fixture, no locking cylinder. Inside: Locking cylinder, lever handle and espagnolette bolt handle.', image: imgV1 },
  { value: 'V2', label: 'V2', description: 'Outside: Locking cylinder and a lever handle. Inside: Locking cylinder, lever handle and espagnolette bolt handle.', image: imgV2 },
  { value: 'V3', label: 'V3', description: 'Outside: Locking cylinder with waterproof cover, fixed lever knob. Inside: Locking cylinder, lever handle and espagnolette bolt handle.', image: imgV3 },
  { value: 'V6', label: 'V6', description: 'Outside: Locking cylinder, fixed door knob and espagnolette bolt handle. Inside: Locking cylinder, lever handle and espagnolette bolt handle.', image: imgV6 }
];

const leftOptions = lockingMechanismOptions.slice(0,2);
const rightOptions = lockingMechanismOptions.slice(2);
</script>

<style scoped>
input[type="radio"] { accent-color: rgb(243,146,0); }
</style>
