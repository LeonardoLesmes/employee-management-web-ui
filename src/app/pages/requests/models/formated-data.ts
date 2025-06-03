import { ReqStatus } from "./req-status";

export interface FormartedData {
    id: number;
    user: string;
    userId: number;
    request: string;
    date: string | Date;
    status: ReqStatus;
    type: 'user' | 'access' | 'computer';
}
