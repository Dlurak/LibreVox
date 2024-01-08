import bearer from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import { Elysia, type Static } from "elysia";
import { userJwtPayloadScheme } from "@schemes/userJwtPayload";

export const userJwt = new Elysia().use(
  jwt({
    name: "userJwt",
    secret: process.env.JWT_SECRET,
    schema: userJwtPayloadScheme,
  }),
);

type UnAuthorized = {
  isAuthorized: false;
};

type Authorized = {
  isAuthorized: true;
  payload: Static<typeof userJwtPayloadScheme>;
  token: string;
};

type IsLoggedIn = { auth: UnAuthorized | Authorized };

export const isLoggedIn = new Elysia()
  .use(bearer())
  .use(userJwt)
  .derive(async ({ bearer, userJwt }): Promise<IsLoggedIn> => {
    if (!bearer) return { auth: { isAuthorized: false } };

    const payload = await userJwt.verify(bearer);
    if (!payload) return { auth: { isAuthorized: false } };

    return {
      auth: { payload, isAuthorized: true, token: bearer },
    };
  });
