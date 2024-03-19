type RecordList = { [string]: any }

local CreateBaseControl = require(script.Parent.Utils).CreateBaseControl
local Controls = {}

function Controls.Choose(list: { any }, def: number?)
	if #list <= 0 then
		error("UI-Labs: Array given in a Choose control is empty")
	end
	if def and def > #list then
		error(`UI-Labs: Def index ({def}) given for the array is outside of the array size ({#list})`)
	end

	local control = CreateBaseControl("Choose", list[def or 1])
	control.List = list
	control.DefIndex = def or 1

	return control
end

function Controls.EnumList(list: RecordList, def: string)
	if list[def] == nil then
		error(`UI-Labs: Key given for the EnumList list ({def}) does not exist in the list`)
	end

	local control = CreateBaseControl("EnumList", list[def])
	control.List = list
	control.CurrentIndex = def
	control.DefIndex = def

	control.OnReset = function()
		control.CurrentIndex = def
	end

	return control
end

function Controls.RGBA(def: Color3, transparency: number?)
	return CreateBaseControl("RGBA", {
		Color = def,
		Transparency = transparency or 0,
	})
end

function Controls.Slider(def: number, min: number, max: number, step: number?)
	if max <= min then
		error(`UI-Labs: Max slider value ({max}) must be greater than the Min value ({min})`)
	end
	local control = CreateBaseControl("Slider", def)

	control.Min = min
	control.Max = max
	control.Step = step

	return control
end

type ObjectPredicator = (instance: Instance) -> boolean

function Controls.Object(className: string?, predicator: ObjectPredicator?)
	local control = CreateBaseControl("Object", nil)
	control.ClassName = className or "Instance"
	control.Predicator = predicator

	return control
end

return Controls
