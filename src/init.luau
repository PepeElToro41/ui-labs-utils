local PrimitiveControls = require(script.Controls.PrimitiveControls)
local DatatypeControls = require(script.Controls.DatatypeControls)
local AdvancedControls = require(script.Controls.AdvancedControls)
local StoryCreators = require(script.StoryCreators)
local ControlUtils = require(script.Controls.ControlUtils)
local ControlConversion = require(script.Controls.ControlConversion)
local Utils = require(script.Utils)
local Environment = require(script.Environment)
local Types = require(script.Types)
local Version = require(script.Version)

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

local UILabs = {
	_version = Version,
	Boolean = PrimitiveControls.Boolean,
	Number = PrimitiveControls.Number,
	String = PrimitiveControls.String,

	Choose = AdvancedControls.Choose,
	EnumList = AdvancedControls.EnumList,
	Object = AdvancedControls.Object,
	RGBA = AdvancedControls.RGBA,
	Slider = AdvancedControls.Slider,

	Primitive = PrimitiveControls.Primitive,
	Advanced = AdvancedControls,
	Datatype = DatatypeControls,

	ListenControl = Utils.ListenControl,
	CreateControlStates = Utils.CreateControlStates,
	UpdateControlStates = Utils.UpdateControlStates,

	ControlGroup = ControlUtils.ControlGroup,
	Ordered = ControlUtils.Ordered,

	ConvertControl = ControlConversion.ConvertControl,

	CreateGenericStory = StoryCreators.CreateGenericStory,
	CreateReactStory = StoryCreators.CreateReactStory,
	CreateRoactStory = StoryCreators.CreateRoactStory,
	CreateFusionStory = StoryCreators.CreateFusionStory,
	CreateIrisStory = StoryCreators.CreateIrisStory,
	CreateVideStory = StoryCreators.CreateVideStory,

	Environment = Environment,
}

return UILabs
