export interface IResultType {
  beforeInterest: number;
  month: number;
  monthlyInstallment: number;
  afterInterest: number;
  interestCharged: number;
  interestRate: number;
}

export interface DetailItemProps {
  label: string;
  value: string | number;
  isHighlight?: boolean;
}

export interface ResultType {
  result: IResultType;
}

export interface ResultImageProps {
  interestCharged: number;
  month: number;
};

export interface ISolutionCardProps {
  title: string;
  description: string;
  number: number;
  color: string;
}
