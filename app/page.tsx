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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

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
        <div className="flex items-center">
          <Image
            src="/images/paylaterinsight-icon.png"
            width={50}
            height={50}
            style={{ width: 50, height: 50 }}
            alt="PayLater Insight logo"
            priority={true}
          />
          <h1 className="md:w-fit text-2xl font-semibold">PayLater Insight</h1>
        </div>
        <ModeToggle />
      </div>
      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <Dialog>
            <Card className="w-[350px] md:w-[500px] mt-5 md:mt-10 mb-3">
              <CardHeader>
                <CardTitle className="text-xl">Know Your Interest</CardTitle>
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
                <div className="w-full text-center mt-4">
                  <span className="cursor-pointer" onClick={handleClick}>
                    How to use?
                  </span>
                </div>
              </CardContent>
            </Card>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>PayLater Overview</DialogTitle>
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
                      <span className="text-lg text-red-600">
                        {result.interestCharged.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-right">Interest Rate (%):</span>
                      <span className="text-lg text-red-600">
                        {result.interestRate.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="items-center flex justify-center translate-y-10">
                    {result.interestCharged < 0 ? (
                      <div className="flex flex-row justify-between w-full">
                        <Image
                          src="/images/questioning.png"
                          width={150}
                          height={150}
                          style={{ width: 150, height: 140 }}
                          alt="Cartoon meme questioning if the calculation is correct"
                          priority={true}
                        />
                        <div className="text-sm flex w-auto justify-between items-center text-center">
                          Is this even INTEREST? <br /> Please re-evaluate
                          again.
                        </div>
                      </div>
                    ) : (
                      <>
                        {result.month === 1 && (
                          <Image
                            src="/images/grief-one.png"
                            width={150}
                            height={150}
                            style={{ width: 150, height: 140 }}
                            alt="Cartoon meme griefing over the interest charged for 1.5%"
                            priority={true}
                          />
                        )}
                        {result.month === 3 && (
                          <Image
                            src="/images/grief-two.png"
                            width={150}
                            height={120}
                            style={{ width: 150, height: 120 }}
                            alt="Cartoon meme griefing over the interest charged for 4.5%"
                            priority={true}
                          />
                        )}
                        {result.month === 6 && (
                          <Image
                            src="/images/grief-three.png"
                            width={150}
                            height={150}
                            style={{ width: 150, height: 120 }}
                            alt="Cartoon meme griefing over the interest charged for 9%"
                            priority={true}
                          />
                        )}
                        {result.month === 12 && (
                          <Image
                            src="/images/grief-four.png"
                            width={150}
                            height={130}
                            style={{ width: 150, height: 120 }}
                            alt="Cartoon meme griefing over the interest charged for 18%"
                            priority={true}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="card-selector flex flex-col items-center justify-center pt-5">
          <div className="md:max-w-[500px] text-sm md:text-base">
            <h1 className="text-xl font-semibold mb-3">
              How to Use PayLater Insight
            </h1>
            <div>
              <div className="step-1 mb-5">
                <h3 className="font-semibold mb-2">
                  Step 1: Locate SPayLater Option on Shopee on Mobile App
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
                    alt="Example product indicating the location of the PayLater option"
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
                  Thank you for using PayLater Insight! We strive to make
                  your online shopping experience more <span className="font-bold">transparent </span>
                  and <span className="font-bold">informed</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer flex justify-between mt-4 pb-5">
          <p className="text-sm">PayLater Insight © 2023 </p>
          <div className="flex gap-5">
            <a
              href="https://github.com/AzriZzz/spaylater-insight"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Twitter"
            >
              <FaGithub />
            </a>
            <address className="not-italic">
              <a href="mailto:muhdazri.biz@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </address>
            <a
              href="https://twitter.com/AzriZzz"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
