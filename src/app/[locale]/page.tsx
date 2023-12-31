"use client";

import BenefitsCard from "@/src/components/molecules/benefits-card";
import Feature from "@/src/components/molecules/feature";
import { Button } from "@/src/components/ui/button";
import { Features } from "@/src/constants/spaylater/feature";
import { IBenefitsCard } from "@/src/types/spaylater";
import React, { useEffect } from "react";
import FAQ from "@/src/components/molecules/faq";
import Image from "next/image";
import Section from "@/src/components/molecules/section";
import LottiePlayer from "@/src/components/molecules/lottie-player";
import SolutionCard from "@/src/components/molecules/solution-card";
import { solutionCardData } from "@/src/constants/solution";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("Home");

  const translatedSolution = solutionCardData.map((card, index) => ({
    ...card,
    title: t(`SolutionSection.SolutionCard.title${index + 1}`),
    description: t(`SolutionSection.SolutionCard.description${index + 1}`),
  }));

  const translatedFeatures = Features.map((card, index) => ({
    ...card,
    title: t(`ManagingSection.FeatureCard.title${index + 1}`),
    description: t(`ManagingSection.FeatureCard.description${index + 1}`),
    btnText: t(`ManagingSection.FeatureCard.button${index + 1}`),
  }));

  const translatedBenefits: IBenefitsCard[] = [
    {
      title: t("BenefitsSection.BenefitsCard.title1"),
      description: t("BenefitsSection.BenefitsCard.description1"),
      image: "/images/94.svg",
    },
    {
      title: t("BenefitsSection.BenefitsCard.title2"),
      description: t("BenefitsSection.BenefitsCard.description2"),
      image: "/images/114.svg",
    },
    {
      title: t("BenefitsSection.BenefitsCard.title3"),
      description: t("BenefitsSection.BenefitsCard.description3"),
      image: "/images/72.svg",
    },
  ];

  useEffect(() => {
    // Or clear all localStorage or sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  }, []);


  return (
    <main>
      <Section>
        <div className="intro-section">
          <div className="container flex flex-col align-middle items-center text-center">
            <div className="intro-section md:w-[700px] lg:w-[900px] flex flex-col items-center">
              <h1 className="text-center text-4xl md:text-6xl font-bold text whitespace-normal my-6">
                {t("IntroSection.title")}
              </h1>
              <p className="mb-8 text-gray-600 md:w-[750px] text-center md:text-xl">
                {t("IntroSection.description")}
              </p>
              <div>
                <Button className="py-3 px-6 font-bold bg-[#08cf65]">
                  <a href="#start-manage">{t("IntroSection.ctaButton")}</a>
                </Button>
              </div>
            </div>
            <div className="intro-section-image pt-10 lg:pt-0 flex flex-col md:flex-row items-center md:justify-evenly w-full md:h-[40vh]">
              <div className="flex-none w-[400px] h-[200px] relative hidden md:block">
                <Image
                  src="/images/12.svg"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="70%"
                  alt="A guy showing his chat"
                  priority={true}
                />
              </div>
              <div className="flex-none w-[400px] h-[300px] relative ">
                <Image
                  src="/images/47.svg"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="70%"
                  alt="A plant that has grown with money symbol around it"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <div className="problem-statement-section bg-gradient-to-b from-white to-[#ebf5f3]">
        <Section>
          <div className="container h-[400px] text-2xl italic flex flex-col justify-center items-center text-center">
            <p className=" md:w-[800px] md:text-4xl font-semibold">
              &ldquo;{t("AdviceSection.quote")}&rdquo;
            </p>
            <span className="  md:text-3xl pt-3">
              – {t("AdviceSection.author")}
            </span>
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
                    {translatedSolution.map((card, index) => (
                      <SolutionCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        number={card.number}
                        color={card.color}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:flex flex-1 md:sticky md:top-[30vh] w-full self-start justify-center ">
                <div className="flex flex-col mb-10 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-semibold text-center pb-10">
                    {t("SolutionSection.title")}
                  </h2>
                  <p className="md:text-xl md:leading-8 text-justify text-lg">
                    {t("SolutionSection.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <div
        id="start-manage"
        className="feature-section py-12  md:py-12 bg-gradient-to-t from-white to-[#ebf5f3]"
      >
        {/* <Section> */}
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            {t("ManagingSection.title")}
          </h2>
          <div className="flex flex-col md:flex-row align-middle items-center">
            <div className="md:flex flex-1 md:sticky md:top-[30vh] w-full self-start justify-center -translate-y-12 md:-translate-y-14 ">
              <LottiePlayer
                animationData={require("../../animation/working.json")}
                className="w-full max-w-[600px] h-[300px] md:h-[400px]"
              />
            </div>
            <div className="flex-1 text-center">
              <div className="grid grid-cols-1 gap-6">
                {translatedFeatures.map((card, index) => (
                  <Feature key={index} feature={card} />
                ))}
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
            {t("BenefitsSection.title")}
            </h1>
            <div className="flex flex-col md:flex-row gap-10 text-center justify-center">
              {translatedBenefits.map((benefit, index) => (
                <BenefitsCard key={index} benefit={benefit} />
              ))}
            </div>
          </div>
        </Section>
      </div>
      <div className="faq-section py-12 md:pt-12 md:pb-20 bg-[#ebf5f3]">
        <Section>
          <div className="container flex flex-col align-middle items-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10">
              {t("FAQ.title")}
            </h2>
            <FAQ />
          </div>
        </Section>
      </div>
    </main>
  );
};

export default Home;
