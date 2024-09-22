import { IsDatatype, DatatypeControl, Datatypes } from "./Datatypes";
import { IsPrimitive, PrimitiveControl, Primitives } from "./Primitives";
import { AdvancedTypes } from "./Advanced";
import { ControlGroup } from "./ControlUtils";

interface BaseControl<T, C> {
	EntryType: "Control";
	Type: T;
	ControlValue: C;
	Order?: number;
}
type IsPrimitiveControl = IsPrimitive | PrimitiveControl<keyof Primitives>;
type IsDatatypeControl = IsDatatype | PrimitiveControl<keyof Primitives>;

type LiteralControls = DatatypeControl<keyof Datatypes> | PrimitiveControl<keyof Primitives>;
type ObjectControl = LiteralControls | AdvancedTypes.All[keyof AdvancedTypes.All];

type AllControls = ObjectControl | IsPrimitive | IsDatatype;

type ControlsList = Record<string, AllControls>;
type ReturnControls = Record<string, AllControls | ControlGroup>;

type ConvertedControlList = Record<string, ObjectControl>;
type ConvertedControls = Record<string, ObjectControl | ControlGroup<ConvertedControlList>>;
