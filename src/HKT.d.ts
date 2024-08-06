/* ---------------------------- HIGH ORDER TYPES ---------------------------- */

type HKTFunction = (...x: never[]) => unknown;

type HKTApply<F extends HKT, V> = ReturnType<
	(F & {
		readonly T: V;
	})["new"]
>;

export declare abstract class HKT {
	readonly T?: unknown;
	new?: HKTFunction;
}
