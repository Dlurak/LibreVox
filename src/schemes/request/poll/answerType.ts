import { type Static, t } from "elysia";

export const answerType = t.Union([t.Literal("BOOL")]);

export const fullAnswerType = t.Union([answerType, t.Null()]);

export type AnswerType = Static<typeof answerType>;
export type FullAnserType = Static<typeof fullAnswerType>;

export type AnswerTypeToNormal<T extends AnswerType> = T extends "BOOL"
	? boolean
	: never;
