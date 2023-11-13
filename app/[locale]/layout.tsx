import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/molecules/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "./GoogleAnalytics";
import { siteConfig } from "@/config/site";
import ScrollToTopButton from "@/components/molecules/scroll-to-top";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/components/molecules/header";
import Footer from "@/components/molecules/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "700", "900"],
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "my" }];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
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
    images: [`${siteConfig.url}/og.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "AzriZzz",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen font-sans antialiased bg-[fefdfc]",
          fontSans.variable
        )}
      >
        <Header />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ScrollToTopButton />
          </ThemeProvider>
          <Toaster />
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <Footer />
      </body>
    </html>
  );
}
