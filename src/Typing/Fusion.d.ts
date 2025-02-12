import Fusion from "@rbxts/fusion";
import { ControlGroup } from "../ControlTypings/ControlUtils";
import { AllControls, ControlsList, ReturnControls } from "../ControlTypings/Typing";
import { GetStoryProps, InferControlType, StoryCleanup } from "./Typing";
import { StoryBase, StoryCreationKey, StoryInfo } from "./Typing";

interface WithFusion {
	use?: "fusion";
	fusion: typeof Fusion;
	scoped?: defined[];
}

type InferFusionControlGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: Fusion.Value<InferControlType<T[K]>>;
};

type InferFusionControls<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferFusionControlGroup<U>
		: T[K] extends AllControls
		? Fusion.Value<InferControlType<T[K]>>
		: never;
};

type FusionProps<T extends ReturnControls> = {
	controls: T extends ReturnControls ? InferFusionControls<T> : never;
	scope: any;
};

type InferFusionProps<T extends ReturnControls> = GetStoryProps<FusionProps<T>>;

type FusionStory<T extends StoryInfo> = T &
	StoryBase &
	WithFusion &
	StoryCreationKey<InferFusionProps<T["controls"]>, Instance | StoryCleanup | undefined | void>;
