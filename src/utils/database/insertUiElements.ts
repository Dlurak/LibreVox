import e from "@edgedb";
import { UiElement } from "@schemes/request/poll/uiElement";
import { client } from "index";

export const insertUiElementsQuery = async (elements: UiElement[]) => {
	return client.transaction(async (tx) => {
		const ids: string[] = [];
		for (const ele of elements) {
			const table = {
				switch: e.Switch,
				text: e.Text,
			}[ele.type];

			ids.push(
				await e
					// @ts-ignore The type information of the function ensure safety
					.insert(table, ele.body)
					.run(tx)
					.then((r) => r.id),
			);
		}

		return ids;
	});
};
