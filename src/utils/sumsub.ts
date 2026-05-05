import { CONFIG } from "../config";

declare global {
  interface Window {
    snsWebSdk: any;
  }
}

let scriptLoaded = false;

function loadScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = "https://static.sumsub.com/idensic/static/sns-websdk-builder.js";

    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };

    script.onerror = () => reject(new Error("Failed to load Sumsub SDK"));

    document.head.appendChild(script);
  });
}

export async function mountSumsub(
  containerId: string,
  accessToken: string,
  email?: string
) {
  if (!CONFIG.sumsubAppToken && !accessToken) {
    throw new Error(
      "Sumsub is not configured yet. Add CONFIG.sumsubAppToken or pass an access token."
    );
  }

  await loadScript();

  const sdk = window.snsWebSdk
    .init(accessToken, () => Promise.resolve(accessToken))
    .withConf({
      lang: "en",
      email,
      theme: "dark",
    })
    .withOptions({
      addViewportTag: false,
      adaptIframeHeight: true,
    })
    .on("idCheck.onStepCompleted", (payload: any) => {
      console.log("[sumsub] step completed:", payload);
    })
    .on("idCheck.onError", (error: any) => {
      console.error("[sumsub] error:", error);
    })
    .build();

  sdk.launch(`#${containerId}`);

  return sdk;
}

export const sumsubReady = () => !!CONFIG.sumsubAppToken;
