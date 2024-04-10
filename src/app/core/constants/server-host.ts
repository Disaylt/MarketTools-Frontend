import { isDevMode } from "@angular/core"

export class ServerHost{
    
    static get(){
        if(isDevMode()){
            return "https://localhost:7116/";
        }
        else{
            return "https://api.mp-snake.ru/"
        }
    }
}