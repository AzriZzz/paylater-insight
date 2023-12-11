"use client";

import React from "react";
import { ModeToggle } from "../ui/toggleMode";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/src/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const generateLocaleUrl = () => {
    const basePath = pathname.split("/")[2];
    return `/${basePath || ""}`;
  };
  return (
    <div>
      <div className="flex justify-between px-3 md:px-5 md:pt-4 md:mb-5">
        <div className="flex items-center">
          <Link href="/" className="flex">
            <Image
              src="/images/paylaterinsight-icon.png"
              width={50}
              height={50}
              style={{ width: 50, height: 50 }}
              alt="PayLater Insight logo"
              priority={true}
            />
            <h1 className="hidden md:flex md:w-fit md:text-2xl font-semibold py-2 items-center">
              PayLater Insight
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex mr-4 text-base">
            <Link
              href={generateLocaleUrl()}
              locale="my"
              className={`px-2 ${locale === "my" ? "font-semibold" : ""}`}
            >
              BM
            </Link>
            |
            <Link
              href={generateLocaleUrl()}
              locale="en"
              className={`px-2 ${locale === "en" ? "font-semibold" : ""}`}
            >
              ENG
            </Link>
          </div>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
