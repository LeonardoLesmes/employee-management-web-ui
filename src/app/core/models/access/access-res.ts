import { StatusType } from '../../../shared/types/status.types';

export interface AccessRes {
    id: number;
    employeeName: string;
    employeeId: number;
    systemName: string;
    status: StatusType;
    requestDate: string;
}
