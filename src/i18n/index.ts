import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import { Language } from '@/types'

import en_US from '@/i18n/locales/en_US/translation.json'
import pt_BR from '@/i18n/locales/pt_BR/translation.json'

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'pt_BR' as Language,
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