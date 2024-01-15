import e from "@edgedb";
import { PageCondition } from "@schemes/conditions/pageCondition";
import { client } from "index";

export const getPageByNumber = (pollId: string, pageNumber: number) =>
	e
		.select(e.Poll, () => ({
			filter_single: { id: pollId },
			pages: (page) => ({
				nextPage: true,
				id: true,
				filter_single: e.op(page.number, "=", pageNumber),
			}),
		}))
		.run(client)
		.then(
			(res) =>
				res?.pages[0] as {
					id: string;
					nextPage: PageCondition[];
				},
		);
