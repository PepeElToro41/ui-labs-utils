local Utils = {}

export type Control<T> = {
	ControlValue: T,
}

function Utils.CreateBaseControl(controlType: string, def)
	local control = {
		EntryType = "Control",
		Type = controlType,
		ControlValue = def,
	}
	return control
end

return Utils
