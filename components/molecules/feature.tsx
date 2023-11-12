"use client";

import React from "react";
import { Button } from "../ui/button";
import { IFeature } from "@/types/spaylater";
import { filterClassNames } from "@/utils/filterClassNames";

interface FeatureProps {
  feature: IFeature;
}

const Feature = ({ feature }: FeatureProps) => {
  const { title, description, btnText, btnLink, available = false } = feature;

  const classNames = filterClassNames([
    "feature-description flex flex-col",
    "md:w-3/4 text-center md:text-left pt-10 ",
  ]);

  const handleClick = (e: { preventDefault: () => void }) => {
    if (!available) {
      e.preventDefault();
    }
  };

  return (
    <div className={classNames}>
      <div className="flex flex-col md:flex-row items-center md:items-end">
        <h3 className="text-2xl md:text-3xl font-semibold pb-6">{title}</h3>
      </div>
      <p className="text-justify text md:text-xl pb-6">{description}</p>
      <div className=" md:w-fit">
        <Button
          className={`py-3 px-6 font-bold bg-[#08cf65] ${
            !available && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleClick}
          disabled={!available}
        >
          <a href={btnLink} tabIndex={available ? 0 : -1}>
            {btnText}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Feature;
