import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalculatorClient } from "../../../components/app/calculator/CalculatorClient";

export const metadata = {
  title: "Calculator | CITILEX ASIA Workspace",
  description: "Penghitung Harga Otomatis & Quotation Generator",
};

export default async function CalculatorPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value;

  if (role !== "super-admin") {
    redirect("/app");
  }

  return (
    <div className="h-full w-full">
      <CalculatorClient />
    </div>
  );
}
