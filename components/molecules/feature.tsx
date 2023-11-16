"use client";

import React from "react";
import { Button } from "../ui/button";
import { IFeature } from "@/types/spaylater";
import { filterClassNames } from "@/utils/filterClassNames";
import { motion } from "framer-motion";
import Link from "next/link";

interface FeatureProps {
  feature: IFeature;
}

const Feature = ({ feature }: FeatureProps) => {
  const { title, description, btnText, btnLink, available = false } = feature;

  const classNames = filterClassNames([
    "feature-description flex flex-col",
    "md:w-3/4 md:h-[40vh] text-center md:text-left pt-10",
  ]);

  const handleClick = (e: { preventDefault: () => void }) => {
    if (!available) {
      e.preventDefault();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className={classNames}>
        <div className="flex flex-col md:flex-row items-center md:items-end">
          <h3 className="text-2xl md:text-3xl font-semibold pb-6">{title}</h3>
        </div>
        <p className="text-justify text-base lg:text-lg pb-6">{description}</p>
        <div className=" md:w-fit">
          <Button
            className={`py-3 px-6 font-bold bg-[#08cf65] ${
              !available && "cursor-not-allowed"
            }`}
            onClick={handleClick}
            disabled={!available}
          >
            <Link href={btnLink} tabIndex={available ? 0 : -1}>
              {btnText}
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
