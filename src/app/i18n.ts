import { createInstance, i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "../../i18n.config";

interface InitTranslationsParams {
  locale: string;
  namespaces: string[];
  i18nInstance?: I18nInstance;
  resources?: Record<string, any>;
}

interface InitTranslationsResult {
  i18n: I18nInstance;
  resources: Record<string, any>;
  t: I18nInstance["t"];
}

export default async function initTranslations({
  locale,
  namespaces,
  i18nInstance,
  resources,
}: InitTranslationsParams): Promise<InitTranslationsResult> {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
