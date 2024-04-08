export interface TelegramUser{
    id : number;
    phoneNumber : string;
    isActive : boolean
    services : TelegramService[]
}

export interface TelegramService{
    id : number;
    serviceType : string;
}