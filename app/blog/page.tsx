import { redirect } from "next/navigation";

export default function Blog() {
  redirect(
    "/coming-soon?title=Blog&description=Our blog section will be a goldmine. We'll share our AI research insights. Architecture, design, technology and non-sensitive codes will all be accessible to you. Stay with us!"
  );
}
