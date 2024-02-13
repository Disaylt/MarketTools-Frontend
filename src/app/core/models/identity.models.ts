export interface AuthStatus{
    isAuth : boolean;
}

export interface Login{
    email : string;
    password : string;
}

export interface Register extends Login{
    userName : string;
    repeatPassword : string;
}

export interface AuthDetails{
    token : string;
}

export interface UserDetails{
    id : string;
    userName : string;
    email : string;
    createDate : string;
}