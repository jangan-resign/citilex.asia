import { InvoicesClient } from "../../../components/app/invoices/InvoicesClient";

export const metadata = {
  title: "Invoices | CITILEX ASIA Workspace",
  description: "Invoice Generator and Tracker",
};

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<{ month?: string; year?: string }> }) {
  const params = await searchParams;
  const month = params.month === "all" ? "all" : (params.month ? parseInt(params.month) : new Date().getMonth() + 1);
  const year = params.year === "all" ? "all" : (params.year ? parseInt(params.year) : new Date().getFullYear());

  return <InvoicesClient initialMonth={month} initialYear={year} />;
}
