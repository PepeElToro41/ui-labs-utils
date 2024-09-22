import { InferProps, StoryBase } from "./Typing";
import { StoryCreationKey, StoryInfo } from "./Typing";
import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

interface WithReact {
	use?: "react";
	react: typeof React;
	reactRoblox: typeof ReactRoblox;
	renderer?: "deferred" | "legacy";
}

type ReactStory<T extends StoryInfo> = T &
	StoryBase &
	WithReact &
	StoryCreationKey<InferProps<T["controls"]>, React.Element>;
