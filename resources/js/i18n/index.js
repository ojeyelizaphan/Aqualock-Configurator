// resources/js/i18n/index.js
import { createI18n } from 'vue-i18n';

import enCommon from './locales/en/en.json';
import enSummary from './locales/en/summary.json';
import enNavbar from './locales/en/navbar.json';
import enFooter from './locales/en/footer.json';
import enUpAndOver from './locales/en/upAndOver.json';
import enSectionalDoor from './locales/en/sectionalDoor.json';
import enDoor from './locales/en/door.json';
import enGate from './locales/en/gate.json';
import enQuickwall from './locales/en/quickwall.json';
import enWindowsProtector from './locales/en/windowsProtector.json';
import enFlap from './locales/en/flap.json';

import deCommon from './locales/de/de.json';
import deSummary from './locales/de/summary.json';
import deNavbar from './locales/de/navbar.json';
import deFooter from './locales/de/footer.json';
import deUpAndOver from './locales/de/upAndOver.json';
import deSectionalDoor from './locales/de/sectionalDoor.json';
import deDoor from './locales/de/door.json';
import deGate from './locales/de/gate.json';
import deQuickwall from './locales/de/quickwall.json';
import deWindowsProtector from './locales/de/windowsProtector.json';
import deFlap from './locales/de/flap.json';

import frCommon from './locales/fr/fr.json';
import frSummary from './locales/fr/summary.json';
import frNavbar from './locales/fr/navbar.json';
import frFooter from './locales/fr/footer.json';
import frUpAndOver from './locales/fr/upAndOver.json';
import frSectionalDoor from './locales/fr/sectionalDoor.json';
import frDoor from './locales/fr/door.json';
import frGate from './locales/fr/gate.json';
import frQuickwall from './locales/fr/quickwall.json';
import frWindowsProtector from './locales/fr/windowsProtector.json';
import frFlap from './locales/fr/flap.json';

const messages = {
  en: {
    ...enCommon,
    ...enSummary,
    ...enNavbar,
    ...enFooter,
    upAndOver: enUpAndOver,
    sectionalDoor: enSectionalDoor,
    door : enDoor,
    gate: enGate,
    quickwall: enQuickwall,
    windowsProtector: enWindowsProtector,
    flap : enFlap
  },
  de: {
    ...deCommon,
    ...deSummary,
    ...deNavbar,
    ...deFooter,
    upAndOver: deUpAndOver,
    sectionalDoor : deSectionalDoor,
    door : deDoor,
    gate : deGate,
    quickwall: deQuickwall,
    windowsProtector: deWindowsProtector,
    flap: deFlap
  },
  fr: {
    ...frCommon,
    ...frSummary,
    ...frNavbar,
    ...frFooter,
    upAndOver: frUpAndOver,
    sectionalDoor: frSectionalDoor,
    door: frDoor,
    gate: frGate,
    quickwall: frQuickwall,
    windowsProtector: frWindowsProtector,
    flap: frFlap
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});
