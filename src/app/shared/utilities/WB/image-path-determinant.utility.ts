export class ImagePathDeterminantUtityli{
    getImagePath(article : string) : string{

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

    private getVol(article : string) : string{
        const value = 5;
        if(article.length <= value){
            return "0";
        }
        return article.slice(0, -value);
    }

    private getPart(article : string) : string{
        const value = 3;
        if(article.length <= value){
            return "0";
        }
        return article.slice(0, -value);
    }

    private chooseBaseket(vol : string) : string{
        const number = Number.parseInt(vol);

        if(number >= 0){
            return "01";
        }
        if(number >= 144){
            return "02";
        }
        if(number >= 288){
            return "03";
        }
        if(number >= 432){
            return "04";
        }
        if(number >= 720){
            return "05";
        }
        if(number >= 1008){
            return "06";
        }
        if(number >= 1062){
            return "07";
        }
        if(number >= 1116){
            return "08";
        }
        if(number >= 1170){
            return "09";
        }
        if(number >= 1314){
            return "10";
        }
        if(number >= 1602){
            return "11";
        }
        if(number >= 1656){
            return "12";
        }
        if(number >= 1920){
            return "13";
        }
        if(number >= 2046){
            return "14";
        }
        if(number >= 2091 && number <= 2405){
            return "15";
        }
        else{
            return "16";
        }
    }
}