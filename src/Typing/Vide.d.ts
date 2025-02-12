import Vide from "@rbxts/vide";
import { ControlGroup } from "../ControlTypings/ControlUtils";
import { AllControls, ControlsList, ReturnControls } from "../ControlTypings/Typing";
import { GetStoryProps, InferControlType } from "./Typing";
import { StoryBase, StoryCreationKey, StoryInfo } from "./Typing";

interface WithVide {
	use?: "vide";
	vide: typeof Vide;
}

type InferVideControlGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: Vide.Source<InferControlType<T[K]>>;
};

type InferVideControls<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferVideControlGroup<U>
		: T[K] extends AllControls
		? Vide.Source<InferControlType<T[K]>>
		: never;
};

type VideProps<T extends ReturnControls> = {
	controls: T extends ReturnControls ? InferVideControls<T> : never;
};

type InferVideProps<T extends ReturnControls> = GetStoryProps<VideProps<T>>;

type VideStory<T extends StoryInfo> = T &
	StoryBase &
	WithVide &
	StoryCreationKey<InferVideProps<T["controls"]>, Vide.Node | void | undefined>;
