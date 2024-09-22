local Creators = {}
local Types = require(script.Parent.Types)

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
	info: Types.StoryBase & Types.WithRoact,
	render: Types.ReactStoryKey
): Types.RoactStory
	local returnStory = {
		use = "roact",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateReactStory(
	info: Types.StoryBase & Types.WithReact,
	render: Types.ReactStoryKey
): Types.ReactStory
	local returnStory = {
		use = "react",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateFusionStory(
	info: Types.StoryBase & Types.WithFusion,
	render: Types.FusionStoryKey
): Types.FusionStory
	local returnStory = {
		use = "fusion",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateIrisStory(info: Types.StoryBase & Types.WithIris, render: Types.IrisStoryKey): Types.IrisStory
	local returnStory = {
		use = "iris",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateVideStory(info: Types.StoryBase & Types.WithVide, render: Types.VideStoryKey): Types.VideStory
	local returnStory = {
		use = "Vide",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateGenericStory(info: Types.StoryBase, render: Types.GenericRenderKey): Types.GenericStory
	local returnStory = {
		render = render,
	}

	return CombineTableInfo(returnStory, info)
end

return Creators
