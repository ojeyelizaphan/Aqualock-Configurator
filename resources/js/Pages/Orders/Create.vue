<script setup>
import { useForm, usePage, router } from "@inertiajs/vue3";
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import SecondaryNavbar from "@/Components/SecondaryNavbar.vue";
import { formatAccessories } from '@/utils/formatAccessories';

const { t } = useI18n();

const props = defineProps({
  configuration: Object,
  config_options: Array
});

const page = usePage();
const configuration = computed(() => page.props.configuration || null);
const showSuccessModal = ref(false);

const form = useForm({
  configuration_id: "",
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  accessories_summary: []
});

const vatRate = 0.19;

const totalPriceInclVat = computed(() => {
  const basePrice = Number(configuration.value?.total_price || 0);
  return basePrice * (1 + vatRate);
});

onMounted(() => {
  if (configuration.value?.id) {
    form.configuration_id = configuration.value.id;
  }

  if (page.props?.flash?.success) {
    showSuccessModal.value = true;
  }
});

const accessoriesSummary = computed(() => {
  const accessoriesOption = props.config_options.find(option =>
    option.label.toLowerCase() === 'accessories'
  );
  if (!accessoriesOption || typeof accessoriesOption.value !== 'object') return [];
  return formatAccessories(accessoriesOption.value);
});

const goBackToConfiguration = () => {
  router.visit(route('configurations.edit', configuration.value.id));
};

const closeModal = () => {
  showSuccessModal.value = false;
  router.visit('/configurations/create');
};

const submitOrder = async () => {
  try {
    form.accessories_summary = accessoriesSummary.value;

    await form.post(route("orders.store"), {
      onSuccess: () => {
        showSuccessModal.value = true;
      },
      onError: () => {
        alert(t('summary.errors.generic'));
      },
    });
  } catch (error) {
    alert(t('summary.errors.unexpected'));
  }
};
</script>

<template>
  <Navbar />
  <SecondaryNavbar />

  <div class="max-w-6xl mx-auto p-6">

    <!-- Title -->
    <h1 class="text-3xl font-bold text-center mb-10 text-gray-800">
      {{ $t('summary.title') }}
    </h1>

    <!-- Back -->
    <div class="mb-6">
      <button
        @click="goBackToConfiguration"
        class="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl"
      >
        ← {{ $t('summary.back') }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- LEFT -->
      <div>

        <!-- Summary -->
        <h2 class="text-2xl font-semibold text-[#f39200] mb-4">
          {{ $t('summary.configSummary') }}
        </h2>

        <div class="bg-white shadow rounded-2xl p-6 border mb-6">
          <h2 class="text-xl font-bold mb-2">
            {{ configuration.product.name }}
          </h2>

          <p class="text-lg">
            <strong>{{ $t('summary.totalPrice') }}:</strong>
            <span class="text-[#f39200] font-semibold">
              €{{ totalPriceInclVat.toFixed(2) }}
            </span>
          </p>

          <div class="mt-4 bg-amber-50 p-4 rounded">
            <p class="text-sm">
              <span class="font-semibold">
                {{ $t('summary.pricingNoteTitle') }}
              </span>
              {{ $t('summary.pricingNote') }}
            </p>
          </div>
        </div>

        <!-- Details -->
        <div class="bg-gray-50 p-6 rounded-xl">
          <h2 class="text-xl font-semibold mb-4 text-[#f39200]">
            {{ $t('summary.configDetails') }}
          </h2>

          <ul class="space-y-3">
            <li
              v-for="(option, index) in config_options
                .filter(opt =>
                  opt.label.toLowerCase() !== 'accessories' &&
                  opt.label.toLowerCase() !== 'width (mm)' &&
                  opt.label.toLowerCase() !== 'height (mm)'
                )"
              :key="index"
              class="flex justify-between"
            >
              <span class="font-medium">
                {{
                  option.label.toLowerCase() === 'entered width'
                    ? 'Width (mm)'
                    : option.label.toLowerCase() === 'entered height'
                    ? 'Height (mm)'
                    : option.label
                }}:
              </span>

              <span>{{ option.value }}</span>
            </li>
          </ul>

          <!-- Accessories -->
          <div v-if="accessoriesSummary.length" class="mt-6">
            <h2 class="text-xl font-semibold mb-4 text-[#f39200]">
              {{ $t('summary.accessories') }}
            </h2>

            <ul class="list-disc pl-5">
              <li v-for="(line, i) in accessoriesSummary" :key="i">
                {{ line }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div>
        <form
          @submit.prevent="submitOrder"
          class="bg-white shadow-xl rounded-2xl p-6"
        >

          <h2 class="text-2xl font-semibold text-[#f39200] mb-4">
            {{ $t('summary.contactTitle') }}
          </h2>

          <p class="text-sm mb-6">
            {{ $t('summary.contactDescription') }}
          </p>

          <!-- Name -->
          <div class="mb-4">
            <label>{{ $t('summary.fullName') }}</label>
            <input
              v-model="form.customer_name"
              type="text"
              :placeholder="$t('summary.placeholders.name')"
              class="border p-2 w-full rounded"
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label>{{ $t('summary.email') }}</label>
            <input
              v-model="form.email"
              type="email"
              :placeholder="$t('summary.placeholders.email')"
              class="border p-2 w-full rounded"
            />
          </div>

          <!-- Phone -->
          <div class="mb-4">
            <label>{{ $t('summary.phone') }}</label>
            <input
              v-model="form.phone"
              type="text"
              :placeholder="$t('summary.placeholders.phone')"
              class="border p-2 w-full rounded"
            />
          </div>

          <!-- Address -->
          <div class="mb-6">
            <label>{{ $t('summary.address') }}</label>
            <textarea
              v-model="form.address"
              :placeholder="$t('summary.placeholders.address')"
              class="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#f39200] text-white py-3 rounded-md"
          >
            {{ $t('summary.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>

  <Footer />

  <!-- SUCCESS MODAL -->
  <transition name="fade">
    <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black/50">
      <div class="bg-white p-6 rounded-xl text-center">
        <h2 class="text-2xl font-bold text-green-600 mb-3">
          {{ $t('summary.success.title') }}
        </h2>

        <p class="mb-5">
          {{ $t('summary.success.message') }}
        </p>

        <button
          @click="closeModal"
          class="bg-[#f39200] text-white px-6 py-2 rounded"
        >
          {{ $t('summary.success.cta') }}
        </button>
      </div>
    </div>
  </transition>
</template>