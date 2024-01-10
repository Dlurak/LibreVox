import e from "@edgedb";
import type { Switch } from "@schemes/request/poll/switch";
import { client } from "index";

type UiElement = Switch;

export const insertUiElementsQuery = async (elements: UiElement[]) => {
	return client.transaction(async (tx) => {
		const ids: string[] = [];
		for (const ele of elements) {
			const table = {
				switch: e.Switch,
			}[ele.type];

			ids.push(
				await e
					.insert(table, ele.body)
					.run(tx)
					.then((r) => r.id),
			);
		}

		return ids;
	});
};
