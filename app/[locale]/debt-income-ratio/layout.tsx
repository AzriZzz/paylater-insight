import Link from "next/link";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface DebtIncomeRatioProps {
  children: React.ReactNode;
}

export default async function SPayLater({ children }: DebtIncomeRatioProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
