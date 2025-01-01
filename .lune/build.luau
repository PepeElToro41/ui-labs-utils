local fs = require("@lune/fs")
local process = require("@lune/process")

return function(name: string)
	print("")

	if fs.isFile(`{name}.rbxm`) then
		print("Removing old build...")
		fs.removeFile(`{name}.rbxm`)
	end

	process.spawn("rojo", { "build", "default.project.json", "-o", `{name}.rbxm` }, { stdio = "forward" })
end
