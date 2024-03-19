import { LibLike } from "./Libs";
import { StoryInfo, StoryBase, WithReact, StoryCreation, ReactStory, WithRoact, RoactStory } from "./Typing";

declare function CreateReactStory<T extends StoryInfo, L extends LibLike.React, R extends LibLike.ReactRoblox>(
	info: T & StoryBase & Partial<WithReact<L, R>>,
	render: StoryCreation<T, L["createElement"]>,
): ReactStory<T, L, R>;

declare function CreateRoactStory<T extends StoryInfo, L extends LibLike.Roact>(
	info: T & StoryBase & Partial<WithRoact<L>>,
	render: StoryCreation<T, L["createElement"]>,
): RoactStory<T, L>;
