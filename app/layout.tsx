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
  title: "Produsen Kaos & Polo Custom | CITILEX ASIA",
  description: "Melayani produksi kaos & polo custom untuk event, seragam kantor, gathering, seminar, reuni, merchandise dan promosi brand. Kualitas terjamin dengan pengerjaan profesional dan pengiriman tepat waktu.",
  metadataBase: new URL("https://citilex.asia"),
  alternates: {
    canonical: "https://citilex.asia",
  },
  openGraph: {
    title: "Produsen Kaos & Polo Custom | CITILEX ASIA",
    description: "Melayani produksi kaos & polo custom untuk event, seragam kantor, gathering, seminar, reuni, merchandise dan promosi brand. Kualitas terjamin dengan pengerjaan profesional dan pengiriman tepat waktu.",
    url: "https://citilex.asia",
    siteName: "Citilex Asia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CITILEX ASIA - Produsen Kaos & Polo Custom",
      },
    ],
    locale: "id_ID",
    type: "website",
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

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5S44V8C2');
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
            src="https://www.googletagmanager.com/ns.html?id=GTM-5S44V8C2"
            height="0"
            width="0"
            style={{
              display:"none",
              visibility:"hidden"
            }}
          />
        </noscript>


        {children}

      </body>

    </html>
  );
}
