export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "active" | "suspended" | "pending";
  kyc: "verified" | "pending" | "rejected";
  balance: number;
  invested: number;
  totalProfit: number;
  joined: string;
};

export type Transaction = {
  id: string;
  userId: string;
  userName: string;
  type: "deposit" | "withdrawal" | "profit" | "investment" | "referral";
  asset: string;
  amount: number;
  status: "pending" | "approved" | "denied" | "suspended" | "completed";
  date: string;
  txHash?: string;
  walletAddress?: string;
  note?: string;
};

export type Message = {
  id: string;
  from: string;
  email: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
};

const KEYS = {
  users: "nv_users",
  txns: "nv_txns",
  msgs: "nv_msgs",
  admin: "nv_admin_session",
};

function seed() {
  if (localStorage.getItem(KEYS.users)) return;

  const users: User[] = [
    {
      id: "u1",
      name: "Anna Schmidt",
      email: "anna.schmidt@example.de",
      country: "Germany",
      status: "active",
      kyc: "verified",
      balance: 12480,
      invested: 8000,
      totalProfit: 4480,
      joined: "2024-03-12",
    },
    {
      id: "u2",
      name: "Lars Andersen",
      email: "lars@example.dk",
      country: "Denmark",
      status: "active",
      kyc: "verified",
      balance: 5410,
      invested: 5000,
      totalProfit: 410,
      joined: "2024-08-04",
    },
    {
      id: "u3",
      name: "Élodie Lefèvre",
      email: "elodie.l@example.fr",
      country: "France",
      status: "active",
      kyc: "verified",
      balance: 73210,
      invested: 50000,
      totalProfit: 23210,
      joined: "2023-11-20",
    },
    {
      id: "u4",
      name: "Giulia Rinaldi",
      email: "g.rinaldi@example.it",
      country: "Italy",
      status: "active",
      kyc: "verified",
      balance: 18900,
      invested: 15000,
      totalProfit: 3900,
      joined: "2024-06-15",
    },
    {
      id: "u5",
      name: "Sebastian Müller",
      email: "s.mueller@example.de",
      country: "Germany",
      status: "active",
      kyc: "verified",
      balance: 9120,
      invested: 7500,
      totalProfit: 1620,
      joined: "2025-01-03",
    },
    {
      id: "u6",
      name: "Henrik Solberg",
      email: "h.solberg@example.no",
      country: "Norway",
      status: "pending",
      kyc: "pending",
      balance: 0,
      invested: 0,
      totalProfit: 0,
      joined: "2026-01-12",
    },
    {
      id: "u7",
      name: "Marta Kowalska",
      email: "marta.k@example.pl",
      country: "Poland",
      status: "suspended",
      kyc: "verified",
      balance: 2200,
      invested: 2000,
      totalProfit: 200,
      joined: "2025-09-30",
    },
  ];

  const txns: Transaction[] = [
    {
      id: "t1",
      userId: "u1",
      userName: "Anna Schmidt",
      type: "withdrawal",
      asset: "BTC",
      amount: 2500,
      status: "pending",
      date: "2026-01-14T09:42:00Z",
      walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      note: "Standard withdrawal",
    },
    {
      id: "t2",
      userId: "u3",
      userName: "Élodie Lefèvre",
      type: "withdrawal",
      asset: "USDT",
      amount: 8000,
      status: "pending",
      date: "2026-01-14T11:15:00Z",
      walletAddress: "TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6",
      note: "Priority — Pro tier",
    },
    {
      id: "t3",
      userId: "u4",
      userName: "Giulia Rinaldi",
      type: "withdrawal",
      asset: "ETH",
      amount: 1200,
      status: "pending",
      date: "2026-01-14T13:01:00Z",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    },
    {
      id: "t4",
      userId: "u1",
      userName: "Anna Schmidt",
      type: "deposit",
      asset: "BTC",
      amount: 5000,
      status: "completed",
      date: "2026-01-12T08:14:00Z",
      txHash: "3a7c...e1f9",
    },
    {
      id: "t5",
      userId: "u5",
      userName: "Sebastian Müller",
      type: "deposit",
      asset: "USDT",
      amount: 7500,
      status: "completed",
      date: "2026-01-10T14:22:00Z",
      txHash: "0x91a...c34b",
    },
    {
      id: "t6",
      userId: "u3",
      userName: "Élodie Lefèvre",
      type: "investment",
      asset: "EUR",
      amount: 50000,
      status: "approved",
      date: "2026-01-08T10:00:00Z",
      note: "Institutional plan",
    },
    {
      id: "t7",
      userId: "u2",
      userName: "Lars Andersen",
      type: "withdrawal",
      asset: "BTC",
      amount: 800,
      status: "approved",
      date: "2026-01-13T16:30:00Z",
      walletAddress: "bc1qhg...kj4f",
    },
    {
      id: "t8",
      userId: "u7",
      userName: "Marta Kowalska",
      type: "withdrawal",
      asset: "USDT",
      amount: 1500,
      status: "denied",
      date: "2026-01-11T11:00:00Z",
      note: "AML review — account suspended",
    },
    {
      id: "t9",
      userId: "u4",
      userName: "Giulia Rinaldi",
      type: "profit",
      asset: "EUR",
      amount: 570,
      status: "completed",
      date: "2026-01-14T00:00:00Z",
    },
    {
      id: "t10",
      userId: "u1",
      userName: "Anna Schmidt",
      type: "referral",
      asset: "EUR",
      amount: 312,
      status: "completed",
      date: "2026-01-13T00:00:00Z",
    },
  ];

  const msgs: Message[] = [
    {
      id: "m1",
      from: "Henrik Solberg",
      email: "h.solberg@example.no",
      subject: "KYC documents not accepted",
      body: "Hello, I uploaded my Norwegian ID twice but it keeps getting rejected. Could you check please?",
      date: "2026-01-14T08:12:00Z",
      read: false,
    },
    {
      id: "m2",
      from: "Family Office Geneva",
      email: "ops@fo-geneva.ch",
      subject: "Institutional onboarding — €2M ticket",
      body: "Good morning, we represent a European family office and would like to discuss onboarding for a €2M initial allocation. Available for a call this week.",
      date: "2026-01-14T07:01:00Z",
      read: false,
    },
    {
      id: "m3",
      from: "Pierre Dubois",
      email: "p.dubois@example.fr",
      subject: "Withdrawal taking longer than usual",
      body: "Hi, my withdrawal from Tuesday is still pending. Reference #t12. Thanks for the update.",
      date: "2026-01-13T19:45:00Z",
      read: true,
    },
    {
      id: "m4",
      from: "Jana Novak",
      email: "jana@example.cz",
      subject: "Tax reporting for Czech residents",
      body: "Could you please confirm whether you provide annual tax statements compatible with Czech reporting?",
      date: "2026-01-13T15:20:00Z",
      read: true,
    },
  ];

  localStorage.setItem(KEYS.users, JSON.stringify(users));
  localStorage.setItem(KEYS.txns, JSON.stringify(txns));
  localStorage.setItem(KEYS.msgs, JSON.stringify(msgs));
}

