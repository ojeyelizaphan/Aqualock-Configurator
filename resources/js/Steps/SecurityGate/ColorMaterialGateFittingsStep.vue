<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Colour & Material, Gate Fittings
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Colour Selection -->
      <section class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-800 text-center">
          Choose Colour
        </h3>

        <p class="text-sm text-gray-600 text-center leading-relaxed">
          To perfectly match your AquaLOCK® gate to your building, you have a choice
          of 213 RAL colours. There are seven standard colours (white and six shades
          of grey) available at no extra charge.
          <br /><br />
          Please note: Colour shades displayed on the website may differ from the
          actual colour due to monitor settings; therefore, no guarantee for an
          exact match can be given.
        </p>

        <!-- Horizontally scrollable palette -->
        <div class="flex overflow-x-auto gap-4 py-2 px-1">
          <label
            v-for="option in colorOptions"
            :key="option.value"
            class="flex flex-col items-center cursor-pointer flex-shrink-0"
          >
            <input
              type="radio"
              :value="option.value"
              v-model="form.config_options.color"
              class="hidden"
            />
            <div
              :class="[
                'w-12 h-12 rounded-full transition-all duration-300 hover:ring-2 hover:ring-brand-orange',
                form.config_options.color === option.value ? 'ring-2 ring-brand-orange' : ''
              ]"
              :style="{ backgroundColor: option.color }"
            ></div>
            <p class="text-xs mt-1 text-gray-700 text-center">
              {{ option.label }}
            </p>
          </label>
        </div>

        <div
          v-if="colorExtraCost > 0"
          class="mt-2 text-sm text-red-500 text-center"
        >
          Extra charge for custom colour: €{{ colorExtraCost }}
        </div>

        <!-- Reference Images (moved here) -->
        <div class="grid grid-cols-3 gap-4 pt-6">
          <figure class="space-y-2 text-center">
            <img
              :src="img1"
              alt="Gate fitting aluminum"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              <!-- Aluminum F1 handle set -->
            </figcaption>
          </figure>

          <figure class="space-y-2 text-center">
            <img
              :src="img2"
              alt="Gate fitting stainless steel"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              <!-- Stainless steel handle set -->
            </figcaption>
          </figure>

          <figure class="space-y-2 text-center">
            <img
              :src="img3"
              alt="Gate fitting knob outside"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              <!-- Fixed knob outside option -->
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- Gate Fittings -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold text-gray-800">
          Gate Fittings
        </h3>

        <p class="text-sm text-gray-600 leading-relaxed">
          Are you looking to open and close the gate with an additional door handle
          for everyday use? Choose from the following options.
          <br /><br />
          If no further information is provided, the gate will be manufactured
          without a lock and handle.
        </p>

        <!-- Options -->
        <div class="space-y-3">
          <label
            v-for="option in gateFittingOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.gate_fittings === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1"
              :value="option.value"
              v-model="form.config_options.gate_fittings"
            />
            <span class="text-sm text-gray-800">
              {{ option.label }}
            </span>
          </label>
        </div>
      </section>

    </div>
  </div>
</template>


  
  <script setup>

    import img1 from "@/Assets/4-AquaLOCK Gate/Step-3/gate-fittings-1.jpg"
    import img2 from "@/Assets/4-AquaLOCK Gate/Step-3/gate-fittings-2.jpg"
    import img3 from "@/Assets/4-AquaLOCK Gate/Step-3/gate-fittings-3.jpg"
defineProps({
  form: Object,
  colorOptions: Array,
  colorExtraCost: {
    type: Number,
    default: 0
  }
});

const gateFittingOptions = [
  {
    value: 'aluminum_both',
    label: 'Lever handle set inside and outside – Aluminum F1'
  },
  {
    value: 'stainless_both',
    label: 'Lever handle set inside and outside – Stainless steel'
  },
  {
    value: 'aluminum_inside',
    label: 'Lever handle set only inside – Aluminum F1'
  },
  {
    value: 'stainless_inside',
    label: 'Lever handle set only inside – Stainless steel'
  },
  {
    value: 'aluminum_knob',
    label: 'Lever handle inside, fixed knob outside – Aluminum F1'
  },
  {
    value: 'stainless_knob',
    label: 'Lever handle inside, fixed knob outside – Stainless steel'
  }
];
</script>

  