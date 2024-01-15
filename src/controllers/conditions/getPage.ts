import type { PageCondition } from "@schemes/conditions/pageCondition";
import { getPageByNumber } from "@utils/database/getPageByNumber";
import { userHasAnsweredPage } from "@utils/database/userHasAnsweredPage";
import { parseLogicalCondition } from "./logical";

export const getValidPages = (data: PageCondition[]) =>
	data
		.filter((condition) => {
			const cond = condition.condition;
			if (typeof cond === "boolean") return cond;
			return parseLogicalCondition(cond);
		})
		.map((cond) => cond.page);

export const getNextPage = async (
	pollId: string,
	currentPageNumber: number,
) => {
	const currentPage = await getPageByNumber(pollId, currentPageNumber);

	if (!currentPage) return undefined;

	const { nextPage, id } = currentPage;

	return {
		nextPage: getValidPages(nextPage)[0] as number | undefined,
		currentId: id,
	};
};

export const getHighestValdiPage = async (pollId: string, token: string) => {
	let currentPageNumber = 1;

	while (true) {
		const nextPage = await getNextPage(pollId, currentPageNumber);

		if (!nextPage) return undefined;

		const userHasAnswered = await userHasAnsweredPage(
			token,
			nextPage.currentId,
		);
		if (!userHasAnswered) return currentPageNumber;

		if (typeof nextPage.nextPage !== "number") return undefined;

		currentPageNumber = nextPage.nextPage;
	}
};
