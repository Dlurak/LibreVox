import { Instances } from "@controller/instances/class";
import { Elysia, t } from "elysia";

const instanceRouter = new Elysia({ name: "instanceRouter" }).get(
	"/instances",
	({ query: { offset, limit } }) => ({
		totalInstancesAmount: Instances.instances.length,
		data: Instances.instances.slice(offset, offset + limit),
		dataIsComplete: Instances.initialized,
	}),
	{
		query: t.Object({
			offset: t.Numeric({ minimum: 0 }),
			limit: t.Numeric({ minimum: 1 }),
		}),
	},
);

export { instanceRouter };
