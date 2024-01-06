import { z } from "zod";

const envVariables = z.object({
  JWT_SECRET: z.string().min(8),
});

declare module "bun" {
  interface Env extends z.infer<typeof envVariables> {}
}

 /**
 * Validates the environment variables using the zod schema.
 *
 * @function
 * @returns  Returns true if the environment variables are valid, otherwise throws a zod error.
 * @throws {ZodError} Throws a zod error if the environment variables are not valid according to the specified schema.
 */
export const validateEnvVariables = () => !!envVariables.parse(process.env);
