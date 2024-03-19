type Filter = (input: string, oldInput: string) -> string

local CreateBaseControl = require(script.Parent.Utils).CreateBaseControl
local Controls = {}

function Controls.String(def: string, filters: { Filter }?)
	local control = CreateBaseControl("String", def)
	control.Filters = filters

	return control
end

function Controls.Number(def: number, min: number?, max: number?, step: number?, dragger: boolean?, sens: number?)
	local control = CreateBaseControl("Number", def)

	control.Min = min
	control.Max = max
	control.Step = step
	control.Dragger = if dragger == nil then true else dragger
	control.Sensibility = sens or (def * 10)

	return control
end

function Controls.Boolean(def: boolean)
	return CreateBaseControl("Boolean", def)
end

Controls.Primitive = {
	string = Controls.String,
	number = Controls.Number,
	boolean = Controls.Boolean,
}

return Controls
