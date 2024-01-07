import { readConfig } from "@utils/config/readConfig";

export const CONFIG = await readConfig("./.config/config.json").catch((e) => {
	console.error(e);
	process.exit(1);
});
