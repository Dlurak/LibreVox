import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";

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
