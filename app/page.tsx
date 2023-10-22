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
import { ModeToggle } from "@/components/ui/toggleMode";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const beforeInterest = data.originalPrice;
    const afterInterest = data.monthlyInstallment * data.month;
    const interestCharged = afterInterest - data.originalPrice;
    const interestRate = (interestCharged / data.originalPrice) * 100;

    setResult({
      month: data.month,
      monthlyInstallment: data.monthlyInstallment,
      beforeInterest,
      afterInterest,
      interestCharged,
      interestRate,
    });

    setIsResult(true);
  }

  const handleClick = () => {
    const element = document.querySelector(".card-selector");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-auto h-full outline">
      <div className="flex justify-between px-3 md:px-10 pt-4">
        <h1 className="md:w-fit text-2xl font-semibold">SPayLater Insight</h1>
        <ModeToggle />
      </div>
      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <Dialog>
            <Card className="w-[350px] md:w-[500px] mt-5 md:mt-10 mb-3">
              <CardHeader>
                <CardTitle className="text-xl">
                  Calculate Your Interest
                </CardTitle>
                <CardDescription>
                  Review your SPayLater payment plan before you checkout.
                </CardDescription>
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
                          <FormLabel>Product Price</FormLabel>
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
                          <FormLabel>Monthly Installment</FormLabel>
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
                          <FormLabel>Month</FormLabel>
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
                      <Button type="submit">Submit</Button>
                    </DialogTrigger>
                  </form>
                </Form>
                <div className="w-full text-center mt-4 animate-bounce" onClick={handleClick}>
                  <span className=" cursor-pointer">How to use?</span>
                </div>
              </CardContent>
            </Card>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>SPayLater Overview</DialogTitle>
                <DialogDescription>
                  Detailed breakdown of your upcoming purchase
                </DialogDescription>
              </DialogHeader>
              {isResult && (
                <div className="py-4 cursor-default font-medium">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center py-2 ">
                      <span className="text-right">Product Price (RM):</span>
                      <span>{result.beforeInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-right">Duration (Months):</span>
                      <span>{result.month}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-right">
                        Monthly Installment (RM):
                      </span>
                      <span>{result.monthlyInstallment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-right">
                        Total Amount Paid (RM):
                      </span>
                      <span className="text-lg text-red-600">
                        {result.afterInterest.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-right">Interest Charged (RM):</span>
                      <span className="text-lg text-red-600">{result.interestCharged.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-right">Interest Rate (%):</span>
                      <span className="text-lg text-red-600">{result.interestRate.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Card className="card-selector w-[350px] md:w-[500px] mt-3 m-10">
            <CardHeader>
              <CardTitle className="text-xl">
                How to Use SPayLater Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="step-1 mb-5">
                <h3 className="font-semibold mb-2">
                  Step 1: Locate SPayLater Option on Shopee
                </h3>
                <p className="text-justify ">
                  Navigate to your desired product on Shopee. Scroll down to the
                  payment options and find the &lsquo;SPayLater&rsquo; feature.
                  Need help? See the example below:
                </p>
                <div className="flex justify-center py-5">
                  <Image
                    src="/images/example-product-interest.png"
                    width={500}
                    height={300}
                    alt="Example product indicating the location of the SPayLater option"
                    priority={true}
                  />
                </div>
              </div>

              <div className="step-2 mb-5">
                <h3 className="font-semibold mb-2">
                  Step 2: Input Payment Details
                </h3>
                <p className="text-justify ">
                  Carefully copy or type the product&apos;s price, the monthly
                  installment amount, and the duration (in months) into the
                  calculator&apos;s corresponding input fields. Ensure the
                  information is accurate to get the correct calculation
                  results.
                </p>
              </div>

              <div className="step-3 mb-5">
                <h3 className="font-semibold mb-2">
                  Step 3: Calculate and Review
                </h3>
                <p className="text-justify ">
                  Once you&apos;ve entered all the required information, click
                  the &lsquo;Submit&rsquo; button. The calculator will display a
                  detailed breakdown of your payment plan, including the total
                  interest charged. Review the information to make an informed
                  decision before proceeding with SPayLater.
                </p>
              </div>

              <div className="flex justify-center mb-5">
                <p className="text-center mt-4">
                  Thank you for using our SPayLater Insight! We strive to make
                  your online shopping experience more transparent and informed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
