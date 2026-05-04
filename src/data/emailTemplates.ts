import { CONFIG } from "../config";

const SHELL = (title: string, body: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#06080d;font-family:Inter,Arial,sans-serif;color:#e6eaf2;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#06080d;padding:40px 16px">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#120f08;border:1px solid #2b2414;border-radius:16px;overflow:hidden">
            <tr>
              <td style="padding:28px 32px 0;text-align:left">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:linear-gradient(135deg,#fff4bd,#f5c542,#a87509);width:36px;height:36px;border-radius:8px;text-align:center;color:#06080d;font-weight:700;font-size:20px;line-height:36px">N</td>
                    <td style="padding-left:10px;color:#fff;font-weight:600;font-size:16px">
                      NordVault <span style="color:rgba(255,255,255,0.4);font-weight:400;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">Global Capital</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 32px">
                ${body}
              </td>
            </tr>

            <tr>
              <td style="background:#06080d;padding:20px 32px;border-top:1px solid #2b2414;color:rgba(255,255,255,0.4);font-size:11px;line-height:1.6">
                ${CONFIG.brand.legalName} · ${CONFIG.contact.address}<br>
                ${CONFIG.contact.email} · ${CONFIG.contact.phone}<br>
                <span style="color:rgba(255,255,255,0.3)">
                  Digital asset investments involve risk. Target yields are not guaranteed. Capital at risk.
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const BUTTON = (label: string, url: string) =>
  `<table cellpadding="0" cellspacing="0" style="margin:24px 0">
    <tr>
      <td style="background:linear-gradient(90deg,#fff4bd,#f5c542,#a87509);border-radius:8px">
        <a href="${url}" style="display:inline-block;padding:13px 26px;color:#06080d;font-weight:700;text-decoration:none;font-size:14px">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;

export const EMAILS = {
  welcome: {
    subject: (name: string) => `Welcome to ${CONFIG.brand.name}, ${name}`,
    html: (params: { firstName: string; loginUrl: string }) =>
      SHELL(
        "Welcome",
        `
        <h1 style="color:#fff;font-size:24px;margin:0 0 12px">Welcome aboard, ${params.firstName}.</h1>
        <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;margin:0 0 8px">
          Your ${CONFIG.brand.name} account is ready. Here's what to do next:
        </p>

        <ol style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.8;padding-left:18px;margin:16px 0">
          <li><strong style="color:#fff">Verify your email</strong> to activate account communications.</li>
          <li><strong style="color:#fff">Complete KYC</strong> for identity verification and compliance review.</li>
          <li><strong style="color:#fff">Enable 2FA</strong> before deposits and withdrawals.</li>
          <li><strong style="color:#fff">Fund your account</strong> using BTC, ETH, USDT, USDC, BNB, SOL or SEPA EUR.</li>
          <li><strong style="color:#fff">Choose an investment plan</strong> that matches your risk profile.</li>
        </ol>

        ${BUTTON("Open my dashboard", params.loginUrl)}

        <p style="color:rgba(255,255,255,0.5);font-size:12px;line-height:1.6;margin:0">
          Need help? Contact ${CONFIG.contact.email}.
        </p>
        `
      ),
  },

  kycApproved: {
    subject: () => "Your identity has been verified",
    html: (params: { firstName: string; depositUrl: string }) =>
      SHELL(
        "KYC Approved",
        `
        <div style="display:inline-block;background:rgba(245,197,66,0.15);color:#f5c542;padding:6px 12px;border-radius:6px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:16px">
          Verification complete
        </div>

        <h1 style="color:#fff;font-size:24px;margin:0 0 12px">You're fully verified, ${params.firstName}.</h1>

        <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;margin:0 0 16px">
          Our compliance team has approved your KYC documents. Your account now has access to deposit, investment and withdrawal workflows.
        </p>

        <table cellpadding="0" cellspacing="0" style="background:#06080d;border:1px solid #2b2414;border-radius:8px;padding:16px;margin:20px 0">
          <tr>
            <td>
              <div style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">
                Account access unlocked
              </div>

              <div style="color:#fff;font-size:14px;line-height:1.8">
                ✓ Cryptocurrency and SEPA deposits<br>
                ✓ Investment plan activation<br>
                ✓ Wallet screening<br>
                ✓ Withdrawal request workflow<br>
                ✓ Investor dashboard analytics
              </div>
            </td>
          </tr>
        </table>

        ${BUTTON("Make my first deposit", params.depositUrl)}
        `
      ),
  },

  depositConfirmed: {
    subject: (asset: string) => `Deposit received — ${asset}`,
    html: (params: {
      firstName: string;
      amount: string;
      asset: string;
      txHash: string;
      dashboardUrl: string;
    }) =>
      SHELL(
        "Deposit Confirmed",
        `
        <h1 style="color:#fff;font-size:22px;margin:0 0 12px">Deposit confirmed, ${params.firstName}.</h1>

        <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">
          Your deposit has been credited to your NordVault account.
        </p>

        <table cellpadding="0" cellspacing="0" style="background:#06080d;border:1px solid #2b2414;border-radius:8px;width:100%;margin:20px 0">
          <tr>
            <td style="padding:14px 16px;border-bottom:1px solid #2b2414">
              <span style="color:rgba(255,255,255,0.5);font-size:12px">Amount</span><br>
              <strong style="color:#f5c542;font-size:18px">+${params.amount} ${params.asset}</strong>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;border-bottom:1px solid #2b2414">
              <span style="color:rgba(255,255,255,0.5);font-size:12px">Transaction</span><br>
              <span style="color:#fff;font-family:monospace;font-size:11px;word-break:break-all">${params.txHash}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px">
              <span style="color:rgba(255,255,255,0.5);font-size:12px">Status</span><br>
              <strong style="color:#f5c542">Credited and available</strong>
            </td>
          </tr>
        </table>

        ${BUTTON("View dashboard", params.dashboardUrl)}
        `
      ),
  },

  withdrawalApproved: {
    subject: () => "Withdrawal approved — funds on the way",
    html: (params: {
      firstName: string;
      amount: string;
      asset: string;
      address: string;
      txHash: string;
    }) =>
      SHELL(
        "Withdrawal Approved",
        `
        <h1 style="color:#fff;font-size:22px;margin:0 0 12px">
          Your withdrawal is approved, ${params.firstName}.
        </h1>

        <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">
          Your withdrawal has passed review and has been broadcast to the network.
        </p>

        <table cellpadding="0" cellspacing="0" style="background:#06080d;border:1px solid #2b2414;border-radius:8px;width:100%;margin:20px 0">
          <tr>
            <td style="padding:14px 16px;border-bottom:1px solid #2b2414">
              <span style="color:rgba(255,255,255,0.5);font-size:12px">Amount</span><br>
              <strong style="color:#fff;font-size:18px">${params.amount} ${params.asset}</strong>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px;border-bottom:1px solid #2b2414">
              <span style="color:rgba(255,255,255,0.5);font-size:12px">To address</span><br>
              <span style="color:#fff;font-family:monospace;font-size:11px;word-break:break-all">${params.address}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 16px">
              <span style="color:rgba(255,255,255,0.5);font-size:12px">Transaction hash</span><br>
              <span style="color:#f5c542;font-family:monospace;font-size:11px;word-break:break-all">${params.txHash}</span>
            </td>
          </tr>
        </table>

        <p style="color:rgba(255,255,255,0.5);font-size:12px;line-height:1.6">
          If you did not request this withdrawal, contact ${CONFIG.contact.email} immediately.
        </p>
        `
      ),
  },

  passwordReset: {
    subject: () => "Reset your NordVault password",
    html: (params: { firstName: string; resetUrl: string }) =>
      SHELL(
        "Password Reset",
        `
        <h1 style="color:#fff;font-size:22px;margin:0 0 12px">
          Reset your password, ${params.firstName}.
        </h1>

        <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6">
          We received a request to reset your password. This link is valid for 30 minutes.
        </p>

        ${BUTTON("Reset password", params.resetUrl)}

        <p style="color:rgba(255,255,255,0.5);font-size:12px;line-height:1.6">
          If you did not request this, you can safely ignore this email.
        </p>
        `
      ),
  },
};
