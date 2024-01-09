import { CONFIG } from "@constants/config";
import createClient from "edgedb";

const { databaseConnectionTimeout: dbConnectionTimeout } = CONFIG;

export const createConnectedClient = async () => {
	const client = createClient();
	setTimeout(async () => {
		const isConnected = await client.ensureConnected().then((c) => !!c);
		if (isConnected) return;

		console.error(
			`Could not connect to the database in ${dbConnectionTimeout}ms`,
		);
		process.exit(1);
	}, dbConnectionTimeout);

	return await client.ensureConnected();
};
