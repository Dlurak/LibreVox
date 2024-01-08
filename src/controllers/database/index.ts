import { Surreal } from "surrealdb.node";

export const getDb = async () => {
	const db = new Surreal();
	const url = process.env.DATABASE_URL.replace("$cwd", process.cwd());

	await db.connect(url).catch((e) => {
		console.error(e);
		console.error(url);
		console.error("Could not connect to the database!");
		process.exit(1);
	});

	console.log("Connected to database!");

	await db
		.signin({
			username: process.env.DATABASE_ACCOUNT,
			password: process.env.DATABASE_PASSWORD,
		})
		.catch((e) => {
			console.error(e);
			console.error("Could not sign in to database");
			process.exit(1);
		});

	await db.use({ ns: process.env.ENV, db: process.env.ENV });

	return db;
};
