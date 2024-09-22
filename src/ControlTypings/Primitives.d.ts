import { ExtractWidenKeys } from "./ControlConversion";
import { BaseControl } from "./Typing";

export interface Primitives {
	String: string;
	Number: number;
	Boolean: boolean;
}
type IsPrimitive = Primitives[keyof Primitives];

interface PrimitiveControlProps {
	String: {
		Filters?: Filter[];
	};
	Number: {
		Min?: number;
		Max?: number;
		Step?: number;
		Dragger: boolean;
		Sensibility: number;
	};
	Boolean: {};
}

type PrimitiveControl<T extends keyof Primitives> = BaseControl<T, Primitives[T]> & PrimitiveControlProps[T];
type ConvertPrimitive<T extends IsPrimitive> = PrimitiveControl<ExtractWidenKeys<Primitives, T>>;

type Filter = (input: string, oldInput: string) => string;

declare function String(def: string, filters?: Filter[]): PrimitiveControl<"String">;

declare function Number(
	def: number,
	min?: number,
	max?: number,
	step?: number,
	dragger?: boolean,
	sens?: number,
): PrimitiveControl<"Number">;

declare function Boolean(def: boolean): PrimitiveControl<"Boolean">;

declare namespace Primitive {
	const string: typeof String;
	const number: typeof Number;
	const boolean: typeof Boolean;
}
