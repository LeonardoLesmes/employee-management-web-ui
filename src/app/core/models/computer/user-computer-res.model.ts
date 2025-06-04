import { StatusType } from '../../../shared/types/status.types';

export interface UserComputerRes {
    id: number;
    employeeId: number;
    employeeName: string;
    computerId: number;
    computerModel: string;
    serialNumber: string;
    status: StatusType;
    requestDate: string;
}
