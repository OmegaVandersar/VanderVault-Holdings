import jsPDF from "jspdf";
import { CONFIG } from "../config";

const COLORS = {
  text: "#1a1a1a",
  muted: "#6b7280",
  line: "#e5e7eb",
  gold: "#f5c542",
  black: "#06080d",
};

function header(doc: jsPDF) {
  doc.setFillColor(15, 20, 36);
  doc.rect(0, 0, 210, 28, "F");

  doc.setFillColor(245, 197, 66);
  doc.roundedRect(15, 8, 12, 12, 2, 2, "F");

  doc.setTextColor(6, 8, 13);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("N", 18.5, 16.5);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.text(CONFIG.brand.name, 32, 14);

  doc.setFontSize(8);
  doc.setTextColor(190, 190, 190);
  doc.setFont("helvetica", "normal");
  doc.text(CONFIG.brand.legalName.toUpperCase(), 32, 19);

  doc.setTextColor(180, 180, 190);
  doc.setFontSize(8);
  doc.text(CONFIG.contact.email, 195, 14, { align: "right" });
  doc.text(CONFIG.contact.phone, 195, 19, { align: "right" });
}

function footer(doc: jsPDF) {
  const height = doc.internal.pageSize.height;

  doc.setDrawColor(229, 231, 235);
  doc.line(15, height - 22, 195, height - 22);

  doc.setFontSize(7);
  doc.setTextColor(120, 120, 130);
  doc.setFont("helvetica", "normal");

  const lines = [
    `${CONFIG.brand.legalName} · ${CONFIG.offices.globalHeadquarters}`,
    `EU Office: ${CONFIG.offices.euRegulatoryOffice}`,
    `This document is generated automatically and is valid without signature. Digital asset investments involve risk.`,
  ];

  lines.forEach((line, index) =>
    doc.text(line, 105, height - 16 + index * 3.5, { align: "center" })
  );
}

export type StatementData = {
  client: {
    name: string;
    email: string;
    country: string;
    accountId: string;
  };
  period: {
    from: string;
    to: string;
  };
  balance: {
    opening: number;
    closing: number;
  };
  deposits: number;
  withdrawals: number;
  profits: number;
  referrals: number;
  transactions: {
    date: string;
    type: string;
    asset: string;
    amount: number;
    status: string;
  }[];
};

