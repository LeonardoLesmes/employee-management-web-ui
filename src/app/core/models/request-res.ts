import { AccessRes } from "./access-res";
import { UserRes } from "./user-res";

export interface RequestRes {
    users: UserRes[];
    access: AccessRes[];
}