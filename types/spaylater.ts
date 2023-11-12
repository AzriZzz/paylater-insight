export interface Label {
  title: string;
  description: string;
}

export type Position = "left" | "right";

export interface IFeature extends Label {
  image: string;
  btnText: string;
  btnLink: string;
  position: Position;
  available?: boolean;
}

export interface IBenefitsCard extends Label {}


export type FAQProps = {
  id: string;
  question: string;
  answer: string;
};
