import React from "@rbxts/react";
import { ControlGroup } from "../ControlTypings/ControlUtils";
import { IsDatatype } from "../ControlTypings/Datatypes";
import { IsPrimitive } from "../ControlTypings/Primitives";
import { AllControls, ControlsList, ObjectControl, ReturnControls } from "../ControlTypings/Typing";
import { Signal } from "../Libraries/Signal";
import ReactRoblox from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";

interface Storybook {
	name?: string;
	storyRoots: Instance[];
	groupRoots?: boolean;

	// Will be ignored, dont use it
	react?: typeof React;
	reactRoblox?: typeof ReactRoblox;
	roact?: typeof Roact;
}

interface InputSignals {
	InputBegan: Signal<[input: InputObject, gameProcessed: boolean]>;
	InputEnded: Signal<[input: InputObject, gameProcessed: boolean]>;
	InputChanged: Signal<[input: InputObject, gameProcessed: boolean]>;
	MouseMoved: Signal<[mousePos: Vector2]>;
}

interface StoryBase {
	name?: string;
	summary?: string;
	cleanup?: () => void;
}

type InferControlType<T extends AllControls> = T extends IsPrimitive
	? T
	: T extends IsDatatype
	? T
	: T extends ObjectControl
	? T["ControlValue"]
	: never;

type InferControlGroup<T extends ControlsList = ControlsList> = {
	[K in keyof T]: InferControlType<T[K]>;
};

type InferControls<T extends ReturnControls> = {
	[K in keyof T]: T[K] extends ControlGroup<infer U>
		? InferControlGroup<U>
		: T[K] extends AllControls
		? InferControlType<T[K]>
		: never;
};
type StoryProps<T extends ReturnControls | undefined> = {
	controls: T extends ReturnControls ? InferControls<T> : never;
};

type GetStoryProps<T> = ExcludeMembers<T & IntrinsicProps, never>;

type InferProps<C extends ReturnControls> = GetStoryProps<StoryProps<C>>;

interface IntrinsicProps {
	inputListener: InputSignals;
	target: Frame;
}
type StoryCreation<T extends {}, C> = (props: T) => C;

interface StoryControls<T extends ReturnControls> {
	controls: T;
}

type StoryInfo = Partial<StoryControls<any>>;

interface StoryCreationKey<T extends {}, C> {
	story: StoryCreation<T, C>;
}

type StoryCleanup = () => void;
type FunctionStory = (target: Frame) => StoryCleanup;
