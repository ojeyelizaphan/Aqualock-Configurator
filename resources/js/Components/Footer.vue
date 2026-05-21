<template>
  <footer class="bg-[#111827] text-gray-300 mt-16">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Opening Hours -->
        <div>
          <h4 class="text-brand-orange font-semibold mb-4">
            {{ t('footer.openingHours.title') }}
          </h4>

          <ul class="space-y-3 text-sm">
            <li>{{ t('footer.openingHours.weekdays') }}</li>
            <li>{{ t('footer.openingHours.morning') }}</li>
            <li>{{ t('footer.openingHours.afternoon') }}</li>

            <br />
            <br />

            <li>{{ t('footer.openingHours.saturday') }}</li>
            <li>{{ t('footer.openingHours.saturdayHours') }}</li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h4 class="text-brand-orange font-semibold mb-4">
            {{ t('footer.products.title') }}
          </h4>

          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="https://aqualock.uk/schwingtor/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.products.garageDoor') }}
              </a>
            </li>

            <li>
              <a
                href="https://aqualock.uk/klappe/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.products.flap') }}
              </a>
            </li>

            <li>
              <a
                href="https://aqualock.uk/portal/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.products.gate') }}
              </a>
            </li>

            <li>
              <a
                href="https://aqualock.uk/quickwall/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.products.quickwall') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-brand-orange font-semibold mb-4">
            {{ t('footer.company.title') }}
          </h4>

          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="https://aqualock.uk/unternehmen/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.company.about') }}
              </a>
            </li>

            <li>
              <a
                href="https://aqualock.uk/galerie/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.company.gallery') }}
              </a>
            </li>

            <li>
              <a
                href="https://aqualock.uk/fm-approved/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.company.fmApproved') }}
              </a>
            </li>

            <li>
              <a
                href="https://aqualock.uk/kontakt/"
                class="hover:text-brand-orange transition-colors"
              >
                {{ t('footer.company.contact') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-brand-orange font-semibold mb-4">
            {{ t('footer.contact.title') }}
          </h4>

          <ul class="space-y-3 text-sm text-gray-400">
            <li>{{ t('footer.contact.company') }}</li>
            <li>{{ t('footer.contact.street') }}</li>
            <li>{{ t('footer.contact.city') }}</li>

            <li>
              <a
                href="tel:+49735593100"
                class="hover:text-brand-orange transition-colors"
              >
                +49 (0)7355 / 9310-0
              </a>
            </li>

            <li>
              <a
                href="mailto:info@torbau-schwaben.de"
                class="hover:text-brand-orange transition-colors"
              >
                info@torbau-schwaben.de
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400"
      >
        <p>{{ t('footer.bottom.copyright') }}</p>

        <div class="flex items-center gap-5">
          <a
            href="https://aqualock.uk/datenschutz/"
            class="hover:text-brand-orange transition-colors"
          >
            {{ t('footer.bottom.privacy') }}
          </a>

          <a
            href="https://aqualock.uk/impressum/"
            class="hover:text-brand-orange transition-colors"
          >
            {{ t('footer.bottom.legal') }}
          </a>

          <a
            href="https://aqualock.uk/versandkosten/"
            class="hover:text-brand-orange transition-colors"
          >
            {{ t('footer.bottom.shipping') }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>