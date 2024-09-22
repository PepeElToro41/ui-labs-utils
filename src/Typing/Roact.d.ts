import Roact from "@rbxts/roact";
import { StoryInfo, StoryBase, StoryCreationKey, InferProps } from "./Typing";

interface WithRoact {
	use?: "roact";
	roact: typeof Roact;
}

type RoactStory<T extends StoryInfo> = T &
	StoryBase &
	WithRoact &
	StoryCreationKey<InferProps<T["controls"]>, Roact.Element>;
