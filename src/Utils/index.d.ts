import { GenericInfo } from "../Typing/Generic";

declare function ListenControl<T>(controlInfo: GenericInfo<T>, listener: (newVal: T) => void): () => void;
