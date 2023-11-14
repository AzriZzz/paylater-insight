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
import { calculateInterest, scrollToElement } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import TikTokVideo from "@/components/molecules/tiktok-video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FormSchema = z.object({
  originalPrice: z.coerce.number({
    invalid_type_error: "Input must be a number.",
  }),
  monthOne: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .optional(),

  monthThree: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .optional(),
  monthSix: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .optional(),
  monthTwelve: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .optional(),
});

type FormSchemaValues = z.infer<typeof FormSchema>;

const SPayLater = () => {
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState<any>({});

  const t = useTranslations("Home");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // const results = calculateInterest(data);
    // const results = calculateInterest(data);

    // setResult({
    //   monthlyInstallment: data.monthlyInstallment,
    //   beforeInterest: results.beforeInterest,
    //   afterInterest: results.afterInterest,
    //   interestCharged: results.interestCharged,
    //   interestRate: results.interestRate,
    // });

    setIsResult(true);
  }

  const handleClick = () => {
    scrollToElement(".card-selector");
  };

  const howToTutorial = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="card-selector flex flex-col">
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
              {/* <div className="flex justify-center mb-5">
                <p className="text-center mt-4">
                  {t("howToUse.steps.thankYouNote.description")}
                  <span className="font-bold">
                    {t("howToUse.steps.thankYouNote.transparent")}
                  </span>{" "}
                  <span className="font-bold">
                    {t("howToUse.steps.thankYouNote.informed")}
                  </span>
                  .
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>
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
            <Card className="rounded-xl pt-7 pb-5 shadow-lg w-full ease-in-out duration-300 hover:transform flex">
              <CardContent className="text-left flex flex-col md:flex-row w-full">
                <div className="flex flex-col md:w-1/3">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              {t("productPrice")} (RM)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="100" {...field} />
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
                        name="monthOne"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input placeholder="100" {...field} />
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
                        name="monthThree"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input placeholder="100" {...field} />
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
                        name="monthSix"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input placeholder="100" {...field} />
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
                        name="monthTwelve"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center">
                              <FormControl className="w-6/12 md:8/12">
                                <Input placeholder="100" {...field} />
                              </FormControl>
                              <FormLabel className="font-semibold pl-6 md:pl-8 w-6/12 text-center ">
                                x 12 Month
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="py-3 px-6 font-bold bg-[#08cf65]"
                      >
                        {t("submit")}
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="md:w-2/3">
                  <div className="flex flex-col justify-center items-center h-full">
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
                      Enter your price, monthly installements which any of the
                      SPayLater plan you want to calculate.
                    </p>
                    <span className="max-w-md text-center text-xs font-bold">
                      Disclaimer: The actual amount may vary based on the user
                      input and the actual SPayLater plan. Please insert the
                      correct amount from SPayLater to calculate the correct
                      amount for you.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="container">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {t("howToUse.heading")}
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="flex justify-center pb-6 md:w-1/2">
              <Tabs defaultValue="image" className="w-full">
                <TabsContent value="image" className="mb-4 flex justify-center">
                  <Image
                    src="/images/example-product-interest.png"
                    width={350}
                    height={350}
                    alt="Example product indicating the location of the PayLater option"
                    priority={true}
                    className="shadow-lg rounded-sm"
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
