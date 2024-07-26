local UserInputService = game:GetService("UserInputService")
local Environment = {}

Environment.EnvGlobalInjectionKey = "__hotreload_env_global_injection__" -- the longer the better

function SearchInEnv(key: string, def: any?)
	local env = Environment.GetEnvGlobalInjection()

	return (env and env[key]) or def
end

function Environment.GetEnvGlobalInjection()
	local env = getfenv()

	return env[Environment.EnvGlobalInjectionKey]
end
function Environment.IsStory()
	local env = Environment.GetEnvGlobalInjection()

	return env ~= nil
end

Environment.Unmount = SearchInEnv("Unmount", function() end) :: () -> ()
Environment.Reload = SearchInEnv("Reload", function() end) :: () -> ()
Environment.CreateSnapshot = SearchInEnv("CreateSnapshot", function() end) :: () -> ()
Environment.GetJanitor = function()
	local janitor = SearchInEnv("StoryJanitor")
	return janitor
end

Environment.InputListener = SearchInEnv("InputListener", nil) :: UserInputService
Environment.UserInput = SearchInEnv("InputListener", UserInputService) :: UserInputService

Environment.EnvironmentUID = SearchInEnv("EnvironmentUID", "") :: string
Environment.PreviewUID = SearchInEnv("PreviewUID", "") :: string
Environment.OriginalG = SearchInEnv("OriginalG", _G) :: any
Environment.PluginWidget = SearchInEnv("PluginWidget", nil) :: DockWidgetPluginGui

return Environment
