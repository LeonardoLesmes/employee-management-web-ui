import { StatusType } from "../types/status.types";

export interface ComputerRes {
  id: number;
  employeeId: number;
  employeeName: string;
  computerId: number;
  computerModel: string;
  serialNumber: string;
  status: StatusType
  requestDate: string;
}
