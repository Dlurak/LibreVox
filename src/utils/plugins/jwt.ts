import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

export const userJwt = new Elysia().use(
	jwt({
		name: "userJwt",
		secret: process.env.JWT_SECRET,
		schema: t.Object({
			type: t.Union([
				t.Literal("anonymous"),
				// Registered users will be supported in the future
				// t.Literal('registered')
			]),
		}),
	}),
);