export function generateStatement(data: StatementData) {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  header(doc);

  doc.setTextColor(COLORS.text);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Account Statement", 15, 42);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLORS.muted);
  doc.text(`Period: ${data.period.from} to ${data.period.to}`, 15, 47);
  doc.text(`Generated: ${new Date().toLocaleString("en-GB")}`, 15, 51);

  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(247, 248, 250);
  doc.roundedRect(15, 58, 180, 22, 2, 2, "FD");

  doc.setFontSize(8);
  doc.setTextColor(COLORS.muted);
  doc.text("CLIENT", 19, 64);
  doc.text("ACCOUNT ID", 110, 64);

  doc.setFontSize(11);
  doc.setTextColor(COLORS.text);
  doc.setFont("helvetica", "bold");
  doc.text(data.client.name, 19, 71);
  doc.text(data.client.accountId, 110, 71);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`${data.client.email} · ${data.client.country}`, 19, 76);

  let y = 92;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLORS.text);
  doc.text("Summary", 15, y);

  y += 4;

  doc.setDrawColor(229, 231, 235);
  doc.line(15, y, 195, y);

  y += 6;

  const rows: [string, string][] = [
    [
      "Opening balance",
      `€${data.balance.opening.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
    ],
    [
      "Total deposits",
      `+€${data.deposits.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
    ],
    [
      "Investment profits",
      `+€${data.profits.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
    ],
    [
      "Referral earnings",
      `+€${data.referrals.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
    ],
    [
      "Withdrawals",
      `-€${data.withdrawals.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
    ],
  ];

  doc.setFontSize(10);

  rows.forEach(([label, value]) => {
    doc.setTextColor(COLORS.muted);
    doc.setFont("helvetica", "normal");
    doc.text(label, 19, y);

    doc.setTextColor(COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.text(value, 191, y, { align: "right" });

    y += 6;
  });

  y += 2;

  doc.line(15, y, 195, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLORS.text);
  doc.setFontSize(12);
  doc.text("Closing balance", 19, y);

  doc.setTextColor(245, 197, 66);
  doc.setFontSize(13);
  doc.text(
    `€${data.balance.closing.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`,
    191,
    y,
    { align: "right" }
  );

  y += 14;

  doc.setFontSize(11);
  doc.setTextColor(COLORS.text);
  doc.text("Transactions", 15, y);

  y += 4;

  doc.line(15, y, 195, y);

  y += 6;

  doc.setFontSize(8);
  doc.setTextColor(COLORS.muted);
  doc.setFont("helvetica", "bold");

  doc.text("DATE", 19, y);
  doc.text("TYPE", 50, y);
  doc.text("ASSET", 90, y);
  doc.text("AMOUNT", 191, y, { align: "right" });

  y += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  data.transactions.forEach(transaction => {
    if (y > 260) {
      footer(doc);
      doc.addPage();
      header(doc);
      y = 42;
    }

    doc.setTextColor(COLORS.text);
    doc.text(transaction.date, 19, y);
    doc.text(transaction.type, 50, y);
    doc.text(transaction.asset, 90, y);

    const sign = transaction.type.toLowerCase().includes("withdraw")
      ? "-"
      : "+";

    doc.setTextColor(sign === "+" ? "#f5c542" : "#ef4444");
    doc.setFont("helvetica", "bold");

    doc.text(
      `${sign}€${transaction.amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
      191,
      y,
      { align: "right" }
    );

    doc.setFont("helvetica", "normal");

    y += 5;
  });

  footer(doc);

  doc.save(`NordVault-Statement-${data.client.accountId}-${data.period.to}.pdf`);
}

export type ReceiptData = {
  type: "Deposit" | "Withdrawal" | "Investment";
  client: {
    name: string;
    email: string;
    accountId: string;
  };
  amount: number;
  currency: string;
  asset: string;
  txHash?: string;
  address?: string;
  date: string;
  reference: string;
};

export function generateReceipt(data: ReceiptData) {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  header(doc);

  doc.setTextColor(COLORS.text);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.type} Receipt`, 15, 42);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLORS.muted);
  doc.text(`Reference: ${data.reference}`, 15, 47);
  doc.text(`Date: ${data.date}`, 15, 51);

  doc.setFillColor(245, 197, 66);
  doc.roundedRect(15, 60, 180, 32, 3, 3, "F");

  doc.setTextColor(6, 8, 13);
  doc.setFontSize(9);
  doc.text(data.type.toUpperCase(), 22, 70);

  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(
    `${data.currency}${data.amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`,
    22,
    84
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(data.asset, 188, 84, { align: "right" });

  let y = 105;

  const details: [string, string][] = [
    ["Client", data.client.name],
    ["Email", data.client.email],
    ["Account", data.client.accountId],
    ...(data.address ? [["Wallet address", data.address] as [string, string]] : []),
    ...(data.txHash ? [["Transaction hash", data.txHash] as [string, string]] : []),
    ["Status", "Confirmed"],
  ];

  details.forEach(([label, value]) => {
    doc.setFontSize(8);
    doc.setTextColor(COLORS.muted);
    doc.text(label.toUpperCase(), 15, y);

    doc.setFontSize(11);
    doc.setTextColor(COLORS.text);

    const wrapped = doc.splitTextToSize(value, 180);
    doc.text(wrapped, 15, y + 5);

    y += 5 + wrapped.length * 5 + 4;

    doc.setDrawColor(229, 231, 235);
    doc.line(15, y - 2, 195, y - 2);

    y += 4;
  });

  footer(doc);

  doc.save(`NordVault-${data.type}-${data.reference}.pdf`);
}

export function generateCompanyCertificate() {
  const regulatory = CONFIG.regulatory;

  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  doc.setFillColor(6, 8, 13);
  doc.rect(0, 0, 210, 297, "F");

  doc.setDrawColor(245, 197, 66);
  doc.setLineWidth(0.7);
  doc.roundedRect(12, 12, 186, 273, 4, 4, "S");

  doc.setLineWidth(0.2);
  doc.setDrawColor(180, 140, 11);
  doc.roundedRect(17, 17, 176, 263, 3, 3, "S");

  doc.setFillColor(245, 197, 66);
  doc.circle(105, 45, 18, "F");

  doc.setTextColor(6, 8, 13);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("N", 105, 50, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(23);
  doc.text("Company Verification Certificate", 105, 78, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(160, 170, 190);
  doc.setFontSize(10);
  doc.text(`Issued by the ${CONFIG.brand.short} Compliance Office`, 105, 86, {
    align: "center",
  });
  doc.text(`Certificate ID: ${regulatory.certificateId}`, 105, 92, {
    align: "center",
  });

  doc.setDrawColor(43, 36, 20);
  doc.line(32, 104, 178, 104);

  let y = 118;

  const rows: [string, string][] = [
    ["Legal entity", CONFIG.brand.legalName],
    ["Global headquarters", CONFIG.offices.globalHeadquarters],
    ["EU regulatory office", CONFIG.offices.euRegulatoryOffice],
    ["Registry court", regulatory.registryCourt],
    ["Commercial register", regulatory.commercialRegister],
    ["Regulatory authority", regulatory.regulator],
    ["Regulatory reference", regulatory.regulatorId],
    ["Founded", regulatory.foundedDate],
    ["German office established", regulatory.germanOfficeEstablished],
    ["Issued", regulatory.certificateIssued],
  ];

  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(245, 197, 66);
    doc.text(label.toUpperCase(), 32, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);

    const lines = doc.splitTextToSize(value, 118);
    doc.text(lines, 78, y);

    y += Math.max(8, lines.length * 5 + 3);
  });

  y += 4;

  doc.setDrawColor(43, 36, 20);
  doc.line(32, y, 178, y);

  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Supervisory framework", 32, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(220, 210, 180);

  regulatory.supervisoryFramework.forEach(item => {
    doc.text(`- ${item}`, 36, y);
    y += 5;
  });

  y += 6;

  doc.setFillColor(15, 20, 36);
  doc.roundedRect(32, y, 146, 28, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(245, 197, 66);
  doc.setFontSize(8);
  doc.text("INVESTOR VERIFICATION", 38, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(220, 210, 180);
  doc.setFontSize(8);
  doc.text(
    "Investors should verify official registry references directly with the relevant public registers before transferring funds.",
    38,
    y + 16,
    {
      maxWidth: 132,
    }
  );

  doc.setTextColor(115, 125, 145);
  doc.setFontSize(7);
  doc.text(
    `${CONFIG.brand.legalName} - ${CONFIG.contact.email} - ${CONFIG.contact.phone}`,
    105,
    275,
    {
      align: "center",
    }
  );

  doc.save(`${CONFIG.brand.short}-Company-Verification-${regulatory.certificateId}.pdf`);
}
