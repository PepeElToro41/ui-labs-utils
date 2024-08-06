import { State } from "@rbxts/iris/out/IrisDeclaration";
import { AllControls, ControlsList, ReturnControls } from "../ControlTypings/Typing";
import {
	GetStoryProps,
	InferControlType,
	IntrinsicProps,
	StoryBase,
	StoryCleanup,
	StoryCreationKey,
	StoryInfo,
} from "./Typing";
import Iris from "@rbxts/iris";
import { ControlGroup } from "../ControlTypings/ControlUtils";

interface WithIris {
	use?: "Fusion";
	fusion: typeof Iris;
}

type InferIrisControlGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: State<InferControlType<T[K]>>;
};

type InferIrisControls<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferIrisControlGroup<U>
		: T[K] extends AllControls
		? State<InferControlType<T[K]>>
		: never;
};

type IrisControlProps<T extends ReturnControls> = {
	controls: T extends ReturnControls ? InferIrisControls<T> : never;
	target: Frame;
};

type InferIrisProps<T extends ReturnControls> = GetStoryProps<IrisControlProps<T>>;

type FusionStory<T extends StoryInfo> = T &
	StoryBase &
	WithIris &
	StoryCreationKey<InferIrisProps<T["controls"]>, StoryCleanup | void | undefined>;
