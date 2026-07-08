import { redirect } from "next/navigation";

/** Legacy checkout return URL — payments are not active. */
export default function PaymentSuccessPage() {
  redirect("/learn");
}
