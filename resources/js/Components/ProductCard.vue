<template>
  <button
    @click="$emit('select')"
    :class="[
      'group bg-white rounded-2xl overflow-hidden border text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full',
      selected
        ? 'border-brand-orange ring-2 ring-brand-orange shadow-lg'
        : 'border-gray-200 hover:border-brand-orange'
    ]"
  >
    <div class="relative h-52 w-full overflow-hidden bg-gray-100 shrink-0">
      <img
        :src="image"
        :alt="name"
        class="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div
      class="px-5 py-4 min-h-[88px] flex items-center justify-center transition-colors duration-300"
      :class="selected ? 'bg-brand-orange' : 'bg-[#f39200] group-hover:bg-[#1f3b5b]'"
    >
      <h3
        class="text-base md:text-lg font-semibold text-center leading-snug transition-colors duration-300"
        :class="selected ? 'text-white' : 'text-black group-hover:text-white'"
      >
        {{ name }}
      </h3>
    </div>
  </button>
</template>

<script setup>
defineProps({
  name: String,
  description: String,
  image: String,
  selected: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['select']);
</script>