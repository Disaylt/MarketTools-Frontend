export interface Navigation{
    colapseName? : string | null;
    iconCode : string;
    main : NavigationValue;
    parent? : NavigationValue[] | null;
}

export interface NavigationValue{
    name : string;
    path? : string | null;
    isDisabled : boolean;
}