local ControlUtils = {}

function ControlUtils.ControlGroup(controls: { [string]: any })
	local group = {
		EntryType = "ControlGroup",
		Controls = controls,
	}
	return group
end

return ControlUtils
