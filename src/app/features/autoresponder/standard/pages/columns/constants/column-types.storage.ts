import { ColumnType } from "../models/column-type.model";

export class ColumnTypeStorage{
    static value : ColumnType[] = [
        {
            name : "Стандарт",
            id : 0
        },
        {
            name : "Рекомендации",
            id : 1
        }
    ]
}