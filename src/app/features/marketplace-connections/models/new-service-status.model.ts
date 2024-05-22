import { ServicesName } from "../../../core/enums/services-name.enum";

export interface NewServiceStatus{
    connectionId : number;
    service : ServicesName;
    isActive : boolean;
}