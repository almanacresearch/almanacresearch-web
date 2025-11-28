import { redirect } from "next/navigation";

export default function CareersPage() {
  redirect(
    "/coming-soon?title=Careers&description=We're building extraordinary stuffs and looking for exceptional talent. Keep an eye out. New opportunities will be posted soon."
  );
}
