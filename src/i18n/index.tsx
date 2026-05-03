import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "fi", label: "Suomi", flag: "🇫🇮" },
  { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
  { code: "cs", label: "Čeština", flag: "🇨🇿" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "ar", label: "العربية", flag: "🇦🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
] as const;

type Lang = typeof LANGUAGES[number]["code"];

const T: Record<string, Partial<Record<Lang, string>> & { en: string }> = {
  "nav.home": {
    en: "Home",
    de: "Startseite",
    fr: "Accueil",
    es: "Inicio",
    it: "Home",
    nl: "Home",
    pl: "Strona główna",
    pt: "Início",
  },
  "nav.plans": {
    en: "Plans",
    de: "Pläne",
    fr: "Plans",
    es: "Planes",
    it: "Piani",
    nl: "Plannen",
    pl: "Plany",
    pt: "Planos",
  },
  "nav.markets": {
    en: "Markets",
    de: "Märkte",
    fr: "Marchés",
    es: "Mercados",
    it: "Mercati",
    nl: "Markten",
    pl: "Rynki",
    pt: "Mercados",
  },
  "nav.affiliate": {
    en: "Affiliate",
    de: "Partner",
    fr: "Affiliation",
    es: "Afiliados",
    it: "Affiliati",
    nl: "Partners",
    pl: "Partnerzy",
    pt: "Afiliados",
  },
  "nav.academy": {
    en: "Academy",
    de: "Akademie",
    fr: "Académie",
    es: "Academia",
    it: "Accademia",
    nl: "Academie",
    pl: "Akademia",
    pt: "Academia",
  },
  "nav.news": {
    en: "News",
    de: "Neuigkeiten",
    fr: "Actualités",
    es: "Noticias",
    it: "Notizie",
    nl: "Nieuws",
    pl: "Wiadomości",
    pt: "Notícias",
  },
  "nav.about": {
    en: "About",
    de: "Über uns",
    fr: "À propos",
    es: "Nosotros",
    it: "Chi siamo",
    nl: "Over ons",
    pl: "O nas",
    pt: "Sobre nós",
  },
  "nav.contact": {
    en: "Contact",
    de: "Kontakt",
    fr: "Contact",
    es: "Contacto",
    it: "Contatti",
    nl: "Contact",
    pl: "Kontakt",
    pt: "Contato",
  },
  "nav.signin": {
    en: "Sign in",
    de: "Anmelden",
    fr: "Connexion",
    es: "Acceder",
    it: "Accedi",
    nl: "Inloggen",
    pl: "Zaloguj",
    pt: "Entrar",
  },
  "nav.openacc": {
    en: "Open account",
    de: "Konto eröffnen",
    fr: "Ouvrir un compte",
    es: "Abrir cuenta",
    it: "Apri conto",
    nl: "Account openen",
    pl: "Otwórz konto",
    pt: "Abrir conta",
  },
  "stat.aum": {
    en: "Assets under management",
    de: "Verwaltetes Vermögen",
    fr: "Actifs sous gestion",
    es: "Activos gestionados",
    it: "Patrimonio gestito",
    nl: "Beheerd vermogen",
    pl: "Aktywa pod zarządzaniem",
    pt: "Ativos sob gestão",
  },
  "stat.investors": {
    en: "Verified investors",
    de: "Verifizierte Anleger",
    fr: "Investisseurs vérifiés",
    es: "Inversores verificados",
    it: "Investitori verificati",
    nl: "Geverifieerde beleggers",
    pl: "Zweryfikowani inwestorzy",
    pt: "Investidores verificados",
  },
  "stat.payout": {
    en: "Payout reliability",
    de: "Auszahlungszuverlässigkeit",
    fr: "Fiabilité des paiements",
    es: "Fiabilidad de pago",
    it: "Affidabilità pagamenti",
    nl: "Uitbetalingsbetrouwbaarheid",
    pl: "Niezawodność wypłat",
    pt: "Confiabilidade de pagamento",
  },
};

type I18nContextValue = {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
};

const I18nCtx = createContext<I18nContextValue>({
  lang: "en",
  t: key => key,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("nv_lang") as Lang | null;

    if (stored && LANGUAGES.some(language => language.code === stored)) {
      return stored;
    }

    const browser = navigator.language.slice(0, 2) as Lang;

    return LANGUAGES.some(language => language.code === browser)
      ? browser
      : "en";
  });

  useEffect(() => {
    localStorage.setItem("nv_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => T[key]?.[lang] || T[key]?.en || key;

  return (
    <I18nCtx.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export const useI18n = () => useContext(I18nCtx);
