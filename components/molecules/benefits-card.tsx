import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BenefitsCardProps } from "@/types/spaylater";

const BenefitsCard = (props: BenefitsCardProps) => {
  const { title, description } = props;
  return (
    <Card className="md:w-72">
      <CardHeader>
      <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-justify">{description}</CardContent>
    </Card>
  );
};

export default BenefitsCard;
