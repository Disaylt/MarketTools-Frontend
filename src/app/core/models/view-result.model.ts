export interface ViewResult<T>{
    data : T;
    viewData : ViewData;
}

export interface ViewData{
    isInactive : boolean;
    isEdit : boolean;
    isDelete : boolean;
    isLoad : boolean;
}

export class ViewDataImplement implements ViewData{
    isInactive: boolean = false;
    isEdit: boolean = false;
    isDelete: boolean = false;
    isLoad: boolean = false;

}