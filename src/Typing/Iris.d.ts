import { AllControls, ControlsList, ReturnControls } from "../ControlTypings/Typing";
import Iris from "@rbxts/iris";
import {
	GetStoryProps,
	InferControlType,
	StoryBase,
	StoryCleanup,
	StoryCreationKey,
	StoryInfo,
} from "./Typing";

import { ControlGroup } from "../ControlTypings/ControlUtils";

interface WithIris {
	use?: "iris";
	iris: typeof Iris;
}

type InferIrisControlGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: Iris.State<InferControlType<T[K]>>;
};

type InferIrisControls<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferIrisControlGroup<U>
		: T[K] extends AllControls
		? Iris.State<InferControlType<T[K]>>
		: never;
};

type IrisControlProps<T extends ReturnControls> = {
	controls: T extends ReturnControls ? InferIrisControls<T> : never;
};

type InferIrisProps<T extends ReturnControls> = GetStoryProps<IrisControlProps<T>>;

type IrisStory<T extends StoryInfo> = T &
	StoryBase &
	WithIris &
	StoryCreationKey<InferIrisProps<T["controls"]>, StoryCleanup | void | undefined>;
