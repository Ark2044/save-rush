// Performance configuration for SaveRush application
// This file centralizes all performance-related settings

export const PERFORMANCE_CONFIG = {
  // Timer intervals (in milliseconds)
  TIMERS: {
    QUICK_DELIVERY_BANNER: parseInt(
      process.env.NEXT_PUBLIC_QUICK_DELIVERY_INTERVAL || "5000"
    ),
    DAILY_DEALS_UPDATE: parseInt(
      process.env.NEXT_PUBLIC_DAILY_DEALS_INTERVAL || "300000"
    ),
    HERO_BANNER_SLIDE: parseInt(
      process.env.NEXT_PUBLIC_HERO_BANNER_INTERVAL || "10000"
    ),
    TESTIMONIALS_ROTATE: parseInt(
      process.env.NEXT_PUBLIC_TESTIMONIALS_INTERVAL || "10000"
    ),
    JWT_REFRESH: parseInt(
      process.env.NEXT_PUBLIC_REFRESH_INTERVAL || "3000000"
    ), // 50 minutes
    PERFORMANCE_MONITOR: parseInt(
      process.env.NEXT_PUBLIC_PERFORMANCE_LOG_INTERVAL || "30000"
    ), // 30 seconds
  },

  // Cache settings
  CACHE: {
    DURATION: 5 * 60 * 1000, // 5 minutes
    MAX_ENTRIES: 100,
    CLEANUP_INTERVAL: 10 * 60 * 1000, // 10 minutes
  },

  // Debounce settings
  DEBOUNCE: {
    SEARCH: 300, // 300ms
    RESIZE: 100, // 100ms
    SCROLL: 50, // 50ms
    USER_INPUT: 250, // 250ms
  },

  // Request settings
  REQUEST: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },

  // Logging settings
  LOGGING: {
    ENABLED: process.env.NODE_ENV === "development",
    LEVEL: process.env.NODE_ENV === "development" ? "debug" : "error",
    CONSOLE_LOGS: process.env.NODE_ENV === "development",
    PERFORMANCE_LOGS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  },

  // Component optimization settings
  OPTIMIZATION: {
    MEMO_ENABLED: true,
    LAZY_LOADING: true,
    VIRTUAL_SCROLLING: false, // Enable for large lists
    IMAGE_OPTIMIZATION: true,
  },

  // Feature flags
  FEATURES: {
    ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    PERFORMANCE_MONITORING: process.env.NODE_ENV === "development",
    REQUEST_DEDUPLICATION: true,
    RESPONSE_CACHING: true,
    ERROR_BOUNDARY: true,
  },
};

// Helper functions for performance
export const getOptimizedInterval = (
  baseInterval: number,
  factor: number = 1
) => {
  const isProduction = process.env.NODE_ENV === "production";
  return isProduction ? baseInterval * factor : baseInterval;
};

export const shouldLog = (
  level: "debug" | "info" | "warn" | "error" = "debug"
) => {
  if (!PERFORMANCE_CONFIG.LOGGING.ENABLED) return false;

  const levels = { debug: 0, info: 1, warn: 2, error: 3 };
  const currentLevel =
    levels[PERFORMANCE_CONFIG.LOGGING.LEVEL as keyof typeof levels] || 0;
  const messageLevel = levels[level] || 0;

  return messageLevel >= currentLevel;
};

export const performanceLog = (
  message: string,
  data?: any,
  level: "debug" | "info" | "warn" | "error" = "debug"
) => {
  if (!shouldLog(level)) return;

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  switch (level) {
    case "error":
      console.error(logMessage, data);
      break;
    case "warn":
      console.warn(logMessage, data);
      break;
    case "info":
      console.info(logMessage, data);
      break;
    default:
      console.log(logMessage, data);
  }
};

export default PERFORMANCE_CONFIG;
