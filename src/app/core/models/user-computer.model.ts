import { ComputerRes } from "./computer.model";

export interface UserComputerRes {
  employee: {
    id: number;
    name: string;
  };
  computer: ComputerRes;
  assignedAt: string;
  assignedBy: {
    id: number;
    name: string;
  };
}
