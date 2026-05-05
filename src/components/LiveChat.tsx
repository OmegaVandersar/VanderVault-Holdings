import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { CONFIG } from "../config";
import { aiReply, aiReady } from "../utils/ai";

type Msg = {
  from: "user" | "bot";
  text: string;
  time: string;
};

const QUICK = [
  "How do I open an account?",
  "What is the minimum deposit?",
  "Are you regulated?",
  "How fast are withdrawals?",
];

const REPLIES: Record<string, string> = {
  open:
    "You can open an account in 60 seconds. Click 'Open account' at the top of the page. After registration, you complete email verification, KYC and 2FA before deposits and withdrawals are approved.",
  minimum: `Our Starter plan begins at €${CONFIG.plans[0].minimum}. Professional starts at €${CONFIG.plans[1].minimum.toLocaleString()} and Institutional at €${CONFIG.plans[2].minimum.toLocaleString()}. Target yields are not guaranteed and capital is at risk.`,
  regulated:
    "NordVault Global Capital is headquartered in London with an EU regulatory office in Frankfurt am Main. The platform is structured around UK AML expectations, German GwG/AML, BaFin expectations, MiCA alignment, KYC, wallet screening and 2FA controls.",
  withdraw:
    "Standard withdrawals are reviewed within 24 hours. Professional and Institutional clients receive priority review. All withdrawals pass KYC, 2FA, wallet screening and admin approval checks.",
  fee:
    "The platform displays no deposit, management or performance fees. Network fees may apply to cryptocurrency withdrawals and are paid to the blockchain network, not to NordVault.",
  safe:
    "The platform uses email verification, KYC review, two-factor authentication, wallet screening, admin withdrawal approval, audit logging and institutional custody procedures.",
};

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fallbackReply(question: string) {
  const lower = question.toLowerCase();

  for (const key of Object.keys(REPLIES)) {
    if (lower.includes(key)) {
      return REPLIES[key];
    }
  }

  return `Thanks for your message. For account-specific matters, please contact ${CONFIG.contact.email}. Our support team will assist you.`;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: `Hi, I'm Sofia from ${CONFIG.brand.name}. How can I help you today?`,
      time: now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  async function send(message: string) {
    if (!message.trim()) return;

    const userMessage: Msg = {
      from: "user",
      text: message,
      time: now(),
    };

    setMessages(current => [...current, userMessage]);
    setText("");
    setTyping(true);

    let response = "";

    if (aiReady()) {
      const history = [...messages, userMessage].map(item => ({
        role: item.from === "user" ? ("user" as const) : ("assistant" as const),
        content: item.text,
      }));

      response = await aiReply(history);
    }

    if (!response) {
      response = fallbackReply(message);
    }

    setTimeout(() => {
      setTyping(false);

      setMessages(current => [
        ...current,
        {
          from: "bot",
          text: response,
          time: now(),
        },
      ]);
    }, 700);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-2xl shadow-emerald-500/30 grid place-items-center text-bg transition hover:scale-105 ${
          open ? "scale-0" : "scale-100"
        } pulse-ring`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 bg-card border border-line rounded-2xl shadow-2xl flex flex-col max-h-[600px]">
          <div className="p-4 border-b border-line flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 grid place-items-center text-bg font-semibold">
                  S
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-card" />
              </div>

              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                  Sofia · {CONFIG.brand.short}
                  {aiReady() && <Bot className="w-3 h-3 text-emerald-400" />}
                </div>

                <div className="text-[11px] text-emerald-400">
                  {aiReady() ? "AI-powered · Online" : "Online · replies in seconds"}
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    message.from === "user"
                      ? "bg-gradient-to-r from-emerald-400 to-blue-500 text-bg rounded-br-sm"
                      : "bg-bg-elev text-white rounded-bl-sm"
                  }`}
                >
                  {message.text}

                  <div
                    className={`text-[10px] mt-1 ${
                      message.from === "user" ? "text-bg/60" : "text-white/40"
                    }`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-bg-elev rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 2 && !typing && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK.map(question => (
                <button
                  key={question}
                  onClick={() => send(question)}
                  className="text-[11px] px-2.5 py-1.5 rounded-full border border-line text-white/70 hover:bg-white/5"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={event => {
              event.preventDefault();
              send(text);
            }}
            className="p-3 border-t border-line flex gap-2"
          >
            <input
              value={text}
              onChange={event => setText(event.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-bg border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-400/40"
            />

            <button className="px-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
    }
