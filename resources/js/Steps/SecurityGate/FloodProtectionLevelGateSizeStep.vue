<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- Intro -->
    <div class="text-center space-y-3">
      <h2 class="text-2xl font-semibold text-gray-800">
        Selection of Water-Protection Level
      </h2>
      <p class="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
        The AquaLOCK® gate offers protection for your driveway with a maximum width
        of 5,000 mm and a water protection height of up to 1,200 mm, keeping out
        99.9% of the water. The gate may be higher, but the maximum water protection
        height remains 1,200 mm.
      </p>
    </div>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Options / Inputs -->
      <section class="space-y-6">

        <!-- Protection Height -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Preferred Protection Height (mm)
          </label>
          <input
            type="number"
            v-model.number="form.config_options.protection_height"
            min="0"
            max="1200"
            placeholder="Max 1200 mm"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>

        <!-- Upper Area Design -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">
            Options for designing the upper area (above the desired protective height)
          </p>

          <label
            v-for="option in upperDesignOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.upper_design === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1"
              :value="option.value"
              v-model="form.config_options.upper_design"
            />
            <span class="text-sm text-gray-800">
              {{ option.label }}
            </span>
          </label>
        </div>

        <!-- Gate Size -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">
            Gate Size
          </h3>

          <p class="text-sm text-gray-600">
            Please note the permissible width and height of the gate.
          </p>

          <!-- Width -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Desired Width (800 – 5,000 mm)
            </label>
            <input
              type="number"
              v-model.number="form.config_options.width"
              min="800"
              max="5000"
              placeholder="e.g. 3500"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <!-- Height -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Desired Height (500 – 1,200 mm)
            </label>
            <input
              type="number"
              v-model.number="form.config_options.height"
              min="500"
              max="1200"
              placeholder="e.g. 1000"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <!-- Additional Height -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Additional height without protective function (optional)
            </label>
            <input
              type="number"
              v-model.number="form.config_options.extra_height"
              min="0"
              placeholder="e.g. 200 mm"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
        </div>
      </section>

      <!-- Images -->
      <section class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <figure class="space-y-2 text-center">
            <img
              :src="img1"
              alt="Wood panel design"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              Wood paneling above protection height
            </figcaption>
          </figure>

          <figure class="space-y-2 text-center">
            <img
              :src="img2"
              alt="Upper area lattice design"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              Portal with lattice bars
            </figcaption>
          </figure>
        </div>

        <figure class="space-y-2 text-center">
          <img
            :src="img3"
            alt="Gate height and flood protection diagram"
            class="rounded-lg border w-full"
          />
          <figcaption class="text-xs text-gray-600">
            Maximum flood protection height (up to 1,200 mm)
          </figcaption>
        </figure>
      </section>

    </div>
  </div>
</template>


<script setup>
  import img1 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2a.jpg"
  import img2 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2b.jpg"
  import img3 from "@/Assets/4-AquaLOCK Gate/Step-2/step-2c.jpg"

defineProps({
  form: Object,
});

const upperDesignOptions = [
  { value: 'lattice', label: 'Lattice Bars (Round or Angular)' },
  { value: 'wood', label: 'Wood Paneling' },
];

</script>
