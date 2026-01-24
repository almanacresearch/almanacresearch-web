import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

let sesClient: SESClient | null = null;

function getSESClient(): SESClient | null {
  if (sesClient) return sesClient;

  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_SES_REGION
  ) {
    return null;
  }

  sesClient = new SESClient({
    region: process.env.AWS_SES_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  return sesClient;
}

function welcomeEmailHTML(name: string) {
  const firstName = name.split(" ")[0];
  return `
  <div style="margin:0;padding:40px 20px;background-color:#ffffff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:600px;margin:auto;background-color:#faf8f5;border-radius:16px;padding:40px 30px;border:1px solid #e7e5e4;">

      <!-- Company Name -->
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#78523E;font-size:12px;font-weight:600;letter-spacing:1.5px;margin:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">ALMANAC RESEARCH</h1>
      </div>

      <!-- Heading -->
      <div>
        <h2 style="color:#78523E;font-size:24px;margin-bottom:16px;text-align:center;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-weight:600;">
          Welcome to Almanac Research, ${firstName}!
        </h2>
        <p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          AlmanacAI Mail, our invite-only MVP, goes live on <b>January 27, 2026</b>.
        </p>
        <p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          If you have an invite code, you can download the Chrome extension and try it out right away. If you don't, you can request an invite code <a href="mailto:hello@almanacresearch.com?subject=Request%20for%20Invite%20Code&body=I'd%20like%20to%20try%20AlmanacAI%20Mail." style="color:#78523E;text-decoration:underline;">here</a>.
        </p>
        <p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <a href="https://docs.almanacresearch.com" style="color:#78523E;text-decoration:underline;">This</a> is a great read if you want to know how AlmanacAI shows you exactly what needs your attention.
        </p>
        <p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          Transparency and privacy are non-negotiable for us. If you have questions, concerns, or simply want to talk to the founding team, write to us at <a href="mailto:hello@almanacresearch.com" style="color:#78523E;text-decoration:none;">hello@almanacresearch.com</a>.
        </p>
        <p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:8px;margin-top:32px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          Founders<br>
          Almanac Research
        </p>
      </div>

      <!-- Footer -->
      <hr style="border:none;border-top:1px solid #d6d3d1;margin:40px 0;">
      <div style="text-align:center;margin-bottom:10px;">
        <a href="https://x.com/almanacAIhq" style="display:inline-block;margin:0 10px;" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="#78523E"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/almanacresearch/" style="display:inline-block;margin:0 10px;" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="#78523E"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
        </a>
      </div>
      <p style="font-size:12px;color:#78716c;text-align:center;line-height:1.6;margin:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        © ${new Date().getFullYear()} Almanac Research. All rights reserved.<br>
      </p>
    </div>
  </div>
`;
}

export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<void> {
  const client = getSESClient();
  if (!client) return;

  const fromEmail =
    process.env.AWS_SES_FROM_EMAIL || "hello@almanacresearch.com";

  const command = new SendEmailCommand({
    Source: `Almanac Research <${fromEmail}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Welcome to Almanac Research!",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: welcomeEmailHTML(name),
          Charset: "UTF-8",
        },
      },
    },
  });

  // Send email in background (fire and forget)
  client.send(command).catch(() => {
    // Silently fail - don't block user signup
  });
}
