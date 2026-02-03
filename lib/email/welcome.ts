import {
  baseEmailTemplate,
  emailParagraph,
  emailLink,
  getFirstName,
  sendEmail,
} from "./base";

function welcomeEmailHTML(name: string): string {
  const firstName = getFirstName(name);

  const body = [
    emailParagraph(
      `AlmanacAI Mail, our invite-only MVP, is launching soon.`
    ),
    emailParagraph(
      `If you have an invite code, you can download the Chrome extension and try it out right away. If you don't, you can request an invite code ${emailLink(
        "mailto:hello@almanacresearch.com?subject=Request%20for%20Invite%20Code&body=I'd%20like%20to%20try%20AlmanacAI%20Mail.",
        "here"
      )}.`
    ),
    emailParagraph(
      `${emailLink("https://docs.almanacresearch.com", "This")} is a great read if you want to know how AlmanacAI shows you exactly what needs your attention.`
    ),
    emailParagraph(
      `Transparency and privacy are non-negotiable for us. If you have questions, concerns, or simply want to talk to the founding team, write to us at ${emailLink(
        "mailto:hello@almanacresearch.com",
        "hello@almanacresearch.com",
        false
      )}.`
    ),
  ].join("");

  return baseEmailTemplate({
    heading: `Welcome to Almanac Research, ${firstName}!`,
    body,
    signOff: "Warm regards,<br>Almanac Research Team",
  });
}

export function sendWelcomeEmail(email: string, name: string): void {
  sendEmail({
    to: email,
    subject: "Welcome to Almanac Research!",
    html: welcomeEmailHTML(name),
  });
}
