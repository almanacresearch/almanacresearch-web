import { redirect } from "next/navigation";

export default function Enterprise() {
  redirect(
    "/coming-soon?title=Enterprise&description=Tailored solutions for teams and organizations. We're preparing comprehensive enterprise features like advanced security, custom integrations, and dedicated support. Contact us to share your ideas!"
  );
}
