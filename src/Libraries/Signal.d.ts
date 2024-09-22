// types from @rbxts/lemon-signal

export declare type SignalParameters<T> = Parameters<
	T extends unknown[] ? (...args: T) => never : T extends unknown ? (arg: T) => never : () => never
>;

export declare type SignalCallback<T> = (...args: SignalParameters<T>) => unknown;
export declare type SignalWait<T> = T extends unknown[] ? LuaTuple<T> : T;

export declare class Connection<T> {
	public readonly Connected: boolean;

	public Destroy(): void;
	public Disconnect(): void;
	public Reconnect(): void;
}

export declare class Signal<T> {
	public readonly RBXScriptConnection?: RBXScriptConnection;
	public readonly TotalConnections?: number;
	public readonly OnConnectionsChanged: Signal<number>;

	public constructor(trackConnections?: boolean);
	public static is: <O extends object>(object: O) => boolean;
	public static wrap: <T extends Callback>(
		signal: RBXScriptSignal<T>,
		trackConnections?: boolean,
	) => Signal<Parameters<T>>;

	public Connect(fn: SignalCallback<T>): Connection<T>;
	public Once(fn: SignalCallback<T>): Connection<T>;
	public Wait(): SignalWait<T>;
	public Fire(...args: SignalParameters<T>): void;
	public DisconnectAll(): void;
	public Destroy(): void;
}
