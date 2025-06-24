"use client";
import React from "react";
import {
  useScreenSize,
  getContainerWidth,
  getResponsiveSpacing,
} from "@/utils/responsive";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "none" | "small" | "medium" | "large";
  maxWidth?: "full" | "auto" | "container";
}

export function ResponsiveContainer({
  children,
  className = "",
  spacing = "medium",
  maxWidth = "container",
}: ResponsiveContainerProps) {
  const { width } = useScreenSize();

  const spacingClasses =
    spacing === "none" ? "" : getResponsiveSpacing(width, "padding");
  const containerClasses =
    maxWidth === "container"
      ? getContainerWidth(width)
      : maxWidth === "auto"
      ? ""
      : "max-w-full";

  return (
    <div
      className={`mx-auto ${containerClasses} ${spacingClasses} ${className}`}
    >
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns: {
    mobile: number;
    tablet?: number;
    desktop?: number;
    ultrawide?: number;
  };
  gap?: "small" | "medium" | "large";
}

export function ResponsiveGrid({
  children,
  className = "",
  columns,
  gap = "medium",
}: ResponsiveGridProps) {
  const gapClasses = {
    small: "gap-2 sm:gap-3",
    medium: "gap-3 sm:gap-4 lg:gap-6",
    large: "gap-4 sm:gap-6 lg:gap-8",
  };

  const gridCols = `grid-cols-${columns.mobile} ${
    columns.tablet ? `sm:grid-cols-${columns.tablet}` : ""
  } ${columns.desktop ? `lg:grid-cols-${columns.desktop}` : ""} ${
    columns.ultrawide ? `2xl:grid-cols-${columns.ultrawide}` : ""
  }`;

  return (
    <div className={`grid ${gridCols} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
}

export function ResponsiveText({
  children,
  as: Component = "p",
  size = "base",
  className = "",
}: ResponsiveTextProps) {
  const responsiveSizes = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl lg:text-2xl",
    xl: "text-xl sm:text-2xl lg:text-3xl",
    "2xl": "text-2xl sm:text-3xl lg:text-4xl",
    "3xl": "text-3xl sm:text-4xl lg:text-5xl",
    "4xl": "text-4xl sm:text-5xl lg:text-6xl",
  };

  return (
    <Component className={`${responsiveSizes[size]} ${className}`}>
      {children}
    </Component>
  );
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: {
    mobile: string;
    tablet?: string;
    desktop?: string;
    ultrawide?: string;
  };
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ResponsiveImage({
  src,
  alt,
  className = "",
  sizes = {
    mobile: "100vw",
    tablet: "50vw",
    desktop: "33vw",
    ultrawide: "25vw",
  },
  fill = false,
  width,
  height,
}: ResponsiveImageProps) {
  const responsiveSizes = `(max-width: 768px) ${
    sizes.mobile
  }, (max-width: 1024px) ${sizes.tablet || sizes.mobile}, (max-width: 1536px) ${
    sizes.desktop || sizes.tablet || sizes.mobile
  }, ${sizes.ultrawide || sizes.desktop || sizes.tablet || sizes.mobile}`;

  const imageProps = {
    src,
    alt,
    className: `object-cover ${className}`,
    sizes: responsiveSizes,
    ...(fill ? { fill: true } : { width, height }),
  };

  // For Next.js Image component
  const Image = require("next/image").default;
  return <Image {...imageProps} />;
}

interface ResponsiveSpacingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "vertical" | "horizontal" | "all";
}

export function ResponsiveSpacing({
  size = "md",
  type = "vertical",
}: ResponsiveSpacingProps) {
  const spacingMap = {
    xs: {
      vertical: "py-1 sm:py-2",
      horizontal: "px-1 sm:px-2",
      all: "p-1 sm:p-2",
    },
    sm: {
      vertical: "py-2 sm:py-3",
      horizontal: "px-2 sm:px-3",
      all: "p-2 sm:p-3",
    },
    md: {
      vertical: "py-3 sm:py-4 lg:py-6",
      horizontal: "px-3 sm:px-4 lg:px-6",
      all: "p-3 sm:p-4 lg:p-6",
    },
    lg: {
      vertical: "py-4 sm:py-6 lg:py-8",
      horizontal: "px-4 sm:px-6 lg:px-8",
      all: "p-4 sm:p-6 lg:p-8",
    },
    xl: {
      vertical: "py-6 sm:py-8 lg:py-12",
      horizontal: "px-6 sm:px-8 lg:px-12",
      all: "p-6 sm:p-8 lg:p-12",
    },
  };

  return <div className={spacingMap[size][type]} />;
}

// Hook for responsive behavior
export function useResponsiveClasses() {
  const { width, breakpoint } = useScreenSize();

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    breakpoint,
    containerClass: `container-responsive ${getContainerWidth(width)}`,
    touchTargetClass: width < 768 ? "min-h-[44px] min-w-[44px]" : "",
    spacingClass: getResponsiveSpacing(width),
  };
}
