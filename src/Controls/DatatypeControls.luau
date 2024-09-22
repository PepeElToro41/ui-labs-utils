local Utils = require(script.Parent.Utils)
local CreateBaseControl = Utils.CreateBaseControl
local Datatypes = {}

function Datatypes.Color3(def: Color3): Utils.Control<Color3>
	local fixedColor = Color3.new(math.clamp(def.R, 0, 1), math.clamp(def.G, 0, 1), math.clamp(def.B, 0, 1))
	return CreateBaseControl("Color3", fixedColor)
end

--[[
--[User Interface]--
function Datatypes.UDim2(def: UDim2)
	return CreateBaseControl("UDim2", def)
end
function Datatypes.UDim(def: UDim)
	return CreateBaseControl("UDim", def)
end

--[Space 3D]--
function Datatypes.CFrame(def: CFrame)
	return CreateBaseControl("CFrame", def)
end

function Datatypes.Vector2(def: Vector2, normalize: boolean?)
	local control = CreateBaseControl("Vector2", def)
	control.Normalize = if normalize == nil then false else normalize

	return control
end
function Datatypes.Vector3(def: Vector3, normalize: boolean?)
	local control = CreateBaseControl("Vector3", def)
	control.Normalize = if normalize == nil then false else normalize

	return CreateBaseControl("Vector3", def)
end ]]

return Datatypes
