import type { PageCondition } from "@schemes/conditions/pageCondition";
import { getPageByIndex } from "@utils/database/getPageByNumber";
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

const getNextPage = async (pollId: string, currentPageNumber: number) => {
	const currentPage = await getPageByIndex(pollId, currentPageNumber);

	if (!currentPage) return undefined;

	const { nextPage, id } = currentPage;

	return {
		nextPage: getValidPages(nextPage)[0] as number | undefined,
		currentId: id,
	};
};

export const getHighestValdiPage = async (
	pollId: string,
	token: string,
	currentPageNumber = 1,
): Promise<number | undefined> => {
	const nextPage = await getNextPage(pollId, currentPageNumber);
	if (!nextPage) return undefined;

	const userHasAnswered = await userHasAnsweredPage(token, nextPage.currentId);
	if (!userHasAnswered) return currentPageNumber;
	if (typeof nextPage.nextPage !== "number") return undefined;

	return getHighestValdiPage(pollId, token, nextPage.nextPage);
};

export const getAllViewablePageIndexes = async (
	pollId: string,
	token: string,
	viewable = [1],
): Promise<{ viewable: number[]; isFinished: boolean }> => {
	const nextPage = await getNextPage(pollId, viewable.at(-1) as number);
	if (!nextPage || !nextPage.nextPage) {
		return {
			viewable,
			isFinished: await userHasAnsweredPage(token, nextPage.currentId),
		};
	}

	const userHasAnswered = await userHasAnsweredPage(token, nextPage.currentId);
	if (!userHasAnswered) {
		return { viewable, isFinished: false };
	}

	return await getAllViewablePageIndexes(pollId, token, [
		...viewable,
		nextPage.nextPage,
	]);
};
