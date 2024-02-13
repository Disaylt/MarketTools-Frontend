export interface SettingsModel{
    isSkipWithTextFeedbacks : boolean;
    isSkipEmptyFeedbacks : boolean;
}

export interface SettingsUpdateModel extends SettingsModel{
    templateId : number;
}