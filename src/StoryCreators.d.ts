import React from "@rbxts/react";
import { WithReact, ReactStory } from "./Typing/React";
import { StoryInfo, StoryBase, StoryCreation, InferProps, StoryCleanup } from "./Typing/Typing";
import Roact from "@rbxts/roact";
import { FusionStory, InferFusionProps, WithFusion } from "./Typing/Fusion";
import { RoactStory, WithRoact } from "./Typing/Roact";
import { GenericStory, InferGenericProps } from "./Typing/Generic";
import { InferIrisProps, IrisStory, WithIris } from "./Typing/Iris";
import { InferVideProps, VideStory, WithVide } from "./Typing/Vide";

declare function CreateReactStory<T extends StoryInfo>(
	info: T & StoryBase & WithReact,
	render: StoryCreation<InferProps<T["controls"]>, React.Element>,
): ReactStory<T>;

declare function CreateRoactStory<T extends StoryInfo>(
	info: T & StoryBase & WithRoact,
	render: StoryCreation<InferProps<T["controls"]>, Roact.Element>,
): RoactStory<T>;

declare function CreateFusionStory<T extends StoryInfo>(
	info: T & StoryBase & WithFusion,
	render: StoryCreation<InferFusionProps<T["controls"]>, Instance | StoryCleanup | undefined | void>,
): FusionStory<T>;

declare function CreateIrisStory<T extends StoryInfo>(
	info: T & StoryBase & WithIris,
	render: StoryCreation<InferIrisProps<T["controls"]>, StoryCleanup | void | undefined>,
): IrisStory<T>;

declare function CreateVideStory<T extends StoryInfo>(
	info: T & StoryBase & WithVide,
	render: StoryCreation<InferVideProps<T["controls"]>, Vide.Node | void | undefined>,
): VideStory<T>;

declare function CreateGenericStory<T extends StoryInfo>(
	info: T & StoryBase,
	render: StoryCreation<InferGenericProps<T["controls"]>, StoryCleanup>,
): GenericStory<T>;
