export interface NewOpenApiConnectionBody{
    name : string;
    description : string;
    token : string;
    marketplaceName : number;
}

export interface OpenApiRefreshTokenBody{
    id : number;
    token : string;
}