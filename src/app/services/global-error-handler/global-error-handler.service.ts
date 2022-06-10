import {ErrorHandler, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor() {
    }

    handleError(error: any): void {

        if (error.stack.toString().includes('.ts'))
            console.log(error)
        /*   let splittedError = []
         splittedError = error.stack.toString().split(' ')
         let logged = false
         //console.error(error.stack)
       /*  splittedError.forEach(element => {
             console.log(element)
             if (element.includes('omponent') || element.includes('ervice')) {
                 console.error('error in file ', element);
                 logged = true
             }
         })*/
       // if(logged == false)
       // console.error('error: ', error.message);

    }
}
