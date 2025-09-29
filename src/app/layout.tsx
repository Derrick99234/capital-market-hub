// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ import Script from next
import "./globals.css";
import { UserProvider } from "@/context/user-context";
import BackgroundVideo from "@/components/BackgroundVideo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capital Market Hub",
  description: "Multi-regulated Global Forex and Shares Broker.",
  icons: {
    icon: "/CapitalMarketHub.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundVideo />
        <UserProvider>{children}</UserProvider>

        {/* Google Translate Widget Container */}
        <div
          id="google_translate_element"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 9999,
          }}
        ></div>

        {/* Init function */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "en,fr,es,de,hy",
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                "google_translate_element"
              );
            }
          `}
        </Script>
        <Script id="smartsupp" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = "7b8fb2d7de2f8cd6c14defdb21c3ca82c28a65c8"; 
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName("script")[0];c=d.createElement("script");
              c.type="text/javascript";c.charset="utf-8";c.async=true;
              c.src="https://www.smartsuppchat.com/loader.js?";
              s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>

        {/* Load Google Translate API async */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
