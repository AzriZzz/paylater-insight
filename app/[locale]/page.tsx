"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Footer from "@/components/molecules/footer";
import { calculateInterest, scrollToElement } from "@/utils";
import ResultDetails from "@/components/molecules/result-details";
import ResultImage from "@/components/molecules/result-images";
import { motion } from "framer-motion";
import Header from "@/components/molecules/header";
import { useTranslations } from "next-intl";

const FormSchema = z.object({
  originalPrice: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .min(1, {
      message: "Amount must not be empty.",
    }),
  monthlyInstallment: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .min(1, {
      message: "Amount must not be empty.",
    }),
  month: z.coerce.number({ invalid_type_error: "Pleas select month." }),
});

type FormSchemaValues = z.infer<typeof FormSchema>;

const defaultValues: Partial<FormSchemaValues> = {
  originalPrice: 1119.9,
  monthlyInstallment: 110.1,
  month: 12,
};

export default function Home() {
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState<any>({});

  const t = useTranslations("Home");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // check all the data input is not empty
    if (data.originalPrice === 0 || data.monthlyInstallment === 0) {
      return;
    }
    const results = calculateInterest(data);

    setResult({
      month: data.month,
      monthlyInstallment: data.monthlyInstallment,
      beforeInterest: results.beforeInterest,
      afterInterest: results.afterInterest,
      interestCharged: results.interestCharged,
      interestRate: results.interestRate,
    });

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
        <div className="card-selector flex flex-col items-center justify-center pt-5">
          <div className="md:max-w-[500px] text-sm md:text-base">
            <h1 className="text-xl font-semibold mb-3">
              {t("howToUse.heading")}
            </h1>
            <div>
              <div className="step-1 mb-5">
                <h3 className="font-semibold mb-2">
                  {t("howToUse.steps.step1.title")}
                </h3>
                <p className="text-justify ">
                  {t("howToUse.steps.step1.description")}
                </p>
                <div className="flex justify-center py-5">
                  <Image
                    src="/images/example-product-interest.png"
                    width={500}
                    height={300}
                    alt="Example product indicating the location of the PayLater option"
                    priority={true}
                  />
                </div>
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
              <div className="flex justify-center mb-5">
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
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-auto h-full">
      <Header />
      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <Dialog>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-auto md:w-[500px] mt-5 md:mt-10 mb-3">
                <CardHeader>
                  <CardTitle className="text-xl">{t("title")}</CardTitle>
                  <CardDescription>{t("description")}</CardDescription>
                </CardHeader>

                <CardContent>
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
                            <FormLabel>{t("productPrice")}</FormLabel>
                            <FormControl>
                              <Input placeholder="100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monthlyInstallment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("monthlyInstallment")}</FormLabel>
                            <FormControl>
                              <Input placeholder="100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("months")}</FormLabel>
                            <Select
                              aria-labelledby="month"
                              onValueChange={field.onChange}
                              defaultValue="12"
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Please select month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogTrigger asChild>
                        <Button type="submit">{t("submit")}</Button>
                      </DialogTrigger>
                    </form>
                  </Form>
                  <div className="w-full text-center mt-4">
                    <span className="cursor-pointer" onClick={handleClick}>
                      {t("howToUseText")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle> {t("resultDetails.title")}</DialogTitle>
                <DialogDescription>
                  {t("resultDetails.description")}
                </DialogDescription>
              </DialogHeader>
              {isResult && (
                <div className="py-4 cursor-default font-medium">
                  <ResultDetails result={result} />
                  <div className="items-center flex justify-center translate-y-10">
                    <ResultImage
                      interestCharged={result.interestCharged}
                      month={result.month}
                    />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        {howToTutorial()}
      </div>
      <Footer />
    </div>
  );
}
