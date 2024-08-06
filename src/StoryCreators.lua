local Creators = {}
local Utils = require(script.Parent.Controls.Utils)

type StoryInfo = {
	name: string?,
	summary: string?,
	cleanup: (() -> ())?,
	controls: { [string]: Utils.Control<any> }?,
}
type WithReact = {
	react: any?,
	use: "React"?,
	reactRoblox: any?,
	renderer: ("deferred" | "legacy")?,
}
type WithRoact = {
	roact: any?,
	use: "Roact"?,
}
type WithFusion = {
	fusion: any?,
	use: "Fusion"?,
}
type WithGeneric = {
	use: "Generic",
}

type Props = { controls: { [string]: any }, inputListener: InputSignals }
type StoryRender = (props: Props) -> any

type StoryRenderKey = {
	story: StoryRender,
}

type Listener = (values: { [string]: any }, info: { [string]: any }) -> any
type Updater = (listener: Listener) -> any
type GenericProps = { controls: { [string]: any }, updated: Updater }
type GenericStoryRender = (props: GenericProps) -> any
type StoryGenericRenderKey = {
	render: StoryRender,
}

type InputSignals = {
	InputBegan: RBXScriptConnection,
	InputEnded: RBXScriptConnection,
	InputChanged: RBXScriptConnection,
	MouseMoved: RBXScriptConnection,
}

local function CombineTableInfo(table1, table2)
	for key, val in pairs(table2) do
		table1[key] = val
	end
	return table1
end

function Creators.CreateRoactStory(
	info: StoryInfo & WithRoact,
	render: StoryRender
): StoryInfo & WithRoact & StoryRenderKey
	local returnStory = {
		use = "Roact",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateReactStory(
	info: StoryInfo & WithReact,
	render: StoryRender
): StoryInfo & WithReact & StoryRenderKey
	local returnStory = {
		use = "React",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateFusionStory(
	info: StoryInfo & WithFusion,
	render: StoryRender
): StoryInfo & WithFusion & StoryRenderKey
	local returnStory = {
		use = "Fusion",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateGenericStory(
	info: StoryInfo & WithGeneric,
	render: StoryRender
): StoryInfo & WithGeneric & StoryGenericRenderKey
	local returnStory = {
		use = "Generic",
		render = render,
	}

	return CombineTableInfo(returnStory, info)
end

return Creators
