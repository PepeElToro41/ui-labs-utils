import Fusion from "@rbxts/fusion";
import { ControlGroup } from "../ControlTypings/ControlUtils";
import { AllControls, ControlsList, ReturnControls } from "../ControlTypings/Typing";
import { InferControlType } from "./Typing";
import { IntrinsicProps, StoryBase, StoryCreationKey, StoryInfo } from "./Typing";

interface WithFusion {
	use?: "Fusion";
	fusion: typeof Fusion;
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

type FusionControlProps<T extends ReturnControls> = {
	controls: T extends ReturnControls ? InferFusionControls<T> : never;
};

type InferFusionProps<T extends ReturnControls> = ExcludeMembers<
	FusionControlProps<T> & IntrinsicProps,
	never
>;

type FusionStory<T extends StoryInfo> = T &
	StoryBase &
	WithFusion &
	StoryCreationKey<InferFusionProps<T["controls"]>, Instance>;
