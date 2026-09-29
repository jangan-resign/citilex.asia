import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Paperclip, CheckCheck, Info, Briefcase, ChevronLeft } from "lucide-react";
import { CustomerWithMessages } from "./InboxClient";


interface ChatTimelineProps {
  customer: CustomerWithMessages;
  onChangeOwner: (owner: string) => void;
  onSendMessage: (text: string) => void;
  injectedText?: string;
  onInjectedTextCleared?: () => void;
  onBack?: () => void;
}

export function ChatTimeline({ customer, onChangeOwner, onSendMessage, injectedText, onInjectedTextCleared, onBack }: ChatTimelineProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputText]);

  // Inject text dari luar (misal dari Kalkulator)
  useEffect(() => {
    if (injectedText) {
      setInputText(prev => prev ? prev + '\n' + injectedText : injectedText);
      if (onInjectedTextCleared) onInjectedTextCleared();
    }
  }, [injectedText, onInjectedTextCleared]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [customer.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    }
  };



  return (
    <div className="flex flex-col h-full bg-[#EFEAE2]"> {/* BG color similar to WA Web */}
      {/* Header */}
      <div className="h-16 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3 md:gap-4">
          {onBack && (
            <button onClick={onBack} className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800">
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">{customer.name}</h2>
            <p className="text-xs text-slate-500">{customer.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Ownership Controls */}
          <div className="flex items-center gap-2 bg-slate-50 rounded-full p-1 border border-slate-200">
            <button
              onClick={() => onChangeOwner("Karina")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                customer.owner === "Karina" ? "bg-blue-100 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-200"
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>Karina</span>
            </button>
            <button
              onClick={() => onChangeOwner("CS")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                customer.owner === "CS" ? "bg-brand-gold-light text-brand-gold shadow-sm" : "text-slate-500 hover:bg-slate-200"
              }`}
            >
              <User className="h-4 w-4" />
              <span>CS</span>
            </button>
            <button
              onClick={() => onChangeOwner("CRM")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                customer.owner === "CRM" ? "bg-emerald-100 text-emerald-700 shadow-sm" : "text-slate-500 hover:bg-slate-200"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Info Banner */}
        <div className="flex justify-center mb-6">
          {customer.owner === "Karina" && (
            <div className="bg-blue-50 text-blue-700 text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-blue-100">
              <Info className="h-4 w-4" />
              Percakapan ini sedang ditangani oleh Karina secara otomatis.
            </div>
          )}
          {customer.owner === "CS" && (
            <div className="bg-brand-gold-light/50 text-brand-gold-dark text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-brand-gold/20">
              <Info className="h-4 w-4" />
              Percakapan ini sedang ditangani oleh CS.
            </div>
          )}
          {customer.owner === "CRM" && (
            <div className="bg-emerald-50 text-emerald-700 text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-emerald-100">
              <Info className="h-4 w-4" />
              Percakapan ini telah diteruskan ke tim CRM.
            </div>
          )}
        </div>

        {customer.messages.map((msg, index) => {
          const isCustomer = msg.sender === "customer";
          const isBot = msg.sender === "bot";
          
          return (
            <div 
              key={msg.id || index} 
              className={`flex flex-col ${isCustomer ? "items-start" : "items-end"}`}
            >
              <div 
                className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm relative ${
                  isCustomer 
                    ? "bg-white text-slate-800 rounded-tl-sm border border-slate-100" 
                    : isBot
                      ? "bg-blue-50 text-slate-800 rounded-tr-sm border border-blue-100" // Bot bubble
                      : "bg-[#dcf8c6] text-slate-800 rounded-tr-sm border border-[#c1e8a8]" // CS bubble (WA style)
                }`}
              >
                {/* Sender Name for non-customer */}
                {!isCustomer && (
                  <div className={`text-[10px] font-bold mb-1 ${isBot ? "text-blue-600" : msg.sender === "crm" ? "text-emerald-700" : "text-emerald-600"}`}>
                    {isBot ? "Karina" : msg.sender === "crm" ? "CRM Citilex" : "CS Citilex"}
                  </div>
                )}
                
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span suppressHydrationWarning className="text-[10px] text-slate-400">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!isCustomer && (
                    <CheckCheck className={`h-3 w-3 ${msg.isRead ? "text-blue-500" : "text-slate-400"}`} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#f0f2f5] border-t border-slate-200 shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2 max-w-4xl mx-auto">
          <button 
            type="button"
            className="p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            onClick={() => alert("Upload file via UploadThing (TBD)")}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          
          <textarea 
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={customer.owner === "Karina"}
            placeholder={customer.owner === "Karina" ? "Pindahkan ke mode CS/CRM untuk membalas..." : "Ketik pesan untuk pelanggan..."}
            className="flex-1 px-4 py-3 bg-white border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 shadow-sm disabled:bg-slate-100 disabled:cursor-not-allowed resize-none min-h-[44px] overflow-y-auto"
            rows={1}
          />
          
          <button 
            type="submit"
            disabled={!inputText.trim() || customer.owner === "Karina"}
            className="p-3 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          >
            <Send className="h-5 w-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
