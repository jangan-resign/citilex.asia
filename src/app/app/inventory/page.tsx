import { getInventory } from "@/src/actions/inventory";
import { InventoryClient } from "@/src/components/app/inventory/InventoryClient";

export default async function InventoryPage() {
  const initialInventory = await getInventory();

  return (
    <InventoryClient initialInventory={initialInventory} />
  );
}
