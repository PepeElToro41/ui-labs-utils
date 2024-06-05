import { Janitor } from "./Libraries/Janitor";
import { InputSignals } from "./Typing";

declare const EnvGlobalInjectionKey: string;

export declare namespace Enviroment {
	const EnvGlobalInjectionKey: string;
	const GetEnvGlobalInjection: () => object | undefined;

	const IsStory: () => boolean;
	const Unmount: () => void;
	const Reload: () => void;
	const CreateSnapshot: (name?: string) => void;
	const GetJanitor: <T extends object | void = void>() => Janitor<T>;

	const InputListener: InputSignals;
	const UserInput: UserInputService;
	const EnviromentUID: string;
	const PreviewUID: string;
	const OriginalG: _G;
	const PluginWidget: DockWidgetPluginGui;
}
