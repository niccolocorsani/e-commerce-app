import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OneSignal} from "onesignal-ngx";


@Injectable({
    providedIn: 'root'
})
export class MailServiceService {




    //python mail service

    private url = 'https://flask-fire-lpzdgy4rvq-lm.a.run.app/';


    myObserver = {
        next: (value: any) => console.log(value),
        error: (err: any) => alert('Observer got an error: ' + err + '..'),
    };

    header = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic MjJlOWZjOGMtZjhhOC00OThkLWE1ODctNzQ3N2QxMDFlOGY4"
    });


    constructor(public http: HttpClient) {
    }



    createPushNotification(message: string) {
            this.http.get<Object>(this.url+message)
                .subscribe(this.myObserver);
    }




}
