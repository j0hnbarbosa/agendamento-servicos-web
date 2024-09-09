import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { Language } from '@/types'

import en_US from '@/i18n/locales/en_US/translation.json'
import pt_BR from '@/i18n/locales/pt_BR/translation.json'

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en_US' as Language,
    resources: {
      en_US: {
        translation: en_US
      },
      pt_BR: {
        translation: pt_BR
      }
    },

    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })

export default i18n