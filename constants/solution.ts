interface SolutionCardData {
  title: string;
  description: string;
  number: number;
  color: string;
}

export const solutionCardData: SolutionCardData[] = [
  {
    title: "Simplified Financial Overview",
    description:
      "Get a consolidated view of your finances, from everyday expenses to pay-later plans, all in one place.",
    number: 1,
    color: "bg-purple-500",
  },
  {
    title: "Strategic Budgeting Tools",
    description:
      "Utilize intuitive budgeting features that help you plan your spending, savings, and investments effectively.",
    number: 2,
    color: "bg-blue-500",
  },
  {
    title: "Debt Management",
    description:
      "Stay on top of your debts with tools that help you understand and manage your pay-later commitments and other liabilities.",
    number: 3,
    color: "bg-orange-500",
  },
  {
    title: "Informed Decision-Making",
    description:
      "Gain insights into your financial habits, helping you make smarter choices about your spending and saving.",
    number: 4,
    color: "bg-red-500",
  },
  {
    title: "Goal Setting and Tracking",
    description:
      "Set financial goals and track your progress, ensuring you stay aligned with your long-term financial objectives",
    number: 5,
    color: "bg-green-600",
  },
];
