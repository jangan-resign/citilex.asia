import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Paperclip, CheckCheck, Info, Briefcase, ChevronLeft, ChevronDown, Copy, Trash2, Reply, Forward, X } from "lucide-react";
import { CustomerWithMessages } from "./InboxClient";
import { deleteMessage, forwardMessage } from "../../../actions/inbox";


interface ChatTimelineProps {
  customer: CustomerWithMessages;
  allCustomers?: CustomerWithMessages[];
  onChangeOwner: (owner: string) => void;
  onSendMessage: (text: string, replyContext?: { sender: string; text: string }) => void;
  onDeleteMessage?: (messageId: string) => void;
  injectedText?: string;
  onInjectedTextCleared?: () => void;
  onBack?: () => void;
}

export function ChatTimeline({ customer, allCustomers = [], onChangeOwner, onSendMessage, onDeleteMessage, injectedText, onInjectedTextCleared, onBack }: ChatTimelineProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<{ id: string; sender: string; text: string } | null>(null);
  const [showForwardModal, setShowForwardModal] = useState<string | null>(null);
  const [forwardSearch, setForwardSearch] = useState("");

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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim()) {
      if (replyTo) {
        onSendMessage(inputText, { sender: replyTo.sender, text: replyTo.text });
        setReplyTo(null);
      } else {
        onSendMessage(inputText);
      }
      setInputText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    }
  };

  const handleReply = (msg: any) => {
    setReplyTo({ id: msg.id, sender: msg.sender, text: msg.text });
    setActiveDropdown(null);
    textareaRef.current?.focus();
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm("Hapus pesan ini? Pesan akan dihapus dari sistem kita (tidak dari WA pelanggan).")) return;
    setActiveDropdown(null);
    try {
      await deleteMessage(messageId);
      if (onDeleteMessage) onDeleteMessage(messageId);
    } catch (err) {
      alert("Gagal menghapus pesan");
    }
  };

  const handleForward = async (messageId: string, targetCustomerId: string) => {
    try {
      await forwardMessage(messageId, targetCustomerId);
      setShowForwardModal(null);
      setForwardSearch("");
      alert("Pesan berhasil diteruskan!");
    } catch (err) {
      alert("Gagal meneruskan pesan");
    }
  };

  const getSenderLabel = (sender: string) => {
    if (sender === "customer") return customer.name;
    if (sender === "bot") return "Karina";
    if (sender === "crm") return "CRM Citilex";
    return "CS Citilex";
  };

  // Parse dan render pesan dengan visual quote block (seperti WA)
  const renderMessageContent = (text: string) => {
    // Format baru: [REPLY:SenderName]quoted text[/REPLY]\nactual reply
    const newFormatMatch = text.match(/^\[REPLY:(.+?)\]([\s\S]*?)\[\/REPLY\]\n?([\s\S]*)$/);
    if (newFormatMatch) {
      const [, senderName, quotedText, replyText] = newFormatMatch;
      return (
        <div className="pr-5">
          <div className="bg-black/5 rounded-lg p-2 mb-1.5 border-l-4 border-brand-gold cursor-pointer hover:bg-black/10 transition-colors">
            <p className="text-[11px] font-bold text-brand-gold">{senderName}</p>
            <p className="text-xs text-slate-600 line-clamp-2">{quotedText.trim()}</p>
          </div>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{replyText.trim()}</p>
        </div>
      );
    }

    // Format lama: > _Sender: quoted text_\n\nactual reply
    const oldFormatMatch = text.match(/^> _(.+?): ([\s\S]*?)_\n\n([\s\S]*)$/);
    if (oldFormatMatch) {
      const [, senderName, quotedText, replyText] = oldFormatMatch;
      return (
        <div className="pr-5">
          <div className="bg-black/5 rounded-lg p-2 mb-1.5 border-l-4 border-brand-gold cursor-pointer hover:bg-black/10 transition-colors">
            <p className="text-[11px] font-bold text-brand-gold">{senderName}</p>
            <p className="text-xs text-slate-600 line-clamp-2">{quotedText.trim()}</p>
          </div>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{replyText.trim()}</p>
        </div>
      );
    }

    // Pesan biasa tanpa quote
    return <p className="text-sm whitespace-pre-wrap leading-relaxed pr-5">{text}</p>;
  };

  const filteredForwardCustomers = allCustomers
    .filter(c => c.id !== customer.id)
    .filter(c => c.name.toLowerCase().includes(forwardSearch.toLowerCase()) || c.phone.includes(forwardSearch));

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
                className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm relative group ${
                  isCustomer 
                    ? "bg-white text-slate-800 rounded-tl-sm border border-slate-100" 
                    : isBot
                      ? "bg-blue-50 text-slate-800 rounded-tr-sm border border-blue-100"
                      : "bg-[#dcf8c6] text-slate-800 rounded-tr-sm border border-[#c1e8a8]"
                }`}
              >
                {/* Dropdown Toggle - inside bubble, top-right corner */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === msg.id ? null : msg.id);
                  }}
                  className={`absolute top-1 right-1 p-0.5 rounded-full text-slate-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${
                    isCustomer ? "hover:bg-slate-100" : isBot ? "hover:bg-blue-100" : "hover:bg-[#c1e8a8]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === msg.id && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-8 ${isCustomer ? "left-0" : "right-0"} bg-white border border-slate-200 shadow-xl rounded-xl py-1.5 w-44 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                  >
                    <button 
                      onClick={() => handleReply(msg)}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 cursor-pointer"
                    >
                      <Reply className="w-4 h-4" /> Reply
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(msg.text);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" /> Copy
                    </button>
                    <button 
                      onClick={() => {
                        setShowForwardModal(msg.id);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 cursor-pointer"
                    >
                      <Forward className="w-4 h-4" /> Forward
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}

                {/* Sender Name for non-customer */}
                {!isCustomer && (
                  <div className={`text-[10px] font-bold mb-1 ${isBot ? "text-blue-600" : msg.sender === "crm" ? "text-emerald-700" : "text-emerald-600"}`}>
                    {isBot ? "Karina" : msg.sender === "crm" ? "CRM Citilex" : "CS Citilex"}
                  </div>
                )}
                
                {/* Message Content */}
                {renderMessageContent(msg.text)}
                
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

      {/* Reply Preview */}
      {replyTo && (
        <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-3">
          <div className="w-1 h-10 bg-brand-gold rounded-full shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-brand-gold">{getSenderLabel(replyTo.sender)}</p>
            <p className="text-xs text-slate-500 truncate">{replyTo.text}</p>
          </div>
          <button onClick={() => setReplyTo(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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

      {/* Forward Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4" onClick={() => { setShowForwardModal(null); setForwardSearch(""); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Forward ke...</h3>
              <button onClick={() => { setShowForwardModal(null); setForwardSearch(""); }} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 border-b border-slate-100">
              <input
                type="text"
                placeholder="Cari nama atau nomor..."
                value={forwardSearch}
                onChange={(e) => setForwardSearch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                autoFocus
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredForwardCustomers.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-400">Tidak ada kontak ditemukan</div>
              ) : (
                filteredForwardCustomers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleForward(showForwardModal, c.id)}
                    className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-left cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.phone}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
