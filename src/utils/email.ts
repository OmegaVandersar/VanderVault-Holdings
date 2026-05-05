import { CONFIG } from "../config";
import { EMAILS } from "../data/emailTemplates";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({
  to,
  subject,
  html,
}: SendArgs): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!CONFIG.resendApiKey) {
    console.info(
      "[email] Resend is not configured yet. Add CONFIG.resendApiKey to enable email sending."
    );

    return {
      ok: false,
      error: "Resend API key is not set",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${CONFIG.brand.name} <${CONFIG.resendFromEmail}>`,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      return {
        ok: false,
        error,
      };
    }

    return {
      ok: true,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
}

export const emailWelcome = (
  to: string,
  firstName: string,
  loginUrl: string
) =>
  sendEmail({
    to,
    subject: EMAILS.welcome.subject(firstName),
    html: EMAILS.welcome.html({
      firstName,
      loginUrl,
    }),
  });

export const emailKycApproved = (
  to: string,
  firstName: string,
  depositUrl: string
) =>
  sendEmail({
    to,
    subject: EMAILS.kycApproved.subject(),
    html: EMAILS.kycApproved.html({
      firstName,
      depositUrl,
    }),
  });

export const emailDepositConfirmed = (
  to: string,
  args: {
    firstName: string;
    amount: string;
    asset: string;
    txHash: string;
    dashboardUrl: string;
  }
) =>
  sendEmail({
    to,
    subject: EMAILS.depositConfirmed.subject(args.asset),
    html: EMAILS.depositConfirmed.html(args),
  });

export const emailWithdrawalApproved = (
  to: string,
  args: {
    firstName: string;
    amount: string;
    asset: string;
    address: string;
    txHash: string;
  }
) =>
  sendEmail({
    to,
    subject: EMAILS.withdrawalApproved.subject(),
    html: EMAILS.withdrawalApproved.html(args),
  });
