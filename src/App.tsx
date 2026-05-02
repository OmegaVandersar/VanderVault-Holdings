import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Plans from "./pages/Plans";
import Markets from "./pages/Markets";
import Security from "./pages/Security";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import { Login, Register } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Legal from "./pages/Legal";
import Affiliate from "./pages/Affiliate";
import Academy from "./pages/Academy";
import News from "./pages/News";
import Deposit from "./pages/Deposit";
import KYC from "./pages/KYC";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import {
  AdminOverview,
  AdminUsers,
  AdminWithdrawals,
  AdminDeposits,
  AdminInvestments,
  AdminMessages,
  AdminSettings,
} from "./admin/AdminPages";
import AdminVisitors from "./admin/AdminVisitors";
import AdminAudit from "./admin/AdminAudit";
import Press from "./pages/Press";
import Help from "./pages/Help";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Regulation from "./pages/Regulation";
import Withdraw from "./pages/Withdraw";
import Invest from "./pages/Invest";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ApiDocs from "./pages/ApiDocs";
import Status from "./pages/Status";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/security" element={<Security />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/affiliate" element={<Affiliate />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/news" element={<News />} />
        <Route path="/press" element={<Press />} />
        <Route path="/regulation" element={<Regulation />} />
        <Route path="/help" element={<Help />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/api" element={<ApiDocs />} />
        <Route path="/status" element={<Status />} />
        <Route path="/legal/:slug" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="visitors" element={<AdminVisitors />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="withdrawals" element={<AdminWithdrawals />} />
        <Route path="deposits" element={<AdminDeposits />} />
        <Route path="investments" element={<AdminInvestments />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="audit" element={<AdminAudit />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
