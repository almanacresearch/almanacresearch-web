import * as postmark from "postmark";

let postmarkClient: postmark.ServerClient | null = null;

function getPostmarkClient(): postmark.ServerClient | null {
  if (postmarkClient) return postmarkClient;

  const serverToken = process.env.POSTMARK_SERVER_TOKEN;
  if (!serverToken) {
    return null;
  }

  postmarkClient = new postmark.ServerClient(serverToken);
  return postmarkClient;
}

export function getFirstName(name: string): string {
  return name.split(" ")[0];
}

export interface EmailContent {
  heading: string;
  body: string;
  signOff: string;
}

export function baseEmailTemplate(content: EmailContent): string {
  return `
  <div style="margin:0;padding:40px 20px;background-color:#ffffff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:600px;margin:auto;background-color:#faf8f5;border-radius:16px;padding:40px 30px;border:1px solid #e7e5e4;">

      <!-- Company Name -->
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#78523E;font-size:12px;font-weight:600;letter-spacing:1.5px;margin:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">ALMANAC RESEARCH</h1>
      </div>

      <!-- Content -->
      <div>
        <h2 style="color:#78523E;font-size:24px;margin-bottom:16px;text-align:center;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-weight:600;">
          ${content.heading}
        </h2>
        ${content.body}
        <p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:8px;margin-top:32px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          ${content.signOff}
        </p>
      </div>

      <!-- Footer -->
      <hr style="border:none;border-top:1px solid #d6d3d1;margin:40px 0;">
      <div style="text-align:center;margin-bottom:10px;">
        <a href="https://x.com/almanacAIhq" style="display:inline-block;margin:0 10px;" target="_blank">
          <img src="https://www.almanacresearch.com/images/logo/x.png" alt="X" width="20" height="20" style="display:block;" />
        </a>
        <a href="https://www.linkedin.com/company/almanacresearch/" style="display:inline-block;margin:0 10px;" target="_blank">
          <img src="https://www.almanacresearch.com/images/logo/in.png" alt="LinkedIn" width="20" height="20" style="display:block;" />
        </a>
      </div>
      <p style="font-size:12px;color:#78716c;text-align:center;line-height:1.6;margin:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        © ${new Date().getFullYear()} Almanac Research. All rights reserved.<br>
      </p>
    </div>
  </div>
`;
}

// Helper to create paragraph 
export function emailParagraph(text: string): string {
  return `<p style="color:#57534e;font-size:15px;line-height:1.7;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${text}</p>`;
}

// Helper to create a link
export function emailLink(href: string, text: string, underline = true): string {
  return `<a href="${href}" style="color:#78523E;text-decoration:${underline ? "underline" : "none"};">${text}</a>`;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export function sendEmail(options: SendEmailOptions): void {
  const client = getPostmarkClient();
  if (!client) return;

  const fromEmail =
    process.env.POSTMARK_FROM_EMAIL || "hello@almanacresearch.com";

  // Send email in background (fire and forget)
  client
    .sendEmail({
      From: `Almanac Research <${fromEmail}>`,
      To: options.to,
      Subject: options.subject,
      HtmlBody: options.html,
      MessageStream: "outbound",
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      // Silently fail - don't block the caller
    });
}
