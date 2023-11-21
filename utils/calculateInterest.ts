import { IResultBody, ISummary } from "@/types/spaylater";

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
  price: number,
  firstMonth: number,
  secondMonth: number,
  sixMonth: number,
  twelveMonth: number,
  spaylaterPrice: number
): ISummary => {
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
  if (firstMonth !== 0) {
    summary = {
      ...calculateInterest(price, firstMonth, 1),
      spaylaterPrice
    };
  }
  if (secondMonth !== 0) {
    summary = {
      ...calculateInterest(price, secondMonth, 3),
      spaylaterPrice
    };
  }
  if (sixMonth !== 0) {
    summary = {
      ...calculateInterest(price, sixMonth, 6),
      spaylaterPrice
    };
  }
  if (twelveMonth !== 0) {
    summary = {
      ...calculateInterest(price, twelveMonth, 12),
      spaylaterPrice
    };
  }

  return summary;
};
