import { IfElse } from "@ts/if";

/**
 * A utility class for handling try-catch scenarios with a specified result type.
 */
class TryClass<T> {
	private tryFunction: () => T;

	constructor(tryFunction: () => T) {
		this.tryFunction = tryFunction;
	}

	/**
	 * Executes the try function and catches any errors, invoking the catch function.
	 * @param catchFunction - The function to handle the caught error.
	 * @returns - The result of the try function or undefined if an error occurs.
	 */
	catch<E>(catchFunction: (error: unknown) => E) {
		try {
			return this.tryFunction();
		} catch (e) {
			return catchFunction(e);
		}
	}
}

/**
 * Creates an instance of TryClass for a specified try function.
 * @template T - The type of the result returned by the try function.
 * @param func - The function to be executed in the try block.
 * @returns - An instance of TryClass.
 */
export const Try = <T>(func: () => T) => new TryClass(func);

interface TryErrorOptions {
	async: boolean;
}

export const TryError = <T, O extends TryErrorOptions>(
	func: () => T,
	options: O,
) => {
	return new TryClass(func).catch(() => {
		if (options.async) return new Promise((resolve) => new Error());
		return new Error();
	}) as T | IfElse<O["async"], Promise<Error>, Error>;
};
