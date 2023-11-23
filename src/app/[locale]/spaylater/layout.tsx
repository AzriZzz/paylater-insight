import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

const locales = ["en", "my"];
interface SPayLaterProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function SPayLater({
  children,
  params: { locale },
}: SPayLaterProps) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
