import BenefitsCard from "@/components/molecules/benefits-card";
import Feature from "@/components/molecules/feature";
import { Button } from "@/components/ui/button";
import { Benefits } from "@/constants/spaylater/benefits";
import { Features } from "@/constants/spaylater/feature";
import { IBenefitsCard, IFeature } from "@/types/spaylater";
import React from "react";
import FAQ from "@/components/molecules/faq";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <div className="intro-section">
        <div className="container flex flex-col align-middle items-center text-center">
          <div className="intro-section md:w-[700px] lg:w-[900px] flex flex-col items-center">
            <h1 className="text-center text-4xl md:text-7xl font-bold text whitespace-normal mb-6">
              Finance Made Easy
            </h1>
            <p className="mb-8 text-gray-600 md:w-[750px] text-center md:text-xl">
              Effortlessly manage and review your financial life, from SPayLater
              plans to comprehensive budgeting and saving strategies
            </p>
            <div>
              <Button className="py-3 px-6 font-bold bg-[#08cf65]">
                <a href="#start-manage">Start Managing Now</a>
              </Button>
            </div>
          </div>
          <div className="intro-section-image pt-10 lg:pt-0 flex flex-col md:flex-row justify-center xl:justify-around w-full md:h-[30vh]">
            <Image
              src="/images/12.svg"
              width={500}
              height={500}
              alt="A guy showing his chat"
              priority={true}
              className="hidden xl:block"
            />
            <Image
              src="/images/47.svg"
              width={500}
              height={500}
              alt="A plant that has grown with money symbol around it"
              priority={true}
            />
          </div>
        </div>
      </div>
      <div className="problem-statement-section bg-gradient-to-b from-white to-[#ebf5f3]">
        <div className="container h-[400px] text-2xl italic flex flex-col justify-center items-center text-center">
          <p className=" md:w-[800px] md:text-4xl font-semibold">
            “A budget tells us what we cant afford, but it doesnt keep us from
            buying it.”
          </p>
          <span className="  md:text-3xl pt-3">– William Feather.</span>
        </div>
      </div>
      <div id="start-manage" className="feature-section py-6 md:py-12 bg-gradient-to-t from-white to-[#ebf5f3]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Start Managing Now
          </h2>
          <div className="flex flex-col md:flex-row align-middle items-center">
            <div className="hidden md:flex flex-1 sticky top-0 self-start  justify-center pt-20">
              <Image
                src="/images/13.svg"
                width={600}
                height={600}
                alt="PayLater Insight image"
                priority={true}
              />
            </div>
            <div className="flex-1 text-center">
              <div className="grid grid-cols-1 gap-6">
                {Features.map((feature: IFeature, index: number) => {
                  return <Feature key={index} feature={feature} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="benefits py-6 md:py-12 bg-gradient-to-b from-white to-[#ebf5f3]">
        <div className="container">
          <h1 className="text-center text-3xl md:text-4xl font-bold text whitespace-normal mb-6">
            Our Aim
          </h1>
          <div className="flex flex-col md:flex-row gap-10 text-center justify-center">
            {Benefits.map((benefit: IBenefitsCard, index: number) => {
              return <BenefitsCard key={index} benefit={benefit} />;
            })}
          </div>
        </div>
      </div>
      <div className="faq-section py-6 md:py-12 bg-[#ebf5f3]">
        <div className="container flex flex-col align-middle items-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">FAQs</h2>
          <FAQ />
        </div>
      </div>
    </main>
  );
};

export default Home;
