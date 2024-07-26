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
type InputSignals = {
	InputBegan: RBXScriptConnection,
	InputEnded: RBXScriptConnection,
	InputChanged: RBXScriptConnection,
	MouseMoved: RBXScriptConnection,
}

type GenericProps = {}

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

function Creators.CreateFusionStory(info: StoryInfo & WithFusion, render: StoryRender)
	local returnStory = {
		use = "Fusion",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

return Creators
