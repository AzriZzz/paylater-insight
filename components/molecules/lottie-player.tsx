"use client";

import Lottie, { LottieComponentProps } from "lottie-react";

export default function LottiePlayer({
  animationData,
  ...props
}: { animationData: any } & LottieComponentProps) {
  return <Lottie animationData={animationData} {...props} />;
}
