import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface JobCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const JobCard = (props: JobCardProps) => {
  const { title, description, image, link } = props;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card className="flex flex-row border hover:border-gray-400 ease-in-out duration-500 hover:-translate-y-1">
        <div className="flex-none w-32 h-32 relative">
          <Image
            src={image}
            fill
            style={{ objectFit: "cover" }}
            sizes="100%"
            alt={title}
          />
        </div>
        <div className="p-3 flex-grow">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </Card>
    </a>
  );
};

export default JobCard;
