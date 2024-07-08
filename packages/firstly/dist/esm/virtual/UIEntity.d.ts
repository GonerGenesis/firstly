import { StateDemoEnum } from './StateDemoEnum.js';
export declare class UIEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    password: string;
    state: StateDemoEnum;
    permissions?: never[] | undefined;
    cuid: string;
    isSubContractor?: boolean;
    rate?: number;
    arrivalDate?: Date;
    arrivalDateOnly?: Date;
}
