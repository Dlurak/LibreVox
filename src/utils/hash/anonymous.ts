import { syncScrypt } from "scrypt-js";

export enum Operations {
	CREATE = "CREATE",
	ANSWER = "ANSWER",
}

const stringToArrayLikeNumber = (str: string) =>
	Buffer.from(str.normalize("NFKC"), "utf-8");

export const generateHash = (
	userJwt: string,
	objectId: string,
	operation: Operations,
) => {
	const baseString = `${userJwt}${objectId}${operation}`;
	return syncScrypt(
		stringToArrayLikeNumber(baseString),
		stringToArrayLikeNumber(""),
		1024,
		8,
		1,
		16,
	).toString();
};
