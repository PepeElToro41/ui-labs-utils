local Primitive = require(script.Parent.PrimitiveControls).Primitive
local Datatype = require(script.Parent.DatatypeControls)

local ControlConversion = {}

local function ConvertPrimitive(value: any, primitive: string)
	local converter = Primitive[primitive]

	assert(converter, `UI-Labs: Primitive ({primitive}) can't be converted to a control`)
	return converter(value)
end

local function ConvertDatatype(value: any, datatype: string)
	local converter = Datatype[datatype]

	assert(converter, `UI-Labs: Datatype ({datatype}) can't be converted to a control`)
	return converter(value)
end

function ControlConversion.ConvertControl(control: any)
	local controlType = typeof(control)

	if controlType == "table" then
		return control
	end

	if Primitive[controlType] then
		return ConvertPrimitive(control, controlType)
	elseif Datatype[controlType] then
		return ConvertDatatype(control, controlType)
	else
		error(`UI-Labs: Control ({control}) is not a valid control`)
	end
end

return ControlConversion
