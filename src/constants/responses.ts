export const UNAUTHORIZED = {
	message: "unauthorized",
	error: {
		code: "MISSING_OR_INVALID_TOKEN",
		message: "Please specify a token, this can still be used anomously",
	},
} as const;

export const DATABASE_WRITE_FAILED = {
	message: "internal error",
	error: {
		code: "DATABASE_WRITE_FAILURE",
		message:
			"Could not write to the database, try again later or contact support",
	},
} as const;

export const DATABASE_READ_FAILED = {
	message: "internal error",
	error: {
		code: "DATABASE_READ_FAILED",
		message:
			"Could not read from the database, try again later or create a GitHub issue",
	},
} as const;

export const POLL_NOT_FOUND = {
	message: "poll not found",
	error: {
		code: "POLL_NOT_FOUND",
		message: "The requested poll could not be found",
	},
} as const;

export const INTERNAL_ERROR = {
	message: "internal server error",
	error: {
		code: "INTERNAL_ERROR",
		message:
			"A internal server error occured, try again later or create a GitHub issue",
	},
};

type ErrorResponses =
	| typeof UNAUTHORIZED
	| typeof DATABASE_WRITE_FAILED
	| typeof DATABASE_READ_FAILED
	| typeof POLL_NOT_FOUND;

export type ErrorResponseCode = ErrorResponses["error"]["code"];
