local Utils = {}

function Utils.CreateBaseControl(controlType: string, def, onReset: () -> any)
	local control = {
		EntryType = "Control",
		Type = controlType,
		ControlValue = def,
		OnReset = onReset,
	}
	return control
end

return Utils
