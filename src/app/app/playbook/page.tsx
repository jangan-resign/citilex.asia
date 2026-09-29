import { PlaybookClient } from "../../../components/app/playbook/PlaybookClient";

export const metadata = {
  title: "Playbook | CITILEX ASIA Workspace",
  description: "SOP & Pengetahuan untuk Karina dan Tim CS",
};

export default function PlaybookPage() {
  return (
    <div className="h-full w-full">
      <PlaybookClient />
    </div>
  );
}
