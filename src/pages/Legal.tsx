import { Navigate, useParams } from "react-router-dom";

const DOCS: Record<
  string,
  {
    title: string;
    sections: {
      h: string;
      b: string;
    }[];
  }
> = {
  terms: {
    title: "Terms of Service",
    sections: [
      {
        h: "1. Acceptance of terms",
        b: "By accessing or using the NordVault Global Capital platform, you agree to be bound by these Terms of Service. If you do not agree to all terms, please do not use the platform. These terms are governed by English law, German regulatory obligations applicable to the Frankfurt EU office, and the laws of the European Union where applicable.",
      },
      {
        h: "2. Eligibility",
        b: "You must be at least 18 years old and resident in a jurisdiction where digital asset services are permitted. You must complete KYC verification and may not use the platform if you are subject to sanctions or located in a restricted jurisdiction.",
      },
      {
        h: "3. Account responsibilities",
        b: "You are responsible for safeguarding your login credentials, two-factor authentication device, backup codes and wallet addresses. NordVault will never ask for your password.",
      },
      {
        h: "4. Investment products",
        b: "Investment plan yields are target rates only and are not guaranteed. The value of digital assets may rise or fall, and investors may lose some or all of their capital.",
      },
      {
        h: "5. Fees",
        b: "NordVault may display no platform deposit, management or performance fees. Network fees may apply to blockchain withdrawals and are paid to the relevant blockchain network.",
      },
      {
        h: "6. Limitation of liability",
        b: "To the maximum extent permitted by law, NordVault Global Capital Ltd and its affiliates shall not be liable for indirect, incidental or consequential damages arising from use of the platform.",
      },
      {
        h: "7. Suspension and termination",
        b: "We may suspend or terminate accounts that violate these terms, applicable law, AML controls, security rules or platform integrity requirements.",
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        h: "1. Data controller",
        b: "NordVault Global Capital Ltd, 30 St Mary Axe, London EC3A 8BF, United Kingdom is the primary data controller. The EU regulatory office is maintained at Mainzer Landstrasse 50, 60325 Frankfurt am Main, Germany. Our Data Protection Officer can be reached at dpo@nordvaultglobal.com.",
      },
      {
        h: "2. Data we collect",
        b: "We collect identity data, contact data, KYC documents, wallet addresses, transaction data, login history, device data, visitor analytics and support messages.",
      },
      {
        h: "3. Legal basis",
        b: "Processing is based on contract performance, legal obligations, legitimate interests in fraud prevention and security, and consent where required.",
      },
      {
        h: "4. Data residency",
        b: "Personal data is stored using secure infrastructure in approved regions. Data may be processed in the UK, EU or other jurisdictions with appropriate safeguards.",
      },
      {
        h: "5. Retention",
        b: "KYC and transaction records may be retained for the period required under applicable AML and financial record-keeping laws.",
      },
      {
        h: "6. Your rights",
        b: "You may request access, correction, deletion, restriction, portability or objection to processing where applicable. Contact dpo@nordvaultglobal.com.",
      },
    ],
  },

  aml: {
    title: "AML & KYC Policy",
    sections: [
      {
        h: "Commitment",
        b: "NordVault Global Capital is committed to strong anti-money laundering and counter-terrorist financing controls aligned with FATF recommendations, UK AML expectations, EU AMLD5/AMLD6, MiCA, German GwG and BaFin guidance.",
      },
      {
        h: "Customer Due Diligence",
        b: "All investors are required to complete identity verification, proof of address review and wallet screening before withdrawals are approved.",
      },
      {
        h: "Enhanced Due Diligence",
        b: "High-risk jurisdictions, politically exposed persons, large deposits and unusual transaction patterns may trigger enhanced review.",
      },
      {
        h: "Transaction monitoring",
        b: "On-chain and off-chain activity may be screened for sanctions exposure, suspicious patterns, high-risk wallets and unusual account behaviour.",
      },
      {
        h: "Sanctions screening",
        b: "Clients and counterparties may be screened against relevant sanctions lists and restricted jurisdiction rules.",
      },
    ],
  },

  risk: {
    title: "Risk Disclosure",
    sections: [
      {
        h: "Market risk",
        b: "Digital assets are highly volatile. Prices may rise or fall rapidly and investors may lose some or all of their capital.",
      },
      {
        h: "No guarantee of returns",
        b: "Target daily yields shown on investment plans are not guaranteed. Past performance is not a reliable indicator of future results.",
      },
      {
        h: "Liquidity risk",
        b: "Some assets or strategies may experience reduced liquidity, delays or wider spreads during stressed market conditions.",
      },
      {
        h: "Regulatory risk",
        b: "Digital asset regulation continues to evolve. Regulatory changes may affect operations, products, investor access or asset availability.",
      },
      {
        h: "Technology risk",
        b: "Blockchain networks, smart contracts, custody systems and infrastructure may experience outages, exploits or unexpected failures.",
      },
      {
        h: "Investor responsibility",
        b: "You should only invest capital you can afford to risk and should seek independent financial, legal and tax advice before investing.",
      },
    ],
  },

  cookies: {
    title: "Cookie Policy",
    sections: [
      {
        h: "What are cookies?",
        b: "Cookies are small files stored on your device that help operate the website, maintain security and remember preferences.",
      },
      {
        h: "Cookie categories",
        b: "We use strictly necessary cookies, analytics cookies and preference cookies. Necessary cookies support login, fraud prevention and platform security.",
      },
      {
        h: "Analytics",
        b: "Analytics help us understand how visitors use the website so that we can improve investor experience and platform performance.",
      },
      {
        h: "Manage preferences",
        b: "You may accept, reject or customise cookie preferences through the consent banner where available.",
      },
    ],
  },
};

export default function Legal() {
  const { slug } = useParams();
  const doc = slug ? DOCS[slug] : null;

  if (!doc) return <Navigate to="/" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
        Legal
      </div>

      <h1 className="text-4xl font-semibold text-white tracking-tight">
        {doc.title}
      </h1>

      <p className="mt-2 text-sm text-white/50">
        Last updated: 15 January 2026
      </p>

      <div className="mt-10 space-y-8">
        {doc.sections.map(section => (
          <div key={section.h}>
            <h2 className="text-lg font-semibold text-white">
              {section.h}
            </h2>

            <p className="mt-2 text-white/70 leading-relaxed text-[15px]">
              {section.b}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  }
