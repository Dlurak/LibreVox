import e from "@edgedb";
import { PageCondition } from "@schemes/conditions/pageCondition";
import { client } from "index";

export const getPageByIndex = async (pollId: string, pageNumber: number) => {
	const result = await e
		.select(e.Poll, () => ({
			filter_single: { id: pollId },
			pages: (page) => ({
				nextPage: true,
				id: true,
				number: true,
				parts: true,
				filter_single: e.op(page.number, "=", pageNumber),
			}),
		}))
		.run(client);

	if (!result) return null;

	return {
		...result.pages[0],
		nextPage: result.pages[0].nextPage as PageCondition[],
	};
};
