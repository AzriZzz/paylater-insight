// app/GoogleAnalytics.jsx

"use client";

import Script from "next/script";
import * as gtag from "../gtag";

const GoogleAnalytics = () => {
  //You can show in the console the GA_TRACKING_ID to confirm
  if (process.env.NODE_ENV !== "production") {
    console.log(gtag.GA_TRACKING_ID);
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      });
                    `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
