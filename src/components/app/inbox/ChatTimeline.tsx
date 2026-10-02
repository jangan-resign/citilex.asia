import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Paperclip, CheckCheck, Info, Briefcase, ChevronLeft, ChevronDown, Copy, Trash2, Reply, Forward, X, Loader2, Smile } from "lucide-react";
import { deleteMessage, forwardMessage } from "../../../actions/inbox";
import { getAssets } from "../../../actions/assets";
import { CustomerWithMessages } from "./InboxClient";


interface ChatTimelineProps {
  customer: CustomerWithMessages;
  allCustomers?: CustomerWithMessages[];
  onChangeOwner: (owner: string) => void;
  onSendMessage: (text: string, replyContext?: { sender: string; text: string; id: string }) => void;
  onSendMedia?: (assetUrl: string, mediaType: "document" | "image", filename: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  injectedText?: string;
  onInjectedTextCleared?: () => void;
  onBack?: () => void;
}

export function ChatTimeline({ customer, allCustomers = [], onChangeOwner, onSendMessage, onSendMedia, onDeleteMessage, injectedText, onInjectedTextCleared, onBack }: ChatTimelineProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<{ id: string; sender: string; text: string } | null>(null);
  const [showForwardModal, setShowForwardModal] = useState<string | null>(null);
  const [forwardSearch, setForwardSearch] = useState("");
  const [forwardingTo, setForwardingTo] = useState<string | null>(null);
  
  // Asset Picker
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isSendingMedia, setIsSendingMedia] = useState(false);
  
