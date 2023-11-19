"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNumberFormatter } from "@react-aria/i18n";
import { Separator } from "@/components/ui/separator";
import JobCard from "@/components/molecules/job-card";
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
      setAdvice(
        "Great job! Your Debt-to-Income Ratio is within a healthy range (0-36%). This indicates you're managing your debts well compared to your income. Maintaining this ratio shows financial stability and puts you in a good position for future financial planning and credit opportunities."
      );
    } else if (debtToIncomeRatio > 36 && debtToIncomeRatio <= 50) {
      setAdvice(
        "Heads up! Your Debt-to-Income Ratio falls in the warning zone (37-50%). It's manageable, but it's crucial to be cautious. This level suggests that a significant part of your income goes towards debt repayment. Consider reviewing your budget to optimize your spending and debt management, ensuring it doesn't escalate to a level that might strain your finances."
      );
    } else if (debtToIncomeRatio > 50 && debtToIncomeRatio <= 100) {
      setAdvice(
        "Alert! Your Debt-to-Income Ratio is in the danger zone (51-100%). This high ratio indicates that a very large portion of your income is dedicated to debt payments, which may lead to financial strain. It's important to take immediate steps to manage your debts more effectively. Consider seeking financial advice, restructuring your debts, or exploring ways to increase your income to bring this ratio down to a safer level."
      );
    } else {
      setAdvice(
        "Critical Alert: Your Debt-to-Income Ratio exceeds 100%, indicating that your debts are higher than your income. This is a severe financial situation requiring immediate attention. It's highly recommended to seek professional financial counseling to explore debt consolidation, restructuring options, or other urgent measures to address this critical level of indebtedness. Delaying action can lead to more significant financial difficulties, including potential legal implications."
      );
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
          <h1 className="font-bold text-3xl py-4 ">
            Debt-To-Income Ratio Tool
          </h1>
          <p className=" mb-4">
            Assess Your Financial Health with Debt-to-Income Ratio Calculator.
          </p>
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
                            Monthly Income
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
                            Monthly Debt / Commitment
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
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        className="py-3 mx-6 font-bold bg-[#08cf65] w-full"
                      >
                        Calculate
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              <div className="md:w-2/3 bg-slate-100">
                <div className="flex flex-col justify-center text-center h-full">
                  <h2 className="text-2xl font-bold pt-5">
                    Debt to Income Ratio
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
                        Disclaimer: By entering your data in this tool, you
                        acknowledge that the information is used solely for
                        immediate calculations and not stored or shared. The
                        results are estimative and not financial advice. For
                        personalized guidance, consult a financial advisor. Your
                        use of this tool implies acceptance of these terms.
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
            What is Debt-to-Income Ratio?
          </h3>
          <p className="text-justify text-base md:text-lg">
            Debt-to-Income Ratio (DTI) is a financial measure that compares your
            total monthly debt payments to your gross monthly income. It is a
            critical indicator of your financial health and ability to manage
            debts. Lenders use this ratio to assess your creditworthiness and
            determine your eligibility for loans, credit cards, and other credit
            facilities.{" "}
          </p>
        </div>
        <div className="formula py-6">
          <h3 className="text-center font-bold text-3xl pb-6">Formula</h3>
          <div className="text-justify text-base md:text-lg">
            <p>
              The formula for calculating your Debt-to-Income Ratio is as
              follows:
            </p>
            <div className="text-center py-5">
              <span className="text-center font-bold text-xl">
                Debt-to-Income Ratio = (Monthly Debt / Monthly Income) x 100
              </span>
            </div>
            <p>
              For example, if your monthly income is RM 1,000 and your monthly
              debt is RM 300, your Debt-to-Income Ratio is 30%.
            </p>
            <div className="text-center py-5">
              <span className="text-center font-bold text-xl pb-6">
                (300 / 1000) x 100 = 30%
              </span>
            </div>
            <p>
              Your Debt-to-Income Ratio is a percentage that indicates how much
              of your income goes towards debt repayment. The lower your ratio,
              the better your financial health. A high ratio suggests that a
              significant portion of your income is dedicated to debt payments,
              which may lead to financial strain.
            </p>
          </div>
        </div>
        <div className="understanding-debt-payment">
          <div className="item-breakdown pb-6">
            <h3 className="text-center font-bold text-3xl pb-6">
              Understanding Debt Payments
            </h3>
            <div className="text-base md:text-lg">
              <p className="text-justify ">
                When calculating your debt payments, its important to include
                all forms of fixed monthly financial obligations. This
                calculation helps in assessing your debt-to-income ratio and
                overall financial health.
              </p>

              <div className="debt-included pt-3">
                <p>Include the following items:</p>
                <ul className="list-disc list-inside pt-4">
                  <li>
                    <span className="font-semibold pr-2">
                      Mortgage or Rent Payments:
                    </span>
                    Regular payments towards your home loan or rental.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">Car Loans:</span>
                    Monthly payments for any automobile financing.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">Student Loans:</span>
                    Fixed repayments for educational loans.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      Credit Card Payments:
                    </span>
                    Minimum monthly payments on credit card balances.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">Personal Loans:</span>
                    Any monthly repayments for personal loans.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      Other Fixed Debts:
                    </span>
                    Any other debts that require regular, fixed monthly
                    payments.
                  </li>
                </ul>
              </div>
              <div className="debt-not-included py-3">
                <p>Do not include the following items:</p>
                <ul className="list-disc list-inside pt-4">
                  <li>
                    <span className="font-semibold pr-2">Utilities:</span>
                    Monthly payments for utilities such as electricity, water,
                    gas, internet, etc.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">Food:</span>Monthly
                    expenses for groceries and dining out.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">Insurance:</span>
                    Monthly premiums for any insurance policies.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">Entertainment:</span>
                    Monthly expenses for entertainment such as movies, concerts,
                    etc.
                  </li>
                  <li>
                    <span className="font-semibold pr-2">
                      Other Variable Expenses:
                    </span>
                    Any other expenses that vary from month to month.
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
                  Learn More at Investopedia
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="career py-6">
          <div className="introduction">
            <h3 className="text-center font-bold text-3xl pb-6">
              Increase your income by looking for new job
            </h3>
            <p className="text-center text-base md:text-lg font-semibold">
              Check out these job portal for the latest job postings.
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
