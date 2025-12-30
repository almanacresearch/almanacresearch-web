"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottieAnimationProps {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  speed?: number;
}

export function LottieAnimation({
  animationPath,
  loop = true,
  autoplay = true,
  className = "",
  speed = 1,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animationPath)
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, [animationPath]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
