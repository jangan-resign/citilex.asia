"use client";

import React from "react";
import { generateWaLink, gtag_report_conversion } from "../../lib/utils";

interface WhatsAppButtonProps {
  message: string;
  className?: string;
  children: React.ReactNode;
}

export default function WhatsAppButton({ message, className, children }: WhatsAppButtonProps) {
  return (
    <a
      href={generateWaLink(message)}
      onClick={() => {
        gtag_report_conversion();
      }}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
