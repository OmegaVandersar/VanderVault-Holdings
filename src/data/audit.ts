import jsPDF from "jspdf";
import { CONFIG } from "../config";

export type AuditEvent = {
  id: string;
  ts: string;
  actor: string;
  action: string;
  target?: string;
  details?: string;
};

const KEY = "nv_audit_events";

export const audit = {
  all: (): AuditEvent[] => JSON.parse(localStorage.getItem(KEY) || "[]"),

  log: (event: Omit<AuditEvent, "id" | "ts">) => {
    const item: AuditEvent = {
      id: `a${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
      ts: new Date().toISOString(),
      ...event,
    };

    localStorage.setItem(KEY, JSON.stringify([item, ...audit.all()].slice(0, 1000)));
  },

  clear: () => localStorage.removeItem(KEY),

  exportPdf: () => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    doc.setFillColor(15, 20, 36);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${CONFIG.brand.name} Audit Log`, 15, 15);

    doc.setTextColor(100, 100, 110);
    doc.setFontSize(8);
    doc.text(`Generated ${new Date().toLocaleString("en-GB")}`, 15, 31);

    let y = 42;

    doc.setFontSize(8);
    doc.setTextColor(90, 90, 100);
    doc.setFont("helvetica", "bold");

    doc.text("TIME", 15, y);
    doc.text("ACTOR", 55, y);
    doc.text("ACTION", 92, y);
    doc.text("TARGET / DETAILS", 130, y);

    y += 5;

    doc.setFont("helvetica", "normal");

    audit.all().forEach(event => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.setTextColor(30, 30, 35);
      doc.text(new Date(event.ts).toLocaleString("en-GB"), 15, y);
      doc.text(event.actor.slice(0, 18), 55, y);
      doc.text(event.action.slice(0, 18), 92, y);
      doc.text(`${event.target || ""} ${event.details || ""}`.slice(0, 42), 130, y);

      y += 5;
    });

    doc.save(`${CONFIG.brand.short}-Audit-Log-${new Date().toISOString().slice(0, 10)}.pdf`);
  },
};
