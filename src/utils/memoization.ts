"use client";

import React, {
  memo,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";

// Higher-order component for memoization
export function withMemo<T extends object>(
  Component: React.ComponentType<T>,
  areEqual?: (prevProps: T, nextProps: T) => boolean
) {
  return memo(Component, areEqual);
}

// Custom hook for memoized computations
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

// Custom hook for memoized callbacks
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

// Custom hook for memoized objects
export function useMemoizedObject<T extends Record<string, any>>(
  obj: T,
  deps: React.DependencyList
): T {
  return useMemo(() => obj, deps);
}

// Custom hook for memoized arrays
export function useMemoizedArray<T>(arr: T[], deps: React.DependencyList): T[] {
  return useMemo(() => arr, deps);
}

// Performance-optimized component wrapper
export interface OptimizedComponentProps {
  children: React.ReactNode;
  shouldUpdate?: (prevProps: any, nextProps: any) => boolean;
}

export const OptimizedComponent = memo<OptimizedComponentProps>(
  ({ children }) => {
    return children as React.ReactElement;
  },
  (prevProps, nextProps) => {
    if (prevProps.shouldUpdate) {
      return !prevProps.shouldUpdate(prevProps, nextProps);
    }
    return false; // Always update if no custom comparison
  }
);

// Debounced value hook
export function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttled callback hook
export function useThrottled<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  const throttledRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    ((...args) => {
      if (!throttledRef.current) {
        throttledRef.current = true;
        callbackRef.current(...args);
        setTimeout(() => {
          throttledRef.current = false;
        }, delay);
      }
    }) as T,
    [delay]
  );
}

// Memoized style object hook
export function useMemoizedStyles<T extends Record<string, any>>(
  styles: T,
  deps: React.DependencyList
): T {
  return useMemo(() => styles, deps);
}

// Export React memo for direct use
export { memo, useMemo, useCallback };
