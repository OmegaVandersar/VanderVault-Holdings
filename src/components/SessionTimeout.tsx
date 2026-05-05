import { useEffect } from "react";
import { auth } from "../data/auth";

const TIMEOUT_MS = 30 * 60 * 1000;
const WARN_MS = 25 * 60 * 1000;
const KEY = "nv_last_activity";

export default function SessionTimeout() {
  useEffect(() => {
    const touch = () => localStorage.setItem(KEY, String(Date.now()));

    touch();

    ["click", "keydown", "touchstart", "mousemove"].forEach(eventName =>
      window.addEventListener(eventName, touch, { passive: true })
    );

    const timer = setInterval(() => {
      if (!auth.current()) return;

      const last = Number(localStorage.getItem(KEY) || Date.now());
      const idle = Date.now() - last;

      if (idle > TIMEOUT_MS) {
        auth.logout();

        alert(
          "For your security, your session has expired after 30 minutes of inactivity."
        );

        window.location.hash = "#/login";
      } else if (
        idle > WARN_MS &&
        !sessionStorage.getItem("nv_timeout_warned")
      ) {
        sessionStorage.setItem("nv_timeout_warned", "1");
        console.info(
          "Your NordVault session will expire soon due to inactivity."
        );
      }
    }, 30000);

    return () => {
      ["click", "keydown", "touchstart", "mousemove"].forEach(eventName =>
        window.removeEventListener(eventName, touch)
      );

      clearInterval(timer);
    };
  }, []);

  return null;
}
