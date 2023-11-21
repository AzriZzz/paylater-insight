export interface Label {
  title: string;
  description: string;
}

export type Position = "left" | "right";

export interface IFeature extends Label {
  btnText: string;
  btnLink: string;
  available?: boolean;
}

export interface IBenefitsCard extends Label {
  image: string;
}

export type FAQProps = {
  id: string;
  question: string;
  answer: string;
};

export interface IResultTable {
  results: IResults;
}
export interface IResults {
  [key: string]: IResultBody;
}

export interface IFormData {
  data: IResultBody;
}
export interface IResultBody {
  price: number;
  month: number;
  monthInstallement: number;
  withInterest: string;
  interestCharged: string;
  interestRate: string;
  interestBasedOnInput: string;
}

export interface ISummary extends IResultBody {
  spaylaterPrice: number;
}
