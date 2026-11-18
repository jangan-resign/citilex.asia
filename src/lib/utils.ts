import { companyConfig } from "../config/company";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export const gtag_report_conversion = (url?: string, waMessage?: string) => {
  if (typeof window === "undefined") {
    return false;
  }

  const pagePath = window.location.pathname;
  const pageLocation = window.location.href;
  const pageTitle = typeof document !== "undefined" ? document.title : "";
  const waEventPayload = {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: pageTitle,
    wa_message: waMessage || "",
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    ...waEventPayload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: waMessage || pagePath,
      ...waEventPayload,
    });

    window.gtag("event", "conversion", {
      send_to: "AW-18279242485/OsqECO3h-cYcEPW1nIxE",
      value: 1.0,
      currency: "IDR",
      event_callback: () => {
        if (url) {
          window.location.href = url;
        }
      },
    });
  } else if (url) {
    window.location.href = url;
  }

  return false;
};

export const generateWaLink = (message: string) => {
  return `https://api.whatsapp.com/send?phone=${companyConfig.whatsappNumber}&text=${encodeURIComponent(message)}`;
};
