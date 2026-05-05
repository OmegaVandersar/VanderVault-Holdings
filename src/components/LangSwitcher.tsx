import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, useI18n } from "../i18n";

export default function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(language => language.code === lang)!;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-2 py-1.5 rounded-md hover:bg-white/5"
      >
        {compact ? (
          <Globe className="w-3.5 h-3.5" />
        ) : (
          <span>{current.flag}</span>
        )}

        <span className="uppercase">{current.code}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-card border border-line rounded-md shadow-2xl py-1 z-50">
          {LANGUAGES.map(language => (
            <button
              key={language.code}
              onClick={() => {
                setLang(language.code);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              <span>{language.flag}</span>
              <span className="flex-1 text-left">{language.label}</span>

              {language.code === lang && (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
              }
