import { IsPrimitive } from "./ControlTypings/Primitives";
import { AllControls, ControlsList, ObjectControl, ReturnControls } from "./ControlTypings/Typing";
import { LibLike } from "./Libs";
import { ControlGroup } from "./ControlTypings/ControlUtils";
import { Signal } from "./Libraries/Signal";
import { IsDatatype } from "./ControlTypings/Datatypes";

type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

type ConditionalWiden<T, W extends boolean> = W extends true ? Widen<T> : T;

//CONTROL INFERENCE
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

//LIBRARIES
interface WithRoact<L extends LibLike.Roact> {
	use: "Roact";
	roact: L;
}
interface WithReact<L extends LibLike.React, R extends LibLike.ReactRoblox> {
	use: "React";
	react: L;
	reactRoblox: R;
	renderer?: "deferred" | "legacy";
}

//STORY INFO
interface StoryControls<T extends ReturnControls> {
	controls: T;
}
type StoryInfo = Partial<StoryControls<any>>;

//PROPS
type ControlProps<T extends ReturnControls | undefined> = {
	controls: T extends ReturnControls ? InferControls<T> : never;
};

interface InputSignals {
	InputBegan: Signal<(input: InputObject, gameProcessed: boolean) => void>;
	InputEnded: Signal<(input: InputObject, gameProcessed: boolean) => void>;
	InputChanged: Signal<(input: InputObject, gameProcessed: boolean) => void>;
	MouseMoved: Signal<(mousePos: Vector2) => void>;
}

interface IntrinsicProps {
	inputListener: InputSignals;
}

//STORY DEFINITION
interface StoryBase {
	name?: string;
	summary?: string;
	cleanup?: () => void;
}

type InferProps<C extends ReturnControls> = ExcludeMembers<ControlProps<C> & IntrinsicProps, never>;
type StoryCreation<T extends StoryInfo, C extends Callback> = (props: InferProps<T["controls"]>) => ReturnType<C>;

interface StoryCreationKey<T extends StoryInfo, C extends Callback> {
	story: StoryCreation<T, C>;
}

type FunctionCleaner = () => void;
type FunctionStory = (target: Frame) => FunctionCleaner;

type ReactStory<T extends StoryInfo, L extends LibLike.React, R extends LibLike.ReactRoblox> = T &
	StoryBase &
	WithReact<L, R> &
	StoryCreationKey<T, L["createElement"]>;

type RoactStory<T extends StoryInfo, L extends LibLike.Roact> = T &
	StoryBase &
	WithRoact<L> &
	StoryCreationKey<T, L["createElement"]>;
