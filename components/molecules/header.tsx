import React from "react";
import { ModeToggle } from "../ui/toggleMode";
import Image from "next/image";
import Link from "next-intl/link";
import { usePathname } from 'next/navigation';



const Header = () => {
  const pathname = usePathname();
  console.log(pathname)
  const toggleLanguage = pathname !== "/en";
  return (
    <div className="flex justify-between px-3 md:px-10 pt-4">
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
          <h1 className="hidden md:block md:w-fit text-2xl font-semibold py-2">
            PayLater Insight
          </h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex mr-4">
          {
            toggleLanguage ? (
              <Link href="/" locale="en">
                ENG
              </Link>
            ) : (
              <Link href="/" locale="my">
                BM
              </Link>
            )
          }
          {/* <Link href="/" locale="en">
            ENG
          </Link>
          <Link href="/" locale="my">
            BM
          </Link> */}
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
