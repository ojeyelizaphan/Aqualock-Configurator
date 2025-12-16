<template>
  <div class="max-w-6xl mx-auto space-y-8">

    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Gate Configuration
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Opening Direction -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold text-gray-800">
          Opening Direction
        </h3>

        <p class="text-sm text-gray-600 leading-relaxed">
          The AquaLOCK® gate can be opened inwards or outwards.
          With the inward-opening version, the locks must withstand
          the water pressure; with the outward-opening version,
          they should clamp the door shut.
        </p>

        <p class="text-sm font-medium text-gray-700">
          Opening direction and opening angle
        </p>

        <div class="space-y-3">
          <label
            v-for="option in openingOptions"
            :key="option.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.gate_opening === option.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1"
              :value="option.value"
              v-model="form.config_options.gate_opening"
            />
            <span class="text-sm text-gray-800">
              {{ option.label }}
            </span>
          </label>
        </div>
      </section>

      <!-- Installation Method -->
      <section class="space-y-5">
        <h3 class="text-xl font-semibold text-gray-800">
          Installation Method
        </h3>

        <p class="text-sm text-gray-600 leading-relaxed">
          Fitting methods: in front, behind or between the reveal.
          If you are unsure which fitting method is suitable for your
          building, our authorized technicians will clarify this on site.
        </p>

        <div class="space-y-3">
          <label
            v-for="method in fittingMethods"
            :key="method.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition"
            :class="form.config_options.fitting_method === method.value
              ? 'border-brand-orange bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'"
          >
            <input
              type="radio"
              class="mt-1"
              :value="method.value"
              v-model="form.config_options.fitting_method"
            />
            <span class="text-sm text-gray-800">
              {{ method.label }}
            </span>
          </label>
        </div>

        <!-- Reference Images -->
        <div class="grid grid-cols-2 gap-4 pt-4">
          <figure class="text-center space-y-2">
            <img
              :src="imgInwards"
              alt="Reveal fitting diagram"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              Portal opens inwards at 95°
            </figcaption>
          </figure>

          <figure class="text-center space-y-2">
            <img
              :src="imgOutwards"
              alt="Front fitting diagram"
              class="rounded-lg border"
            />
            <figcaption class="text-xs text-gray-600">
              Portal opens outwards at 180°
            </figcaption>
          </figure>
        </div>
      </section>

    </div>
  </div>
</template>

  
  <script setup>
    import imgInwards from "@/Assets/4-AquaLOCK Gate/Step-1/inwards.jpg"
    import imgOutwards from "@/Assets/4-AquaLOCK Gate/Step-1/outwards.jpg"
  const props = defineProps({
    form: Object
  });
  
  const openingOptions = [
    { value: 'left_in_95', label: 'Left Inward 95°', description: 'Opens inwards to the left at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'left_in_180', label: 'Left Inward 180°', description: 'Opens inwards to the left at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
    { value: 'left_out_95', label: 'Left Outward 95°', description: 'Opens outwards to the left at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'left_out_180', label: 'Left Outward 180°', description: 'Opens outwards to the left at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
    { value: 'right_in_95', label: 'Right Inward 95°', description: 'Opens inwards to the right at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'right_in_180', label: 'Right Inward 180°', description: 'Opens inwards to the right at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
    { value: 'right_out_95', label: 'Right Outward 95°', description: 'Opens outwards to the right at 95°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917858/inwards_xltfra.jpg' },
    { value: 'right_out_180', label: 'Right Outward 180°', description: 'Opens outwards to the right at 180°', image: 'https://res.cloudinary.com/ducskpmnn/image/upload/v1745917871/outwards_bpg4ig.jpg' },
  ];
  
  const fittingMethods = [
    { value: 'behind_reveal', label: 'Behind the Reveal' },
    { value: 'between_reveal', label: 'Between the Reveal' },
    { value: 'in_front_reveal', label: 'In Front of the Reveal' },
  ];
  </script>
  