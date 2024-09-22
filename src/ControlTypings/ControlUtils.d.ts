import { ConvertControl } from "./ControlConversion";
import { AllControls, ControlsList } from "./Typing";

interface ControlGroup<T extends ControlsList = ControlsList> {
	EntryType: "ControlGroup";
	Order?: number;
	Controls: T;
}

declare function ControlGroup<T extends ControlsList>(controls: T, order?: number): ControlGroup<T>;

declare function Ordered<T extends AllControls>(control: T, order: number): ConvertControl<T>;
