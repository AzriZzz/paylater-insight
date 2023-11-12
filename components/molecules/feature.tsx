"use client";

import React from "react";
import { Button } from "../ui/button";
import { IFeature } from "@/types/spaylater";
import Image from "next/image";
import { filterClassNames } from "@/utils/filterClassNames";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureProps {
  feature: IFeature;
}

const Feature = ({ feature }: FeatureProps) => {
  const {
    title,
    image,
    description,
    btnText,
    btnLink,
    position = "left",
    available = true,
  } = feature;

  let imagePosition = "";

  switch (position) {
    case "left":
      imagePosition = "md:flex-row";
      break;
    case "right":
      imagePosition = "md:flex-row-reverse";
      break;
    default:
      imagePosition = "md:flex-row";
      break;
  }

  const classNames = filterClassNames([
    imagePosition,
    "feature-description flex flex-col",
    "justify-between rounded-2xl lg:h-[50vh] text-center md:text-left",
    "shadow-md",
  ]);

  return (
    <Card className={classNames}>
      <div className="flex-1 flex justify-center items-center ">
        <Image
          src={image}
          width={50}
          height={50}
          alt="PayLater Insight logo"
          priority={true}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center text-center md:text-left ">
        <CardHeader>
          <CardTitle className="flex flex-col md:flex-row items-center md:items-end">
            {title}
            {!available && (
              <span className="md:pl-3 pt-2 md:pt-0 text-xs">
                ✨ coming soon ✨
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-justify ">{description}</CardContent>
        <CardFooter className="flex justify-center md:justify-start">
          <Button>
            <a href={btnLink}>{btnText}</a>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Feature;
