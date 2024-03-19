export declare namespace LibLike {
	type Roact = {
		createElement: (component: any, props?: any, ...children: any[]) => any;
		mount: (element: any, parent?: Instance, key?: string) => any;
		unmount: (tree: any) => void;
		update: (tree: any, element: any) => any;
	};
	type React = {
		createElement: (component: any, props?: any, ...children: any[]) => any;
	};
	type Fusion = {};

	type ReactRoblox = {
		createRoot: (container: Instance, options?: any) => ReactRobloxRoot;
		createLegacyRoot?: (container: Instance, options?: any) => ReactRobloxRoot;
	};
	interface ReactRobloxRoot {
		render(element: any): void;
		unmount(): void;
	}
}
