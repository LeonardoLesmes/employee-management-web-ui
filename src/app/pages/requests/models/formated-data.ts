import { ReqStatus } from "./req-status";

export interface FormartedData {
    user: string;
    request: string;
    date: string;
    status: ReqStatus;
}
