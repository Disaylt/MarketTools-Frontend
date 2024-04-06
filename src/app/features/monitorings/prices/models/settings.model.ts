export interface SettingsModel {
    isCheckPrices: boolean;
    isCheckBaseDiscount: boolean;
    isCheckBuyerDiscount: boolean;
}

export interface SettingsUpdateModel extends SettingsModel {
    id : number;
}