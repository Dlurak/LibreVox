import { instanceResponseScheme } from "@schemes/instances/response";
import { Value } from "@sinclair/typebox/value";
import { CONFIG } from "constants/config";

const loadInstanceInfo = async (url: string) =>
	await fetch(url, {
		headers: { "User-Agent": `Librepoll:${CONFIG.name}` },
	})
		.then((res) => res.json())
		.catch(() => ({}));

const loadInstanceName = async (url: string) => {
	const rawData = await loadInstanceInfo(url);
	if (!Value.Check(instanceResponseScheme, rawData))
		return { error: "invalid" };

	return Value.Decode(instanceResponseScheme, rawData).instanceName;
};

export type Instance = {
	url: string;
	name: string;
};

const loadInstancesPromises = () =>
	CONFIG.instances.map(async (url) => ({
		url,
		name: await loadInstanceName(url),
	}));

export const loadInstances = async () => {
	return Promise.all(loadInstancesPromises()).then((l) =>
		l.filter(({ name }) => typeof name === "string"),
	) as Promise<Instance[]>;
};
