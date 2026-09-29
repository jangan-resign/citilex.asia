import { Settings } from "lucide-react";

export const metadata = {
  title: "Settings | CITILEX ASIA Workspace",
};

export default function SettingsPage() {
  return (
    <div className="flex h-full w-full flex-col bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Settings className="h-6 w-6 text-brand-gold" />
        Settings
      </h2>
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
        <p>Konfigurasi WhatsApp API, API Keys, dan Users akan ada di sini</p>
      </div>
    </div>
  );
}
