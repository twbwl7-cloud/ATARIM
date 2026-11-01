import { redirect } from "next/navigation";

/** Legacy landing path — brand site uses soft /contact */
export default function FreeDemoRedirect() {
  redirect("/contact");
}
