import { ServiceConnection } from "./marketplace-connections-v2.models";

export interface ServiceDetails{
    value : ServiceConnection | null
    name : string;
}