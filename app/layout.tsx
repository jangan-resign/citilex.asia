import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Kaos Custom untuk Event | CITILEX ASIA",
  description: "CITILEX ASIA menyediakan jasa produksi kaos custom untuk event, gathering, seminar, dan kebutuhan acara dengan proses profesional.",
  metadataBase: new URL("https://citilex.asia"),
  alternates: {
    canonical: "https://citilex.asia",
  },
  openGraph: {
    title: "Kaos Custom untuk Event | CITILEX ASIA",
    description: "CITILEX ASIA menyediakan jasa produksi kaos custom untuk event, gathering, seminar, dan kebutuhan acara dengan proses profesional.",
    url: "https://citilex.asia",
    siteName: "Citilex Asia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Citilex Asia - Kaos Custom Event",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaos Custom untuk Event | CITILEX ASIA",
    description: "CITILEX ASIA menyediakan jasa produksi kaos custom untuk event, gathering, seminar, dan kebutuhan acara dengan proses profesional.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/faviconcitilexx.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="id" 
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <head>
   
        {/* Google Ads Conversion Tracking */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18279242485"
        />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
        
              gtag('config', 'AW-18279242485');
            `,
          }}
        />
  
      </head>

      <body
        
        className="
          antialiased
          font-inter
          bg-white
          text-brand-onyx
          selection:bg-brand-primary
          selection:text-brand-white
        "
      >

        {children}

      </body>
      
    </html>
  );
}
