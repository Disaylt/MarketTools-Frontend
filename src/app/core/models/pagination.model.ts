export interface Pagination{
    take : number;
    skip : number;
    page : number;
}

export interface PaginationResult<T>{
    total : number;
    items : T[]
}