import { NextResponse } from "next/server";

/**
 * API Response Utilities
 * 
 * Centralized API response helpers following DRY principle.
 */

/**
 * Success response
 */
export function apiSuccess<T>(
  data: T,
  options?: {
    status?: number;
    message?: string;
  }
) {
  return NextResponse.json(
    {
      success: true,
      data,
      message: options?.message,
    },
    { status: options?.status || 200 }
  );
}

/**
 * Error response
 */
export function apiError(
  message: string,
  options?: {
    status?: number;
    code?: string;
    errors?: Record<string, string[]>;
  }
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: options?.code || "INTERNAL_ERROR",
        errors: options?.errors,
      },
    },
    { status: options?.status || 500 }
  );
}

/**
 * Validation error response (400)
 */
export function apiValidationError(errors: Record<string, string[]>) {
  return apiError("Validation failed", {
    status: 400,
    code: "VALIDATION_ERROR",
    errors,
  });
}

/**
 * Not found response (404)
 */
export function apiNotFound(resource: string) {
  return apiError(`${resource} not found`, {
    status: 404,
    code: "NOT_FOUND",
  });
}

/**
 * Unauthorized response (401)
 */
export function apiUnauthorized(message = "Unauthorized") {
  return apiError(message, {
    status: 401,
    code: "UNAUTHORIZED",
  });
}

/**
 * Forbidden response (403)
 */
export function apiForbidden(message = "Forbidden") {
  return apiError(message, {
    status: 403,
    code: "FORBIDDEN",
  });
}

/**
 * Method not allowed response (405)
 */
export function apiMethodNotAllowed(method: string) {
  return apiError(`Method ${method} not allowed`, {
    status: 405,
    code: "METHOD_NOT_ALLOWED",
  });
}
