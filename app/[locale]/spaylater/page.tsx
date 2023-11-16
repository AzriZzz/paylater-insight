"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { calculateInterest, calculateInterestAndSetSummary } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import TikTokVideo from "@/components/molecules/tiktok-video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LottiePlayer from "@/components/molecules/lottie-player";
import ResultTables from "@/components/organisms/spaylater/result-table";
import { ISummary } from "@/types/spaylater";

const FormSchema = z
  .object({
    price: z.coerce
      .number({
        invalid_type_error: "Input must be a number.",
      })
      .min(1, "Product price must be greater than 0.")
      .max(20000, "Product price must be less than RM 20,000."),
    oneMonth: z.coerce
      .number({
        invalid_type_error: "Installment must be a number.",
      })
      .optional(),
    threeMonth: z.coerce
      .number({
        invalid_type_error: "Installment must be a number.",
      })
      .min(0, "Installment must be a positive number")
      .optional(),
    sixMonth: z.coerce
      .number({
        invalid_type_error: "Installment must be a number.",
      })
      .min(0, "Installment must be a positive number")
      .optional(),
    twelveMonth: z.coerce
      .number({
        invalid_type_error: "Installment must be a number.",
      })
      .min(0, "Installment must be a positive number")

      .optional(),
  })
  .refine(
    // check if at least one installment is greater than 0
    (value) =>
      value.oneMonth! > 0 ||
      value.threeMonth! > 0 ||
      value.sixMonth! > 0 ||
      value.twelveMonth! > 0,
    {
      message: "Please enter at least one installment.",
      path: ["oneMonth"],
    }
  )
  // check if other is empty and only one month is filled
  .refine(
    (value) =>
      value.oneMonth! >= value.price ||
      value.threeMonth! > 0 ||
      value.sixMonth! > 0 ||
      value.twelveMonth! > 0,
    {
      message:
        "Installment must be greater than or equal to the product price.",
      path: ["oneMonth"],
    }
  )
  .refine((value) => value.oneMonth! <= value.price * 1.6, {
    message: "Installment should not be more than 1.6 times the product price.",
    path: ["oneMonth"],
  })
  // check if only three month value should not exceed the price
  .refine((value) => value.threeMonth! <= value.price, {
    message: "Installment must not be greater than the product price.",
    path: ["threeMonth"],
  })
  // check if only six month value should not exceed the price
  .refine((value) => value.sixMonth! <= value.price, {
    message: "Installment must not be greater than the product price.",
    path: ["sixMonth"],
  })
  // check if only twelve month value should not exceed the price
  .refine((value) => value.twelveMonth! <= value.price, {
    message: "Installment must not be greater than the product price.",
    path: ["twelveMonth"],
  });
type FormSchemaValues = z.infer<typeof FormSchema>;

// const defaultValues: Partial<FormSchemaValues> = {
//   price: 1119,
//   oneMonth: 1135.79,
//   threeMonth: 389.79,
//   sixMonth: 203.29,
//   twelveMonth: 110.04,
// };

const defaultValues: Partial<FormSchemaValues> = {
  price: 499,
  oneMonth: 506.49,
  threeMonth: 173.82,
  sixMonth: 90.64,
  twelveMonth: 49.07,
};

const resetValues: Partial<FormSchemaValues> = {
  price: 0,
  oneMonth: 0,
  threeMonth: 0,
  sixMonth: 0,
  twelveMonth: 0,
};

