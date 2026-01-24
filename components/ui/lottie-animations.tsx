"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useState, useRef, useCallback } from "react";

const animationCache = new Map<string, Record<string, unknown>>();

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  viewThreshold?: number;
  variant?: "light" | "dark";
}

export function LottieAnimation({
  animationPath,
  className = "",
  loop = false,
  autoplay = false,
  viewThreshold = 0.5,
  variant = "light",
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<Record<
    string,
    unknown
  > | null>(() => animationCache.get(animationPath) ?? null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasPlayedRef = useRef(false);

  // Callback when Lottie is ready
  const handleDOMLoaded = useCallback(() => {
    setIsReady(true);
  }, []);

  // Fetch animation data immediately on mount
  useEffect(() => {
    if (animationCache.has(animationPath)) {
      setAnimationData(animationCache.get(animationPath)!);
      return;
    }

    const controller = new AbortController();

    fetch(animationPath, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        animationCache.set(animationPath, data);
        setAnimationData(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load animation:", err);
          setHasError(true);
        }
      });

    return () => controller.abort();
  }, [animationPath]);

  // Autoplay: play immediately when Lottie is ready (for hero animation)
  useEffect(() => {
    if (!autoplay || !isReady || !lottieRef.current || hasPlayedRef.current)
      return;

    hasPlayedRef.current = true;

    // Small delay to ensure Lottie is fully initialized
    requestAnimationFrame(() => {
      lottieRef.current?.goToAndPlay(0);
    });
  }, [autoplay, isReady]);

  // Play on view: use IntersectionObserver (for feature animations)
  useEffect(() => {
    if (autoplay) return;

    const container = containerRef.current;
    if (!container || !isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          lottieRef.current &&
          !hasPlayedRef.current
        ) {
          hasPlayedRef.current = true;
          lottieRef.current.goToAndPlay(0);
        }
      },
      { threshold: viewThreshold },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [autoplay, viewThreshold, isReady]);

  // Show skeleton while loading or on error
  if (!animationData || hasError) {
    const skeletonClass =
      variant === "dark"
        ? "w-full h-full min-h-[200px]"
        : "w-full h-full min-h-[200px] rounded-lg bg-gradient-to-r from-stone-200/50 via-stone-100/50 to-stone-200/50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

    return (
      <div ref={containerRef} className={className}>
        <div className={skeletonClass} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={false}
        onDOMLoaded={handleDOMLoaded}
      />
    </div>
  );
}
