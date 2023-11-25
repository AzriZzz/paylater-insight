"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { useNumberFormatter } from "@react-aria/i18n";
import { Separator } from "@/src/components/ui/separator";
import JobCard from "@/src/components/molecules/job-card";
import { useTranslations } from "next-intl";
const FormSchema = z
  .object({
    monthlyIncome: z.coerce
      .number({
        invalid_type_error: "Input must be a number.",
      })
      .min(1, "Monthly income must be greater than 0.")
      .max(
        1000000000,
        "Your monthly income is too high. Do you even need this calculator?"
      ),

    monthlyDebt: z.coerce
      .number({
        invalid_type_error: "Input must be a number.",
      })
      .min(1, "Monthly debt / commitment must be greater than 0."),
  })
  .refine((value) => value.monthlyDebt <= value.monthlyIncome * 100000, {
    message:
      "Your monthly debt/commitment is too high. Are you making poor financial decisions?",
    path: ["monthlyDebt"],
  });
type FormValues = z.infer<typeof FormSchema>;

const defaultValues: FormValues = {
  monthlyIncome: 0,
  monthlyDebt: 0,
};

const DebtIncomeRatio = () => {
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("0");
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState("bg-[#08cf65]");
  const [advice, setAdvice] = useState("");
  const formatter = useNumberFormatter();

  const t = useTranslations("DebtIncomeRatio");

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  const { reset } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const debtToIncomeRatio = (data.monthlyDebt / data.monthlyIncome) * 100;
    if (debtToIncomeRatio > 100) {
      setProgress(100);
    } else {
      setProgress(debtToIncomeRatio);
    }

    if (debtToIncomeRatio > 50) {
      setProgressColor("bg-[#ff0000]");
    } else if (debtToIncomeRatio > 36) {
      setProgressColor("bg-[#fcd34d]");
    } else {
      setProgressColor("bg-[#08cf65]");
    }

    if (debtToIncomeRatio >= 0 && debtToIncomeRatio <= 36) {
      setAdvice(t("Advice.below36"));
    } else if (debtToIncomeRatio > 36 && debtToIncomeRatio <= 50) {
      setAdvice(t("Advice.below50"));
    } else if (debtToIncomeRatio > 50 && debtToIncomeRatio <= 100) {
      setAdvice(t("Advice.below100"));
    } else {
      setAdvice(t("Advice.alert100"));
    }

    if (debtToIncomeRatio % 1 === 0) {
      setResult(debtToIncomeRatio.toString());
    } else {
      setResult(debtToIncomeRatio.toFixed(2));
    }

    setIsResult(true);
  }

  function resetForm() {
    reset(defaultValues);
    setIsResult(false);
    setResult("0");
    setProgress(0);
    setProgressColor("bg-[#08cf65]");
    setAdvice("");
  }

  return (
    <div>
      <div className="spaylater-header bg-[#0a6160]">
        <div className="container text-white pt-9 pb-44">
          <h1 className="font-bold text-3xl py-4 ">{t("Header.title")}</h1>
          <p className=" mb-4">{t("Header.description")}</p>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-center -mt-[150px] pb-12">
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
                      name="monthlyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            {t("Form.monthlyIncome")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1000.00"
                              className="text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="monthlyDebt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            {t("Form.monthlyDebt")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="30.00"
                              className="text-base"
                              {...field}
                            />
                          </FormControl>
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
                        {t("Form.reset")}
                      </Button>
                      <Button
                        type="submit"
                        className="py-3 mx-6 font-bold bg-[#08cf65] w-full"
                      >
                        {t("Form.submit")}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              <div className="md:w-2/3 bg-slate-100">
                <div className="flex flex-col justify-center text-center h-full">
                  <h2 className="text-2xl font-bold pt-5">
                    {t("Summary.title")}
                  </h2>
                  <h3 className="text-4xl font-semibold py-4">
                    {formatter.format(parseFloat(result))}%
                  </h3>
                  <div className="progress-bar flex justify-center">
                    <Progress
                      className=" w-3/4 bg-white border border-slate-300"
                      value={progress}
                      indicatorColor={progressColor}
                    />
                  </div>
                  <div className="pt-5">
                    <Separator />
                  </div>

                  <div className="text-justify flex justify-center w-full">
                    {!isResult ? (
                      <p className="w-3/4 py-5 font-bold">
                        {t("Summary.disclaimer")}
                      </p>
                    ) : (
                      <p className="w-3/4 py-5 text-md font-bold">{advice}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container">
        <div className="introduction">
          <h3 className="text-center font-bold text-3xl pb-6">
            {t("Body.title")}
          </h3>
          <p className="text-justify text-base md:text-lg">
            {t("Body.description")}
          </p>
        </div>
        <div className="formula py-6">
          <h3 className="text-center font-bold text-3xl pb-6">
            {t("Body.Formula.title")}
          </h3>
          <div className="text-justify text-base md:text-lg">
            <p>{t("Body.Formula.description1")}</p>
            <div className="text-center py-5">
              <span className="text-center font-bold text-xl">
                {t("Body.Formula.math1")}
              </span>
            </div>
            <p>{t("Body.Formula.desription2")}</p>
            <div className="text-center py-5">
              <span className="text-center font-bold text-xl pb-6">
                {t("Body.Formula.math2")}
              </span>
            </div>
            <p>{t("Body.Formula.conclusion")}</p>
          </div>
        </div>
        <div className="understanding-debt-payment">
          <div className="item-breakdown pb-6">
            <h3 className="text-center font-bold text-3xl pb-6">
              {t("Body.Understanding.title")}
            </h3>
            <div className="text-base md:text-lg">
              <p className="text-justify ">
                {t("Body.Understanding.description1")}
              </p>

              <div className="debt-included pt-3">
                <p> {t("Body.Understanding.description2")}</p>
                <ul className="list-disc list-inside pt-4">
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List1.item1")}
                    </span>
                    {t("Body.Understanding.List1.desc1")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List1.item2")}
                    </span>
                    {t("Body.Understanding.List1.desc2")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List1.item3")}
                    </span>
                    {t("Body.Understanding.List1.desc3")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List1.item4")}
                    </span>
                    {t("Body.Understanding.List1.desc4")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List1.item5")}
                    </span>
                    {t("Body.Understanding.List1.desc5")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List1.item6")}
                    </span>
                    {t("Body.Understanding.List1.desc6")}
                  </li>
                </ul>
              </div>
              <div className="debt-not-included py-3">
                <p> {t("Body.Understanding.description3")}</p>
                <ul className="list-disc list-inside pt-4">
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List2.item1")}
                    </span>
                    {t("Body.Understanding.List2.desc1")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      {t("Body.Understanding.List2.item2")}
                    </span>
                    {t("Body.Understanding.List2.desc2")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                    {t("Body.Understanding.List2.item3")}
                    </span>
                    {t("Body.Understanding.List2.desc3")}
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                    {t("Body.Understanding.List2.item4")}

                    </span>
                    {t("Body.Understanding.List2.desc4")}

                    etc.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                    {t("Body.Understanding.List2.item5")}
                    </span>
                    {t("Body.Understanding.List2.desc5")}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <Button className="py-3 px-6 font-bold bg-blue-900 ease-in-out duration-300">
                <a
                  href="https://www.investopedia.com/terms/d/dti.asp"
                  target="_blank"
                >
                  {t("Body.Understanding.btnText")}
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="career py-6">
          <div className="introduction">
            <h3 className="text-center font-bold text-3xl pb-6">
            {t("Body.JobSite.title")}
            </h3>
            <p className="text-center text-base md:text-lg font-semibold">
            {t("Body.JobSite.description")}
            </p>
            <div className="py-6 flex flex-col md:flex-row gap-5 ">
              <JobCard
                title="Jobstreet by Seek"
                description="Find your ideal job at JobStreet with 125 Job Street By SEEK jobs found in Malaysia"
                image="/images/job/seek.png"
                link="https://www.jobstreet.com.my/"
              />
              <JobCard
                title="Maukerja"
                description="Kerja kosong terkini 2023 di Malaysia Full time, part time & kerja dari rumah. Cari kerja sekarang!"
                image="/images/job/maukerja.png"
                link="https://www.maukerja.my/"
              />
              <JobCard
                title="Kerja-IT"
                description="Kerja IT (kerja-it.com) | Job board that source jobs daily from top job boards, companies, and recruiters."
                image="/images/job/kerja-it.png"
                link="https://kerja-it.com/"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtIncomeRatio;