function read<T>(key: string): T[] {
  seed();
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function write<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const store = {
  getUsers: () => read<User>(KEYS.users),

  updateUser: (id: string, patch: Partial<User>) => {
    const users = read<User>(KEYS.users).map(user =>
      user.id === id ? { ...user, ...patch } : user
    );

    write(KEYS.users, users);
  },

  deleteUser: (id: string) =>
    write(KEYS.users, read<User>(KEYS.users).filter(user => user.id !== id)),

  getTxns: () => read<Transaction>(KEYS.txns),

  addTxn: (
    txn: Omit<Transaction, "id" | "date"> & {
      id?: string;
      date?: string;
    }
  ) => {
    const next: Transaction = {
      ...txn,
      id: txn.id || `t${Date.now()}`,
      date: txn.date || new Date().toISOString(),
    } as Transaction;

    write(KEYS.txns, [next, ...read<Transaction>(KEYS.txns)]);

    return next;
  },

  updateTxn: (id: string, patch: Partial<Transaction>) => {
    const transactions = read<Transaction>(KEYS.txns).map(transaction =>
      transaction.id === id ? { ...transaction, ...patch } : transaction
    );

    write(KEYS.txns, transactions);
  },

  getMsgs: () => read<Message>(KEYS.msgs),

  updateMsg: (id: string, patch: Partial<Message>) => {
    const messages = read<Message>(KEYS.msgs).map(message =>
      message.id === id ? { ...message, ...patch } : message
    );

    write(KEYS.msgs, messages);
  },

  deleteMsg: (id: string) =>
    write(KEYS.msgs, read<Message>(KEYS.msgs).filter(message => message.id !== id)),

  isAdmin: () => localStorage.getItem(KEYS.admin) === "1",

  loginAdmin: (email: string, password: string) => {
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem(KEYS.admin, "1");
      return true;
    }

    return false;
  },

  logoutAdmin: () => localStorage.removeItem(KEYS.admin),

  reset: () => {
    localStorage.removeItem(KEYS.users);
    localStorage.removeItem(KEYS.txns);
    localStorage.removeItem(KEYS.msgs);
    seed();
  },
};

export const ADMIN_CREDENTIALS = {
  email: "admin@nordvaultglobal.com",
  password: "Admin@2026!",
};
