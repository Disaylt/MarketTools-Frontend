export interface SettingsModel{
    isSkipWithTextFeedbacks : boolean;
    isSkipEmptyFeedbacks : boolean;
    isMain : boolean;
}

export interface SettingsUpdateModel extends SettingsModel{
    templateId : number;
}