const SPayLater = () => {
  const [isResult, setIsResult] = useState(false);
  const [paylaterResult, setPaylaterResult] = useState<any>({});
  const [summary, setSummary] = useState<ISummary>({
    price: 0,
    month: 0,
    monthInstallement: 0,
    withInterest: "0",
    interestCharged: "0",
    interestRate: "0",
    interestBasedOnInput: "0",
  });
  const t = useTranslations("Home");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { reset } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { price, oneMonth, threeMonth, sixMonth, twelveMonth } = data;
    let installementsFirstMonth = oneMonth || 0;
    let installementsThreeMonth = threeMonth || 0;
    let installementsSixMonth = sixMonth || 0;
    let installementsTwelveMonth = twelveMonth || 0;
    let interestOne = {},
      interestThree = {},
      interestSix = {},
      interestTwelve = {};
    if (installementsFirstMonth != 0) {
      interestOne = calculateInterest(price, installementsFirstMonth, 1);
    }
    if (installementsThreeMonth != 0) {
      interestThree = calculateInterest(price, installementsThreeMonth, 3);
    }
    if (installementsSixMonth != 0) {
      interestSix = calculateInterest(price, installementsSixMonth, 6);
    }
    if (installementsTwelveMonth != 0) {
      interestTwelve = calculateInterest(price, installementsTwelveMonth, 12);
    }

    setSummary(
      calculateInterestAndSetSummary(
        price,
        installementsFirstMonth,
        installementsThreeMonth,
        installementsSixMonth,
        installementsTwelveMonth
      )
    );

    setPaylaterResult({
      interestOne,
      interestThree,
      interestSix,
      interestTwelve,
    });

    setIsResult(true);
  }

  function resetForm() {
    reset(resetValues);
    setIsResult(false);
  }

  const howToTutorial = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col">
          <div className="text-sm md:text-base">
            <div>
              <div className="step-1 mb-5">
                <h3 className="font-semibold mb-2">
                  {t("howToUse.steps.step1.title")}
                </h3>
                <p className="text-justify ">
                  {t("howToUse.steps.step1.description")}
                </p>
              </div>

              <div className="step-2 mb-5">
                <h3 className="font-semibold mb-2">
                  {t("howToUse.steps.step2.title")}
                </h3>
                <p className="text-justify ">
                  {t("howToUse.steps.step2.description")}
                </p>
              </div>

              <div className="step-3 mb-5">
                <h3 className="font-semibold mb-2">
                  {t("howToUse.steps.step3.title")}
                </h3>
                <p className="text-justify ">
                  {t("howToUse.steps.step3.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const spaylaterSummary = () => {
    const { month, interestCharged, interestRate, interestBasedOnInput } =
      summary;
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
            After <span className="font-bold text-2xl">{month} month</span> ,
            you will need to pay an{" "}
            <span className="font-bold text-2xl">extra</span>{" "}
          </p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            RM{interestCharged}{" "}
          </h3>
          <p>which is equivalent to</p>
          <h3 className="text-5xl md:text-7xl font-bold text-red-500 py-3">
            {selectedInterestRate}%!
          </h3>
          <p>
            {numericInterestRate !== numericInterestBasedOnInput && (
              <span className="text-yellow-500 ml-2 text-base">
                (Seems like you will pay more or less than the actual interest
                rate)
              </span>
            )}
          </p>
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
            <h1 className="font-bold text-3xl py-4 ">SPayLater Calculator</h1>
            <p className=" mb-4">
              Review your SPayLater Payment Plan before you checkout.
            </p>
            <p>Estimated time: 3 minutes</p>
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
                            <FormLabel className="font-semibold">
                              {t("productPrice")} (RM)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="1119.90" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h3 className="text-sm font-semibold">
                        {t("monthlyInstallment")} (RM)
                      </h3>
                      <FormField
                        control={form.control}
                        name="oneMonth"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input placeholder="1135.79" {...field} />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center">
                                x 1 Month
                              </FormLabel>
                            </div>
                            <FormMessage />
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
                                <Input placeholder="389.79" {...field} />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center">
                                x 3 Month
                              </FormLabel>
                            </div>
                            <FormMessage />
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
                                <Input placeholder="203.39" {...field} />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center">
                                x 6 Month
                              </FormLabel>
                            </div>
                            <FormMessage />
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
                                <Input placeholder="110.04" {...field} />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center ">
                                x 12 Month
                              </FormLabel>
                            </div>
                            <FormMessage />
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
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          className="py-3 mx-6 font-bold bg-[#08cf65] w-full"
                        >
                          {t("submit")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
                <div className="md:w-2/3">
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
                          PayLater Summary
                        </h3>
                        <p className="max-w-md text-center pb-6">
                          Enter your price, monthly installements which any of
                          the SPayLater plan you want to calculate.
                        </p>
                        <span className="max-w-md text-center text-xs font-bold">
                          Disclaimer: The actual amount may vary based on the
                          user input and the actual SPayLater plan. Please
                          insert the correct amount from SPayLater to calculate
                          the correct amount for you.
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
                            SPayLater Summary
                          </h4>
                          {spaylaterSummary()}
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
              SPayLater Breakdown
            </h3>
            <ResultTables results={paylaterResult} />
          </div>
        )}
        <div className="container">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {t("howToUse.heading")}
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="flex justify-center pb-6 md:w-1/2">
              <Tabs defaultValue="image" className="w-full">
                <TabsContent
                  value="image"
                  className="mb-4 flex justify-center "
                >
                  <Image
                    src="/images/example-product-interest.png"
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
      </section>
    </div>
  );
};

export default SPayLater;
