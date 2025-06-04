import { AccessRes } from './access-res';
import { UserComputerRes } from './user-computer-res.model';
import { UserRes } from './user-res';

export interface RequestRes {
    users: UserRes[];
    access: AccessRes[];
    computers: UserComputerRes[];
}
