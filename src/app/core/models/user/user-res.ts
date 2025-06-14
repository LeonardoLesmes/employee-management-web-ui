export interface UserRes {
    id: number;
    name: string;
    email: string;
    department: string;
    role: Role;
    status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'CANCELED';
    requestDate: string;
}

export interface Role {
    id: number;
    type: string;
    description: string;
}
