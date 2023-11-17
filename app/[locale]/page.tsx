"use client";

import BenefitsCard from "@/components/molecules/benefits-card";
import Feature from "@/components/molecules/feature";
import { Button } from "@/components/ui/button";
import { Benefits } from "@/constants/spaylater/benefits";
import { Features } from "@/constants/spaylater/feature";
import { IBenefitsCard, IFeature } from "@/types/spaylater";
import React from "react";
import FAQ from "@/components/molecules/faq";
import Image from "next/image";
import Section from "@/components/molecules/section";
import LottiePlayer from "@/components/molecules/lottie-player";
import SolutionCard from "@/components/molecules/solution-card";
import { solutionCardData } from "@/constants/solution";

const Home = () => {
  return (
    <main>
      <Section>
        <div className="intro-section">
          <div className="container flex flex-col align-middle items-center text-center">
            <div className="intro-section md:w-[700px] lg:w-[900px] flex flex-col items-center">
              <h1 className="text-center text-4xl md:text-6xl font-bold text whitespace-normal my-6">
                Personal Finance Made Easy
              </h1>
              <p className="mb-8 text-gray-600 md:w-[750px] text-center md:text-xl">
                Effortlessly manage and review your financial life, from
                SPayLater plans to comprehensive budgeting and saving strategies
              </p>
              <div>
                <Button className="py-3 px-6 font-bold bg-[#08cf65]">
                  <a href="#start-manage">Start Managing Now</a>
                </Button>
              </div>
            </div>
            <div className="intro-section-image pt-10 lg:pt-0 flex flex-col md:flex-row items-center md:justify-evenly w-full md:h-[40vh]">
              <Image
                src="/images/12.svg"
                width={500}
                height={500}
                alt="A guy showing his chat"
                priority={true}
                className="hidden md:block"
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
      </Section>
      <div className="problem-statement-section bg-gradient-to-b from-white to-[#ebf5f3]">
        <Section>
          <div className="container h-[400px] text-2xl italic flex flex-col justify-center items-center text-center">
            <p className=" md:w-[800px] md:text-4xl font-semibold">
              “A budget tells us what we cant afford, but it doesnt keep us from
              buying it.”
            </p>
            <span className="  md:text-3xl pt-3">– William Feather.</span>
          </div>
        </Section>
      </div>
      <div className="problem-solution bg-[#ebf5f3] pb-10">
        <Section>
          <div className="container">
            <div className="flex flex-col-reverse md:flex-row align-middle items-center">
              <div className="flex-1 text-center">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    {/* {solutionCardData.map((card, index) => (
                      <SolutionCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        number={card.number}
                        color={card.color}
                      />
                    ))} */}
                    <div className="space-y-4">
                      <SolutionCard
                        title="Simplified Financial Overview"
                        description="Get a consolidated view of your finances, from everyday expenses to pay-later plans, all in one place."
                        number={1}
                        color="bg-purple-500"
                      />
                      <SolutionCard
                        title="Strategic Budgeting Tools"
                        description="Utilize intuitive budgeting features that help you plan your spending, savings, and investments effectively."
                        number={2}
                        color="bg-blue-500"
                      />
                      <SolutionCard
                        title="Debt Management"
                        description="Stay on top of your debts with tools that help you understand and manage your pay-later commitments and other liabilities."
                        number={3}
                        color="bg-orange-500"
                      />
                      <SolutionCard
                        title="Informed Decision-Making"
                        description="Gain insights into your financial habits, helping you make smarter choices about your spending and saving."
                        number={4}
                        color="bg-red-500"
                      />
                      <SolutionCard
                        title="Goal Setting and Tracking"
                        description="Set financial goals and track your progress, ensuring you stay aligned with your long-term financial objectives."
                        number={5}
                        color="bg-green-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex flex-1 md:sticky md:top-[30vh] w-full self-start justify-center ">
                <div className="flex flex-col mb-10 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-semibold text-center pb-10">
                    Why Choose PayLater Insight?
                  </h2>
                  <p className="md:text-2xl md:leading-10 text-justify text-xl">
                    Managing money can be tricky, especially with so many bills,
                    loans, and savings goals to keep track of. Its easy to lose
                    sight of your financial health and make uninformed decisions
                    that can lead to debt and stress. PayLater Insight is here
                    to simplify your finances, offering an easy-to-use platform
                    that helps you understand and manage your spending, saving,
                    and debt all in one place.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="problem-solution flex flex-row">
              <div className="solution w-1/2">a</div>

              <div className=" w-1/2 text-justify text-xl pb-8 md:sticky md:top-[30vh]">
                
              </div>
            </div> */}
          </div>
        </Section>
      </div>
      <div
        id="start-manage"
        className="feature-section py-6 md:py-12 bg-gradient-to-t from-white to-[#ebf5f3]"
      >
        {/* <Section> */}
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Start Managing Now
          </h2>
          <div className="flex flex-col md:flex-row align-middle items-center">
            <div className="md:flex flex-1 md:sticky md:top-[30vh] w-full self-start justify-center -translate-y-12 md:-translate-y-14 ">
              <LottiePlayer
                animationData={require("./../../animation/working.json")}
                className="w-full max-w-[600px] h-[400px]"
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
        {/* </Section> */}
      </div>
      <div className="benefits py-6 md:py-12 bg-gradient-to-b from-white to-[#ebf5f3]">
        <Section>
          <div className="container">
            <h1 className="text-center text-3xl md:text-4xl font-bold text whitespace-normal mb-8">
              Our Aim
            </h1>
            <div className="flex flex-col md:flex-row gap-10 text-center justify-center">
              {Benefits.map((benefit: IBenefitsCard, index: number) => {
                return <BenefitsCard key={index} benefit={benefit} />;
              })}
            </div>
          </div>
        </Section>
      </div>
      <div className="faq-section py-12 md:pt-12 md:pb-20 bg-[#ebf5f3]">
        <Section>
          <div className="container flex flex-col align-middle items-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10">FAQs</h2>
            <FAQ />
          </div>
        </Section>
      </div>
    </main>
  );
};

export default Home;
