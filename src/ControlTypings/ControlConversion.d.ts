import { DatatypeControl, Datatypes, IsDatatype } from "./Datatypes";
import { IsPrimitive, PrimitiveControl, Primitives } from "./Primitives";
import { AllControls, ObjectControl } from "./Typing";

type ExtractWidenKeys<T, U> = { [K in keyof T]: U extends T[K] ? K : never }[keyof T];

type ConvertControl<T extends AllControls> = T extends IsPrimitive
	? PrimitiveControl<ExtractWidenKeys<Primitives, T>>
	: T extends IsDatatype
	? DatatypeControl<ExtractWidenKeys<Datatypes, T>>
	: T extends ObjectControl
	? T
	: never;

declare function ConvertControl<T extends AllControls>(control: T): ConvertControl<T>;