  // Emoji Picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  // Auto scroll to bottom (hanya jika ada pesan baru atau ganti chat)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [customer.id, customer.messages.length]);

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
        onSendMessage(inputText, { sender: replyTo.sender, text: replyTo.text, id: replyTo.id });
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
    if (forwardingTo) return;
    setForwardingTo(targetCustomerId);
    try {
      await forwardMessage(messageId, targetCustomerId);
      setShowForwardModal(null);
      setForwardSearch("");
      alert("Pesan berhasil diteruskan!");
    } catch (err) {
      alert("Gagal meneruskan pesan");
    } finally {
      setForwardingTo(null);
    }
  };

  const handleOpenAssetPicker = async () => {
    setShowAssetModal(true);
    if (assets.length === 0) {
      setIsLoadingAssets(true);
      try {
        const fetchedAssets = await getAssets();
        setAssets(fetchedAssets);
      } catch (err) {
        console.error("Failed to load assets", err);
      } finally {
        setIsLoadingAssets(false);
      }
    }
  };

  const handleSelectAsset = async (asset: any) => {
    setShowAssetModal(false);
    setIsSendingMedia(true);
    
    try {
      const mediaType = asset.type === "image" ? "image" : "document";
      if (onSendMedia) {
        await onSendMedia(asset.url, mediaType, asset.name);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim aset");
    } finally {
      setIsSendingMedia(false);
    }
  };

  const getSenderLabel = (sender: string) => {
    if (sender === "customer") return customer.name;
    if (sender === "bot") return "Karina";
    if (sender === "crm") return "CRM Citilex";
    return "CS Citilex";
  };

  // Parse dan render pesan dengan visual quote block (seperti WA)
  const renderMessageContent = (msg: any) => {
    const { text, attachments } = msg;

    let attachmentElements = null;
    if (attachments && attachments.length > 0) {
      const isImageOnlyLocal = (!text || text === "🖼️ Mengirim gambar" || text === "image");
      attachmentElements = (
        <div className={`flex flex-col gap-2 ${isImageOnlyLocal ? "" : "mb-2"}`}>
          {attachments.map((url: string, i: number) => {
            const isImage = url.match(/\.(jpeg|jpg|gif|png)$/i) != null || url.includes("image") || text?.toLowerCase().includes("gambar") || text?.toLowerCase().includes("image");
            if (isImage) {
              const isCustomer = msg.sender === "customer";
              
              if (isImageOnlyLocal) {
                const radiusClass = isCustomer ? "rounded-tr-xl rounded-tl-[2px] rounded-b-xl" : "rounded-tl-xl rounded-tr-[2px] rounded-b-xl";
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={`block cursor-zoom-in relative bg-black/5 hover:opacity-95 transition-opacity overflow-hidden ${radiusClass}`}>
                    <img src={url} alt="Attachment" className="w-full h-auto max-h-[350px] object-cover" />
                  </a>
                );
              }

              const radiusClass = isCustomer ? "rounded-tr-2xl rounded-tl-[2px]" : "rounded-tl-2xl rounded-tr-[2px]";
              
              return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={`block -mx-4 -mt-2 mb-2 cursor-zoom-in relative bg-black/5 hover:opacity-95 transition-opacity overflow-hidden ${radiusClass}`}>
                  <img src={url} alt="Attachment" className="w-full h-auto max-h-[350px] object-cover" />
                </a>
              );
            }
            return (
              <div key={i} className="pr-5">
                <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-black/5 rounded-lg border border-slate-200 hover:bg-black/10 transition-colors">
                  <div className="h-10 w-10 bg-red-100 text-red-500 rounded flex items-center justify-center shrink-0">
                    <span className="font-bold text-[10px]">PDF</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{text || "Document"}</p>
                    <p className="text-[10px] text-slate-500">Klik untuk melihat file</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      );
    }

    // Format baru: [REPLY:SenderName]quoted text[/REPLY]\nactual reply
    const newFormatMatch = text.match(/^\[REPLY:(.+?)\]([\s\S]*?)\[\/REPLY\]\n?([\s\S]*)$/);
    if (newFormatMatch) {
      const [, senderName, quotedText, replyText] = newFormatMatch;
      return (
        <div className="w-full">
          {attachmentElements}
          <div className="pr-5">
            <div className="bg-black/5 rounded-lg p-2 mb-1.5 border-l-4 border-brand-gold cursor-pointer hover:bg-black/10 transition-colors">
              <p className="text-[11px] font-bold text-brand-gold">{senderName}</p>
              <p className="text-xs text-slate-600 line-clamp-2">{quotedText.trim()}</p>
            </div>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{replyText.trim()}</p>
          </div>
        </div>
      );
    }

    // Format lama: > _Sender: quoted text_\n\nactual reply
    const oldFormatMatch = text.match(/^> _(.+?): ([\s\S]*?)_\n\n([\s\S]*)$/);
    if (oldFormatMatch) {
      const [, senderName, quotedText, replyText] = oldFormatMatch;
      return (
        <div className="w-full">
          {attachmentElements}
          <div className="pr-5">
            <div className="bg-black/5 rounded-lg p-2 mb-1.5 border-l-4 border-brand-gold cursor-pointer hover:bg-black/10 transition-colors">
              <p className="text-[11px] font-bold text-brand-gold">{senderName}</p>
              <p className="text-xs text-slate-600 line-clamp-2">{quotedText.trim()}</p>
            </div>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{replyText.trim()}</p>
          </div>
        </div>
      );
    }

    // Sembunyikan teks fallback agar tidak dobel di bawah bubble media
    const isFallbackText = 
      text === "🖼️ Mengirim gambar" || 
      text === "📄 Mengirim dokumen" || 
      text === "🎥 Mengirim video" || 
      text === "🎵 Mengirim audio" || 
      text === "image" || 
      text === "document";
      
    // Jika ada attachment dokumen, filename biasanya sama dengan text, jadi kita sembunyikan jika identik
    let shouldShowText = !!text && !isFallbackText;
    if (attachments && attachments.length > 0 && text) {
      const isDocumentFallback = attachments.some((url: string) => !url.match(/\.(jpeg|jpg|gif|png)$/i) && !url.includes("image"));
      if (isDocumentFallback) {
         // jika text sudah dipakai sebagai judul dokumen di block atas, sembunyikan
         shouldShowText = false; 
      }
    }

    // Pesan biasa tanpa quote
    return (
      <div className="w-full">
        {attachmentElements}
        {shouldShowText && (
          <div className="pr-5">
            <p className="text-sm whitespace-pre-wrap leading-relaxed mt-1">{text}</p>
          </div>
        )}
      </div>
    );
  };

  const filteredForwardCustomers = allCustomers
    .filter(c => c.id !== customer.id)
    .filter(c => c.name.toLowerCase().includes(forwardSearch.toLowerCase()) || c.phone.includes(forwardSearch));

  return (
    <div className="flex flex-col h-full bg-[#EFEAE2] relative"> {/* BG color similar to WA Web */}
      
      {/* Full-screen Loading Overlay for Media Upload (WhatsApp Style) */}
      {isSendingMedia && (
        <div className="absolute inset-0 z-50 bg-[#0b141a]/80 flex flex-col items-center justify-center backdrop-blur-sm">
          <Loader2 className="w-16 h-16 text-brand-gold animate-spin mb-4" />
          <p className="text-white font-medium">Mengirim Asset...</p>
        </div>
      )}

      {/* Header */}
      <div className="h-16 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-center shrink-0 shadow-sm z-10 relative">
        {onBack && (
          <button onClick={onBack} className="md:hidden absolute left-4 p-2 -ml-2 text-slate-500 hover:text-slate-800">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

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
                customer.owner === "CS" ? "bg-amber-100 text-amber-700 shadow-sm" : "text-slate-500 hover:bg-slate-200"
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
            <div className="bg-amber-50 text-amber-700 text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-amber-200">
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
          const hasAttachments = msg.attachments && msg.attachments.length > 0;
          const isImageOnly = hasAttachments && msg.attachments.every((url: string) => url.match(/\.(jpeg|jpg|gif|png)$/i) != null || url.includes("image")) && (!msg.text || msg.text === "🖼️ Mengirim gambar" || msg.text === "image");
          
          return (
            <div 
              key={msg.id || index} 
              className={`flex flex-col ${isCustomer ? "items-start" : "items-end"}`}
            >
              <div 
                className={`max-w-[75%] rounded-2xl ${isImageOnly ? "p-1" : "px-4 py-2"} shadow-sm relative group ${
                  isCustomer 
                    ? "bg-white text-slate-800 rounded-tl-sm border border-slate-100" 
                    : isBot
                      ? "bg-blue-50 text-slate-800 rounded-tr-sm border border-blue-100"
                      : msg.sender === "crm"
                        ? "bg-emerald-50 text-slate-800 rounded-tr-sm border border-emerald-200"
                        : "bg-amber-50 text-slate-800 rounded-tr-sm border border-amber-200"
                }`}
              >
                {/* Dropdown Toggle - inside bubble, top-right corner */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === msg.id ? null : msg.id);
                  }}
                  className={`absolute ${isImageOnly ? "top-2 right-2 bg-black/40 text-white hover:bg-black/60" : "top-1 right-1 text-slate-400"} p-0.5 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
                    !isImageOnly && (isCustomer ? "hover:bg-slate-100" : isBot ? "hover:bg-blue-100" : msg.sender === "crm" ? "hover:bg-emerald-100" : "hover:bg-amber-100")
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
                {msg.text?.startsWith("[GAGAL]") ? (
                  <div className="flex flex-col">
                    <span className="text-red-500 font-semibold text-xs mb-1.5 flex items-center gap-1 bg-red-50/50 p-1.5 rounded border border-red-100">
                      <X className="w-3.5 h-3.5" /> Gagal dikirim (diblokir sistem / di luar jendela 24-jam)
                    </span>
                    {renderMessageContent({ ...msg, text: msg.text.replace("[GAGAL] ", "").replace("[GAGAL]", "") })}
                  </div>
                ) : (
                  renderMessageContent(msg)
                )}
                
                <div className={`flex items-center justify-end gap-1 ${isImageOnly ? "absolute bottom-2 right-2 z-10 bg-black/40 rounded-full px-1.5 py-0.5" : "mt-1"}`}>
                  <span suppressHydrationWarning className={`text-[10px] ${isImageOnly ? "text-white" : "text-slate-400"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!isCustomer && (
                    msg.text?.startsWith("[GAGAL]") ? (
                      <X className="h-3 w-3 text-red-500" />
                    ) : (
                      <CheckCheck className={`h-3 w-3 ${msg.isRead ? (isImageOnly ? "text-blue-400" : "text-blue-500") : (isImageOnly ? "text-white" : "text-slate-400")}`} />
                    )
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
        {(() => {
          const lastCustomerMsg = [...customer.messages].reverse().find(m => m.sender === "customer");
          const is24hClosed = lastCustomerMsg && (Date.now() - new Date(lastCustomerMsg.createdAt).getTime() > 24 * 60 * 60 * 1000);
          
          if (is24hClosed) {
            return (
              <div className="bg-slate-800 text-white p-3 rounded-lg flex items-center justify-center gap-2 text-sm shadow-sm font-medium">
                <Info className="w-4 h-4 shrink-0 text-brand-gold" />
                <span><strong>Jendela 24-jam tertutup.</strong> Klien harus membalas terlebih dahulu sebelum Anda bisa mengirim pesan baru.</span>
              </div>
            );
          }
          
          return (
            <form onSubmit={handleSend} className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="flex items-center gap-1">
            <div className="relative flex items-center">
              <button 
                type="button"
                className="p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={isSendingMedia || customer.owner === "Karina"}
              >
                <Smile className="h-5 w-5" />
              </button>
              
              {showEmojiPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowEmojiPicker(false)} />
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-2 flex gap-1">
                    {["😊", "🙏", "👍", "👌"].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setInputText(prev => prev + emoji);
                          setShowEmojiPicker(false);
                          textareaRef.current?.focus();
                        }}
                        className="w-10 h-10 text-xl hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <button 
              type="button"
              className="p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleOpenAssetPicker}
              disabled={isSendingMedia || customer.owner === "Karina"}
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          
          <textarea 
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isSendingMedia) handleSend();
              }
            }}
            disabled={customer.owner === "Karina" || isSendingMedia}
            placeholder={isSendingMedia ? "Mengirim Aset..." : customer.owner === "Karina" ? "Pindahkan ke mode CS/CRM untuk membalas..." : "Ketik pesan untuk pelanggan..."}
            className="flex-1 px-4 py-3 bg-white border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 shadow-sm disabled:bg-slate-100 disabled:cursor-not-allowed resize-none min-h-[44px] overflow-y-auto"
            rows={1}
          />
          
          {isSendingMedia ? (
            <div className="p-3 bg-slate-200 text-slate-500 rounded-full">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <button 
              type="submit"
              disabled={!inputText.trim() || customer.owner === "Karina"}
              className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              <Send className="h-5 w-5 -ml-0.5" />
            </button>
          )}
        </form>
        );})()}
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
                    disabled={!!forwardingTo}
                    className="w-full px-4 py-3 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.phone}</p>
                      </div>
                    </div>
                    {forwardingTo === c.id && <span className="text-xs text-brand-gold animate-pulse">Mengirim...</span>}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Asset Picker */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <h3 className="font-bold text-slate-800">Pilih Asset</h3>
              <button onClick={() => setShowAssetModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {isLoadingAssets ? (
                <div className="p-8 text-center text-slate-500">Memuat asset...</div>
              ) : assets.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  Belum ada asset. Tambahkan di menu Assets.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleSelectAsset(asset)}
                      className="w-full px-4 py-3 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{asset.name}</p>
                        <p className="text-xs text-slate-500">{asset.type} • {asset.size}</p>
                      </div>
                      <span className="text-brand-primary text-xs font-semibold whitespace-nowrap ml-4">
                        Pilih
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
