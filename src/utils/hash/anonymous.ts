export enum Operations {
	CREATE = "CREATE",
}

/**
 *
 */
export const generateHash = (
	userJwt: string,
	objectId: string,
	operation: Operations,
) => {
	const baseString = `${userJwt}${objectId}${operation}`;
	return Bun.password.hashSync(baseString);
};
