import { EXCLUDED_VAR_NAMES, ExcludedVarNames } from "@constants/variables";
import type {
	AnswerType,
	AnswerTypeToNormal,
} from "@schemes/request/poll/answerType";

type VariableRawData<T extends AnswerType> = {
	answerType: T;
	varName: string;
	value: AnswerTypeToNormal<T>;
};

type Variable = {
	value: AnswerTypeToNormal<AnswerType>;
	type: AnswerType;
};

const createVar = ({
	varName,
	value,
	answerType: type,
}: VariableRawData<AnswerType>): [string, Variable] => [
	varName,
	{ value, type },
];
export const createVarsObject = (raw: VariableRawData<AnswerType>[]) => {
	const vals = raw
		.map(createVar)
		.filter((v) => !EXCLUDED_VAR_NAMES.includes(v[0] as ExcludedVarNames));

	return Object.fromEntries(vals) as Record<string, Variable>;
};
