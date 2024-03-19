import { BaseControl } from "./Typing";

export interface Datatypes {
	Color3: Color3;

	/*
	UDim2: UDim2;
	UDim: UDim;

	CFrame: CFrame;
	Vector3: Vector3;
	Vector2: Vector2;*/
}
type IsDatatype = Datatypes[keyof Datatypes];

interface DatatypeControlProps {
	Color3: {};
	/*
	UDim2: {};
	UDim: {};

	CFrame: {};
	Vector3: {
		Normalize: boolean;
	};
	Vector2: {
		Normalize: boolean;
	};*/
}

type DatatypeControl<T extends keyof Datatypes> = BaseControl<T, Datatypes[T]> & DatatypeControlProps[T];

declare namespace Datatype {
	function Color3(def: Color3): DatatypeControl<"Color3">;
	/*
	function UDim2(def: UDim2): DatatypeControl<"UDim2">;
	function UDim(def: UDim): DatatypeControl<"UDim">;

	function CFrame(def: CFrame): DatatypeControl<"CFrame">;
	function Vector2(def: Vector2, normalize?: boolean): DatatypeControl<"Vector2">;
	function Vector3(def: Vector3, normalize?: boolean): DatatypeControl<"Vector3">;*/
}
