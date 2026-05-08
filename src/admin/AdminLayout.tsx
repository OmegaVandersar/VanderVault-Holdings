import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Bell,
  Eye,
  FileText,
} from "lucide-react";

import { store } from "../data/store";
import Logo from "../components/Logo";
import AdminSoundAlerts from "../components/AdminSoundAlerts";

const links = [
  {
    to: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/visitors",
    label: "Visitors",
    icon: Eye,
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    to: "/admin/withdrawals",
    label: "Withdrawals",
    icon: ArrowUpFromLine,
  },
  {
    to: "/admin/deposits",
    label: "Deposits",
    icon: ArrowDownToLine,
  },
  {
    to: "/admin/investments",
    label: "Investments",
    icon: TrendingUp,
  },
  {
    to: "/admin/messages",
    label: "Messages",
    icon: Mail,
  },
  {
    to: "/admin/audit",
    label: "Audit Log",
    icon: FileText,
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const tick = () => {
      setUnread(store.getMsgs().filter(message => !message.read).length);

      setPendingWithdrawals(
        store
          .getTxns()
          .filter(
            transaction =>
              transaction.type === "withdrawal" &&
              transaction.status === "pending"
          ).length
      );
    };

    tick();

    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!store.isAdmin()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    store.logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg flex">
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-bg-elev border-r border-line flex flex-col transition-transform`}
      >
        <div className="p-5 border-b border-line flex items-center justify-between">
          <Logo />
          
        <AdminSoundAlerts />

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/60"
          >
            <X className="w-5 h-5" />
          </button
