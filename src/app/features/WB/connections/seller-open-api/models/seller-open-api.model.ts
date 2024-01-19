export interface NewOpenApiConnectionBody{
    name : string;
    description : string;
    token : string;
}

export interface OpenApiRefreshTokenBody{
    id : number;
    token : string;
}