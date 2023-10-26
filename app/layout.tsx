import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "./GoogleAnalytics";
import { siteConfig } from "@/config/site";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/png",
    },
    shortcut: { url: "/favicon.png", type: "image/png" },
  },
  keywords: [
    "PayLater Insight",
    "PayLater",
    "Interest",
    "Financial",
    "Personal Finance",
    "Fintech",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Shopee",
    "Buy Now Pay Later",
  ],
  authors: [
    {
      name: "Muhammad Azri",
      url: "https://azrizzz.github.io/",
    },
  ],
  creator: "Muhammad Azri",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: "/paylater-insight.png",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: "/paylater-insight.png",
    creator: "AzriZzz",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
