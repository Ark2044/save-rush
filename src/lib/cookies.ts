// Cookie management utilities

/**
 * Set a cookie with the given name, value, and options
 */
export const setCookie = (
  name: string,
  value: string,
  maxAge: number = 604800
) => {
  try {
    const secure = window.location.protocol === "https:" ? "Secure;" : "";
    const cookieString = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax; ${secure}`;
    document.cookie = cookieString;
    console.log(`Cookie set: ${name} (expires in ${maxAge}s)`);

    // Verify cookie was set
    setTimeout(() => {
      const verifiedCookie = getCookie(name);
      if (!verifiedCookie) {
        console.warn(
          `Failed to set cookie ${name}. Cookie not found after setting.`
        );
      } else {
        console.log(`Cookie ${name} verified successfully`);
      }
    }, 100);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

/**
 * Delete a cookie with the given name
 */
export const deleteCookie = (name: string) => {
  try {
    const secure = window.location.protocol === "https:" ? "Secure;" : "";
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; ${secure}`;
    console.log(`Cookie deleted: ${name}`);

    // Verify cookie was deleted
    setTimeout(() => {
      const verifiedCookie = getCookie(name);
      if (verifiedCookie) {
        console.warn(`Failed to delete cookie ${name}. Cookie still exists.`);
      } else {
        console.log(`Cookie ${name} deleted successfully`);
      }
    }, 100);
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
};

/**
 * Get a cookie by name
 */
export const getCookie = (name: string): string | null => {
  try {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const parts = cookie.trim().split("=");
      const cookieName = parts[0];
      const cookieValue = parts.slice(1).join("="); // Handle values that might contain =

      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};
