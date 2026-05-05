import { Link } from "react-router-dom";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        src="/images/logo.svg"
        alt="NordVault Global Capital"
        className="w-9 h-9 object-contain"
      />

      {!compact && (
        <div className="leading-tight">
          <div className="font-semibold tracking-tight text-white">
            NordVault
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 -mt-0.5">
            Global Capital
          </div>
        </div>
      )}
    </Link>
  );
}
