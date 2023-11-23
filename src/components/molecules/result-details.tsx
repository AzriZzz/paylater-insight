import { DetailItemProps, ResultType } from "@/src/types";
import { useTranslations } from "next-intl";

const DetailItem = ({ label, value, isHighlight = false }: DetailItemProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-right">{label}</span>
    <span className={isHighlight ? "text-lg text-red-600" : ""}>{value}</span>
  </div>
);

const ResultDetails = ({ result }: ResultType) => {
  const t = useTranslations("Home");

  return (
    <div className="grid gap-4">
      <DetailItem
        label={t("resultDetails.productPrice")}
        value={result.beforeInterest.toFixed(2)}
      />
      <DetailItem label={t("resultDetails.duration")} value={result.month} />
      <DetailItem
        label={t("resultDetails.monthlyInstallment")}
        value={result.monthlyInstallment.toFixed(2)}
      />
      <DetailItem
        label={t("resultDetails.totalAmountPaid")}
        value={result.afterInterest.toFixed(2)}
        isHighlight
      />
      <DetailItem
        label={t("resultDetails.interestCharged")}
        value={result.interestCharged.toFixed(2)}
        isHighlight
      />
      <DetailItem
        label={t("resultDetails.interestRate")}
        value={result.interestRate.toFixed(1)}
        isHighlight
      />
    </div>
  );
};

export default ResultDetails;
