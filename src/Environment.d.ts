import { Janitor } from "./Libraries/Janitor";
import { InputSignals } from "./Typing/Typing";

declare const EnvGlobalInjectionKey: string;

export declare namespace Environment {
	const EnvGlobalInjectionKey: string;
	const GetEnvGlobalInjection: () => object | undefined;

	const IsStory: () => boolean;
	const Unmount: () => void;
	const Reload: () => void;
	const CreateSnapshot: (name?: string) => void;
	const SetStoryHolder: (holder?: Instance | undefined) => void;
	const GetJanitor: <T extends object | void = void>() => Janitor<T>;

	const InputListener: InputSignals;
	const UserInput: UserInputService;
	const EnvironmentUID: string;
	const PreviewUID: string;
	const OriginalG: _G;
	const PluginWidget: DockWidgetPluginGui;
	const Plugin: Plugin;
}
