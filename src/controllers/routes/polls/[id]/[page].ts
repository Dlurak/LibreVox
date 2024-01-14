import { MAX_I16 } from "@constants/ints";
import {
  DATABASE_READ_FAILED,
  POLL_NOT_FOUND,
  UNAUTHORIZED,
} from "@constants/responses";
import e from "@edgedb";
import { sameContent } from "@utils/arrays/sameContent";
import { isLoggedIn } from "@utils/plugins/jwt";
import { Elysia, t } from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";
import { client } from "index";

const pageIdRouter = new Elysia()
  .use(isLoggedIn)
  .use(HttpStatusCode)
  .put(
    "/poll/:id/:pageNumber",
    async ({
      auth,
      set,
      httpStatus,
      params: { id: pageId, pageNumber },
      body,
    }) => {
      if (!auth.isAuthorized) {
        set.status = httpStatus.HTTP_401_UNAUTHORIZED;
        return UNAUTHORIZED;
      }

      const parts = await e
        .select(e.Poll, () => ({
          pages: (page) => ({
            parts: (part) => ({
              id: true,
              type: true,

              ...e.is(e.Switch, { text: true, default: true }),
              filter: e.op(
                part.masterType,
                "=",
                e.cast(e.GeneralType, "ANSWERABLE"),
              ),
            }),
            filter: e.op(page.number, "=", pageNumber),
          }),
          filter_single: { id: e.cast(e.uuid, pageId) },
        }))
        .run(client)
        .then((res) => res?.pages[0].parts)
        .catch(() => new Error());

      if (parts instanceof Error) {
        set.status = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
        return DATABASE_READ_FAILED;
      }
      if (!parts) {
        set.status = httpStatus.HTTP_404_NOT_FOUND;
        return POLL_NOT_FOUND;
      }

      const realIds = parts.map((p) => p.id);
      const bodyIds = Object.keys(body);
      if (!sameContent(realIds, bodyIds)) {
        set.status = httpStatus.HTTP_400_BAD_REQUEST;
        return {
          message: "additional or missing id",
          error: {
            code: "ADDITIONAL_OR_MISSING_ID",
            message:
              "Please specify all required ids but not any additional ones",
          },
        };
      }

	  // add the answer for every single thing but only after verifying all the types

      return { parts };
    },
    {
      params: t.Object({
        id: t.String({ format: "uuid" }),
        pageNumber: t.Numeric({
          minimum: 1,
          maximum: MAX_I16,
        }),
      }),
      body: t.Record(t.String({ format: "uuid" }), t.Union([t.Boolean()])),
    },
  );

export { pageIdRouter };
