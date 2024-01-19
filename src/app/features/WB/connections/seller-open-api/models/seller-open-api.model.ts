export interface NewOpenApiConnectionBody{
    name : string;
    descriptions : string;
    token : string;
}

export interface OpenApiRefreshTokenBody{
    id : number;
    token : string;
}