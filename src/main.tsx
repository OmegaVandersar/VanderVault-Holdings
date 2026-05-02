import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { I18nProvider } from "./i18n";
import { CurrencyProvider } from "./context/CurrencyContext";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <CurrencyProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </CurrencyProvider>
    </I18nProvider>
  </React.StrictMode>
);
