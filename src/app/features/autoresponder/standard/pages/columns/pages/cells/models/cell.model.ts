interface BaseCell{
    value : string;
}

export interface NewCell extends BaseCell{
    columnId : number;
}

export interface Cell extends BaseCell{
    id: number;
}