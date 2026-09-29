import { CalculatorClient } from "../../../components/app/calculator/CalculatorClient";

export const metadata = {
  title: "Calculator | CITILEX ASIA Workspace",
  description: "Penghitung Harga Otomatis & Quotation Generator",
};

export default function CalculatorPage() {
  return (
    <div className="h-full w-full">
      <CalculatorClient />
    </div>
  );
}
