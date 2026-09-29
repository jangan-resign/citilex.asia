"use client";

import { useState } from "react";
import { BookOpen, Lightbulb, UserCircle, Image as ImageIcon, GraduationCap } from "lucide-react";
import { PlaybooksTab } from "./PlaybooksTab";
import { KnowledgeTab } from "./KnowledgeTab";
import { PersonaTab } from "./PersonaTab";

type Tab = "playbooks" | "knowledge" | "persona";

export function PlaybookClient() {
  const [activeTab, setActiveTab] = useState<Tab>("playbooks");

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header & Tabs */}
      <div className="bg-white border-b border-slate-200 px-8 pt-8 shrink-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-brand-gold" />
            Playbook
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            SOP & Pengetahuan untuk Karina dan Tim CS.
          </p>

          <div className="flex gap-8 overflow-x-auto scrollbar-hide border-b border-slate-200">
            <TabButton 
              active={activeTab === "playbooks"} 
              onClick={() => setActiveTab("playbooks")}
              icon={<BookOpen className="h-4 w-4" />}
              label="SOP"
            />
            <TabButton 
              active={activeTab === "knowledge"} 
              onClick={() => setActiveTab("knowledge")}
              icon={<Lightbulb className="h-4 w-4" />}
              label="Knowledge"
            />
            <TabButton 
              active={activeTab === "persona"} 
              onClick={() => setActiveTab("persona")}
              icon={<UserCircle className="h-4 w-4" />}
              label="Persona"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full">
          {activeTab === "playbooks" && <PlaybooksTab />}
          {activeTab === "knowledge" && <KnowledgeTab />}
          {activeTab === "persona" && <PersonaTab />}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
        active 
          ? "border-brand-gold text-brand-gold" 
          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
