import { Metadata } from "next";
import { AssetsClient } from "../../../components/app/assets/AssetsClient";

export const metadata: Metadata = {
  title: "Assets | CITILEX ASIA Workspace",
  description: "Gudang file, foto produk, dan mockup untuk Tim CS",
};

export default function AssetsPage() {
  return <AssetsClient />;
}
