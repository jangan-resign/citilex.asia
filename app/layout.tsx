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
  title: "Kaos Custom untuk Event | Citilex Asia",
  description: "Citilex Asia menyediakan produksi kaos custom untuk event, gathering, seminar, dan kebutuhan acara dengan proses profesional.",
  metadataBase: new URL("https://citilex.asia"),
  alternates: {
    canonical: "https://citilex.asia",
  },
  openGraph: {
    title: "Kaos Custom untuk Event | Citilex Asia",
    description: "Citilex Asia menyediakan produksi kaos custom untuk event, gathering, seminar, dan kebutuhan acara dengan proses profesional.",
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
    title: "Kaos Custom untuk Event | Citilex Asia",
    description: "Citilex Asia menyediakan produksi kaos custom untuk event, gathering, seminar, dan kebutuhan acara dengan proses profesional.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
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
        {/* ==========================================================
            ANALYTICS & CONVERSION TRACKING PLACEHOLDERS
            Replace GTM-XXXXXXX and G-XXXXXXXXXX with actual keys in production.
           ========================================================== */}

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
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

        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {children}

      </body>
    </html>
  );
}
