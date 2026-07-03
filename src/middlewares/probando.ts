import {type Request, type Response, type NextFunction} from 'express';

export function saludar(){
    return(req: Request, res: Response, next: NextFunction) => {
        console.log("Hola pasaste por el middleware!!!");

        next();
    }
}