// src/app/layout-client.tsx
"use client";

import { usePathname } from "next/navigation";
import { UserProvider } from "@/context/user-context";
import BackgroundVideo from "@/components/BackgroundVideo";
import Script from "next/script";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <>
      <BackgroundVideo />
      <UserProvider>{children}</UserProvider>

      {/* Google Translate Widget */}
      <div
        id="google_translate_element"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 9999,
        }}
      ></div>

      {/* Tawk.to */}
      <Script id="tawkto" strategy="afterInteractive">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),
                s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/68da62a1311aad1952561475/1j6ah2i1m';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>

      {/* Google Translate Init */}
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              {
                pageLanguage: "en",
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              },
              "google_translate_element"
            );
          }
        `}
      </Script>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
