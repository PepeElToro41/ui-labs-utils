local PrimitiveControls = require(script.Controls.PrimitiveControls)
local DatatypeControls = require(script.Controls.DatatypeControls)
local AdvancedControls = require(script.Controls.AdvancedControls)
local StoryCreators = require(script.StoryCreators)
local ControlUtils = require(script.Controls.ControlUtils)
local ControlConversion = require(script.Controls.ControlConversion)
local Utils = require(script.Utils)
local Environment = require(script.Environment)
local Types = require(script.Types)

type PrimitiveControls = typeof(PrimitiveControls)
type DatatypeControls = typeof(DatatypeControls)
type AdvancedControls = typeof(AdvancedControls)
type ControlUtils = typeof(ControlUtils)
type ControlConversion = typeof(ControlConversion)
type StoryCreators = typeof(StoryCreators)
type Utils = typeof(Utils)
type Environment = typeof(Environment)

type UILabs =
	PrimitiveControls
	& AdvancedControls
	& StoryCreators
	& ControlUtils
	& ControlConversion
	& Utils
	& { Datatype: DatatypeControls }
	& { Environment: Environment }

export type Storybook = Types.Storybook
export type FunctionStory = Types.FunctionStory
export type ReactStory = Types.ReactStory
export type RoactStory = Types.RoactStory
export type FusionStory = Types.FusionStory
export type IrisStory = Types.IrisStory
export type VideStory = Types.VideStory
export type GenericStory = Types.GenericStory

export type ReactProps = Types.ReactProps
export type FusionProps = Types.FusionProps
export type IrisProps = Types.IrisProps
export type VideProps = Types.VideProps
export type GenericProps = Types.GenericProps
export type GenericInfo<T> = Types.GenericInfo<T>
export type SubscribeListener = Types.SubscribeListener

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
	Utils,
	ControlConversion,
	AdvancedControls,
	StoryCreators,
	{ Environment = Environment },
	{ Datatype = DatatypeControls }
) :: UILabs

return UILabs
