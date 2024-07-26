import { ControlGroup } from "../ControlTypings/ControlUtils";
import { AllControls, ControlsList, ReturnControls } from "../ControlTypings/Typing";
import {
	InferControlType,
	InferControls,
	StoryBase,
	StoryCleanup,
	StoryCreationKey,
	StoryInfo,
} from "./Typing";

interface WithGeneric {
	use: "Generic";
}
type GenericInfo<T> = { __old: T; __new: T };

type InferInfosGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: GenericInfo<InferControlType<T[K]>>;
};

type InferInfos<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferInfosGroup<U>
		: T[K] extends AllControls
		? GenericInfo<InferControlType<T[K]>>
		: never;
};

type InferGenericProps<T extends ReturnControls> = {
	controls: InferControls<T>;
	updated: (listener: (values: InferControls<T>, info: InferInfos<T>) => void) => void;
};

type GenericStory<T extends StoryInfo> = T &
	StoryBase &
	WithGeneric &
	StoryCreationKey<InferGenericProps<T["controls"]>, StoryCleanup>;
