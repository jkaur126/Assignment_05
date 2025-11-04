/**
 * Generic API response model for consistent output.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

/**
 * Construct a successful response.
 * @template T
 */
export const successResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => ({
  success: true,
  message,
  data
});

/**
 * Construct an error response.
 */
export const errorResponse = (
  message: string,
  error?: any
): ApiResponse<null> => ({
  success: false,
  message,
  error
});
