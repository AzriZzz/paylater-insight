import { IFeature } from "@/types/spaylater";

export const Features: IFeature[] = [
  {
    title: "SPayLater Calculator",
    description:
      "Gain insights into your pay-later plans with our intuitive SPayLater Calculator. Understand the long-term financial implications of your purchases and plan repayments with ease.",
    btnText: "Calculate Now",
    btnLink: "/spaylater",
    available: true,
  },
  {
    title: "Debt-To-Income Ratio Tool",
    description:
      "Simplify your debt management with our Debt-To-Income Ratio Tool. Discover your financial leverage and make informed decisions to maintain a healthy balance between your earnings and spending.",
    // btnText: "Evaluate Your Debt",
    btnText: "✨ Coming Soon ✨",
    btnLink: "",
    available: false,
  },
  {
    title: "50/30/20 Budget Planner",
    description:
      "Strategically allocate your income with our 50/30/20 Budget Planner. This tool helps in dividing your income into needs, wants, and savings, ensuring a balanced financial plan.",
    // btnText: "Plan Your Budget",
    btnText: "✨ Coming Soon ✨",
    btnLink: "",
    available: false,
  },
];
