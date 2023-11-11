export interface Label {
  title: string;
  description: string;
}

export type Position = "left" | "right";

export interface FeatureProps extends Label {
  image: string;
  btnText: string;
  btnLink: string;
  position: Position;
}

export interface BenefitsCardProps extends Label {}
