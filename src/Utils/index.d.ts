import { ConvertedControls } from "../ControlTypings/Typing";
import { GenericInfo } from "../Typing/Generic";

declare function ListenControl<T>(controlInfo: GenericInfo<T>, listener: (newVal: T) => void): () => void;

declare function CreateControlStates(
	converted: ConvertedControls,
	controls: Record<string, any>,
	creator: (control: any) => any,
): any;

declare function UpdateControlStates(
	states: {},
	converted: ConvertedControls,
	controls: Record<string, any>,
	updater: (state: any, value: any) => void,
): void;
