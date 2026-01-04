<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Choice of Base Plate
    </h2>

    <!-- Split Screen -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT: Aluminum Base Plate -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Aluminum base plate, glued on the floor
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          For optimal installation, the surface must be perfectly even and smooth.
          In any situation where this is not the case, we recommend using an aluminum
          base plate to compensate for irregularities and gradients, thus ensuring
          the AquaLOCK® Sectional door functions safely and reliably.
        </p>

        <!-- Image -->
        <div class="flex justify-start mb-4">
          <img
            :src=img1
            alt="Aluminum base plate"
            class="mx-auto max-h-48 object-contain"
          />
        </div>

        <!-- Options (caption-style) -->
        <div class="space-y-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="withAluminum"
              v-model="form.config_options.aluminumBasePlate"
              class="form-radio"
            />
            <span class="text-sm text-gray-800">
              With aluminum base plate
            </span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="withoutAluminum"
              v-model="form.config_options.aluminumBasePlate"
              class="form-radio"
            />
            <span class="text-sm text-gray-800">
              Without aluminum base plate
            </span>
          </label>
        </div>
      </section>

      <!-- RIGHT: Stainless Steel Base Plate -->
      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Stainless steel base plate, embedded in concrete
        </h3>

        <p class="text-sm text-gray-600 mb-6">
          By embedding a stainless steel base plate in concrete in the threshold,
          you can create a perfectly even surface before installing the AquaLOCK®
          Sectional door. To do this, a 40 mm deep and 200 mm wide groove must be
          created in the concrete floor, which is filled with fresh concrete.
          The stainless steel floor plate is then placed in this fresh concrete
          and levelled using a spirit level.
        </p>

        <p class="text-sm text-gray-600 mb-6">
          This type of installation makes it possible to order the AquaLOCK®
          Sectional door with a pre-installed upgrade kit, which makes the actual
          door installation much easier.
        </p>

        <!-- Image -->
        <div class="flex justify-start mb-4">
          <img
            :src=img2
            alt="Stainless steel base plate"
            class="mx-auto max-h-48 object-contain"
          />
        </div>

        <!-- Options (caption-style) -->
        <div class="space-y-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="withStainlessSteel"
              v-model="form.config_options.stainlessSteelBasePlate"
              class="form-radio"
            />
            <span class="text-sm text-gray-800">
              With stainless steel base plate
            </span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="withoutStainlessSteel"
              v-model="form.config_options.stainlessSteelBasePlate"
              class="form-radio"
            />
            <span class="text-sm text-gray-800">
              Without stainless steel base plate
            </span>
          </label>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
  import img1 from "@/Assets/6-Sectional/Step-2/sectional-2a.jpg"
  import img2 from "@/Assets/6-Sectional/Step-2/sectional-2b.jpg"
defineProps({
  form: Object
})
</script>
