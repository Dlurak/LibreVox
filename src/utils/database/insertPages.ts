import e from "@edgedb";
import type { Page } from "@schemes/request/poll/page";
import { client } from "index";
import { insertUiElementsQuery } from "./insertUiElements";

export const insertPages = (pages: Page[]) => {
	return Promise.all(
		pages.map(async (page, i) => {
			const partIds = await insertUiElementsQuery(page.parts);
			return e
				.insert(e.Page, {
					...page,
					number: i + 1,
					parts: e.select(e.Part, (part) => ({
						filter: e.op(e.cast(e.str, part.id), "in", e.set(...partIds)),
					})),
				})
				.run(client)
				.then((r) => r.id);
		}),
	);
};
