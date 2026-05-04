export type Visit = {
  id: string;
  sessionId: string;
  timestamp: string;
  ip?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  isp?: string;
  timezone?: string;
  device: "Mobile" | "Tablet" | "Desktop";
  os: string;
  browser: string;
  browserVersion: string;
  screen: string;
  language: string;
  referrer: string;
  landingPage: string;
  pages: {
    path: string;
    ts: string;
  }[];
  userAgent: string;
};

const KEY = "nv_visits";
const SESSION = "nv_session_id";

function detectDevice(): "Mobile" | "Tablet" | "Desktop" {
  const userAgent = navigator.userAgent;

  if (/iPad|tablet|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(userAgent)) return "Mobile";

  return "Desktop";
}

function detectOS(): string {
  const userAgent = navigator.userAgent;

  if (/Windows NT 10/i.test(userAgent)) return "Windows 10/11";
  if (/Windows NT/i.test(userAgent)) return "Windows";
  if (/Mac OS X/i.test(userAgent)) return "macOS";
  if (/iPhone|iPad/i.test(userAgent)) return "iOS";
  if (/Android/i.test(userAgent)) return "Android";
  if (/Linux/i.test(userAgent)) return "Linux";

  return "Unknown";
}

function detectBrowser(): {
  browser: string;
  version: string;
} {
  const userAgent = navigator.userAgent;
  let match;

  if ((match = userAgent.match(/Edg\/([\d.]+)/))) {
    return { browser: "Edge", version: match[1] };
  }

  if ((match = userAgent.match(/Chrome\/([\d.]+)/))) {
    return { browser: "Chrome", version: match[1] };
  }

  if ((match = userAgent.match(/Firefox\/([\d.]+)/))) {
    return { browser: "Firefox", version: match[1] };
  }

  if ((match = userAgent.match(/Version\/([\d.]+).*Safari/))) {
    return { browser: "Safari", version: match[1] };
  }

  if ((match = userAgent.match(/OPR\/([\d.]+)/))) {
    return { browser: "Opera", version: match[1] };
  }

  return { browser: "Other", version: "—" };
}

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION);

  if (!id) {
    id = `s${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION, id);
  }

  return id;
}

export const analytics = {
  all: (): Visit[] => JSON.parse(localStorage.getItem(KEY) || "[]"),

  trackVisit: async () => {
    const sessionId = getSessionId();
    const list = analytics.all();
    const existing = list.find(visit => visit.sessionId === sessionId);

    const path = window.location.hash.slice(1) || "/";

    if (existing) {
      const last = existing.pages[existing.pages.length - 1];

      if (!last || last.path !== path) {
        existing.pages.push({
          path,
          ts: new Date().toISOString(),
        });

        localStorage.setItem(KEY, JSON.stringify(list));
      }

      return existing;
    }

    const detected = detectBrowser();

    const visit: Visit = {
      id: `v${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
      sessionId,
      timestamp: new Date().toISOString(),
      device: detectDevice(),
      os: detectOS(),
      browser: detected.browser,
      browserVersion: detected.version,
      screen: `${window.screen.width}×${window.screen.height}`,
      language: navigator.language,
      referrer: document.referrer || "Direct",
      landingPage: path,
      pages: [
        {
          path,
          ts: new Date().toISOString(),
        },
      ],
      userAgent: navigator.userAgent,
    };

    try {
      const response = await fetch("https://ipapi.co/json/");

      if (response.ok) {
        const data = await response.json();

        visit.ip = data.ip;
        visit.country = data.country_name;
        visit.countryCode = data.country_code;
        visit.city = data.city;
        visit.region = data.region;
        visit.isp = data.org;
        visit.timezone = data.timezone;
      }
    } catch {
      // Visitor tracking still works without IP lookup.
    }

    const updated = [visit, ...list].slice(0, 500);
    localStorage.setItem(KEY, JSON.stringify(updated));

    return visit;
  },

  clear: () => localStorage.removeItem(KEY),
};
