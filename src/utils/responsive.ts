// Responsive utility functions and hooks for the SaveRush application

import { useState, useEffect } from "react";

// Breakpoint values that match our Tailwind config
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1600,
  "4xl": 2000,
} as const;

// Hook to get current screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    breakpoint: string;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
    breakpoint: "lg",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let breakpoint = "xs";
      if (width >= breakpoints["4xl"]) breakpoint = "4xl";
      else if (width >= breakpoints["3xl"]) breakpoint = "3xl";
      else if (width >= breakpoints["2xl"]) breakpoint = "2xl";
      else if (width >= breakpoints.xl) breakpoint = "xl";
      else if (width >= breakpoints.lg) breakpoint = "lg";
      else if (width >= breakpoints.md) breakpoint = "md";
      else if (width >= breakpoints.sm) breakpoint = "sm";
      else if (width >= breakpoints.xs) breakpoint = "xs";

      setScreenSize({ width, height, breakpoint });
    };

    handleResize(); // Set initial value

    // Debounce resize events to prevent excessive re-renders
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
}

// Hook to check if screen is mobile
export function useIsMobile() {
  const { width } = useScreenSize();
  return width < breakpoints.md;
}

// Hook to check if screen is tablet
export function useIsTablet() {
  const { width } = useScreenSize();
  return width >= breakpoints.md && width < breakpoints.lg;
}

// Hook to check if screen is desktop
export function useIsDesktop() {
  const { width } = useScreenSize();
  return width >= breakpoints.lg;
}

// Responsive grid column calculator
export function getResponsiveColumns(
  screenWidth: number,
  config: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    ultrawide?: number;
  }
) {
  if (screenWidth >= breakpoints["2xl"] && config.ultrawide)
    return config.ultrawide;
  if (screenWidth >= breakpoints.lg && config.desktop) return config.desktop;
  if (screenWidth >= breakpoints.md && config.tablet) return config.tablet;
  return config.mobile || 2;
}

// Responsive spacing calculator
export function getResponsiveSpacing(
  screenWidth: number,
  type: "padding" | "margin" | "gap" = "padding"
) {
  const base = {
    padding: { mobile: "p-3", tablet: "p-4", desktop: "p-6", ultrawide: "p-8" },
    margin: { mobile: "m-3", tablet: "m-4", desktop: "m-6", ultrawide: "m-8" },
    gap: {
      mobile: "gap-2",
      tablet: "gap-3",
      desktop: "gap-4",
      ultrawide: "gap-6",
    },
  };

  if (screenWidth >= breakpoints["2xl"]) return base[type].ultrawide;
  if (screenWidth >= breakpoints.lg) return base[type].desktop;
  if (screenWidth >= breakpoints.md) return base[type].tablet;
  return base[type].mobile;
}

// Responsive text size calculator
export function getResponsiveTextSize(
  screenWidth: number,
  size: "small" | "base" | "large" | "xl" = "base"
) {
  const sizes = {
    small: {
      mobile: "text-xs",
      tablet: "text-sm",
      desktop: "text-sm",
      ultrawide: "text-base",
    },
    base: {
      mobile: "text-sm",
      tablet: "text-base",
      desktop: "text-base",
      ultrawide: "text-lg",
    },
    large: {
      mobile: "text-base",
      tablet: "text-lg",
      desktop: "text-xl",
      ultrawide: "text-2xl",
    },
    xl: {
      mobile: "text-lg",
      tablet: "text-xl",
      desktop: "text-2xl",
      ultrawide: "text-3xl",
    },
  };

  if (screenWidth >= breakpoints["2xl"]) return sizes[size].ultrawide;
  if (screenWidth >= breakpoints.lg) return sizes[size].desktop;
  if (screenWidth >= breakpoints.md) return sizes[size].tablet;
  return sizes[size].mobile;
}

// Image size calculator for responsive images
export function getResponsiveImageSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  ultrawide?: string;
}) {
  return `(max-width: ${breakpoints.md}px) ${
    config.mobile || "100vw"
  }, (max-width: ${breakpoints.lg}px) ${config.tablet || "50vw"}, (max-width: ${
    breakpoints["2xl"]
  }px) ${config.desktop || "33vw"}, ${config.ultrawide || "25vw"}`;
}

// Container width calculator
export function getContainerWidth(screenWidth: number) {
  if (screenWidth >= breakpoints["3xl"]) return "max-w-8xl";
  if (screenWidth >= breakpoints["2xl"]) return "max-w-7xl";
  if (screenWidth >= breakpoints.xl) return "max-w-6xl";
  if (screenWidth >= breakpoints.lg) return "max-w-5xl";
  if (screenWidth >= breakpoints.md) return "max-w-4xl";
  return "max-w-full";
}

// Touch target size helper
export function getTouchTargetSize(isMobile: boolean) {
  return isMobile ? "min-h-[44px] min-w-[44px]" : "";
}

// Responsive modal size
export function getModalSize(screenWidth: number) {
  if (screenWidth >= breakpoints.lg) return "max-w-2xl";
  if (screenWidth >= breakpoints.md) return "max-w-xl";
  return "max-w-full";
}

// Safe area utilities for mobile devices
export function getSafeAreaClasses() {
  return "safe-area-inset-top safe-area-inset-bottom safe-area-inset";
}

// Device detection utilities
export function getDeviceType(
  screenWidth: number
): "mobile" | "tablet" | "desktop" | "ultrawide" {
  if (screenWidth >= breakpoints["2xl"]) return "ultrawide";
  if (screenWidth >= breakpoints.lg) return "desktop";
  if (screenWidth >= breakpoints.md) return "tablet";
  return "mobile";
}

// Responsive animation duration
export function getAnimationDuration(
  deviceType: ReturnType<typeof getDeviceType>
) {
  const durations = {
    mobile: "duration-200",
    tablet: "duration-300",
    desktop: "duration-300",
    ultrawide: "duration-500",
  };
  return durations[deviceType];
}

// Grid configuration presets
export const gridPresets = {
  categories: {
    mobile: 3,
    tablet: 5,
    desktop: 8,
    ultrawide: 10,
  },
  products: {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    ultrawide: 5,
  },
  quickActions: {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    ultrawide: 4,
  },
} as const;

export type GridPreset = keyof typeof gridPresets;
