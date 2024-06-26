local PrimitiveControls = require(script.Controls.PrimitiveControls)
local DatatypeControls = require(script.Controls.DatatypeControls)
local AdvancedControls = require(script.Controls.AdvancedControls)
local StoryCreators = require(script.StoryCreators)
local ControlUtils = require(script.Controls.ControlUtils)
local Enviroment = require(script.Enviroment)

type PrimitiveControls = typeof(PrimitiveControls)
type DatatypeControls = typeof(DatatypeControls)
type AdvancedControls = typeof(AdvancedControls)
type StoryCreators = typeof(StoryCreators)
type ControlUtils = typeof(ControlUtils)
type Enviroment = typeof(Enviroment)

type UILabs =
	PrimitiveControls
	& { Datatype: DatatypeControls }
	& AdvancedControls
	& StoryCreators
	& ControlUtils
	& { Enviroment: Enviroment }

export type Storybook = {
	name: string?,
	storyRoots: { Instance },
	groupRoots: boolean?,
}
export type FunctionStory = (frame: Frame) -> () -> ()

function CombinedExport(...)
	local final = {}
	for _, module in pairs({ ... }) do
		for key, export in pairs(module) do
			final[key] = export
		end
	end
	return final
end

local UILabs = CombinedExport(
	PrimitiveControls,
	ControlUtils,
	AdvancedControls,
	StoryCreators,
	{ Enviroment = Enviroment },
	{ Datatype = DatatypeControls }
) :: UILabs

return UILabs
