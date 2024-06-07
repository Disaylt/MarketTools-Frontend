import { WbComissionByCardCategory } from "../../cards/models/card.model";

export interface ComissionRquestBody{
    id : number;
    startDate : Date | null;
    endDate : Date | null;
    value : WbComissionByCardCategory
}