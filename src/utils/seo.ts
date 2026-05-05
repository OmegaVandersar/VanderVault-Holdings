import { useEffect } from "react";
import { CONFIG } from "../config";

type Seo = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
};

export function setSeo(settings: Seo) {
  const title = settings.title
    ? `${settings.title} · ${CONFIG.brand.name}`
    : `${CONFIG.brand.name} — ${CONFIG.brand.tagline}`;

  const description =
    settings.description ||
    `${CONFIG.brand.name} — global digital asset investing from London with a Frankfurt EU regulatory office. MiCA-aligned framework, insured custody. ${CONFIG.stats.aum} AUM, ${CONFIG.stats.investors} investors.`;

  const url = `${CONFIG.siteUrl}${settings.path || ""}`;
  const image = settings.image || `${CONFIG.siteUrl}/images/hero.svg`;

  document.title = title;

  updateMeta("description", description);

  updateMeta("og:title", title, "property");
  updateMeta("og:description", description, "property");
  updateMeta("og:type", "website", "property");
  updateMeta("og:url", url, "property");
  updateMeta("og:image", image, "property");
  updateMeta("og:site_name", CONFIG.brand.name, "property");

  updateMeta("twitter:card", "summary_large_image");
  updateMeta("twitter:title", title);
  updateMeta("twitter:description", description);
  updateMeta("twitter:image", image);
}

function updateMeta(
  name: string,
  content: string,
  attribute: "name" | "property" = "name"
) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = content;
}

export function useSeo(settings: Seo) {
  useEffect(() => {
    setSeo(settings);
  }, [settings.title, settings.description, settings.path]);
                                                                                                                                                         }
