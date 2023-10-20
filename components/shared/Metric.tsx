import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyels?: string;
  isAuthor?: boolean;
  textStyles?: string;
}

const Metric = ({ imgUrl, alt, value, title, href, textStyels, isAuthor }: MetricProps) => {
  const MetricContent = (
    <>
      <Image src={imgUrl} width={16} height={16} alt={alt} className={`object-contain ${href ? "rounded-full" : ""}`} />
      <p className={`${textStyels} flex items-center gap-1`}>
        {value}
        <span className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>{title}</span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {MetricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{MetricContent}</div>;
};

export default Metric;
