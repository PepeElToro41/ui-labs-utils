local Creators = {}

local function CombineTableInfo(table1, table2)
	for key, val in pairs(table2) do
		table1[key] = val
	end
	return table1
end

function Creators.CreateRoactStory(info, render)
	local returnStory = {
		use = "Roact",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateReactStory(info, render)
	local returnStory = {
		use = "React",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

function Creators.CreateFusionStory(info, render)
	local returnStory = {
		use = "Fusion",
		story = render,
	}

	return CombineTableInfo(returnStory, info)
end

return Creators
