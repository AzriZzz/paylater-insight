import BenefitsCard from "@/components/molecules/benefits-card";
import Feature from "@/components/molecules/feature";
import { Button } from "@/components/ui/button";
import { Benefits } from "@/constants/spaylater/benefits";
import { Features } from "@/constants/spaylater/feature";
import { IBenefitsCard, IFeature } from "@/types/spaylater";
import React from "react";
import FAQ from "@/components/molecules/faq";

const Home = () => {
  return (
    <main>
      <div className="intro-section">
        <div className="container flex flex-col align-middle items-center text-center">
          <div className="intro-section md:w-[700px] lg:w-[900px] flex flex-col items-center">
            <h1 className="text-center text-3xl md:text-5xl font-bold text whitespace-normal mb-6">
              Finance Made Easy
            </h1>
            <p className="mb-8 text-gray-600 md:w-[750px] text-center">
              Effortlessly manage and review your financial life, from SPayLater
              plans to comprehensive budgeting and saving strategies
            </p>
            <div>
              <Button className="">
                <a href="">Start Managing Now</a>
              </Button>
            </div>
            <div className="intro-section-image"></div>
          </div>
        </div>
      </div>
      <div className="problem-statement-section bg-gradient-to-b from-white to-[#ebf5f3]">
        <div className="container h-[400px] flex flex-col justify-center items-center text-center">
          <p className="italic md:w-[800px] text-base md:text-3xl">
            “A budget tells us what we cant afford, but it doesnt keep us from
            buying it.” – William Feather.
          </p>
        </div>
      </div>
      <div className="feature-section  py-6  bg-gradient-to-t from-white to-[#ebf5f3]">
        <div className="container flex flex-col align-middle items-center">
          <h2 className="text-3xl font-semibold mb-10">Start Managing Now</h2>
          <div className="feature-image"></div>
          <div className="grid grid-cols-1 gap-6">
            {Features.map((feature: IFeature, index: number) => {
              return <Feature key={index} feature={feature} />;
            })}
          </div>
        </div>
      </div>
      <div className="benefits py-6 bg-gradient-to-b from-white to-[#ebf5f3]">
        <div className="container">
          <h1 className="text-center text-3xl font-bold text whitespace-normal mb-6">
            Our Aim
          </h1>
          <div className="flex flex-col md:flex-row gap-10 text-center justify-center">
            {Benefits.map((benefit: IBenefitsCard, index: number) => {
              return (
                <BenefitsCard
                  key={index}
                title={benefit.title}
                  description={benefit.description}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="faq-section pt-6 pb-12 bg-[#ebf5f3]">
        <div className="container flex flex-col align-middle items-center">
          <h2 className="text-3xl font-semibold mb-10">FAQs</h2>
          <FAQ />
        </div>
      </div>
    </main>
  );
};

export default Home;
