export interface ViewResult<T>{
    data : T;
    actions : Actions;
}

export interface Actions{
    isInactive : boolean;
    isEdit : boolean;
    isDelete : boolean;
    isLoad : boolean;
}

export class ActionsImplement implements Actions{
    isInactive: boolean = false;
    isEdit: boolean = false;
    isDelete: boolean = false;
    isLoad: boolean = false;

}