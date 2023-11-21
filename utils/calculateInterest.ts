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
  installementsFirstMonth: number,
  installementsThreeMonth: number,
  installementsSixMonth: number,
  installementsTwelveMonth: number,
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
  if (installementsFirstMonth !== 0) {
    summary = {
      ...calculateInterest(price, installementsFirstMonth, 1),
      spaylaterPrice
    };
  }
  if (installementsThreeMonth !== 0) {
    summary = {
      ...calculateInterest(price, installementsThreeMonth, 3),
      spaylaterPrice
    };
  }
  if (installementsSixMonth !== 0) {
    summary = {
      ...calculateInterest(price, installementsSixMonth, 6),
      spaylaterPrice
    };
  }
  if (installementsTwelveMonth !== 0) {
    summary = {
      ...calculateInterest(price, installementsTwelveMonth, 12),
      spaylaterPrice
    };
  }

  return summary;
};
