import { ColumnType } from "../enums/columns-type.enum";
import { ColumnTypeModel } from "../models/column-type.model";

export class ColumnTypesStorage{
    static value : ColumnTypeModel[] = [
        {
            nameEnum : ColumnType.standard,
            nameView : "Стандарт"
        },
        {
            nameEnum : ColumnType.recommendation,
            nameView : "Рекомендации"
        }
    ]
}