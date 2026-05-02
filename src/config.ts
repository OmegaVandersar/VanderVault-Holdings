export const CONFIG = {
  brand: {
    name: "NordVault Global Capital",
    short: "NordVault",
    legalName: "NordVault Global Capital Ltd",
    registrationNumber: "UK Companies House number supplied by legal counsel",
    tagline: "Global Digital Asset Investment Platform",
    foundedYear: 2017,
  },

  contact: {
    email: "supportvanguardcrypto.capital@gmail.com",
    salesEmail: "investors@nordvaultglobal.com",
    pressEmail: "press@nordvaultglobal.com",
    phone: "+44 20 4538 1190",
    address: "30 St Mary Axe, London EC3A 8BF, United Kingdom",
  },

  offices: {
    globalHeadquarters: "30 St Mary Axe, London EC3A 8BF, United Kingdom",
    euRegulatoryOffice: "Mainzer Landstrasse 50, 60325 Frankfurt am Main, Germany",
    investorRelations: "One Canada Square, Canary Wharf, London E14 5AB, United Kingdom",
  },

  regulatory: {
    primaryJurisdiction: "Germany",
    city: "Frankfurt am Main",
    country: "Germany",
    officeName: "European Regulatory Office",
    address: "Mainzer Landstrasse 50, 60325 Frankfurt am Main, Germany",
    registryCourt: "Amtsgericht Frankfurt am Main",
    commercialRegister: "HRB Frankfurt am Main: supplied by legal counsel",
    regulator: "BaFin - Bundesanstalt fuer Finanzdienstleistungsaufsicht",
    regulatorId: "BaFin register reference supplied by legal counsel",
    lei: "LEI supplied by legal counsel",
    vatId: "DE VAT ID supplied by tax advisor",
    foundedDate: "18 September 2017",
    germanOfficeEstablished: "12 April 2021",
    certificateId: "NVC-DE-FRA-2017-0918",
    certificateIssued: "15 January 2026",
    supervisoryFramework: [
      "Markets in Crypto-Assets Regulation (MiCA)",
      "German Banking Act (KWG)",
      "Money Laundering Act (GwG)",
      "EU AMLD5 / AMLD6",
      "GDPR",
      "Operational resilience under DORA readiness",
    ],
    investorVerificationSteps: [
      "Confirm the Handelsregister entry at unternehmensregister.de",
      "Confirm the BaFin register entry at bafin.de",
      "Confirm the LEI record at gleif.org if applicable",
      "Confirm the office address and authorised representatives",
    ],
  },

  chat: {
    whatsappNumber: "447385738214",
    whatsappMessage: "Hello NordVault, I'd like to know more about investing.",
    telegramUsername: "NordVaultSupport",
  },

  social: {
    twitter: "https://twitter.com/nordvaultcap",
    linkedin: "https://linkedin.com/company/nordvaultglobal",
    telegram: "https://t.me/nordvaultglobal",
    youtube: "https://youtube.com/@nordvaultglobal",
    discord: "https://discord.gg/nordvault",
    medium: "https://medium.com/@nordvault",
  },

  stats: {
    aum: "€4.8B+",
    investors: "192,000+",
    countries: "78",
    payoutReliability: "99.97%",
    avgSupportSeconds: "47",
    yearsOperating: 8,
    trustpilotRating: 4.9,
    trustpilotReviews: 11482,
  },

  wallets: {
    BTC: "bc1qs79q5aj9j8hn5rfcn50lq8zefsvx0fu4hal0x8",
    ETH: "0x761ca25c6fe562c5ebcb20f34aba1d083bf117dc",
    USDT_TRC20: "TTm6uZvcx5n2AsZ7RZinP5ggsTaP28wKkx",
    USDT_ERC20: "0x761ca25c6fe562c5ebcb20f34aba1d083bf117dc",
    USDC: "0x761ca25c6fe562c5ebcb20f34aba1d083bf117dc",
    BNB: "0x761ca25c6fe562c5ebcb20f34aba1d083bf117dc",
    SOL: "7jJpxUW9Kdp9DCMviB3GmeHZ8TEbyBsDHfpRHtqbFbKk",
    XRP: "",
  },

  bank: {
    beneficiary: "NordVault Global Capital Ltd",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "DEUTDEFFXXX",
    bankName: "Deutsche Bank AG",
    bankAddress: "Taunusanlage 12, 60325 Frankfurt am Main, Germany",
    reference: "Use your account ID as reference",
  },

  stripePaymentLink: "",

  walletConnectProjectId: "",

  plans: [
    {
      id: "starter",
      name: "Starter",
      badge: "For new investors",
      minimum: 500,
      maximum: 4999,
      daily: 0.8,
      duration: 14,
      referral: 5,
      color: "from-emerald-500/20 to-emerald-500/5",
      accent: "emerald",
      features: [
        "BTC, ETH, USDT, USDC, SEPA EUR deposits",
        "Daily compounding option",
        "24/7 multilingual support",
        "Insured cold-wallet custody",
        "Free education academy access",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      badge: "Most popular",
      minimum: 5000,
      maximum: 49999,
      daily: 1.1,
      duration: 21,
      referral: 7,
      color: "from-sky-500/20 to-sky-500/5",
      accent: "sky",
      featured: true,
      features: [
        "All Starter benefits",
        "Dedicated portfolio manager",
        "Priority withdrawals (≤ 2 hours)",
        "Quarterly market intelligence reports",
        "Early access to new products",
      ],
    },
    {
      id: "institutional",
      name: "Institutional",
      badge: "VIP",
      minimum: 50000,
      maximum: 1000000,
      daily: 1.4,
      duration: 30,
      referral: 10,
      color: "from-amber-500/20 to-amber-500/5",
      accent: "amber",
      features: [
        "All Professional benefits",
        "OTC desk & deep liquidity",
        "Bespoke strategy & hedging",
        "Multi-signature custody (3-of-5)",
        "Direct line to senior management",
      ],
    },
  ],

  affiliate: {
    tiers: [
      { name: "Bronze", min: 0, bonus: 5, badge: "🥉" },
      { name: "Silver", min: 10000, bonus: 8, badge: "🥈" },
      { name: "Gold", min: 50000, bonus: 12, badge: "🥇" },
      { name: "Diamond", min: 250000, bonus: 18, badge: "💎" },
    ],
  },

  admin: {
    email: "admin@nordvaultglobal.com",
    password: "Admin@2026!",
  },

  web3formsAccessKey: "",

  resendApiKey: "",
  resendFromEmail: "noreply@nordvaultglobal.com",

  sumsubAppToken: "",
  sumsubLevelName: "basic-kyc-level",

  openaiApiKey: "",

  googleAnalyticsId: "",

  siteUrl: "https://nordvaultglobal.com",
};

export type Plan = (typeof CONFIG.plans)[number] & { featured?: boolean };
