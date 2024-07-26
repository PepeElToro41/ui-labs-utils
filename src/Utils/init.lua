local Utils = {}

function Utils.ListenControl(controlInfo, listener)
	local oldVal = controlInfo.__old
	local newVal = controlInfo.__new

	if oldVal ~= newVal then
		listener(newVal)
	end
end

return Utils
