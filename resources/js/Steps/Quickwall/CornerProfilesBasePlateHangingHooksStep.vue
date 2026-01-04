<template>
  <div class="max-w-6xl mx-auto space-y-12">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center text-gray-800">
      Accessories & Additional Options
    </h2>

    <!-- BASE PLATE -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <!-- Left -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">
          Base plate
        </h3>

        <p class="text-gray-700 leading-relaxed">
          The optional base plate evens out floor irregularities and is applied directly onto the
          existing floor. Its use is <span class="font-medium">highly recommended</span> to protect
          the lower joint from friction damage.
        </p>

        <div class="space-y-3">
          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="with"
              v-model="form.config_options.base_plate"
              class="accent-brand-orange"
            />
            <span class="text-gray-700 font-medium">
              With bottom plate (highly recommended)
            </span>
          </label>

          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="without"
              v-model="form.config_options.base_plate"
              class="accent-brand-orange"
            />
            <span class="text-gray-700 font-medium">
              Without bottom plate
            </span>
          </label>
        </div>
      </div>

      <!-- Right -->
      <div>
        <img
          :src=plateImg
          alt="Base plate example"
          class="mx-auto max-h-48 object-contain"
        />
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- CORNER PROFILES + HOOKS -->
    <div class="space-y-8">
      <!-- Corner profiles -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">
          Corner profiles
        </h3>

        <p class="text-gray-700 leading-relaxed">
          Corner profiles serve as an adjustment aid and support when inserting the Quickwall panel
          and also provide an optimum sealing surface. This allows slopes and angularities on the
          building to be levelled out.
        </p>

        <div class="space-y-3">
          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="with"
              v-model="form.config_options.corner_profiles"
              class="accent-brand-orange"
            />
            <span class="font-medium text-gray-700">
              With corner profiles
            </span>
          </label>

          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="without"
              v-model="form.config_options.corner_profiles"
              class="accent-brand-orange"
            />
            <span class="font-medium text-gray-700">
              Without corner profiles
            </span>
          </label>
        </div>
      </div>

      <!-- Colour coating -->
      <div class="space-y-3">
        <p class="font-medium text-gray-800">
          Colour coating of the building profiles
        </p>

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

      <!-- Hooks -->
      <div class="space-y-3">
        <p class="font-medium text-gray-800">
          Hooks for hanging / storing the Quickwall panel
        </p>

        <label class="flex items-center gap-3">
          <input
            type="radio"
            value="with"
            v-model="form.config_options.hanging_hooks"
            class="accent-brand-orange"
          />
          <span class="text-gray-700">With hooks</span>
        </label>

        <label class="flex items-center gap-3">
          <input
            type="radio"
            value="without"
            v-model="form.config_options.hanging_hooks"
            class="accent-brand-orange"
          />
          <span class="text-gray-700">Without hooks</span>
        </label>
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- ACCESSORIES WITH CALCULATION -->
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-800">
        Accessories & Pricing
      </h3>

      <div
        v-for="item in accessories"
        :key="item.key"
        class="flex items-center justify-between gap-6"
      >
        <div>
          <p class="font-medium text-gray-800">{{ item.title }}</p>
          <p class="text-sm text-gray-600">{{ item.description }}</p>
        </div>

        <div class="flex items-center gap-4">
          <span class="font-semibold text-gray-800">
            €{{ item.price }}
          </span>
          <input
            type="number"
            min="0"
            class="w-24 p-2 border border-gray-300 rounded-lg
                   focus:ring-brand-orange focus:border-brand-orange"
            v-model.number="form.config_options.accessory_quantities[item.key]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
    import plateImg from "@/Assets/5-Quickwall/Step-4/base-plate.jpg"
const props = defineProps({
  form: Object
});

const { form } = props;

const accessories = [
  {
    key: 'assembly_kit',
    title: 'Assembly kit with sealing',
    description: 'Required kit for correct installation and sealing.',
    price: 132
  },
  {
    key: 'colour_coating',
    title: 'Colour coating for corner profiles',
    description: 'RAL colour coating for corner profiles.',
    price: 86
  },
  {
    key: 'bottom_plate',
    title: 'Bottom plate',
    description: 'Evens out floor irregularities and protects the lower joint.',
    price: 71
  },
  {
    key: 'quickwall_hooks',
    title: 'Hooks for storing the Quickwall panel',
    description: 'Hooks for hanging and storing the panels.',
    price: 11
  }
];

if (!form.config_options.accessory_quantities) {
  form.config_options.accessory_quantities = {};
  accessories.forEach(a => (form.config_options.accessory_quantities[a.key] = 0));
}
</script>

  