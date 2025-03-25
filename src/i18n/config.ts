import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    ns: 'login',
    backend: {
      loadPath: `./locales/{{lng}}/{{ns}}.json`,
      //   addPath: `./locales/en/{{ns}}.json`,
      crossDomain: true,
      withCredentials: true,
    },
    detection: {
      //   convertDetectedLanguage: (lng) => {
      //     if (lng.toLowerCase().startsWith('en')) {
      //       return 'en-US';
      //     }
      //     if (['zh', 'zh-cn'].includes(lng.toLowerCase())) {
      //       return 'zh-CN';
      //     }
      //     return 'zh-HK';
      //   },
      // order and from where user language should be detected
      order: ['querystring', 'localStorage', 'navigator'],
      // keys or params to lookup language from
      lookupQuerystring: 'lang',
      // cache user language on
      caches: ['localStorage'],
    },
  });
