import { permanentRedirect } from "next/navigation";

/** Legacy path — also declared in next.config redirects */
export default function ServicesRedirectPage() {
  permanentRedirect("/contact");
}
