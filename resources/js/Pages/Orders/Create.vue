<script setup>
import { useForm, usePage, router } from "@inertiajs/vue3";
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";
import SecondaryNavbar from "@/Components/SecondaryNavbar.vue";

import { formatAccessories } from "@/utils/formatAccessories";

const { t, te, locale } = useI18n();

const props = defineProps({
  configuration: Object,
  config_options: Array,
});

const page = usePage();

const configuration = computed(
  () => page.props.configuration || null
);

const showSuccessModal = ref(false);

const form = useForm({
  configuration_id: "",
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  accessories_summary: [],
});

const vatRate = 0.19;

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const toSnakeCase = (value) => {
  return String(value ?? "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/\(mm\)/gi, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
};

const normalizeKey = (option) => {
  const rawKey = option?.key || option?.label || "";

  return rawKey
    .toString()
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/\(mm\)/g, "")
    .replace(/-/g, "_");
};

const optionKey = (option) => {
  return toSnakeCase(option?.key || option?.label || "");
};

const getTranslatedLabel = (option) => {
  const key = optionKey(option);
  const path = `summary.labels.${key}`;

  return te(path) ? t(path) : option.label || key;
};

const getTranslatedValue = (option) => {
  const value = option?.value;

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const key = optionKey(option);

  if (typeof value === "boolean") {
    const specificPath =
      `summary.values.${key}.${String(value)}`;

    if (te(specificPath)) {
      return t(specificPath);
    }

    return t(`summary.values.boolean.${String(value)}`);
  }

  if (typeof value === "number" || (!isNaN(value) && value !== "")) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([_, qty]) => Number(qty) > 0)
      .map(([itemKey, qty]) => {
        const normalizedItemKey = toSnakeCase(itemKey);
        const labelPath = `summary.labels.${normalizedItemKey}`;

        const label = te(labelPath)
          ? t(labelPath)
          : normalizedItemKey;

        return `${label}: ${qty}`;
      })
      .join(", ");
  }

  const normalizedValue = toSnakeCase(value);
  const path = `summary.values.${key}.${normalizedValue}`;

  return te(path) ? t(path) : value;
};

/*
|--------------------------------------------------------------------------
| Pricing
|--------------------------------------------------------------------------
*/

const totalPriceInclVat = computed(() => {
  const basePrice = Number(
    configuration.value?.total_price || 0
  );

  return basePrice * (1 + vatRate);
});

/*
|--------------------------------------------------------------------------
| Accessories
|--------------------------------------------------------------------------
*/

const accessoriesSummary = computed(() => {
  const accessoriesOption = props.config_options.find(
    option => option.key === "accessories"
  );

  if (
    !accessoriesOption ||
    typeof accessoriesOption.value !== "object"
  ) {
    return [];
  }

  return formatAccessories(accessoriesOption.value);
});

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(() => {
  if (configuration.value?.id) {
    form.configuration_id = configuration.value.id;
  }

  if (page.props?.flash?.success) {
    showSuccessModal.value = true;
  }
});

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

const goBackToConfiguration = () => {
  router.visit(
    route("configurations.edit", {
      locale: locale.value,
      configuration: configuration.value.id,
    })
  );
};

const closeModal = () => {
  showSuccessModal.value = false;

  router.visit("/configurations/create");
};

const submitOrder = async () => {
  try {
    form.accessories_summary =
      accessoriesSummary.value;

    await form.post(route("orders.store"), {
      onSuccess: () => {
        showSuccessModal.value = true;
      },

      onError: () => {
        alert(t("summary.errors.generic"));
      },
    });
  } catch (error) {
    alert(t("summary.errors.unexpected"));
  }
};
</script>

