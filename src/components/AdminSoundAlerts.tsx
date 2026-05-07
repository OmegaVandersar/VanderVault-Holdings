import { useEffect, useRef, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { store } from "../data/store";
import { analytics } from "../data/analytics";

function playTone() {
  try {
    const audio = new AudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audio.currentTime);

    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audio.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.45);

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start(audio.currentTime);
    oscillator.stop(audio.currentTime + 0.5);
  } catch {
    // Some browsers block sound until user interaction.
  }
}

export default function AdminSoundAlerts() {
  const [enabled, setEnabled] = useState(
    localStorage.getItem("nv_admin_sound") !== "off"
  );

  const lastVisitors = useRef(0);
  const lastMessages = useRef(0);
  const lastWithdrawals = useRef(0);

  useEffect(() => {
    localStorage.setItem("nv_admin_sound", enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    const check = () => {
      const visitors = analytics.all().length;
      const messages = store.getMsgs().filter(message => !message.read).length;
      const withdrawals = store
        .getTxns()
        .filter(
          transaction =>
            transaction.type === "withdrawal" &&
            transaction.status === "pending"
        ).length;

      const hasNewVisitor =
        lastVisitors.current !== 0 && visitors > lastVisitors.current;

      const hasNewMessage =
        lastMessages.current !== 0 && messages > lastMessages.current;

      const hasNewWithdrawal =
        lastWithdrawals.current !== 0 &&
        withdrawals > lastWithdrawals.current;

      if (enabled && (hasNewVisitor || hasNewMessage || hasNewWithdrawal)) {
        playTone();
      }

      lastVisitors.current = visitors;
      lastMessages.current = messages;
      lastWithdrawals.current = withdrawals;
    };

    check();

    const timer = setInterval(check, 4000);

    return () => clearInterval(timer);
  }, [enabled]);

  return (
    <button
      onClick={() => {
        setEnabled(!enabled);
        if (!enabled) setTimeout(playTone, 100);
      }}
      className={`fixed bottom-5 right-24 z-50 px-3 py-2 rounded-full border shadow-2xl text-xs inline-flex items-center gap-2 ${
        enabled
          ? "bg-emerald-400 text-bg border-emerald-300"
          : "bg-card text-white/60 border-line"
      }`}
      title="Admin sound alerts"
    >
      {enabled ? (
        <Bell className="w-4 h-4" />
      ) : (
        <BellOff className="w-4 h-4" />
      )}
      {enabled ? "Sound on" : "Muted"}
    </button>
  );
}
