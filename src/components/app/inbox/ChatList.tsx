import { useState } from "react";
import { Search, Bot, User } from "lucide-react";
import { CustomerWithMessages } from "./InboxClient";

interface ChatListProps {
  customers: CustomerWithMessages[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
}

type FilterType = "all" | "unread" | "karina" | "cs" | "crm";

export function ChatList({ customers, selectedChatId, onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Logika penyaringan
  const filteredCustomers = customers.filter((customer) => {
    const unreadCount = customer.messages.filter(m => !m.isRead && m.sender === 'customer').length;
    const lastMessage = customer.messages[customer.messages.length - 1]?.text || "";

    // 1. Filter Tab
    if (activeFilter === "unread" && unreadCount === 0) return false;
    if (activeFilter === "karina" && customer.owner !== "Karina") return false;
    if (activeFilter === "cs" && customer.owner !== "CS") return false;
    if (activeFilter === "crm" && customer.owner !== "CRM") return false;

    // 2. Filter Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = customer.name.toLowerCase().includes(q);
      const matchesMessage = lastMessage.toLowerCase().includes(q);
      if (!matchesName && !matchesMessage) return false;
    }

    return true;
  });

  const FilterButton = ({ label, type }: { label: string, type: FilterType }) => {
    const isActive = activeFilter === type;
    return (
      <button 
        onClick={() => setActiveFilter(type)}
        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
          isActive 
            ? "bg-white border border-slate-200 text-slate-800 shadow-sm" 
            : "bg-transparent text-slate-500 hover:text-slate-700"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-brand-primary mb-4">Inbox</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau pesan..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs (Scrollable horizontal) */}
      <div className="flex gap-2 p-3 overflow-x-auto border-b border-slate-100 scrollbar-hide bg-slate-50/50">
        <FilterButton label="All" type="all" />
        <FilterButton label="Unread" type="unread" />
        <FilterButton label="Karina" type="karina" />
        <FilterButton label="CS" type="cs" />
        <FilterButton label="CRM" type="crm" />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCustomers.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Tidak ada pesan yang cocok dengan filter.
          </div>
        ) : (
          filteredCustomers.map((customer) => {
            const isSelected = selectedChatId === customer.id;
            const unreadCount = customer.messages.filter(m => !m.isRead && m.sender === 'customer').length;
            const lastMessage = customer.messages[customer.messages.length - 1];

            return (
              <div 
                key={customer.id} 
                onClick={() => onSelectChat(customer.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${
                  isSelected ? "bg-brand-gold/5 border-l-4 border-l-brand-gold" : "border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${unreadCount > 0 ? "text-slate-900" : "text-slate-700"}`}>
                    {customer.name}
                  </h3>
                  <span suppressHydrationWarning className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {lastMessage ? new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium font-mono">
                    {customer.phone}
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                    customer.owner === "Karina" 
                      ? "bg-blue-100 text-blue-700" 
                      : customer.owner === "CS"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {customer.owner === "Karina" ? <Bot className="w-3 h-3" /> : customer.owner === "CRM" ? <Briefcase className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    <span>{customer.owner}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <p className={`text-xs truncate ${unreadCount > 0 ? "font-semibold text-slate-700" : "text-slate-500"}`}>
                    {lastMessage?.text || "Tidak ada pesan."}
                  </p>
                  {unreadCount > 0 && (
                    <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
