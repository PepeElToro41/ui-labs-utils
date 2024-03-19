local PrimitiveControls = require(script.Controls.PrimitiveControls)
local DatatypeControls = require(script.Controls.DatatypeControls)
local AdvancedControls = require(script.Controls.AdvancedControls)
local StoryCreators = require(script.StoryCreators)
local ControlUtils = require(script.Controls.ControlUtils)

function CombinedExport(...)
	local final = {}
	for _, module in pairs({ ... }) do
		for key, export in pairs(module) do
			final[key] = export
		end
	end
	return final
end

return CombinedExport(PrimitiveControls, ControlUtils, AdvancedControls, StoryCreators, { Datatype = DatatypeControls })
