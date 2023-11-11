import React from "react";

interface BenefitsCardProps {
  title: string;
  description: string;
}

const BenefitsCard = (props: BenefitsCardProps) => {
  const { title, description } = props;
  return <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>;
};

export default BenefitsCard;
