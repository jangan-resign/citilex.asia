import { InboxClient } from "../../../components/app/inbox/InboxClient";
import { getCustomers } from "../../../actions/inbox";

export const metadata = {
  title: "Inbox | CITILEX ASIA Workspace",
  description: "Customer Service Inbox Workspace",
};

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const initialCustomers = await getCustomers();
  
  return (
    <div className="h-full w-full">
      <InboxClient initialCustomers={initialCustomers} />
    </div>
  );
}
