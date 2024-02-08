import { TYPES_WITH_VAR } from "@constants/variables";
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
				seperator: e.Seperator,
			}[ele.type];

			// @ts-expect-error The includes makes this safe
			const insertion = TYPES_WITH_VAR.includes(ele.type)
				? { ...ele.body, varName: ele.varName }
				: ele.body;

			ids.push(
				await e
					// @ts-ignore The type information of the function ensure safety
					.insert(table, insertion)
					.run(tx)
					.then((r) => r.id),
			);
		}

		return ids;
	});
};
