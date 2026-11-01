import { redirect } from "next/navigation";

/** Legacy route — process lives on /contact */
export default function ServicesRedirect() {
  redirect("/contact");
}
