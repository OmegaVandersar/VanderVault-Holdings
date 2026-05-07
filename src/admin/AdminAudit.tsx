import {
  Download,
  FileText,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { audit } from "../data/audit";

export default function AdminAudit() {
  const [, force] = useState(0);
  const events = audit.all();

  const exportCSV = () => {
    const rows = [
      ["Time", "Actor", "Action", "Target", "Details"],
      ...events.map(event => [
        event.ts,
        event.actor,
        event.action,
        event.target || "",
        event.details || "",
      ]),
    ];

    const csv = rows
      .map(row =>
        row
          .map(value => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "nordvault-audit-log.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Audit log
          </h1>

          <p className="text-sm text-white/50 mt-1">
            Administrator actions, treasury approvals and compliance changes.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => force(value => value + 1)}
            className="px-3 py-2 rounded-md border border-line text-white/70 text-sm inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            className="px-3 py-2 rounded-md border border-line text-white/70 text-sm inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>

          <button
            onClick={audit.exportPdf}
            className="px-3 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold inline-flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-card border border-line rounded-xl">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
              <th className="text-left py-3.5 px-5">Time</th>
              <th className="text-left py-3.5 px-5">Actor</th>
              <th className="text-left py-3.5 px-5">Action</th>
              <th className="text-left py-3.5 px-5">Target</th>
              <th className="text-left py-3.5 px-5">Details</th>
            </tr>
          </thead>

          <tbody>
            {events.map(event => (
              <tr
                key={event.id}
                className="border-b border-line/50 last:border-0"
              >
                <td className="py-3 px-5 text-white/60 text-xs">
                  {new Date(event.ts).toLocaleString("en-GB")}
                </td>

                <td className="py-3 px-5 text-white">
                  {event.actor}
                </td>

                <td className="py-3 px-5 text-emerald-300">
                  {event.action}
                </td>

                <td className="py-3 px-5 text-white/70">
                  {event.target || "—"}
                </td>

                <td className="py-3 px-5 text-white/50 text-xs">
                  {event.details || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="p-12 text-center text-white/40 text-sm">
            No audit events yet.
          </div>
        )}
      </div>

      <button
        onClick={() => {
          if (confirm("Clear audit log?")) {
            audit.clear();
            force(value => value + 1);
          }
        }}
        className="mt-4 text-xs text-rose-400 inline-flex items-center gap-1"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Clear log
      </button>
    </div>
  );
          }
