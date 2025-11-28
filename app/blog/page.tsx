import { redirect } from "next/navigation";

export default function Blog() {
  redirect(
    "/coming-soon?title=Blog&description=We're preparing deep insights on productivity, AI research, cognitive science, and the future of knowledge work. Stay tuned!"
  );
}
