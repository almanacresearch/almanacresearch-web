import {
  baseEmailTemplate,
  emailParagraph,
  emailLink,
  getFirstName,
  sendEmail,
} from "./base";

function writeToUsAckEmailHTML(name: string): string {
  const firstName = getFirstName(name);

  const body = [
    emailParagraph(
      `We truly appreciate you taking the time to share your thoughts with us. Your inputs help us build AlmanacAI better.`
    ),
    emailParagraph(
      `Our team reads every message, and while we may not be able to respond to each one individually, please know that your input is valued and carefully considered.`
    ),
    emailParagraph(
      `If you have any questions or need a direct response, feel free to reach out to us at ${emailLink(
        "mailto:hello@almanacresearch.com",
        "hello@almanacresearch.com",
        false
      )}.`
    ),
  ].join("");

  return baseEmailTemplate({
    heading: `We got your message, ${firstName}!`,
    body,
    signOff: "Warm regards,<br>Almanac Research Team",
  });
}

export function sendWriteToUsAckEmail(email: string, name: string): void {
  sendEmail({
    to: email,
    subject: "Thank you for your message!",
    html: writeToUsAckEmailHTML(name),
  });
}
