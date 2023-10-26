import { CalculateInterest } from "@/types/site";

export const calculateInterest = (data: CalculateInterest) => {
  const beforeInterest = data.originalPrice;
  const afterInterest = data.monthlyInstallment * data.month;
  const interestCharged = afterInterest - data.originalPrice;
  const interestRate = (interestCharged / data.originalPrice) * 100;

  return {
    beforeInterest,
    afterInterest,
    interestCharged,
    interestRate,
  };
};
