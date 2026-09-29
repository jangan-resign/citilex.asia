import { redirect } from "next/navigation";

export default function CSIndexPage() {
  // Secara otomatis redirect ke Dashboard sebagai halaman utama
  redirect("/app/leads-dashboard");
}
