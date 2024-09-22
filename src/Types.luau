export type Storybook = {
	name: string?,
	storyRoots: { Instance },
	groupRoots: boolean?,
}
type Cleanup = () -> ()
export type FunctionStory = (frame: Frame) -> Cleanup

export type StoryBase = {
	name: string?,
	summary: string?,
	cleanup: Cleanup?,
}

type StoryControls = { [string]: any }

------------------------------- REACT/ROACT ------------------------------

export type ReactProps = {
	controls: { [string]: any },
}
export type WithReact = {
	use: "react"?,
	react: any,
	reactRoblox: any,
}
export type ReactStoryKey = (props: ReactProps) -> any
export type ReactStory = StoryBase & WithReact & {
	story: ReactStoryKey,
}

export type WithRoact = {
	use: "roact"?,
	roact: any,
}
export type RoactStory = StoryBase & WithRoact & {
	story: ReactStoryKey,
}

--------------------------------- FUSION ---------------------------------

export type FusionProps = {
	controls: { [string]: any },
	scope: any,
	target: GuiObject,
}

export type WithFusion = {
	use: "fusion",
	fusion: any,
}

export type FusionStoryKey = (props: FusionProps) -> Cleanup | nil | Instance
export type FusionStory = StoryBase & WithFusion & {
	story: FusionStoryKey,
}

---------------------------------- IRIS ----------------------------------

export type IrisProps = {
	controls: { [string]: any },
	target: GuiObject,
}

export type WithIris = {
	use: "iris",
	iris: any,
}

export type IrisStoryKey = (props: IrisProps) -> Cleanup | nil
export type IrisStory = StoryBase & WithIris & {
	story: IrisStoryKey,
}

---------------------------------- VIDE ----------------------------------

export type VideProps = {
	controls: { [string]: any },
	target: GuiObject,
}

export type WithVide = {
	use: "vide",
	vide: any,
}

export type VideStoryKey = (props: VideProps) -> Cleanup | nil
export type VideStory = StoryBase & WithVide & {
	story: VideStoryKey,
}

---------------------------------- GENERIC --------------------------------
export type GenericInfo<T> = { __old: T, __new: T }

export type SubscribeListener = (values: { [string]: any }, info: { [string]: GenericInfo<any> }) -> ()

export type GenericProps = {
	controls: { [string]: any },
	target: GuiObject,
	converted: { [string]: any },
	subscribe: (listener: SubscribeListener) -> Cleanup,
}

export type GenericRenderKey = (props: GenericProps) -> Cleanup

export type GenericStory = StoryBase & {
	render: GenericRenderKey,
}

return {}
