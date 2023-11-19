import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBenefitsCard } from "@/types/spaylater";
import Image from "next/image";

interface BenefitsProps {
  benefit: IBenefitsCard;
}

const BenefitsCard = ({ benefit }: BenefitsProps) => {
  const { title, description, image } = benefit;
  return (
    <Card className="rounded-3xl pt-7 pb-5 shadow-lg lg:w-1/4 ease-in-out duration-300 hover:-translate-y-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className=" items-center flex flex-col">
        {description}
        <div className="flex-none w-52 h-52 md:w-44 md:h-44 lg:w-56 lg:h-56 relative">
          <Image
            src={image}
            fill
            style={{ objectFit: "cover" }}
            sizes="100%"
            alt={description}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
