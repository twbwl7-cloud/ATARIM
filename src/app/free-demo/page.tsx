import { redirect } from "next/navigation";

/** Free Demo section lives on /work */
export default function FreeDemoRedirect() {
  redirect("/work");
}
