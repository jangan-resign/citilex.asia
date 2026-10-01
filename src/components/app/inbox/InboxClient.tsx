"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ChatList } from "./ChatList";
import { ChatTimeline } from "./ChatTimeline";
import { CustomerInfo } from "./CustomerInfo";
import { CalculatorClient } from "../calculator/CalculatorClient";
import { Customer, Message, OrderQualification } from "@prisma/client";
import { sendMessage, changeChatOwner, markMessagesAsRead } from "../../../actions/inbox";

export type CustomerWithMessages = Customer & { messages: Message[], qualification: OrderQualification | null };

export function InboxClient({ initialCustomers }: { initialCustomers: CustomerWithMessages[] }) {
  const [customers, setCustomers] = useState<CustomerWithMessages[]>(initialCustomers);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(initialCustomers[0]?.id || null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [injectedText, setInjectedText] = useState("");

  useEffect(() => {
    setCustomers(initialCustomers);
  }, [initialCustomers]);

  useEffect(() => {
    if (selectedChatId) {
      // Optimistic update
      setCustomers(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            messages: c.messages.map(m => ({ ...m, isRead: true }))
          };
        }
        return c;
      }));
      // Server action
      markMessagesAsRead(selectedChatId).catch(console.error);
    }
  }, [selectedChatId]);

  const selectedCustomer = customers.find(c => c.id === selectedChatId) || null;

  const handleCalculatorAction = async (action: "add_to_lead", data: any) => {
    if (!selectedCustomer) return;

    if (action === "add_to_lead") {
      try {
        const currentItems = Array.isArray(selectedCustomer.qualification?.items)
          ? selectedCustomer.qualification!.items
          : [];

        // Ensure currentItems is treated as an array of any
        const dataArray = Array.isArray(data) ? data : [data];
        const newItems = [...(currentItems as any[]), ...dataArray];

        // Optimistic update
        setCustomers(customers.map(c => {
          if (c.id === selectedCustomer.id) {
            return {
              ...c,
              qualification: {
                ...(c.qualification || {} as any),
                items: newItems
              }
            };
          }
          return c;
        }));

        const { updateCustomerQualification } = await import("../../../actions/inbox");
        await updateCustomerQualification(selectedCustomer.id, {
          name: selectedCustomer.name,
          company: selectedCustomer.company,
          domicile: selectedCustomer.domicile,
        }, {
          items: newItems
        });
      } catch (error) {
        console.error("Failed to add to lead", error);
        alert("Gagal menyimpan ke database.");
      }
    }
  };

  const handleDocumentAction = async (action: "copy_text" | "send_text" | "sph" | "invoice") => {
    if (!selectedCustomer) return;

    const items = Array.isArray(selectedCustomer.qualification?.items) ? selectedCustomer.qualification!.items : [];
    if (items.length === 0) {
      alert("Lead Qualifications masih kosong!");
      return;
    }

    const generateText = () => {
      let text = `Berikut estimasi harganya ya kak 😊:\n\n`;
      let total = 0;

      items.forEach((item: any, i: number) => {
        let jenisProduk = "";
        let otherSpecs: string[] = [];
        
        if (item.specs && Array.isArray(item.specs)) {
          jenisProduk = item.specs.find((s: string) => s.startsWith("Jenis Produk:")) || "";
          otherSpecs = item.specs.filter((s: string) => !s.startsWith("Jenis Produk:"));
        }

        text += `*Item ${i + 1}*\n`;
        if (jenisProduk) {
          text += `- ${jenisProduk}\n`;
        }
        text += `- Jumlah: ${item.qty} pcs\n`;
        text += `- Harga: Rp ${item.pricePerPcs?.toLocaleString('id-ID')}/pcs\n`;
        if (otherSpecs.length > 0) {
          text += `- Spesifikasi:\n  ${otherSpecs.join('\n  ')}\n`;
        }
        text += `*Subtotal: Rp ${item.totalPrice?.toLocaleString('id-ID')}*\n\n`;
        total += (item.totalPrice || 0);
      });

      text += `*Total Keseluruhan: Rp ${total.toLocaleString('id-ID')}*\n\n`;
      text += `Sebagai informasi, Kami selalu menjaga:\n`;
      text += `- hasil jahit/sablon/bordir rapi\n`;
      text += `- produksi sesuai timeline\n\n`;
      text += `Agar hasil akhirnya nyaman 👍\n`;
      text += `Jika ada yang ditanyakan silahkan ya kak 😊`;
      return text;
    };

    if (action === "copy_text" || action === "send_text") {
      const text = generateText();
      if (action === "copy_text") {
        try {
          await navigator.clipboard.writeText(text);
          alert("Teks quotation berhasil disalin!");
        } catch (e) {
          alert("Gagal copy text");
        }
      } else {
        setInjectedText(text);
      }
      } else if (action === "sph" || action === "invoice") {
        try {
          const payload = {
            customerId: selectedCustomer.id,
            customerName: selectedCustomer.name,
            items: items.map((item: any, index: number) => ({
              name: `Item ${index + 1}`,
              qty: item.qty,
              price: item.pricePerPcs || item.price,
              specs: item.specs || [],
              hasAttachment: false
            })),
          };

          localStorage.setItem(`doc_draft_${selectedCustomer.id}`, JSON.stringify(payload));
          
          const targetPath = action === "sph" ? "/app/quotations" : "/app/invoices";
          window.open(`${targetPath}?customerId=${selectedCustomer.id}&action=create`, '_blank');

      } catch (error) {
        console.error(error);
        alert(`Gagal membuka halaman ${action.toUpperCase()}`);
      }
    }
  };

  const handleChangeOwner = async (customerId: string, owner: string) => {
    // Optimistic update
    setCustomers(customers.map(c => c.id === customerId ? { ...c, owner } : c));
    await changeChatOwner(customerId, owner);
  };

  const handleSendMessage = async (customerId: string, text: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const sender = customer.owner === "Karina" ? "bot" : customer.owner === "CRM" ? "crm" : "cs";

    // Optimistic update
    const tempMessage = {
      id: Date.now().toString(),
      customerId,
      sender,
      text,
      isRead: true,
      attachments: [],
      createdAt: new Date(),
    };

    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          messages: [...c.messages, tempMessage]
        };
      }
      return c;
    }));

    // Server Action
    await sendMessage(customerId, text, sender);

    // Smart Detection: Check if text looks like a quotation
    if (text.includes("*Total Keseluruhan: Rp") || text.includes("*Total Keseluruhan (Termasuk Jumbo): Rp")) {
      const items = Array.isArray(customer.qualification?.items) ? customer.qualification!.items : [];
      if (items.length > 0) {
        const totalAmount = items.reduce((sum, item: any) => sum + (item.totalPrice || 0), 0);
        const { saveQuotationToDb } = await import("../../../actions/documents");
        const docNumber = `TXT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        await saveQuotationToDb({
          docNumber,
          customerName: customer.name,
          amount: totalAmount,
          customerId: customer.id,
          status: "Draft"
        });
      }
    }
  };

  return (
    <div className="flex h-full w-full bg-white relative">
      {/* Kolom Kiri: Daftar Chat */}
      <div className={`w-full md:w-80 border-r border-slate-200 flex-col shrink-0 ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        <ChatList
          customers={customers}
          selectedChatId={selectedChatId}
          onSelectChat={(id) => {
            setSelectedChatId(id);
            setIsMobileChatOpen(true);
          }}
        />
      </div>

      {/* Kolom Tengah: Timeline Percakapan */}
      <div className={`flex-1 flex-col min-w-0 bg-slate-50 ${isMobileChatOpen ? 'flex' : 'hidden md:flex'}`}>
        {selectedCustomer ? (
          <ChatTimeline
            customer={selectedCustomer}
            allCustomers={customers}
            onChangeOwner={(owner) => handleChangeOwner(selectedCustomer.id, owner)}
            onSendMessage={(text) => handleSendMessage(selectedCustomer.id, text)}
            onDeleteMessage={(messageId) => {
              setCustomers(customers.map(c => ({
                ...c,
                messages: c.messages.filter(m => m.id !== messageId)
              })));
            }}
            injectedText={injectedText}
            onInjectedTextCleared={() => setInjectedText("")}
            onBack={() => setIsMobileChatOpen(false)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Pilih percakapan untuk memulai
          </div>
        )}
      </div>

      {/* Kolom Kanan: Customer Info */}
      <div className="w-80 border-l border-slate-200 flex-col shrink-0 bg-white hidden lg:flex">
        {selectedCustomer ? (
          <CustomerInfo
            customer={selectedCustomer}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onActionSelect={handleDocumentAction}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm p-8 text-center">
            Detail customer akan muncul di sini
          </div>
        )}
      </div>

      {/* Calculator Drawer */}
      {isCalculatorOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/10 flex justify-end pointer-events-none">
          <div className="bg-white w-full md:w-[65%] h-full shadow-2xl relative animate-in slide-in-from-right duration-300 pointer-events-auto border-l border-slate-200">
            {/* Drawer Handle */}
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="absolute -left-6 top-8 z-10 w-12 h-12 bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-slate-900 cursor-pointer transition-all"
              title="Tutup Kalkulator"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="w-full h-full overflow-hidden">
              <CalculatorClient
                customerContext={{ id: selectedCustomer.id, name: selectedCustomer.name, qualification: selectedCustomer.qualification }}
                onClose={() => setIsCalculatorOpen(false)}
                onActionSelect={handleCalculatorAction}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
