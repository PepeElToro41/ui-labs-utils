import { EnumList } from "./ControlTypings/Advanced";
import { Ordered } from "./ControlTypings/ControlUtils";

const list = EnumList({ Hello: 2, Test: 5 }, "");
const control = Ordered("list, 1", 2);
