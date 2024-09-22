local ControlConversion = require(script.Parent.ControlConversion)
local ControlUtils = {}

function ControlUtils.ControlGroup(controls: { [string]: any })
	local group = {
		EntryType = "ControlGroup",
		Controls = controls,
	}
	return group
end

function ControlUtils.Ordered<T>(control: T, order: number): T
	local converted = ControlConversion.ConvertControl(control)
	converted.Order = order
	return converted
end

return ControlUtils
