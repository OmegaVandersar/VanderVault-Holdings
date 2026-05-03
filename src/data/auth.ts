export type Account = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  phone?: string;
  primaryWalletAddress?: string;
  referralCode: string;
  referredBy?: string;
  status: "active" | "suspended" | "pending";
  kyc: "verified" | "pending" | "rejected" | "not_started";
  balance: number;
  invested: number;
  totalProfit: number;
  referralEarnings: number;
  joined: string;
  twoFA: boolean;
  twoFASecret?: string;
  twoFABackupCodes?: string[];
  emailVerified?: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  activeInvestments?: {
    id: string;
    planId: string;
    planName: string;
    amount: number;
    daily: number;
    duration: number;
    startedAt: string;
    maturesAt: string;
    status: "active" | "matured";
  }[];
  withdrawalWhitelist?: {
    label: string;
    asset: string;
    address: string;
    addedAt: string;
  }[];
  loginHistory?: {
    ts: string;
    ip?: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
    success: boolean;
  }[];
  notificationPrefs?: {
    email: boolean;
    sms: boolean;
    loginAlerts: boolean;
    marketing: boolean;
  };
};

const KEY = "nv_accounts";
const SESSION = "nv_session";

const genCode = () => Math.random().toString(36).slice(2, 10).toUpperCase();

const genToken = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export const auth = {
  all: (): Account[] => JSON.parse(localStorage.getItem(KEY) || "[]"),

  save: (list: Account[]) => localStorage.setItem(KEY, JSON.stringify(list)),

  current: (): Account | null => {
    const id = localStorage.getItem(SESSION);
    if (!id) return null;

    return auth.all().find(account => account.id === id) || null;
  },

  signup: (
    data: Partial<Account> & {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      country: string;
    }
  ) => {
    const list = auth.all();

    if (list.some(account => account.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }

    const account: Account = {
      id: `u${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      country: data.country,
      phone: data.phone,
      primaryWalletAddress: data.primaryWalletAddress,
      referralCode: genCode(),
      referredBy: data.referredBy,
      status: "active",
      kyc: "not_started",
      emailVerified: false,
      emailVerificationToken: genToken(),
      balance: 0,
      invested: 0,
      totalProfit: 0,
      referralEarnings: 0,
      joined: new Date().toISOString(),
      twoFA: false,
    };

    list.push(account);
    auth.save(list);
    localStorage.setItem(SESSION, account.id);

    return account;
  },

  login: (email: string, password: string) => {
    const account = auth.all().find(
      item =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!account) {
      throw new Error("Invalid email or password.");
    }

    if (account.status === "suspended") {
      throw new Error("This account is suspended. Please contact support.");
    }

    return account;
  },

  completeLogin: (
    accountId: string,
    meta?: {
      ip?: string;
      country?: string;
      city?: string;
    }
  ) => {
    localStorage.setItem(SESSION, accountId);

    const list = auth.all();
    const account = list.find(item => item.id === accountId);

    if (account) {
      const history = account.loginHistory || [];

      history.unshift({
        ts: new Date().toISOString(),
        device: /Mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        browser:
          navigator.userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)\/[\d.]+/)?.[0] ||
          "Browser",
        ip: meta?.ip,
        country: meta?.country,
        city: meta?.city,
        success: true,
      });

      account.loginHistory = history.slice(0, 25);
      auth.save(list);
    }
  },

  logout: () => localStorage.removeItem(SESSION),

  update: (id: string, patch: Partial<Account>) => {
    const list = auth.all().map(account =>
      account.id === id ? { ...account, ...patch } : account
    );

    auth.save(list);
  },

  verifyEmail: (token: string) => {
    const list = auth.all();
    const account = list.find(item => item.emailVerificationToken === token);

    if (!account) {
      throw new Error("Verification link is invalid or expired.");
    }

    account.emailVerified = true;
    account.emailVerificationToken = undefined;

    auth.save(list);

    return account;
  },

  requestPasswordReset: (email: string) => {
    const list = auth.all();
    const account = list.find(item => item.email.toLowerCase() === email.toLowerCase());

    if (!account) return null;

    account.passwordResetToken = genToken();
    account.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    auth.save(list);

    return account.passwordResetToken;
  },

  resetPassword: (token: string, password: string) => {
    const list = auth.all();
    const account = list.find(item => item.passwordResetToken === token);

    if (
      !account ||
      !account.passwordResetExpires ||
      +new Date(account.passwordResetExpires) < Date.now()
    ) {
      throw new Error("Reset link is invalid or expired.");
    }

    account.password = password;
    account.passwordResetToken = undefined;
    account.passwordResetExpires = undefined;

    auth.save(list);

    return account;
  },
};
