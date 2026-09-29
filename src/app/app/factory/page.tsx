import { cookies } from "next/headers";
import { ProductsClient } from "../../../components/app/factory/ProductsClient";

export const metadata = {
  title: "Factory | CITILEX ASIA Workspace",
  description: "Master Data Pabrik, Harga, dan Add-ons",
};

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value;
  const isReadOnly = role === "business-partner";

  return (
    <div className="h-full w-full">
      <ProductsClient isReadOnly={isReadOnly} />
    </div>
  );
}
