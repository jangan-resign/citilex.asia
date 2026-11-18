"use client";

import React from "react";
import { gtag_track_external_click } from "../../lib/utils";

interface TrackedExternalLinkProps {
  href: string;
  eventName: "email_click" | "maps_click";
  eventLabel: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export default function TrackedExternalLink({
  href,
  eventName,
  eventLabel,
  className,
  target,
  rel,
  children,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        gtag_track_external_click(eventName, eventLabel, href);
      }}
    >
      {children}
    </a>
  );
}
