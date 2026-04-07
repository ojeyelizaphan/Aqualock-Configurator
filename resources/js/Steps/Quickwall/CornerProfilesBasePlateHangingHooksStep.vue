<template>
  <div class="max-w-6xl mx-auto space-y-12">
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Accessories & Additional Options
    </h2>

    <!-- INCLUDED BY DEFAULT -->
    <div class="rounded-2xl border border-green-200 bg-green-50 p-6">
      <h3 class="text-lg font-semibold text-green-900 mb-2">
        Included at no extra cost
      </h3>
      <p class="text-sm text-green-800 leading-relaxed">
        As a special anniversary offer, the assembly kit is included free of charge.
        The corner profiles are part of this assembly kit. Only the colour coating of
        the profiles carries an additional charge.
      </p>
    </div>

    <!-- BOTTOM PLATE -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">
          Bottom plate
        </h3>

        <p class="text-gray-700 leading-relaxed">
          The bottom plate is mandatory and is included automatically according to the
          number of Quickwall panels selected.
        </p>

        <!-- <div class="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
          Price formula:
          <span class="font-semibold">number of panels × width × €71</span>
        </div> -->
      </div>

      <div>
        <img
          :src="plateImg"
          alt="Base plate example"
          class="mx-auto max-h-48 object-contain"
        />
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- CORNER PROFILE COATING -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">
        Corner profiles colour coating
      </h3>

      <p class="text-gray-700 leading-relaxed">
        Corner profiles are included as part of the assembly kit. You can optionally
        add RAL colour coating at an extra charge.
      </p>

      <div class="space-y-3">
        <label class="flex items-center gap-3">
          <input
            type="radio"
            value="without"
            v-model="form.config_options.corner_profiles_coloring"
            class="accent-brand-orange"
          />
          <span class="text-gray-700">
            Without colour coating (anodised aluminium)
          </span>
        </label>

        <label class="flex items-center gap-3">
          <input
            type="radio"
            value="with"
            v-model="form.config_options.corner_profiles_coloring"
            class="accent-brand-orange"
          />
          <span class="text-gray-700">
            With colour coating (RAL)
          </span>
        </label>
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- HOOKS -->
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-800">
        Optional accessories
      </h3>

      <div class="flex items-center justify-between gap-6">
        <div>
          <p class="font-medium text-gray-800">
            Hooks for storing the Quickwall panel
          </p>
          <p class="text-sm text-gray-600">
            Hooks for hanging and storing the panels.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <span class="font-semibold text-gray-800">€11</span>
          <input
            type="number"
            min="0"
            class="w-24 p-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange"
            v-model.number="form.config_options.accessory_quantities.quickwall_hooks"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import plateImg from "@/Assets/5-Quickwall/Step-4/base-plate.jpg";

const props = defineProps({
  form: Object
});

const { form } = props;

if (!form.config_options.accessory_quantities) {
  form.config_options.accessory_quantities = {};
}

if (form.config_options.accessory_quantities.quickwall_hooks == null) {
  form.config_options.accessory_quantities.quickwall_hooks = 0;
}

if (!form.config_options.corner_profiles_coloring) {
  form.config_options.corner_profiles_coloring = 'without';
}
</script>