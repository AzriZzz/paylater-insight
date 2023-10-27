import { DetailItemProps, ResultType } from "@/types";


const DetailItem = ({ label, value, isHighlight = false }: DetailItemProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-right">{label}</span>
    <span className={isHighlight ? "text-lg text-red-600" : ""}>{value}</span>
  </div>
);

const ResultDetails = ({ result }: ResultType) => {
  return (
    <div className="grid gap-4">
      <DetailItem
        label="Product Price (RM):"
        value={result.beforeInterest.toFixed(2)}
      />
      <DetailItem label="Duration (Months):" value={result.month} />
      <DetailItem
        label="Monthly Installment (RM):"
        value={result.monthlyInstallment.toFixed(2)}
      />
      <DetailItem
        label="Total Amount Paid (RM):"
        value={result.afterInterest.toFixed(2)}
        isHighlight
      />
      <DetailItem
        label="Interest Charged (RM):"
        value={result.interestCharged.toFixed(2)}
        isHighlight
      />
      <DetailItem
        label="Interest Rate (%):"
        value={result.interestRate.toFixed(1)}
        isHighlight
      />
    </div>
  );
};

export default ResultDetails;
