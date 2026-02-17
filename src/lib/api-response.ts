/**
 * API Response Utilities
 * 
 * Centralized API response helpers following DRY principle.
 * Provides standardized response formats for API routes.
 * @module lib/api-response
 */

import { NextResponse } from "next/server";

/**
 * Success response
 * @param data - Data to return in response
 * @param options - Optional status code and message
 * @returns NextResponse with success JSON
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
 * @param message - Error message
 * @param options - Optional status code, error code, and validation errors
 * @returns NextResponse with error JSON
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
 * @param errors - Validation error details
 * @returns NextResponse with 400 status
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
 * @param resource - Name of resource that wasn't found
 * @returns NextResponse with 404 status
 */
export function apiNotFound(resource: string) {
  return apiError(`${resource} not found`, {
    status: 404,
    code: "NOT_FOUND",
  });
}

/**
 * Unauthorized response (401)
 * @param message - Optional custom message
 * @returns NextResponse with 401 status
 */
export function apiUnauthorized(message = "Unauthorized") {
  return apiError(message, {
    status: 401,
    code: "UNAUTHORIZED",
  });
}

/**
 * Forbidden response (403)
 * @param message - Optional custom message
 * @returns NextResponse with 403 status
 */
export function apiForbidden(message = "Forbidden") {
  return apiError(message, {
    status: 403,
    code: "FORBIDDEN",
  });
}

/**
 * Method not allowed response (405)
 * @param method - HTTP method that isn't allowed
 * @returns NextResponse with 405 status
 */
export function apiMethodNotAllowed(method: string) {
  return apiError(`Method ${method} not allowed`, {
    status: 405,
    code: "METHOD_NOT_ALLOWED",
  });
}
