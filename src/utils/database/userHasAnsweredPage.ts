import e from "@edgedb";
import { Operations, generateHash } from "@utils/hash/anonymous";
import { client } from "index";

/**
 * Checks if the user has answered the page
 * @param token - The user's jwt token
 * @param pageId - The page id
 * @returns - A boolean indicating if the user has answered the page
 *
 * @example
 * ```ts
 * const hasAnswered = await userHasAnsweredPage(token, pageId);
 * ```
 */
export const userHasAnsweredPage = async (token: string, pageId: string) => {
	const respondent = generateHash(token, pageId, Operations.ANSWER);
	return await e
		.select(e.Answer, (ans) => ({
			filter: e.op(ans.respondent, "=", respondent),
		}))
		.run(client)
		.then((res) => res.length > 0);
};
