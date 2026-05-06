import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Award,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

type Option = {
  label: string;
  score: number;
};

type Question = {
  q: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    q: "How would you describe your investment experience?",
    options: [
      {
        label: "I'm completely new to investing",
        score: 1,
      },
      {
        label: "I've held stocks, funds or crypto before",
        score: 2,
      },
      {
        label: "I trade actively and understand markets",
        score: 3,
      },
      {
        label: "I'm a professional or qualified investor",
        score: 4,
      },
    ],
  },
  {
    q: "What is your primary goal for investing in crypto?",
    options: [
      {
        label: "Preserve capital and grow steadily",
        score: 1,
      },
      {
        label: "Outperform a savings account",
        score: 2,
      },
      {
        label: "Build wealth over the medium term",
        score: 3,
      },
      {
        label: "Maximise returns with higher risk tolerance",
        score: 4,
      },
    ],
  },
  {
    q: "How would you react if your portfolio dropped 30% in a month?",
    options: [
      {
        label: "I would withdraw everything immediately",
        score: 1,
      },
      {
        label: "I would feel anxious and reduce my exposure",
        score: 2,
      },
      {
        label: "I would hold and wait",
        score: 3,
      },
      {
        label: "I would see it as a buying opportunity",
        score: 4,
      },
    ],
  },
  {
    q: "What proportion of your liquid wealth are you considering investing?",
    options: [
      {
        label: "Less than 5%",
        score: 1,
      },
      {
        label: "5–15%",
        score: 2,
      },
      {
        label: "15–30%",
        score: 3,
      },
      {
        label: "More than 30%",
        score: 4,
      },
    ],
  },
  {
    q: "How long can you commit your capital without needing to withdraw?",
    options: [
      {
        label: "Less than 30 days",
        score: 1,
      },
      {
        label: "1–3 months",
        score: 2,
      },
      {
        label: "3–12 months",
        score: 3,
      },
      {
        label: "1+ years",
        score: 4,
      },
    ],
  },
  {
    q: "How important is regulation and compliance to your decision?",
    options: [
      {
        label: "Critical — I only invest with structured platforms",
        score: 4,
      },
      {
        label: "Very important",
        score: 3,
      },
      {
        label: "Somewhat important",
        score: 2,
      },
      {
        label: "Not a major factor",
        score: 1,
      },
    ],
  },
];

const PROFILES = [
  {
    min: 0,
    max: 11,
    name: "Conservative",
    icon: Shield,
    color: "emerald",
    badge: "🛡️",
    summary:
      "You prioritise capital preservation and controlled exposure. The Starter plan is the most suitable place to begin.",
    plan: "starter",
    suggested: "Starter plan · 0.8% target daily for 14 days",
  },
  {
    min: 12,
    max: 18,
    name: "Balanced",
    icon: TrendingUp,
    color: "sky",
    badge: "⚖️",
    summary:
      "You are comfortable with moderate volatility for stronger return potential. The Professional plan offers a more advanced allocation profile.",
    plan: "professional",
    suggested: "Professional plan · 1.1% target daily for 21 days",
  },
  {
    min: 19,
    max: 100,
    name: "Aggressive",
    icon: Award,
    color: "amber",
    badge: "🚀",
    summary:
      "You have the experience, capital and risk tolerance for larger allocation strategies. The Institutional plan best matches your responses.",
    plan: "institutional",
    suggested: "Institutional plan · 1.4% target daily for 30 days",
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const total = answers.reduce((a, b) => a + b, 0);
  const profile =
    PROFILES.find(item => total >= item.min && total <= item.max) ||
    PROFILES[1];

  const choose = (score: number) => {
    const next = [...answers, score];

    setAnswers(next);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
    setDone(false);
  };

  if (done) {
    const Icon = profile.icon;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-7xl mb-3">
            {profile.badge}
          </div>

          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Your investor profile
          </div>

          <h1 className="text-4xl font-semibold text-white">
            {profile.name} investor
          </h1>

          <p className="mt-4 text-white/70 max-w-xl mx-auto leading-relaxed">
            {profile.summary}
          </p>
        </div>

        <div className="mt-10 bg-card border border-line rounded-2xl p-8 text-center">
          <Icon className="w-10 h-10 mx-auto text-emerald-400" />

          <div className="mt-4 text-xs uppercase tracking-wider text-white/50">
            Recommended for you
          </div>

          <div className="mt-1 text-2xl font-semibold text-white">
            {profile.suggested}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              to="/plans"
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold inline-flex items-center gap-2"
            >
              View plan details
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-md border border-line text-white hover:bg-white/5"
            >
              Open my account
            </Link>

            <button
              onClick={reset}
              className="px-5 py-2.5 rounded-md border border-line text-white/60 hover:bg-white/5 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/40 leading-relaxed max-w-xl mx-auto">
          This profile is a recommendation based on your responses, not
          personalised investment advice. NordVault Global Capital does not
          provide individual investment advice. All investments carry risk,
          including loss of principal. Please consult a regulated financial
          advisor before investing.
        </div>
      </div>
    );
  }

  const question = QUESTIONS[step];
  const percent = (step / QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
          Risk profile assessment
        </div>

        <h1 className="text-3xl font-semibold text-white">
          Which plan is right for you?
        </h1>

        <p className="mt-3 text-white/60">
          6 questions · about 90 seconds
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-white/50 mb-2">
          <span>
            Question {step + 1} of {QUESTIONS.length}
          </span>

          <span>{Math.round(percent)}%</span>
        </div>

        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all"
            style={{
              width: `${percent}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-card border border-line rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white">
          {question.q}
        </h2>

        <div className="mt-6 space-y-2">
          {question.options.map(option => (
            <button
              key={option.label}
              onClick={() => choose(option.score)}
              className="w-full text-left p-4 rounded-md border border-line bg-bg/40 hover:bg-emerald-400/5 hover:border-emerald-400/40 text-white transition group flex items-center justify-between gap-3"
            >
              <span>{option.label}</span>

              <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1));
            setStep(step - 1);
          }}
          className="mt-5 text-sm text-white/50 hover:text-white"
        >
          ← Previous question
        </button>
      )}
    </div>
  );
      }
