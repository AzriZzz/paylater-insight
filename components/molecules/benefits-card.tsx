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
    <Card className="rounded-3xl pt-7 pb-5 shadow-lg lg:w-1/4 hover:-translate-y-2 ease-in-out duration-300 hover:transform ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className=" text-base md:text-lg items-center flex flex-col">
        {description}
        <Image
          src={image}
          width={300}
          height={300}
          alt="A guy showing his chat"
          priority={true}
        />
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
