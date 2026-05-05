import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Upload,
  CheckCircle2,
  FileText,
  Camera,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import { auth } from "../data/auth";

const STEPS = [
  {
    number: 1,
    label: "Personal info",
  },
  {
    number: 2,
    label: "Identity document",
  },
  {
    number: 3,
    label: "Proof of address",
  },
  {
    number: 4,
    label: "Selfie verification",
  },
  {
    number: 5,
    label: "Submit for review",
  },
];

export default function KYC() {
  const me = auth.current();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [files, setFiles] = useState<{
    id?: File;
    address?: File;
    selfie?: File;
  }>({});

  const [info, setInfo] = useState({
    dob: "",
    nationality: "",
    taxId: "",
    street: "",
    city: "",
    postal: "",
  });

  if (!me) return <Navigate to="/login" replace />;

  const upload =
    (key: "id" | "address" | "selfie") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        setFiles(previous => ({
          ...previous,
          [key]: file,
        }));
      }
    };

  const submit = () => {
    auth.update(me.id, {
      kyc: "pending",
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-400/15 grid place-items-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="text-3xl font-semibold text-white">
          KYC submitted successfully
        </h1>

        <p className="mt-3 text-white/65">
          Our compliance team will review your documents within 24 hours. You
          will receive a notification once approved.
        </p>

        <div className="mt-8 bg-card border border-line rounded-xl p-5 text-left">
          <h3 className="text-sm font-semibold text-white mb-3">
            What happens next?
          </h3>

          <ul className="space-y-2 text-sm text-white/70">
            {[
              "Identity verification review",
              "Sanctions and PEP screening",
              "Source-of-funds review if required",
              "Account fully activated",
            ].map(item => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium"
        >
          Back to dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5" />
        Identity verification
      </div>

      <h1 className="text-3xl font-semibold text-white">
        Complete your KYC
      </h1>

      <p className="mt-2 text-white/60">
        Required for deposits, withdrawals and investment activation. Your
        information is reviewed under AML/KYC compliance standards.
      </p>

      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
        {STEPS.map((item, index) => (
          <div key={item.number} className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 rounded-full grid place-items-center text-xs font-semibold ${
                step > item.number
                  ? "bg-emerald-400 text-bg"
                  : step === item.number
                    ? "bg-gradient-to-br from-emerald-400 to-blue-500 text-bg"
                    : "bg-bg-elev border border-line text-white/40"
              }`}
            >
              {step > item.number ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                item.number
              )}
            </div>

            <span
              className={`text-xs ${
                step >= item.number ? "text-white" : "text-white/40"
              }`}
            >
              {item.label}
            </span>

            {index < STEPS.length - 1 && (
              <div
                className={`w-6 h-px ${
                  step > item.number ? "bg-emerald-400" : "bg-line"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-card border border-line rounded-2xl p-7">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-white">
              Personal information
            </h2>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Field
                label="Date of birth"
                type="date"
                value={info.dob}
                onChange={(value: string) =>
                  setInfo({
                    ...info,
                    dob: value,
                  })
                }
              />

              <Field
                label="Nationality"
                placeholder="Germany"
                value={info.nationality}
                onChange={(value: string) =>
                  setInfo({
                    ...info,
                    nationality: value,
                  })
                }
              />

              <Field
                label="Tax ID / National number"
                value={info.taxId}
                onChange={(value: string) =>
                  setInfo({
                    ...info,
                    taxId: value,
                  })
                }
              />

              <Field
                label="Postal code"
                value={info.postal}
                onChange={(value: string) =>
                  setInfo({
                    ...info,
                    postal: value,
                  })
                }
              />

              <Field
                label="Street address"
                value={info.street}
                onChange={(value: string) =>
                  setInfo({
                    ...info,
                    street: value,
                  })
                }
                className="sm:col-span-2"
              />

              <Field
                label="City"
                value={info.city}
                onChange={(value: string) =>
                  setInfo({
                    ...info,
                    city: value,
                  })
                }
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <FileStep
            title="Upload identity document"
            desc="Government-issued photo ID: passport, national ID card or driver's licence. JPG, PNG or PDF accepted."
            icon={FileText}
            file={files.id}
            onChange={upload("id")}
          />
        )}

        {step === 3 && (
          <FileStep
            title="Upload proof of address"
            desc="Utility bill, bank statement or government letter dated within the last 3 months."
            icon={FileText}
            file={files.address}
            onChange={upload("address")}
          />
        )}

        {step === 4 && (
          <FileStep
            title="Selfie verification"
            desc="Take a clear selfie holding your ID next to your face."
            icon={Camera}
            file={files.selfie}
            onChange={upload("selfie")}
          />
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-semibold text-white">
              Review & submit
            </h2>

            <div className="mt-5 space-y-3">
              {[
                ["Full name", `${me.firstName} ${me.lastName}`],
                ["Email", me.email],
                ["Country", me.country],
                ["Date of birth", info.dob || "—"],
                ["Nationality", info.nationality || "—"],
                ["ID document", files.id?.name || "Not uploaded"],
                ["Proof of address", files.address?.name || "Not uploaded"],
                ["Selfie", files.selfie?.name || "Not uploaded"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between text-sm border-b border-line/50 pb-2"
                >
                  <span className="text-white/50">
                    {label}
                  </span>

                  <span className="text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 text-xs px-4 py-3 rounded-md bg-amber-400/5 border border-amber-400/20 text-amber-200/80">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />

              <div>
                By submitting, you confirm that all information provided is true
                and accurate.
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(current => Math.max(1, current - 1))}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-md border border-line text-white/70 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            ← Back
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(current => current + 1)}
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium text-sm"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={submit}
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold text-sm"
            >
              Submit for review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className = "",
}: any) {
  return (
    <div className={className}>
      <label className="text-xs text-white/60">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
      />
    </div>
  );
}

function FileStep({
  title,
  desc,
  icon: Icon,
  file,
  onChange,
}: any) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm text-white/60">
        {desc}
      </p>

      <label className="mt-5 block border-2 border-dashed border-line rounded-xl p-10 text-center cursor-pointer hover:border-emerald-400/40 transition">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={onChange}
          className="hidden"
        />

        <Icon className="w-10 h-10 text-white/30 mx-auto" />

        <div className="mt-4 text-sm text-white">
          {file ? file.name : "Click to upload or drag and drop"}
        </div>

        <div className="text-xs text-white/40 mt-1">
          JPG, PNG, PDF · max 10 MB
        </div>

        {file && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ready to submit
          </div>
        )}
      </label>

      <div className="mt-4 text-xs text-white/40 flex items-start gap-2">
        <Upload className="w-3.5 h-3.5 mt-0.5" />
        Your file is reviewed securely as part of the compliance process.
      </div>
    </div>
  );
        }
