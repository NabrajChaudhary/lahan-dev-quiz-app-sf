"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface FallbackImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc: string;
}

export default function FallbackImage({
  src,
  fallbackSrc,
  alt,
  ...rest
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...rest}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        console.log("Image failed to load:", imgSrc);
        setImgSrc(fallbackSrc);
        setHasError(true);
      }}
      onLoad={() => {
        console.log("Image loaded successfully:", imgSrc);
        setHasError(false);
      }}
    />
  );
}
