export const UNAUTHORIZED = {
  message: "unauthorized",
  error: {
	  code: "MISSING_OR_INVALID_TOKEN",
	  message: "Please specify a token, this can still be used anomously"
  }
} as const;

export const DATABASE_WRITE_FAILED = {
  message: "internal error",
  error: {
    code: "DATABASE_WRITE_FAILURE",
    message:
      "Could not write to the database, try again later or contact support",
  },
} as const;