<template>
  <Navbar />
  <SecondaryNavbar />

  <div class="max-w-6xl mx-auto p-6">
    <!-- TITLE -->
    <h1 class="text-3xl font-bold text-center mb-10 text-gray-800">
      {{ $t("summaryGeneral.title") }}
    </h1>

    <!-- BACK -->
    <div class="mb-6">
      <button
        @click="goBackToConfiguration"
        class="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl"
      >
        ← {{ $t("summaryGeneral.back") }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- LEFT -->
      <div>
        <!-- SUMMARY -->
        <h2 class="text-2xl font-semibold text-[#f39200] mb-4">
          {{ $t("summaryGeneral.configDetails") }}
        </h2>

        <div
          class="bg-white shadow rounded-2xl p-6 border mb-6"
        >
          <h2 class="text-xl font-bold mb-2">
            {{ configuration.product.name }}
          </h2>

          <p class="text-lg">
            <strong>
              {{ $t("summaryGeneral.totalPrice") }}:
            </strong>

            <span class="text-[#f39200] font-semibold">
              €{{ totalPriceInclVat.toFixed(2) }}
            </span>
          </p>

          <div class="mt-4 bg-amber-50 p-4 rounded">
            <p class="text-sm">
              <span class="font-semibold">
                {{ $t("summaryGeneral.pricingNoteTitle") }}
              </span>

              {{ $t("summaryGeneral.pricingNote") }}
            </p>
          </div>
        </div>

        <!-- DETAILS -->
        <div class="bg-gray-50 p-6 rounded-xl">
          <h2 class="text-xl font-semibold mb-4 text-[#f39200]">
            {{ $t("summaryGeneral.configDetails") }}
          </h2>

          <ul class="space-y-3">
            <li
              v-for="(option, index) in config_options.filter(
                opt =>
                  ![
                    'accessories',
                    'width',
                    'height'
                  ].includes(optionKey(opt))
              )"
              :key="index"
              class="flex justify-between gap-6"
            >
              <span class="font-medium">
                {{ getTranslatedLabel(option) }}:
              </span>

              <span class="text-right">
                {{ getTranslatedValue(option) }}
              </span>
            </li>
          </ul>

          <!-- ACCESSORIES -->
          <div
            v-if="accessoriesSummary.length"
            class="mt-6"
          >
            <h2
              class="text-xl font-semibold mb-4 text-[#f39200]"
            >
              {{ $t("summary.accessories") }}
            </h2>

            <ul class="list-disc pl-5 space-y-1">
              <li
                v-for="(line, i) in accessoriesSummary"
                :key="i"
              >
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
            {{ $t("summaryGeneral.contactTitle") }}
          </h2>

          <p class="text-sm mb-6">
            {{ $t("summaryGeneral.contactDescription") }}
          </p>

          <!-- NAME -->
          <div class="mb-4">
            <label>
              {{ $t("summaryGeneral.fullName") }}
            </label>

            <input
              v-model="form.customer_name"
              type="text"
              :placeholder="$t('summaryGeneral.placeholders.name')"
              class="border p-2 w-full rounded"
            />
          </div>

          <!-- EMAIL -->
          <div class="mb-4">
            <label>
              {{ $t("summaryGeneral.email") }}
            </label>

            <input
              v-model="form.email"
              type="email"
              :placeholder="$t('summaryGeneral.placeholders.email')"
              class="border p-2 w-full rounded"
            />
          </div>

          <!-- PHONE -->
          <div class="mb-4">
            <label>
              {{ $t("summaryGeneral.phone") }}
            </label>

            <input
              v-model="form.phone"
              type="text"
              :placeholder="$t('summaryGeneral.placeholders.phone')"
              class="border p-2 w-full rounded"
            />
          </div>

          <!-- ADDRESS -->
          <div class="mb-6">
            <label>
              {{ $t("summaryGeneral.address") }}
            </label>

            <textarea
              v-model="form.address"
              :placeholder="$t('summaryGeneral.placeholders.address')"
              class="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#f39200] text-white py-3 rounded-md hover:opacity-90 transition"
          >
            {{ $t("summaryGeneral.submit") }}
          </button>
        </form>
      </div>
    </div>
  </div>

  <Footer />

  <!-- SUCCESS MODAL -->
  <transition name="fade">
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div class="bg-white p-6 rounded-xl text-center max-w-md">
        <h2 class="text-2xl font-bold text-green-600 mb-3">
          {{ $t("summaryGeneral.success.title") }}
        </h2>

        <p class="mb-5">
          {{ $t("summaryGeneral.success.message") }}
        </p>

        <button
          @click="closeModal"
          class="bg-[#f39200] text-white px-6 py-2 rounded"
        >
          {{ $t("summaryGeneral.success.cta") }}
        </button>
      </div>
    </div>
  </transition>
</template>