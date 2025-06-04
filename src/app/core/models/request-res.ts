import { AccessRes } from './access/access-res';
import { UserComputerRes } from './computer/user-computer-res.model';
import { UserRes } from './user/user-res';

export interface RequestRes {
    users: UserRes[];
    access: AccessRes[];
    computers: UserComputerRes[];
}
