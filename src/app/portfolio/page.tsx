import { redirect } from "next/navigation";

/** Legacy path — brand site uses /work */
export default function PortfolioRedirect() {
  redirect("/work");
}
