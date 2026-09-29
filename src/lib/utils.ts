import { companyConfig } from "../config/company";

declare global {
  interface Window {
    gtag?: any;
  }
}

export const gtag_report_conversion = (url?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18279242485/OsqECO3h-cYcEPW1nIxE',
      value: 1.0,
      currency: 'IDR',
      event_callback: () => {
        if (url) {
          window.location.href = url;
        }
      }
    });
  } else {
    if (url) {
      window.location.href = url;
    }
  }

  return false;
};

export const generateWaLink = (message: string) => {
  return `https://api.whatsapp.com/send?phone=${companyConfig.whatsappNumber}&text=${encodeURIComponent(message)}`;
};
