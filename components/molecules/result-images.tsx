import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { ResultImageProps } from "@/types";

const ResultImage = ({ interestCharged, month }: ResultImageProps) => {
  if (interestCharged < 0) {
    return (
      <div className="flex flex-row justify-between w-full">
        <Image
          src="/images/questioning.png"
          width={150}
          height={150}
          alt="Cartoon meme questioning if the calculation is correct"
          priority={true}
        />
        <div className="text-sm flex w-auto justify-between items-center text-center">
          Is this even INTEREST? <br /> Please re-evaluate again.
        </div>
      </div>
    );
  }

  return (
    <Image
      src={IMAGES[month]}
      width={150}
      height={150}
      alt={`Cartoon meme griefing over the interest charged`}
      priority={true}
    />
  );
};

export default ResultImage;
