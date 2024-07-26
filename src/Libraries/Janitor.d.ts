// Types borrowed from @rbxts/janitor (cleaning methods were removed)

export interface Janitor<U extends object | void = void> {
	/**
	 * Instantiates a new Janitor object.
	 */
	Add<
		O extends keyof U extends never
			? object
			: I extends keyof U
			? U[I]
			: M extends true
			? Callback | thread
			: M extends undefined
			? RBXScriptConnection | { Destroy(): void }
			: object,
		M extends undefined | ((this: O) => void) | ((_: O) => void) | ExtractKeys<O, () => void> | true,
		I extends keyof U | undefined = undefined,
	>(
		object: O,
		methodName?: M,
		index?: I,
	): O;

	/**
	 * Adds a promise to the janitor. If the janitor is cleaned up and the promise is not completed, the promise will be cancelled.
	 * @param promise The promise you want to add to the janitor.
	 * @returns The promise that was passed
	 */
	AddPromise<T extends Promise<unknown>>(promise: T): T;

	/**
	 * Cleans up whatever `object` was set to this namespace by the 3rd parameter of `.Add()`.
	 * @param index The index you want to remove.
	 * @returns The same janitor, for chaining reasons.
	 */
	Remove(index: keyof U): this;

	/**
	 * Removes an object from the Janitor without running a cleanup.
	 *
	 * ```ts
	 * import { Janitor } from "@rbxts/janitor";
	 *
	 * const Obliterator = new Janitor<{ Function: () => void }>();
	 * Obliterator.Add(() => print("Removed!"), true, "Function");
	 *
	 * Obliterator.RemoveNoClean("Function"); // Does not print.
	 * ```
	 * @param index The index you are removing.
	 * @returns The same janitor, for chaining reasons.
	 */
	RemoveNoClean(index: keyof U): this;

	/**
	 * Cleans up multiple objects at once.
	 * @param indices The indices you want to remove.
	 * @returns The same janitor, for chaining reasons.
	 */
	RemoveList(...indices: Array<keyof U>): this;

	/**
	 * Cleans up multiple objects at once without running their cleanup.
	 *
	 * ```ts
	 * import { Janitor } from "@rbxts/janitor";
	 *
	 * type NoOp = () => void
	 *
	 * const Obliterator = new Janitor<{ One: NoOp, Two: NoOp, Three: NoOp }>();
	 * Obliterator.Add(() => print("Removed One"), true, "One");
	 * Obliterator.Add(() => print("Removed Two"), true, "Two");
	 * Obliterator.Add(() => print("Removed Three"), true, "Three");
	 *
	 * Obliterator.RemoveListNoClean("One", "Two", "Three"); // Nothing is printed.
	 * ```
	 *
	 * @param indices The indices you want to remove.
	 */
	RemoveListNoClean(...indices: Array<keyof U>): this;

	/**
	 * Gets whatever object is stored with the given index, if it exists. This was added since Maid allows getting the task using `__index`.
	 * @param index The index that the object is stored under.
	 * @returns This will return the object if it is found, but it won't return anything if it doesn't exist.
	 */
	Get<T extends keyof U>(index: T): U[T] | undefined;

	/**
	 * Returns a frozen copy of the Janitor's indices.
	 *
	 * ```ts
	 * import { Workspace } from "@rbxts/services";
	 * import { Janitor } from "@rbxts/janitor";
	 *
	 * const Obliterator = new Janitor<{ Baseplate: Part }>();
	 * Obliterator.Add(Workspace.FindFirstChild("Baseplate") as Part, "Destroy", "Baseplate");
	 * print(Obliterator.GetAll().Baseplate); // Prints Baseplate.
	 * ```
	 */
	GetAll(): { [P in keyof U]: U[P] | undefined };
}
