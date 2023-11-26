import { FormSchema } from "@/src/schemas/spaylaterSchema";
import { IResultBody, ISummary } from "@/src/types/spaylater";
import * as z from "zod";

export const calculateInterest = (
  price: number,
  amount: number,
  month: number
): IResultBody => {
  // Define interest rates based on the month
  const interestRates: Record<number, number> = {
    1: 1.5,
    3: 4.5,
    6: 9,
    12: 18,
  };

  // Check if the month is valid
  if (!(month in interestRates)) {
    throw new Error("Invalid month value");
  }

  // Calculate interest and other values
  const interestRate = interestRates[month];
  const withInterest = amount * month;
  const interestCharged = withInterest - price;
  const interestBasedOnInput = (interestCharged / price) * 100;

  return {
    price,
    month,
    monthInstallement: amount,
    withInterest: withInterest.toFixed(2),
    interestCharged: interestCharged.toFixed(2),
    interestRate: interestRate.toFixed(1),
    interestBasedOnInput: interestBasedOnInput.toFixed(2),
  };
};

export const calculateInterestAndSetSummary = (
  data: z.infer<typeof FormSchema>
): ISummary => {
  const { price, oneMonth, threeMonth, sixMonth, twelveMonth, spaylaterPrice } =
    data;
  let summary: ISummary = {
    price: 0,
    month: 0,
    monthInstallement: 0,
    withInterest: "0",
    interestCharged: "0",
    interestRate: "0",
    interestBasedOnInput: "0",
    spaylaterPrice: 0,
  };
  if (oneMonth !== 0) {
    summary = {
      ...calculateInterest(price, oneMonth!, 1),
      spaylaterPrice,
    };
  }
  if (threeMonth !== 0) {
    summary = {
      ...calculateInterest(price, threeMonth!, 3),
      spaylaterPrice,
    };
  }
  if (sixMonth !== 0) {
    summary = {
      ...calculateInterest(price, sixMonth!, 6),
      spaylaterPrice,
    };
  }
  if (twelveMonth !== 0) {
    summary = {
      ...calculateInterest(price, twelveMonth!, 12),
      spaylaterPrice,
    };
  }

  return summary;
};

export const calculateSummary = (data: z.infer<typeof FormSchema>) => {
  const {
    price,
    oneMonth,
    threeMonth,
    sixMonth,
    twelveMonth,
    spaylaterPrice,
    isLimit,
  } = data;

  let priceBasedOnLimit = isLimit ? spaylaterPrice! : price;
  let interestOne = {},
    interestThree = {},
    interestSix = {},
    interestTwelve = {};

  if (oneMonth != 0) {
    interestOne = calculateInterest(priceBasedOnLimit, oneMonth!, 1);
  }
  if (threeMonth != 0) {
    interestThree = calculateInterest(priceBasedOnLimit, threeMonth!, 3);
  }
  if (sixMonth != 0) {
    interestSix = calculateInterest(priceBasedOnLimit, sixMonth!, 6);
  }
  if (twelveMonth != 0) {
    interestTwelve = calculateInterest(priceBasedOnLimit, twelveMonth!, 12);
  }
  return { interestOne, interestThree, interestSix, interestTwelve };
};

export const calculateTotals = (inputPriceNumber: number) => {
  const totalOneMonth = inputPriceNumber + inputPriceNumber * 0.015;
  const totalThreeMonth = (inputPriceNumber + inputPriceNumber * 0.045) / 3;
  const totalSixMonth = (inputPriceNumber + inputPriceNumber * 0.09) / 6;
  const totalTwelveMonth = (inputPriceNumber + inputPriceNumber * 0.18) / 12;

  return {
    oneMonth: parseFloat(totalOneMonth.toFixed(2)),
    threeMonth: parseFloat(totalThreeMonth.toFixed(2)),
    sixMonth: parseFloat(totalSixMonth.toFixed(2)),
    twelveMonth: parseFloat(totalTwelveMonth.toFixed(2)),
  };
}

export const valueReminder = (value: number ) => {
  if (value % 1 === 0) {
    return value.toString();
  } else {
    return value.toFixed(1);
  }
};


