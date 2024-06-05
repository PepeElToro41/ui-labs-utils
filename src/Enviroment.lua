local UserInputService = game:GetService("UserInputService")
local Enviroment = {}

Enviroment.EnvGlobalInjectionKey = "__hotreload_env_global_injection__" -- the longer the better

function SearchInEnv(key: string, def: any?)
	local env = Enviroment.GetEnvGlobalInjection()

	return (env and env[key]) or def
end

function Enviroment.GetEnvGlobalInjection()
	local env = getfenv()

	return env[Enviroment.EnvGlobalInjectionKey]
end
function Enviroment.IsStory()
	local env = Enviroment.GetEnvGlobalInjection()

	return env ~= nil
end

Enviroment.Unmount = SearchInEnv("Unmount", function() end) :: () -> ()
Enviroment.Reload = SearchInEnv("Reload", function() end) :: () -> ()
Enviroment.CreateSnapshot = SearchInEnv("CreateSnapshot", function() end) :: () -> ()
Enviroment.GetJanitor = function()
	local janitor = SearchInEnv("StoryJanitor")
	return janitor
end

Enviroment.InputListener = SearchInEnv("InputListener", nil) :: UserInputService
Enviroment.UserInput = SearchInEnv("InputListener", UserInputService) :: UserInputService

Enviroment.EnviromentUID = SearchInEnv("EnviromentUID", "") :: string
Enviroment.PreviewUID = SearchInEnv("PreviewUID", "") :: string
Enviroment.OriginalG = SearchInEnv("OriginalG", _G) :: any
Enviroment.PluginWidget = SearchInEnv("PluginWidget", nil) :: DockWidgetPluginGui

return Enviroment
