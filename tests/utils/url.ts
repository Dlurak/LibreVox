/**
 * Gets the base URL for the application
 *
 * @function
 * @returns The base, URL, including the port, but without a trailing slash
 */
export const getBaseUrl = () => `http://localhost:${process.env.PORT}` as const;
