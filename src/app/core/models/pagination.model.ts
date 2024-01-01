export interface Pagination{
    take : number;
    skip : number;
}

export interface PaginationResult<T>{
    total : number;
    items : T[]
}