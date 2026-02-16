/**
 * Validation Utilities
 * 
 * Centralized validation functions following DRY principle.
 * Reusable validation logic across the application.
 */

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Password strength validation
 * Returns true if password is valid
 */
export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return true;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
}

/**
 * Validate string length
 */
export function hasValidLength(
  value: string,
  options: { min?: number; max?: number }
): boolean {
  const { min, max } = options;
  const length = value.length;
  
  if (min !== undefined && length < min) return false;
  if (max !== undefined && length > max) return false;
  
  return true;
}

/**
 * Sanitize input - prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * Validate environment variables
 */
export function validateEnvVars(required: string[]): {
  valid: boolean;
  missing: string[];
} {
  const missing = required.filter((key) => !process.env[key]);
  
  return {
    valid: missing.length === 0,
    missing,
  };
}
