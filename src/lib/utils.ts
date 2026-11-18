import { companyConfig } from "../config/company";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

function pushAnalyticsEvent(
  eventName: string,
  extraPayload: Record<string, string>,
  fallbackLabel?: string
) {
  if (typeof window === "undefined") {
    return;
  }

  const pagePath = window.location.pathname;
  const payload = {
    event_category: "engagement",
    event_label: fallbackLabel || pagePath,
    ...extraPayload,
    page_path: pagePath,
    page_location: window.location.href,
    page_title: typeof document !== "undefined" ? document.title : "",
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}

export const gtag_report_conversion = (url?: string, waMessage?: string) => {
  if (typeof window === "undefined") {
    return false;
  }

  pushAnalyticsEvent(
    "whatsapp_click",
    { wa_message: waMessage || "" },
    waMessage || undefined
  );

  if (typeof window.gtag === "function") {
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

export const gtag_track_external_click = (
  eventName: "email_click" | "maps_click",
  label: string,
  destinationUrl: string
) => {
  pushAnalyticsEvent(eventName, { destination_url: destinationUrl }, label);
};

export const generateWaLink = (message: string) => {
  return `https://api.whatsapp.com/send?phone=${companyConfig.whatsappNumber}&text=${encodeURIComponent(message)}`;
};
