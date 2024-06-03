export interface CardModel{
    id : number;
    article : number;
    groupId : number;
    subjectId : number;
    uId : string;
    vendorCode : string;
    name : string;
    brand : string;
    title : string;
    mainPhotoUrl : string | null;

    length : number;
    width : number;
    height : number;
}