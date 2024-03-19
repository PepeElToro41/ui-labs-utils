import { ControlsList } from "./Typing";

interface ControlGroup<T extends ControlsList = ControlsList> {
	EntryType: "ControlGroup";
	Controls: T;
}

declare function ControlGroup<T extends ControlsList>(controls: T): ControlGroup<T>;
