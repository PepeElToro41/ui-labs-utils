import { ControlGroup } from "../ControlTypings/ControlUtils";
import { AllControls, ControlsList, ConvertedControls, ReturnControls } from "../ControlTypings/Typing";
import { HKT, HKTApply } from "../HKT";
import {
	GetStoryProps,
	InferControlType,
	InferControls,
	StoryBase,
	StoryCleanup,
	StoryCreation,
	StoryInfo,
} from "./Typing";

interface WithGeneric {
	use: "Generic";
}
type GenericInfo<T> = { __old: T; __new: T };

type InferInfosGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: GenericInfo<InferControlType<T[K]>>;
};

type InferControlInfos<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferInfosGroup<U>
		: T[K] extends AllControls
		? GenericInfo<InferControlType<T[K]>>
		: never;
};

type SubscribeListener<T extends ReturnControls> = (
	values: InferControls<T>,
	info: InferControlInfos<T>,
) => void;

type GenericProps<T extends ReturnControls> = {
	controls: T extends ReturnControls ? InferControls<T> : never;
	target: Frame;
	converted: ConvertedControls;
	subscribe: (listener: SubscribeListener<T>) => StoryCleanup;
};

type InferGenericProps<T extends ReturnControls> = GetStoryProps<GenericProps<T>>;

interface GenericStoryCreationKey<T extends {}, C> {
	render: StoryCreation<T, C>;
}

type GenericStory<T extends StoryInfo> = T &
	StoryBase &
	WithGeneric &
	GenericStoryCreationKey<InferGenericProps<T["controls"]>, StoryCleanup>;

/* ---------------------------- GENERIC CREATOR ---------------------------- */

type InferCreatedControlGroup<T extends ControlsList, F extends HKT> = {
	[K in keyof T]: HKTApply<F, InferControlType<T[K]>>;
};

type InferCreatedControls<T extends ReturnControls, F extends HKT> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferCreatedControlGroup<U, F>
		: T[K] extends AllControls
		? HKTApply<F, InferControlType<T[K]>>
		: never;
};
