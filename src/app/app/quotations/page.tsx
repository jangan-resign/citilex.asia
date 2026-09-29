import { QuotationsClient } from "../../../components/app/quotations/QuotationsClient";

export const metadata = {
  title: "Quotations | CITILEX ASIA Workspace",
  description: "SPH Generator and Tracker",
};

export default async function QuotationsPage({ searchParams }: { searchParams: Promise<{ month?: string; year?: string }> }) {
  const params = await searchParams;
  const month = params.month === "all" ? "all" : (params.month ? parseInt(params.month) : new Date().getMonth() + 1);
  const year = params.year === "all" ? "all" : (params.year ? parseInt(params.year) : new Date().getFullYear());

  return <QuotationsClient initialMonth={month} initialYear={year} />;
}
