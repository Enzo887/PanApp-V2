import { RequestHandler } from 'express';
import { z } from 'zod';

type segment = 'body' | 'params' | 'query'

export function validar<T>(schema: z.ZodType<T>, segment: segment): RequestHandler{
    return(req, res, next)=>{
        const result = schema.safeParse(req[segment])
        
        if(!result.success){
            const flattened = z.flattenError(result.error);
            res.status(400).json({  
                errors: flattened
            })
            return;
        }

        res.locals[segment] = result.data;
        next();

    }
}