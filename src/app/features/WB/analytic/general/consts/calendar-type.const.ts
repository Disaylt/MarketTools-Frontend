import { CalendarType } from "../enums/calendar-type.enums"

export class CalendarTypeStorage{
    static getName(value : CalendarType) : string{
        switch(value){
            case CalendarType.allDate:
                return "За всё время"
            case CalendarType.afterDate:
                return "После выбранной даты"
            case CalendarType.beforeDate:
                return "До выбранной даты"
            case CalendarType.rangeDate:
                return "Между датами"
            default:
                return "Неизвестно"
        }
    }
}