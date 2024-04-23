export class ImagePathDeterminantUtityli{
    static getImagePath(article : string) : string{

        try{
            const vol = this.getVol(article);
            const part = this.getPart(article);
            const basket = this.chooseBaseket(vol);

            return `https://basket-${basket}.wbbasket.ru/vol${vol}/part${part}/${article}/images/big/1.webp`
        }
        catch{
            return "https://basket-03.wbbasket.ru/vol303/part30359/30359816/images/big/1.webp"
        }
    }

    private static getVol(article : string) : string{
        const value = 5;
        if(article.length <= value){
            return "0";
        }
        return article.slice(0, -value);
    }

    private static getPart(article : string) : string{
        const value = 3;
        if(article.length <= value){
            return "0";
        }
        return article.slice(0, -value);
    }

    private static chooseBaseket(vol : string) : string{
        const number = Number.parseInt(vol);

        if(number <= 143){
            return "01";
        }
        if(number <= 287){
            return "02";
        }
        if(number <= 431){
            return "03";
        }
        if(number <= 719){
            return "04";
        }
        if(number <= 1007){
            return "05";
        }
        if(number <= 1061){
            return "06";
        }
        if(number <= 1115){
            return "07";
        }
        if(number <= 1169){
            return "08";
        }
        if(number <= 1313){
            return "09";
        }
        if(number <= 1601){
            return "10";
        }
        if(number <= 1655){
            return "11";
        }
        if(number <= 1919){
            return "12";
        }
        if(number <= 2045){
            return "13";
        }
        if(number <= 2189){
            return "14";
        }
        if(number <= 2405){
            return "15";
        }
        else{
            return "16";
        }
    }
}