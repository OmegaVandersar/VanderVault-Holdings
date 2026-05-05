import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import QRCode from "qrcode";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  History,
  KeyRound,
  Lock,
  Plus,
  Shield,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
} from "lucide-react";

import { auth } from "../data/auth";
import {
  generateBackupCodes,
  generateSecret,
  otpAuthUrl,
  verifyCode,
} from "../utils/totp";

type Tab =
  | "profile"
  | "security"
  | "2fa"
  | "whitelist"
  | "sessions"
  | "notifications";

export default function Settings() {
  const me = auth.current();

  const [tab, setTab] = useState<Tab>("security");
  const [, force] = useState(0);

  const refresh = () => force(value => value + 1);

  if (!me) return <Navigate to="/login" replace />;

  const tabs: {
    id: Tab;
    label: string;
    icon: any;
    badge?: string;
  }[] = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "2fa",
      label: "Two-factor auth",
      icon: Smartphone,
      badge: me.twoFA ? "ON" : "OFF",
    },
    {
      id: "whitelist",
      label: "Withdrawal whitelist",
      icon: KeyRound,
    },
    {
      id: "sessions",
      label: "Login activity",
      icon: History,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" />
          Account settings
        </div>

        <h1 className="text-3xl font-semibold text-white">
          Hello, {me.firstName}.
        </h1>

        <p className="text-sm text-white/50 mt-1">
          Manage profile, security, withdrawal protection and notifications.
        </p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <nav className="lg:sticky lg:top-20 lg:self-start space-y-1">
          {tabs.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm transition ${
                tab === item.id
                  ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                  : "text-white/70 hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    item.badge === "ON"
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "bg-rose-400/20 text-rose-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <Link
            to="/dashboard"
            className="block px-4 py-2.5 mt-3 text-xs text-white/50 hover:text-white"
          >
            Back to dashboard
          </Link>
        </nav>

        <div>
          {tab === "profile" && <ProfileTab user={me} refresh={refresh} />}
          {tab === "security" && <SecurityTab user={me} refresh={refresh} />}
          {tab === "2fa" && <TwoFATab user={me} refresh={refresh} />}
          {tab === "whitelist" && <WhitelistTab user={me} refresh={refresh} />}
          {tab === "sessions" && <SessionsTab user={me} />}
          {tab === "notifications" && (
            <NotificationsTab user={me} refresh={refresh} />
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user, refresh }: any) {
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || "",
    country: user.country,
    primaryWalletAddress: user.primaryWalletAddress || "",
  });

  const [saved, setSaved] = useState(false);

  const save = () => {
    auth.update(user.id, data);
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card
      title="Profile information"
      desc="Keep your contact and withdrawal wallet details up to date."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="First name"
          value={data.firstName}
          onChange={(value: string) =>
            setData({
              ...data,
              firstName: value,
            })
          }
        />

        <Field
          label="Last name"
          value={data.lastName}
          onChange={(value: string) =>
            setData({
              ...data,
              lastName: value,
            })
          }
        />

        <Field label="Email" value={user.email} disabled />

        <Field
          label="Phone"
          value={data.phone}
          onChange={(value: string) =>
            setData({
              ...data,
              phone: value,
            })
          }
          placeholder="+44 7700 900123"
        />

        <Field
          label="Country"
          value={data.country}
          onChange={(value: string) =>
            setData({
              ...data,
              country: value,
            })
          }
        />

        <Field label="Account ID" value={user.id.toUpperCase()} disabled />

        <Field
          label="Primary withdrawal wallet"
          value={data.primaryWalletAddress}
          onChange={(value: string) =>
            setData({
              ...data,
              primaryWalletAddress: value,
            })
          }
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={save}
          className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold"
        >
          Save changes
        </button>

        {saved && (
          <span className="text-xs text-emerald-400 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Saved
          </span>
        )}
      </div>
    </Card>
  );
}

function SecurityTab({ user, refresh }: any) {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const score = getPasswordScore(passwords.next);

  const updatePassword = () => {
    setMsg(null);

    if (passwords.current !== user.password) {
      return setMsg({
        type: "err",
        text: "Current password is incorrect.",
      });
    }

    if (passwords.next.length < 8) {
      return setMsg({
        type: "err",
        text: "New password must be at least 8 characters.",
      });
    }

    if (passwords.next !== passwords.confirm) {
      return setMsg({
        type: "err",
        text: "New passwords do not match.",
      });
    }

    auth.update(user.id, {
      password: passwords.next,
    });

    setPasswords({
      current: "",
      next: "",
      confirm: "",
    });

    refresh();

    setMsg({
      type: "ok",
      text: "Password updated successfully.",
    });
  };

  return (
    <div className="space-y-5">
      <Card
        title="Change password"
        desc="Use a strong, unique password with letters, numbers and symbols."
      >
        <div className="space-y-4 max-w-md">
          <PasswordField
            label="Current password"
            value={passwords.current}
            onChange={(value: string) =>
              setPasswords({
                ...passwords,
                current: value,
              })
            }
            show={show}
            setShow={setShow}
          />

          <PasswordField
            label="New password"
            value={passwords.next}
            onChange={(value: string) =>
              setPasswords({
                ...passwords,
                next: value,
              })
            }
            show={show}
            setShow={setShow}
          />

          {passwords.next && (
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map(item => (
                  <div
                    key={item}
                    className={`h-1 flex-1 rounded-full ${
                      item <= score
                        ? score < 3
                          ? "bg-rose-400"
                          : score < 4
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="text-[10px] text-white/50">
                {score < 3 ? "Weak" : score < 4 ? "Good" : "Strong"} password
              </div>
            </div>
          )}

          <PasswordField
            label="Confirm new password"
            value={passwords.confirm}
            onChange={(value: string) =>
              setPasswords({
                ...passwords,
                confirm: value,
              })
            }
            show={show}
            setShow={setShow}
          />

          {msg && <Alert type={msg.type} text={msg.text} />}

          <button
            onClick={updatePassword}
            className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold"
          >
            Update password
          </button>
        </div>
      </Card>

      <Card
        title="Account security score"
        desc="Increase account protection before depositing funds."
      >
        <SecurityScore user={user} />
      </Card>
    </div>
  );
}

function TwoFATab({ user, refresh }: any) {
  const [step, setStep] = useState<"start" | "qr" | "backup" | "manage">(
    user.twoFA ? "manage" : "start"
  );

  const [secret, setSecret] = useState(user.twoFASecret || "");
  const [qr, setQr] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (step === "qr" && secret) {
      QRCode.toDataURL(otpAuthUrl(secret, user.email), {
        width: 220,
        margin: 1,
        color: {
          dark: "#120f08",
          light: "#ffffff",
        },
      })
        .then(setQr)
        .catch(() => {});
    }
  }, [step, secret, user.email]);

  const begin = () => {
    const generated = generateSecret();

    setSecret(generated);
    setStep("qr");
  };

  const verify = () => {
    setErr("");

    if (!verifyCode(secret, code)) {
      return setErr("That code is incorrect or expired. Try again.");
    }

    const codes = generateBackupCodes();

    setBackupCodes(codes);

    auth.update(user.id, {
      twoFA: true,
      twoFASecret: secret,
      twoFABackupCodes: codes,
    });

    refresh();
    setStep("backup");
  };

  const disable = () => {
    if (!confirm("Disable 2FA? Your account will be less secure.")) return;

    auth.update(user.id, {
      twoFA: false,
      twoFASecret: undefined,
      twoFABackupCodes: undefined,
    });

    refresh();
    setStep("start");
  };

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (step === "manage") {
    return (
      <div className="space-y-5">
        <Card
          title="Two-factor authentication"
          desc="2FA protects logins and withdrawals with a time-based security code."
        >
          <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />

            <div className="flex-1">
              <div className="text-white font-medium">
                2FA is active on your account
              </div>

              <div className="text-xs text-white/60 mt-0.5">
                Your account has additional login and withdrawal protection.
              </div>
            </div>

            <button
              onClick={disable}
              className="text-xs px-3 py-1.5 rounded border border-rose-400/30 text-rose-300 hover:bg-rose-400/10"
            >
              Disable
            </button>
          </div>
        </Card>

        <Card
          title="Backup codes"
          desc="Use a backup code if you lose your authenticator device."
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-sm">
            {(user.twoFABackupCodes || []).map((item: string, index: number) => (
              <div
                key={index}
                className="bg-bg/60 border border-line rounded px-3 py-2 text-center text-white"
              >
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => copy((user.twoFABackupCodes || []).join("\n"))}
            className="mt-4 text-xs text-emerald-400 inline-flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? "Copied" : "Copy all codes"}
          </button>
        </Card>
      </div>
    );
  }

  if (step === "backup") {
    return (
      <Card
        title="Save your backup codes"
        desc="Save these codes somewhere safe. They are the only way to access your account if your authenticator device is lost."
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-sm">
          {backupCodes.map((item, index) => (
            <div
              key={index}
              className="bg-bg/60 border border-line rounded px-3 py-2 text-center text-white"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => copy(backupCodes.join("\n"))}
            className="px-4 py-2 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied" : "Copy all"}
          </button>

          <button
            onClick={() => {
              const text = `NordVault Global Capital - 2FA Backup Codes\nAccount: ${user.email}\nGenerated: ${new Date().toLocaleString(
                "en-GB"
              )}\n\n${backupCodes.join(
                "\n"
              )}\n\nEach code can only be used once. Store these codes securely.`;

              const blob = new Blob([text], {
                type: "text/plain",
              });

              const url = URL.createObjectURL(blob);
              const anchor = document.createElement("a");

              anchor.href = url;
              anchor.download = "nordvault-2fa-backup-codes.txt";
              anchor.click();

              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <button
          onClick={() => setStep("manage")}
          className="mt-5 px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold"
        >
          I saved them
        </button>
      </Card>
    );
  }

  if (step === "qr") {
    return (
      <Card
        title="Scan with your authenticator"
        desc="Use Google Authenticator, Authy, Microsoft Authenticator or 1Password."
      >
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="grid place-items-center">
            <div className="bg-white p-3 rounded-xl">
              {qr ? (
                <img src={qr} alt="2FA QR" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 grid place-items-center text-bg/40">
                  ...
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/70 mb-2">
              Or enter this key manually:
            </div>

            <div className="flex bg-bg border border-line rounded-md overflow-hidden">
              <input
                readOnly
                value={secret}
                className="flex-1 px-3 py-2 bg-transparent text-xs text-white font-mono"
              />

              <button
                onClick={() => copy(secret)}
                className="px-3 border-l border-line text-emerald-400"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="mt-6">
              <label className="text-xs text-white/60">
                Enter the 6-digit code shown in your app
              </label>

              <input
                value={code}
                onChange={event =>
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-3 text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-emerald-400/40"
                maxLength={6}
              />

              {err && (
                <div className="mt-2 text-xs text-rose-400">
                  {err}
                </div>
              )}

              <button
                onClick={verify}
                disabled={code.length !== 6}
                className="mt-4 w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold disabled:opacity-40"
              >
                Verify and enable 2FA
              </button>

              <button
                onClick={() => setStep("start")}
                className="mt-2 w-full py-2 text-xs text-white/50 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Two-factor authentication"
      desc="Add an extra layer of protection to your account before depositing funds."
    >
      <div className="space-y-5">
        <div className="flex items-start gap-4 p-4 rounded-lg border border-amber-400/20 bg-amber-400/5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />

          <div className="text-sm text-amber-100/80">
            Your account is currently{" "}
            <strong className="text-white">not protected by 2FA</strong>. We
            strongly recommend enabling it before depositing funds.
          </div>
        </div>

        <button
          onClick={begin}
          className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold inline-flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          Enable 2FA now
        </button>
      </div>
    </Card>
  );
}

function WhitelistTab({ user, refresh }: any) {
  const [adding, setAdding] = useState(false);

  const [newAddress, setNewAddress] = useState({
    label: "",
    asset: "BTC",
    address: "",
  });

  const list = user.withdr
