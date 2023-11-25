"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  calculateInterestAndSetSummary,
  calculateSummary,
  valueReminder,
} from "@/src/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import TikTokVideo from "@/src/components/molecules/tiktok-video";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import LottiePlayer from "@/src/components/molecules/lottie-player";
import ResultTables from "@/src/components/organisms/spaylater/result-table";
import { ISummary } from "@/src/types/spaylater";
import { Checkbox } from "@/src/components/ui/checkbox";
import { FormSchema } from "@/src/schemas/spaylaterSchema";
import {
  DefaultValuesForm,
  ResetValuesFrom,
  SummaryForm,
} from "@/src/constants/spaylater/form";
import { useNumberFormatter } from "@react-aria/i18n";

type FormSchemaValues = z.infer<typeof FormSchema>;

const defaultValues: Partial<FormSchemaValues> = DefaultValuesForm;

const resetValues: Partial<FormSchemaValues> = ResetValuesFrom;

const SPayLater = () => {
  const [isResult, setIsResult] = useState(false);
  const [paylaterResult, setPaylaterResult] = useState<any>({});
  const [summary, setSummary] = useState<ISummary>(SummaryForm);
  const [isLimit, setIsLimit] = useState(false);
  const formatter = useNumberFormatter();

  const t = useTranslations("Home");
  const r = useTranslations("SpayLater");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { reset, watch } = form;

  const isLimitChecked = watch("isLimit");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const dataResult = calculateSummary(data);
    const { isLimit } = data;
    const summary = calculateInterestAndSetSummary(data);

    setSummary(summary);
    setIsLimit(isLimit);
    setPaylaterResult(dataResult);
    setIsResult(true);

    const summaryElement = document.getElementById("summary");
    if (summaryElement) {
      summaryElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function resetForm() {
    reset(resetValues);
    setIsResult(false);
    setIsLimit(false);
  }

  const howToTutorial = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col">
          <div className="step-1 mb-5">
            <h3 className="font-semibold mb-2 text-xl">
              {r("Body.howToUse.steps.step1.title")}
            </h3>
            <p className="text-justify ">
              {r("Body.howToUse.steps.step1.description")}
            </p>
            <br />
            <p className="text-justify font-semibold italic">
              {r("Body.howToUse.steps.disclaimer")}
            </p>
          </div>

          <div className="step-2 mb-5">
            <h3 className="font-semibold mb-2 text-xl">
              {r("Body.howToUse.steps.step2.title")}
            </h3>
            <p className="text-justify ">
              {r("Body.howToUse.steps.step2.description")}
            </p>
          </div>

          <div className="step-3 mb-5">
            <h3 className="font-semibold mb-2 text-xl">
              {r("Body.howToUse.steps.step3.title")}
            </h3>
            <p className="text-justify ">
              {r("Body.howToUse.steps.step3.description")}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const spayLaterSummary = () => {
    const {
      month,
      interestCharged,
      interestRate,
      interestBasedOnInput,
      withInterest,
    } = summary;
    // Convert interestRate and interestBasedOnInput to numbers
    const numericInterestRate = parseFloat(interestRate.toString());
    const numericInterestBasedOnInput = parseFloat(
      interestBasedOnInput.toString()
    );

    // Compare the two numeric values
    const selectedInterestRate =
      numericInterestRate === numericInterestBasedOnInput
        ? numericInterestRate
        : numericInterestBasedOnInput;
    return (
      <div className="flex flex-row justify-evenly">
        <div className="hidden md:flex align-middle items-center">
          <LottiePlayer
            animationData={require("../../../animation/flying-money.json")}
            className="w-full max-w-[200px] h-[100px]"
          />
        </div>
        <div className=" text-xl text-center pt-5">
          <p>
            {r("Header.Summary.Summary2.after")}{" "}
            <span className="font-bold text-2xl">
              {month} {r("Header.Summary.Summary2.months")}
            </span>{" "}
            , {r("Header.Summary.Summary2.toPay")}{" "}
            <span className="font-bold text-2xl">
              {r("Header.Summary.Summary2.extra")}
            </span>{" "}
          </p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            RM{interestCharged}{" "}
          </h3>
          <p>{r("Header.Summary.Summary2.equivalent")}</p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            {selectedInterestRate}%!
          </h3>
          <p>
            {numericInterestRate !== numericInterestBasedOnInput && (
              <span className="text-yellow-500 ml-2 text-base">
                ({r("Header.Summary.Summary2.overchanged")})
              </span>
            )}
          </p>
          <p>{r("Header.Summary.Summary2.withTotalAmount")}</p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            RM {formatter.format(parseFloat(withInterest))}
          </h3>
        </div>
        <div className="hidden md:flex align-middle items-center">
          <LottiePlayer
            animationData={require("../../../animation/flying-money.json")}
            className="w-full  max-w-[200px] h-[100px]"
          />
        </div>
      </div>
    );
  };

  const spayLaterSummaryLimit = () => {
    const {
      price,
      month,
      monthInstallement,
      interestRate,
      spaylaterPrice,
      interestCharged,
    } = summary;

    const result = formatter.format(
      price + monthInstallement * month - spaylaterPrice!
    );

    return (
      <div className="flex flex-row justify-evenly">
        <div className="hidden md:flex align-middle items-center">
          <LottiePlayer
            animationData={require("../../../animation/flying-money.json")}
            className="w-full max-w-[200px] h-[100px]"
          />
        </div>
        <div className=" text-lg text-center pt-5">
          <p>
            {r("Header.Summary.Summary3.upfront")}{" "}
            <span className="font-bold text-2xl">
              RM {formatter.format(price - spaylaterPrice!)}
            </span>
            {""} {r("Header.Summary.Summary3.then")}{" "}
            <span className="font-bold text-2xl">{month} </span>
            {r("Header.Summary.Summary3.monthTotal")}{" "}
          </p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            RM{monthInstallement * month - spaylaterPrice!}{" "}
          </h3>
          <p>{r("Header.Summary.Summary3.withAnInterest")}</p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            {valueReminder(parseFloat(interestRate))}%
          </h3>

          <p>
            {r("Header.Summary.Summary3.withThat")} {month} month{" "}
            {r("Header.Summary.Summary3.willBe")}{" "}
          </p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            RM {result}
          </h3>
        </div>
        <div className="hidden md:flex align-middle items-center">
          <LottiePlayer
            animationData={require("../../../animation/flying-money.json")}
            className="w-full  max-w-[200px] h-[100px]"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="spaylater">
        <div className="spaylater-header bg-[#0a6160]">
          <div className="container text-white pt-9 pb-72">
            <h1 className="font-bold text-3xl py-4 ">{r("Header.title")}</h1>
            <p className=" mb-4">{r("Header.description")}</p>
          </div>
        </div>
        <div className="container">
          <div className="flex justify-center -mt-[260px] pb-12">
            <Card className="rounded-xl shadow-lg w-full ease-in-out duration-300 hover:transform flex ">
              <CardContent className="text-left flex flex-col md:flex-row w-full  p-0">
                <div className="flex flex-col md:w-1/3 py-7 px-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              {r("Header.Form.productPrice")} (RM)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1119.90"
                                className="text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      <div>
                        <h3 className="font-semibold pb-3">
                          {r("Header.Form.spaylaterPrice")}
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center">
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="spaylaterPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="1135.79"
                                      className="text-base"
                                      disabled={!isLimitChecked}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex-1 ">
                            <FormField
                              control={form.control}
                              name="isLimit"
                              render={({ field }) => (
                                <FormItem className=" flex justify-center pl-2 pt-5 md:pt-0">
                                  <div className="flex">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="pl-4">
                                      Limit Reached
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold">
                        {r("Header.Form.monthlyInstallment")} {""}
                        (RM)
                      </h3>
                      <FormField
                        control={form.control}
                        name="oneMonth"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input
                                  placeholder="1135.79"
                                  className="text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center text-base">
                                x 1 Month
                              </FormLabel>
                            </div>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="threeMonth"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input
                                  placeholder="389.79"
                                  className="text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center text-base">
                                x 3 Month
                              </FormLabel>
                            </div>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sixMonth"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input
                                  placeholder="203.39"
                                  className="text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center text-base">
                                x 6 Month
                              </FormLabel>
                            </div>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="twelveMonth"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input
                                  placeholder="110.04"
                                  className="text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center text-base">
                                x 12 Month
                              </FormLabel>
                            </div>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-evenly">
                        <Button
                          type="reset"
                          onClick={() => resetForm()}
                          className="py-3 mx-6 font-bold bg-[#00491e] w-full"
                          disabled={!isResult}
                        >
                          {r("Header.Form.reset")}
                        </Button>
                        <Button
                          type="submit"
                          className="py-3 mx-6 font-bold bg-[#08cf65] w-full"
                        >
                          {r("Header.Form.submit")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
                <div id="summary" className="md:w-2/3">
                  {!isResult ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={!isResult ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="result h-full"
                    >
                      <div className="hidden md:flex flex-col justify-center items-center h-full p-7">
                        <Image
                          src="/images/497.svg"
                          width={250}
                          height={250}
                          alt="A guy showing his chat"
                          priority={true}
                        />
                        <h3 className=" text-2xl font-semibold pb-3">
                          {r("Header.Summary.DefaultSummary.title")}
                        </h3>
                        <p className="max-w-md text-center pb-6">
                          {r("Header.Summary.DefaultSummary.description")}
                        </p>
                        <span className="max-w-md text-center text-xs font-bold">
                          {r("Header.Summary.DefaultSummary.disclaimer")}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isResult ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="result h-full bg-emerald-50 rounded-r-xl"
                      >
                        <div className="p-6 h-full flex flex-col justify-center">
                          <h4 className="font-semibold text-2xl text-center">
                            {r("Header.Summary.title")}
                          </h4>
                          {isLimit
                            ? spayLaterSummaryLimit()
                            : spayLaterSummary()}
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {isResult && (
          <div className="container pb-12">
            <h3 className="text-center font-bold text-3xl pb-6">
              {r("Body.breakdown")}
            </h3>
            <ResultTables results={paylaterResult} />
          </div>
        )}
        <div className="container">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {r("Body.howToUse.heading")}
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="flex justify-center pb-6 md:w-1/2">
              <Tabs defaultValue="image" className="w-full">
                <TabsContent
                  value="image"
                  className="mb-4 flex justify-center "
                >
                  <Image
                    src="/images/example-product.png"
                    width={350}
                    height={350}
                    alt="Example product indicating the location of the PayLater option"
                    priority={true}
                    className="shadow-lg rounded-xl border border-gray-200 p-3"
                  />
                </TabsContent>
                <TabsContent value="video" className="mb-4">
                  <div className="mb-3 w-full">
                    <TikTokVideo id="7298326817939721473" />
                  </div>
                </TabsContent>
                <div className="w-full flex justify-center">
                  <TabsList className="grid w-1/3 grid-cols-2">
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
            <div className="md:w-1/2">{howToTutorial()}</div>
          </div>
        </div>
        <div className="container pb-12">
          <h3 className="text-center font-bold text-3xl pb-6">
            {r("Body.BNPLSection.title")}
          </h3>
          <div className="flex justify-center">
            <Image
              src="/images/bnpl.png"
              width={400}
              height={400}
              alt="Buy Now Pay Later Imagery"
              priority={true}
              className="pb-10"
            />
          </div>
          <p className="text-justify text-base md:text-lg">
            {r("Body.BNPLSection.description1")}
            <br /> <br />
            {r("Body.BNPLSection.description2")}
          </p>
          <div className="flex justify-center pt-10">
            <Button className="py-3 px-6 font-bold bg-blue-900 ease-in-out duration-300">
              <a
                href="https://www.investopedia.com/buy-now-pay-later-5182291"
                target="_blank"
              >
                {r("Body.BNPLSection.btnText")}
              </a>
            </Button>
          </div>
        </div>
        <div className="container pb-12">
          <h3 className="text-center font-bold text-3xl pb-6">
            {r("Body.SPayLaterSection.title")}
          </h3>
          <p className="text-justify text-base md:text-lg">
            {r("Body.SPayLaterSection.description1")}
          </p>
          <div className="flex justify-center pt-10">
            <Button className="py-3 px-6 font-bold bg-[#EE4D2D] ease-in-out duration-300">
              <a
                href="https://help.shopee.com.my/portal/category/31-Payments/668-SPayLater?page=1"
                target="_blank"
              >
                {r("Body.SPayLaterSection.btnText")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SPayLater;
