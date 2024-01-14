import { LogicalOperator } from "@schemes/conditions/logical";

export const parseLogicalCondition = (cond: LogicalOperator) => {
	const rawValues = [cond.values[0], cond.values[1] ?? cond.values[0]];

	const values: boolean[] = [];
	if (typeof rawValues[0] !== "boolean") {
		values.push(parseLogicalCondition(rawValues[0]));
	} else {
		values.push(rawValues[0]);
	}

	if (typeof rawValues[1] !== "boolean") {
		values.push(parseLogicalCondition(rawValues[1]));
	} else {
		values.push(rawValues[1]);
	}

	switch (cond.operation) {
		case "OR":
			return values[0] || values[1];
		case "AND":
			return values[0] && values[1];
		case "XOR":
			return values[0] !== values[1];
		case "NOT":
			return !values[0];
	}
};
