<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Installation Method & Locking Lever
    </h2>

    <!-- Two-column layout -->
    <div class="bg-white rounded-2xl shadow-md p-6 md:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

        <!-- LEFT: Installation Method -->
        <div class="space-y-5">
          <h3 class="text-lg font-semibold text-gray-800">
            Installation type
          </h3>

          <p class="text-gray-700 leading-relaxed">
            The <span class="font-medium">AquaLOCK® Quickwall</span> panel can be installed
            either <span class="font-medium">in front of</span> or
            <span class="font-medium">between</span> the reveal, depending on the structural situation.
          </p>

          <!-- Images -->
          <div class="grid grid-cols-2 gap-4">
            <img
              :src=frontImg
              alt="In front of the reveal"
              class="mx-auto max-h-48 object-contain"
            />
            <img
              :src=betweenImg
              alt="Between the reveal"
              class="mx-auto max-h-48 object-contain"
            />
          </div>

          <!-- Radio options -->
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="in_front"
                v-model="form.config_options.installation_method"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                In front of the reveal
              </span>
            </label>

            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="between"
                v-model="form.config_options.installation_method"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                Between the reveal
              </span>
            </label>
          </div>
        </div>

        <!-- RIGHT: Locking Lever -->
        <div class="space-y-5">
          <h3 class="text-lg font-semibold text-gray-800">
            Locking lever layout
          </h3>

          <p class="text-gray-700 leading-relaxed">
            The removable locking lever can be positioned either on the
            <span class="font-medium">left or right side</span> of the door
            <span class="font-medium">without extra cost</span>.
            <br />
            <span class="text-sm text-gray-500">(Viewed from outside)</span>
          </p>

          <!-- Image -->
          <img
            :src=lockingImg
            alt="Locking lever position"
            class="mx-auto max-h-48 object-contain"
          />

          <!-- Radio options -->
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input
                type="radio"
                value="right"
                v-model="form.config_options.locking_lever_position"
                class="accent-brand-orange"
              />
              <span class="text-gray-700 font-medium">
                Right from the outside
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
                Left from the outside
              </span>
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

  
  <script setup>
    import lockingImg from "@/Assets/5-Quickwall/Step-2/locking-lever-layout.jpg";
    import betweenImg from "@/Assets/5-Quickwall/Step-2/between-of-the-reveal.jpg";
    import frontImg from "@/Assets/5-Quickwall/Step-2/front-of-the-reveal.jpg";
  defineProps({
    form: Object
  });
  </script>
  