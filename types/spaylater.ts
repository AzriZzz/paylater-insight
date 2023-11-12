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
