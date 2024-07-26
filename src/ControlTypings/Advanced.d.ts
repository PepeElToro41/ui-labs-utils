import { BaseControl } from "./Typing";

type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;
type ConditionalWiden<T, W extends boolean> = W extends true ? Widen<T> : T;

type CheckeableDatatypes = Pick<CheckableTypes, Exclude<keyof CheckableTypes, keyof CheckablePrimitives>>;
type ListType = [string, number, boolean, Callback, object][number];
type ChooseOptionType = CheckeableDatatypes | ListType;

interface RGBA {
	Color: Color3;
	Transparency: number;
}

// I want to keep the "RGBA" name for the control type, but it collides with AdvancedTypes.RGBA
type OuterRGBA = RGBA;

//TYPES
export declare namespace AdvancedTypes {
	interface Choose<T extends ChooseOptionType = ChooseOptionType> extends BaseControl<"Choose", T> {
		List: T[];
		DefIndex: number;
	}
	interface EnumList<T extends ChooseOptionType = ChooseOptionType> extends BaseControl<"EnumList", T> {
		List: Record<string, T>;
		DefIndex: string;
		CurrentIndex: string;
	}
	interface RGBA extends BaseControl<"RGBA", OuterRGBA> {}
	interface Slider extends BaseControl<"Slider", number> {
		Min: number;
		Max: number;
		Step?: number;
	}
	interface Object<T extends keyof Instances = "Instance", K extends Instance = Instances[T]>
		extends BaseControl<"Object", Instances[T] | undefined> {
		ClassName: T;
		Predicator?: (instance: K) => boolean;
	}

	//need this because I cant use a namespace as a type
	interface All {
		Choose: Choose;
		EnumList: EnumList;
		RGBA: RGBA;
		Slider: Slider;
		Object: Object<any, any>;
	}
}

//CREATION
declare function Choose<T extends ChooseOptionType, W extends boolean = false>(
	list: T[],
	def?: number,
	widen?: W,
): AdvancedTypes.Choose<ConditionalWiden<T, W>>;

declare function EnumList<T extends ChooseOptionType, W extends boolean = false>(
	list: Record<string, T>,
	def: string,
	widen?: W,
): AdvancedTypes.EnumList<ConditionalWiden<T, W>>;

declare function RGBA(def: Color3, transparency?: number): AdvancedTypes.RGBA;

declare function Slider(def: number, min: number, max: number, step?: number): AdvancedTypes.Slider;

type GetInstance<T extends keyof Instances | undefined> = Instances[T extends undefined ? "Instance" : T];

declare function Object(): AdvancedTypes.Object<"Instance">;
declare function Object<T extends keyof Instances | undefined>(
	className?: T,
	def?: GetInstance<T>,
	predicator?: (instance: GetInstance<T>) => boolean,
): AdvancedTypes.Object<T extends undefined ? "Instance" : T>;
