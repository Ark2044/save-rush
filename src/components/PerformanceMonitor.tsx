"use client";

import { useEffect } from "react";

interface PerformanceMonitorProps {
  enabled?: boolean;
  logInterval?: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = process.env.NODE_ENV === "development",
  logInterval = 5000,
}) => {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let observer: PerformanceObserver;
    let intervalId: NodeJS.Timeout;

    try {
      // Monitor performance entries
      observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log("Navigation Performance:", {
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
              domContentLoaded:
                navEntry.domContentLoadedEventEnd -
                navEntry.domContentLoadedEventStart,
              firstPaint: navEntry.fetchStart,
            });
          }

          if (entry.entryType === "measure") {
            console.log(`Performance Measure: ${entry.name}`, {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        });
      });

      observer.observe({ entryTypes: ["measure", "navigation"] });

      // Log memory usage periodically
      intervalId = setInterval(() => {
        if ("memory" in performance) {
          const memory = (performance as any).memory;
          console.log("Memory Usage:", {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + " MB",
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + " MB",
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + " MB",
          });
        }
      }, logInterval);

      // Log Core Web Vitals
      const logCoreWebVitals = () => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          const fcp = performance.getEntriesByName("first-contentful-paint")[0];
          const lcp = performance.getEntriesByName(
            "largest-contentful-paint"
          )[0];

          console.log("Core Web Vitals:", {
            FCP: fcp?.startTime || "N/A",
            LCP: lcp?.startTime || "N/A",
            TTFB: navigation.responseStart - navigation.requestStart,
            domComplete: navigation.domComplete - navigation.domInteractive,
          });
        }
      };

      // Wait for page to load before logging vitals
      if (document.readyState === "complete") {
        logCoreWebVitals();
      } else {
        window.addEventListener("load", logCoreWebVitals);
      }
    } catch (error) {
      console.warn("Performance monitoring not available:", error);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [enabled, logInterval]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
