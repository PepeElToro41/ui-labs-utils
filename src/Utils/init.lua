local Utils = {}

function Utils.ListenControl(info, callback)
	local oldValue = info.__old
	local newValue = info.__new

	if oldValue ~= newValue then
		callback(newValue)
	end
end

function Utils.CreateControlStates(converted, controls, creator)
	local states = {}

	for key, control in pairs(converted) do
		local controlValue = controls[key]

		if control.EntryType == "ControlGroup" then -- control is a control group, we need to recurse
			states[key] = Utils.CreateControlStates(control.Controls, controlValue, creator)
			continue
		end
		states[key] = creator(controlValue)
	end

	return states
end

function Utils.UpdateControlStates(states, converted, controls, updater)
	for key, control in pairs(converted) do
		local controlValue = controls[key]

		if control.EntryType == "ControlGroup" then -- control is a control group, we need to recurse
			Utils.UpdateControlStates(states[key], control.Controls, controlValue, updater)
			continue
		end
		updater(states[key], controlValue)
	end
end

return Utils
