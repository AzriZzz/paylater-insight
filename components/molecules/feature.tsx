"use client";

import React from "react";
import { Button } from "../ui/button";
import { FeatureProps } from "@/types/spaylater";
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

const Feature = (props: FeatureProps) => {
  const { title, description, btnText, btnLink, position = "left" } = props;

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
    "justify-between rounded-2xl h-[50vh] text-center md:text-left",
    "shadow-lg"
  ]);

  return (
    <Card className={classNames}>
      <div className="flex-1 flex justify-center items-center ">
        <Image
          src={props.image}
          width={50}
          height={50}
          alt="PayLater Insight logo"
          priority={true}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center text-center md:text-left ">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
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
