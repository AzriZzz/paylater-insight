import React from "react";
import { motion } from "framer-motion";

interface SolutionCardProps {
  title: string;
  description: string;
  number: number;
  color: string;
}

const cardVariants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const SolutionCard = (props: SolutionCardProps) => {
  const { title, description, number, color } = props;

  return (
    <div className="top-[30vh] pb-12">
      <motion.div
        className={`bg-${color}-500 shadow-lg rounded-xl max-w-xs mx-auto`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={cardVariants}
      >
        <div
          className={`bg-${color}-600 shadow-lg rounded-xl p-6 max-w-sm mx-auto text-left text-white h-[400px]`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="text-8xl">{number}</div>
            <div>
              <h2 className="text-3xl  font-bold mt-4 mb-2">{title}</h2>
              <p className=" text-justify text-xl">{description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SolutionCard;
