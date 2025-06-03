import { AccessRes } from "./access-res";
import { ComputerRes } from "./computer-res.model";
import { UserRes } from "./user-res";

export interface RequestRes {
    users: UserRes[];
    access: AccessRes[];
    computers: ComputerRes[];
}
